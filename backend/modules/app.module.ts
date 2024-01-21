import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { FileModule } from './file.module';
import { CloudinaryModule } from './cloudinary.module';
import { PostModule } from './post.module';

@Module({
  imports: [
    AuthModule,
    CloudinaryModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    FileModule,
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
