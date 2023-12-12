import { Module } from '@nestjs/common';
import { AuthController } from 'controllers/auth.controller';
import { UserMapper } from 'data/mappers/user.mapper';
import { AuthService } from 'services/auth.service';
import { PrismaService } from 'services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'security/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('security.jwt.secret'),
        signOptions: { expiresIn: '6h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserMapper, PrismaService, JwtStrategy],
})
export class AuthModule {}
