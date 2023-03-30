export const up = async (knex) => {
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
}

export const down = async (knex) => {
    await knex.schema.dropTable("product")
}
