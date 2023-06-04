export const up = async (knex) => {
  await knex.schema.createTable("order", (table) => {
    table.increments("id")
    table.integer("user_id").references("id").inTable("user")
    table.integer("address_id").references("id").inTable("address")
    table.text("payment_state").notNullable()
    table.text("payment_intent").notNullable()
    table.integer("price").notNullable()
    table.timestamps(true, true)
    table.text("status").notNullable()
    table.text("payment_method").notNullable()
  })

  await knex.schema.createTable("order_product", (table) => {
    table.increments("id")
    table.integer("order_id").references("id").inTable("order")
    table.integer("product_id").references("id").inTable("product")
    table.text("product_quantity").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("order_product")
  await knex.schema.dropTable("order")
}
