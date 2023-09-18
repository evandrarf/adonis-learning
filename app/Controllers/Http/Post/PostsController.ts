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
}
