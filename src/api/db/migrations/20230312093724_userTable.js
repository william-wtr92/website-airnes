export const up = async (knex) => {
  await knex.schema.createTable("role", (table) => {
    table.increments("id")
    table.text("right").notNullable()
  })

  await knex.schema.createTable("user", (table) => {
    table.increments("id")
    table.text("email").notNullable()
    table.text("name").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
    table.integer("roleid").references("id").inTable("role").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("users")
  await knex.schema.dropTable("role")
}
