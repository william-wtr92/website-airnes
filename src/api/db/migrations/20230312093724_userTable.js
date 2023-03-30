const up = async (knex) => {
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
    table.text("mail").notNullable().unique()
    table.text("name").notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
    table.integer("roleid").references("id").inTable("role").defaultTo(2)
  })
}

const down = async (knex) => {
  await knex.schema.dropTable("user")
  await knex.schema.dropTable("role")
}

module.exports = { up, down }
