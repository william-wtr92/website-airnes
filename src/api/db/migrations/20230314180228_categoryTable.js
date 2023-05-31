export const up = async (knex) => {
  await knex.schema
    .createTable("category", (table) => {
      table.increments("id")
      table.text("name").notNullable()
      table.text("description").notNullable()
      table.text("image").notNullable()
    })
    .then(function () {
      return knex("category").insert({
        id: 0,
        name: "No category",
        description: "No categories",
        // needs to be changed once the db and image link handler are set up
        image:
          "https://images.unsplash.com/photo-1630699144339-420f59b4747b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      })
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
