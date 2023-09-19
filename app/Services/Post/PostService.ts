import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/Post/CreatePostValidator'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import User from 'App/Models/User'
import { Exception } from '@adonisjs/core/build/standalone'

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

  public async show(id: string) {
    const post = await Post.query().where('id', id).preload('author')

    if (!post.length) {
      throw new Exception('There is no post with that id', 404, 'E_NOT_FOUND')
    }

    return post
  }

  public async update(user: User, request: RequestContract, id: string) {
    const { title, content } = await request.validate(CreatePostValidator)

    const post = await Post.findOrFail(id)

    if (post!.user_id !== user.id) {
      throw new Exception('Unauthorized action', 403, 'E_UNAUTHORIZED')
    }

    post.title = title
    post.content = content

    await post.save()

    const data = await Post.query().where('id', post.id).preload('author')

    return data
  }

  public async delete(user: User, id: string) {
    const post = await Post.findOrFail(id)

    if (post!.user_id !== user.id) {
      throw new Exception('Unauthorized action', 403, 'E_UNAUTHORIZED')
    }

    await post.delete()

    return null
  }
}
