import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/Post/CreatePostValidator'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import User from 'App/Models/User'

export default class PostService {
  public async index() {
    const posts = await Post.query().preload('author')

    return posts
  }

  public async store(user: User, request: RequestContract) {
    const { title, content } = await request.validate(CreatePostValidator)

    const post = await Post.create({ title, content, user_id: user.id })

    return post
  }
}
