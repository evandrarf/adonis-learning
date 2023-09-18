import Route from '@ioc:Adonis/Core/Route'

export default () => {
  return Route.group(() => {
    Route.get('/', 'Post/PostsController.index').as('index')
    Route.post('/', 'Post/PostsController.store').as('store')
  })
    .prefix('posts')
    .as('posts')
}
