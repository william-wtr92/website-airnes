export const up = async (knex) => {
  await knex.schema.createTable("address", (table) => {
    table.increments("id")
    table.text("lastName").notNullable()
    table.text("name").notNullable()
    table.text("addressName").notNullable()
    table.text("postal_code").notNullable()
    table.text("city").notNullable()
    table.text("address").notNullable()
    table.text("complete")
    table.integer("userid").references("id").inTable("user")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("address")
}
