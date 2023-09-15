import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('username')
      table.string('password')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)

    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
