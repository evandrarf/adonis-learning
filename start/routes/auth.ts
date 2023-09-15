import Route from '@ioc:Adonis/Core/Route'

export default () => {
  return Route.group(() => {
    Route.post('/login', 'Auth/AuthenticationController.login').as('login')
    Route.post('/register', 'Auth/AuthenticationController.register').as('register')
    Route.get('/user', 'Auth/AuthenticationController.getUser')
      .middleware('auth:api')
      .as('get-user')
  })
    .prefix('auth')
    .as('auth')
}
