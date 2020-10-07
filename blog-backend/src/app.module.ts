import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/nest-blog-project', { useNewUrlParser: true }),
    // MongooseModule.forRoot('mongodb+srv://altristan:123pass@cluster0.7rokt.mongodb.net/myblog?retryWrites=true&w=majority', { useNewUrlParser: true }),
    BlogModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}