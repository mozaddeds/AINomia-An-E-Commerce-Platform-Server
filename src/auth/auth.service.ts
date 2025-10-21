// import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto) {
    try {
      const existingUser = await this.userService.findUserByEmail(dto.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      return this.userService.createUser(dto);
    } catch (error) {
      throw new Error('Error registering user: ' + error.message);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      if (password && user.hashedPassword) {
        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        const tokens = await this.generateTokens(user);
        return {
          user: { id: user.id, email: user.email, name: user.name },
          ...tokens,
        };
      }
    } catch (error) {
      throw new Error('Error validating user: ' + error.message);
    }
  }

  async generateTokens(user: any) {
    try {
      const payload = { sub: user.id, username: user.name };

      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      });

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await this.prisma.refreshToken.create({
        data: {
          hashedToken: hashedRefreshToken,
          userId: user.id,
          expiresAt: expiresAt,
        },
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error('Error generating tokens');
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      console.log(decoded);

      const tokenRecords = await this.prisma.refreshToken.findMany({
        where: {
          userId: decoded.sub,
          isRevoked: false,
          expiresAt: { gt: new Date() },
        },
      });

      let validTokenRecord: any;
      for (const record of tokenRecords) {
        if (await bcrypt.compare(refreshToken, record.hashedToken)) {
          validTokenRecord = record;
          break;
        }
      }

      if (!validTokenRecord) {
        throw new Error('Refresh token not found or revoked');
      }

      const newAccessToken = this.jwtService.sign(
        { sub: decoded.sub, username: decoded.username },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        },
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: decoded.sub, username: decoded.username },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        },
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      const tokenRecords = await this.prisma.refreshToken.findMany({
        where: { userId, isRevoked: false },
      });

      for (const record of tokenRecords) {
        if (await bcrypt.compare(refreshToken, record.hashedToken)) {
          await this.prisma.refreshToken.update({
            where: { id: record.id },
            data: { isRevoked: true },
          });
          break;
        }
      }
    } else {
      await this.prisma.refreshToken.updateMany({
        where: { userId, isRevoked: false },
        data: { isRevoked: true },
      });
    }
  }
}
