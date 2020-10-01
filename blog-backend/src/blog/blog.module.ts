import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { BlogSchema } from './schemas/blog.schema';
import { AuthenticationMiddleware } from '../common/authentication.middleware'; // and this

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }]),
  ], // add
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { method: RequestMethod.POST, path: '/blog/post' },
      { method: RequestMethod.PUT, path: '/blog/edit' },
      { method: RequestMethod.DELETE, path: '/blog/delete' }
    )
  }
}