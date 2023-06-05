export const up = async (knex) => {
  await knex.schema.createTable("material", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })

  await knex.schema
    .createTable("product", (table) => {
      table.increments("id")
      table.text("name").notNullable()
      table.text("description").notNullable()
      table.json("image")
      table.float("price").notNullable()
      table.float("promotion")
      table.integer("quantity").notNullable()
      table.integer("categoryId").references("id").inTable("category")
      table.integer("materialId").references("id").inTable("material")
    })
    .then(() => {
      return knex.schema.raw(
        "ALTER TABLE ?? ADD CONSTRAINT ?? CHECK ((?? IS NULL) OR (?? >= 0 AND ?? < ??))",
        [
          "product",
          "promotion_validity",
          "promotion",
          "promotion",
          "promotion",
          "price",
        ]
      )
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
