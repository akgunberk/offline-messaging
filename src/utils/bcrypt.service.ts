import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  constructor(private readonly jwtService: JwtService) {}
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(password: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }

  generateJwt(user: { username: string; password: string }): Promise<string> {
    return this.jwtService.signAsync(user);
  }
}
