export const up = async (knex) => {
  await knex.schema.createTable("material", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })

  await knex.schema.createTable("product", (table) => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("description").notNullable()
    table.text("image").notNullable()
    table.text("price").notNullable()
    table.text("promotion").notNullable()
    table.text("quantity").notNullable()
    table.integer("categoryId").references("id").inTable("category")
    table.integer("materialId").references("id").inTable("material")
  })

  await knex.schema.createTable("selected_product", (table) => {
    table.increments("id")
    table.integer("order").notNullable()
    table.integer("product_id").references("id").inTable("product")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("selected_product")
  await knex.schema.dropTable("product")
  await knex.schema.dropTable("material")
}
