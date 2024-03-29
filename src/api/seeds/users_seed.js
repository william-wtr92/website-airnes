const knex = require("knex")
const config = require("../config.js")
const { hashPassword } = require("../db/hashPassword.js")
const faker = require("faker")

faker.locale = "fr"

const seed = async () => {
  const db = knex(config.db)

  await db("address").del()
  await db("user").del()

  const [predefinedPasswordHash, predefinedPasswordSalt] = await hashPassword(
    "LesDmByAvetis99?"
  )
  const predefinedUser = {
    name: "Wil",
    mail: "william@quoicoubeh.fr",
    passwordHash: predefinedPasswordHash,
    passwordSalt: predefinedPasswordSalt,
    roleid: 1,
  }

  const users = [
    predefinedUser,
    ...(await Promise.all(
      Array.from({ length: 39 }, async () => {
        const [passwordHash, passwordSalt] = await hashPassword(
          faker.internet.password()
        )

        return {
          name: faker.name.findName(),
          mail: faker.internet.email(),
          passwordHash,
          passwordSalt,
          roleid: 2,
        }
      })
    )),
  ]

  await db("user").insert(users)

  const [{ id: userId }] = await db("user")
    .select("id")
    .where("mail", "william@quoicoubeh.fr")

  const predefinedUserAddress = {
    lastName: faker.name.lastName(),
    name: faker.name.firstName(),
    addressName: faker.address.streetName(),
    postal_code: faker.address.zipCode(),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    complete: faker.name.lastName(),
    userid: userId,
  }

  await db("address").insert(predefinedUserAddress)
}

module.exports = {
  seed,
}