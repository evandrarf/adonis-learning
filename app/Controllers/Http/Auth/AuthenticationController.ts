import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthenticationController {
  public async register({ request, response }: HttpContextContract) {
    // Get username and password from request body json
    const { username, password } = request.body()

    // Find the user with same username
    if (await User.findBy('username', username)) {
      // Return error duplicate if user with that username already exist
      return response.status(409).json({ status: 'success', message: 'Username Already Exist' })
    }

    // Create new user to the database
    const user: User = new User()
    user.username = username
    user.password = password
    await user.save()

    // Return response
    return response
      .status(200)
      .json({ status: 'success', message: 'Success Registering New Account' })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    // Get username and password from request body json
    const { username, password } = request.body()

    // Generate token
    const token = await auth.use('api').attempt(username, password)

    // Return response and token
    return response
      .status(200)
      .json({ status: 'success', message: 'Success Login', data: { token } })
  }

  public async getUser({ auth, response }: HttpContextContract) {
    // Return response and logged in user
    return response.status(200).json({ status: 'Success', data: { username: auth.user!.username } })
  }
}
