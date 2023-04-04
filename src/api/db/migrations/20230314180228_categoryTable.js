export const up = async (knex) => {
  await knex.schema.createTable("category", (table) => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("description").notNullable()
    table.text("image").notNullable()
  })
  await knex.schema.createTable("selected_category", (table) => {
    table.increments("id")
    table.integer("order").notNullable()
    table.integer("category_id").references("id").inTable("category")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("selected_category")
  await knex.schema.dropTable("category")
}
