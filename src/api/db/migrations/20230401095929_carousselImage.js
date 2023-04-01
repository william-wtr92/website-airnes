export const up = async (knex) => {
  await knex.schema.createTable("carousel_image", (table) => {
    table.increments("id")
    table.text("label").notNullable()
    table.string("url").notNullable()
    table.timestamps(true, true)
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("carousel_image")
}