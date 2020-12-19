import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LocalStrategy } from './modules/auth/local.strategy';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { importJwtModule } from './utils/import-jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    importJwtModule(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
