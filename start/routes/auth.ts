import Route from '@ioc:Adonis/Core/Route'

export default () => {
  return Route.group(() => {
    Route.post('/login', 'Auth/AuthenticationController.login').as('login')
    Route.post('/register', 'Auth/AuthenticationController.register').as('register')
    Route.group(() => {
      Route.get('/user', 'Auth/AuthenticationController.getUser').as('getUser')
      Route.delete('/logout', 'Auth/AuthenticationController.logout').as('logout')
    })
      .middleware('auth:api')
      .as('get-user')
  })
    .prefix('auth')
    .as('auth')
}
