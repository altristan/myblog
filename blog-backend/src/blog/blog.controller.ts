import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
  UseGuards
} from '@nestjs/common';
import {BlogService} from './blog.service';
import {CreatePostDTO} from './dto/create-post.dto';
import {ValidateObjectId} from './shared/pipes/validate-object-id.pipes';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guards";

@Controller('blog')
export class BlogController {

  constructor(private blogService: BlogService) {
  }

  // Submit a post
  @UseGuards(JwtAuthGuard)
  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  } //TODO: before posting, user should be identified first

  @UseGuards(JwtAuthGuard)
  @Put('/edit')
  async editPost(
      @Res() res,
      @Query('postID', new ValidateObjectId()) postID,
      @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.blogService.editPost(postID, createPostDTO);
    if (!editedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost,
    });
  }

  // Delete a post using ID
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
    const deletedPost = await this.blogService.deletePost(postID);
    if (!deletedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost,
    });
  }

  // Fetch a particular post using ID
  // @UseGuards(JwtAuthGuard)
  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.blogService.getPost(postID);
    if (!post) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json(post);
  }

  // Fetch all posts
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }
}