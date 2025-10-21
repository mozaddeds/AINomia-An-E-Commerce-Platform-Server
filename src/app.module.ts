import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ChatModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET, // Use a strong, environment variable for this
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }, // Access token expiration
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
