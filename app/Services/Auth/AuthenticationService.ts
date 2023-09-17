import { Exception } from '@adonisjs/core/build/standalone'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import User from '../../Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import LoginRequestValidator from 'App/Validators/Auth/LoginRequestValidator'
import RegisterRequestValidator from 'App/Validators/Auth/RegisterRequestValidator'

export default class AuthenticationService {
  public async register(request: RequestContract) {
    const { username, password } = await request.validate(RegisterRequestValidator)

    if (await User.findBy('username', username)) {
      throw new Exception('Username Already Taken', 409, 'E_DUPLICATE_ENTRY')
    }

    const user = await User.create({ username, password })

    return user
  }

  public async login(auth: AuthContract, request: RequestContract) {
    const { username, password } = await request.validate(LoginRequestValidator)

    const user = await User.findBy('username', username)

    if (!user || !(await Hash.verify(user?.password, password))) {
      throw new Exception('Username or Password Incorrect', 401, 'E_AUTHENTICATION_FAILURE')
    }

    const token = await auth.use('api').generate(user)

    return token
  }
}
