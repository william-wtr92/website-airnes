const knex = require("knex")
const config = require("../config.js")
const { hashPassword } = require("../db/hashPassword.js")

const seed = async () => {
  const db = knex(config.db)

  const [passwordHash, passwordSalt] = await hashPassword("LesDmByAvetis99?")

  await db("user").insert([
    {
      id: 1,
      name: "Wil",
      mail: "william@quoicoubeh.fr",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      roleid: 1,
    },
  ])
}

module.exports = {
  seed,
}
