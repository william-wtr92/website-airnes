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
}

export const down = async (knex) => {
    await knex.schema.dropTable("material")
}
