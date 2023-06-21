export const up = async (knex) => {
    await knex.schema.createTable("material", (table) => {
        table.increments("id")
        table.text("name").notNullable()
        table.text("description").notNullable()
    })
    .then(function () {
            return knex("material").insert({
                id: 0,
                name: "No material",
                description: "No materials",
            })
        })

    await knex.schema.createTable("selected_material", (table) => {
        table.increments("id")
        table.integer("order").notNullable()
        table.integer("material_id").references("id").inTable("material")
    })
}

export const down = async (knex) => {
    await knex.schema.dropTable("selected_material")
    await knex.schema.dropTable("material")
}
