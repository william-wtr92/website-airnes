export const up = async (knex) => {
  await knex.schema
    .createTable("role", (table) => {
      table.increments("id")
      table.text("right").notNullable()
    })
    .then(function () {
      return knex("role").insert([{ right: "admin" }, { right: "user" }])
    })

  await knex.schema.createTable("user", (table) => {
    table.increments("id")
    table.text("mail").notNullable()
    table.text("name").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
    table.integer("roleid").references("id").inTable("role").defaultTo(2)
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("user")
  await knex.schema.dropTable("role")
}
