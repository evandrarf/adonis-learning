import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
// import { IocContract } from '@adonisjs/fold'
// import AuthenticationService from 'App/Service/Auth/AuthenticationService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
