export const up = async (knex) => {
    await knex.schema.createTable("category", (table) => {
        table.increments("id")
        table.text("name").notNullable()
        table.text("description").notNullable()
        table.text("image").notNullable()
    })
}

export const down = async (knex) => {
    await knex.schema.dropTable("category")
}
