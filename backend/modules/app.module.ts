import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import configuration from 'config/configuration';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth.module';
import { CloudinaryModule } from './cloudinary.module';
import { FileModule } from './file.module';
import { PostModule } from './post.module';
import { UserModule } from './user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SessionModule } from './session.module';
import { NotificationModule } from './notification.module';
import { PrismaService } from 'services/prisma.service';

@Module({
  imports: [
    AuthModule,
    CloudinaryModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    EventEmitterModule.forRoot(),
    FileModule,
    NotificationModule,
    PostModule,
    SessionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, PrismaService],
})
export class AppModule {}
