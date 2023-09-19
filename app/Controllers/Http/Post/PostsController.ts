import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from '../BaseController'
import { inject } from '@adonisjs/core/build/standalone'
import PostService from 'App/Services/Post/PostService'
import User from 'App/Models/User'

@inject()
export default class PostsController extends BaseController {
  constructor(private readonly postService: PostService) {
    super()
  }

  public async index({ response }: HttpContextContract) {
    try {
      const data = await this.postService.index()

      return this.sendSuccessResponse(response, 'Success get all posts', data, 200)
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const user: User = auth.user as User

      const data = await this.postService.store(user, request)

      return this.sendSuccessResponse(response, 'Success create new post', data, 201)
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }

  public async show({ response, params: { id } }: HttpContextContract) {
    try {
      const data = await this.postService.show(id)

      return this.sendSuccessResponse(response, 'Success get post detail', data, 200)
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }

  public async update({ auth, request, response, params: { id } }: HttpContextContract) {
    try {
      const user: User = auth.user as User

      const data = await this.postService.update(user, request, id)

      return this.sendSuccessResponse(response, 'Success update post', data, 200)
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }

  public async delete({ auth, response, params: { id } }: HttpContextContract) {
    try {
      const user: User = auth.user as User

      await this.postService.delete(user, id)

      return this.sendSuccessResponse(response, 'Success delete post', {}, 200)
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }
}
