import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  // You can override methods here if needed
  // For example, handleRequest, canActivate, etc.
}