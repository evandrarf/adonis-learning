import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationService from 'App/Services/Auth/AuthenticationService'
import BaseController from '../BaseController'

@inject()
export default class AuthenticationController extends BaseController {
  constructor(private readonly authenticationService: AuthenticationService) {
    super()
  }

  public async register({ request, response }: HttpContextContract) {
    try {
      // call the auth service
      await this.authenticationService.register(request)

      // Return response
      return this.sendSuccessResponse(response, 'Success Registering New Account', {}, 200)
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      // call the auth service
      const data = await this.authenticationService.login(auth, request)

      // Return response and token
      return this.sendSuccessResponse(response, 'Success Login', data, 200)
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }

  public async getUser({ auth, response }: HttpContextContract) {
    try {
      return this.sendSuccessResponse(response, 'Success Get Current User Data', {
        username: auth?.user!.username,
      })
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()

      return this.sendSuccessResponse(response, 'Success Logout', {}, 200)
    } catch (error) {
      return this.sendErrorResponse(response, error)
    }
  }
}
