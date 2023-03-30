const up = async (knex) => {
  await knex.schema.createTable("contact", (table) => {
    table.increments("id")
    table.text("mail").notNullable()
    table.text("topic").notNullable()
    table.text("content").notNullable()
    table.timestamps(true, true, true)
    table.boolean("read").notNullable().defaultTo(false)
  })
}

const down = async (knex) => {
  await knex.schema.dropTable("contact")
}

module.exports = { up, down }
