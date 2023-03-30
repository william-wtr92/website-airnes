const up = async (knex) => {
  await knex.schema.createTable("category", (table) => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("description").notNullable()
    table.text("image").notNullable()
  })
}

const down = async (knex) => {
  await knex.schema.dropTable("category")
}

module.exports = { up, down }
