import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LocalStrategy } from './modules/auth/local.strategy';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { AuthModule, GlobalModule, UsersModule } from './modules';
import { UserslogModule } from './modules/userslog/userslog.module';

@Module({
  imports: [AuthModule, UsersModule, GlobalModule, UserslogModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
