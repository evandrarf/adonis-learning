import Route from '@ioc:Adonis/Core/Route'

export default () => {
  return Route.group(() => {
    Route.get('/', 'Post/PostsController.index').as('index')
    Route.post('/', 'Post/PostsController.store').as('store')
    Route.get('/:id', 'Post/PostsController.show').as('show')
    Route.put('/:id', 'Post/PostsController.update').as('update')
    Route.delete('/:id', 'Post/PostsController.delete').as('delete')
  })
    .prefix('posts')
    .as('posts')
}
