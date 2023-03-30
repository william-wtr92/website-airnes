const up = async (knex) => {
  return knex.schema.createTable("azure", (table) => {
    table.increments("id").primary()
    table.string("filename").notNullable()
    table.string("url").notNullable()
    table.timestamp(true, true)
  })
}

const down = async (knex) => {
  return knex.schema.dropTable("azure")
}

module.exports = { up, down }
