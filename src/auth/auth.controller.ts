import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: CreateUserDto
  ) {
    return this.authService.registerUser(dto);
  }

  //@UseGuards(JWTAuthGuard)
  @Post('login')
  async login(
    @Request() req
  ) {
    return this.authService.validateUser(req.body.email, req.body.password);
  }
}
