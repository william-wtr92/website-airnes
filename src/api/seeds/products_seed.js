const knex = require("knex")
const config = require("../config.js")
const faker = require("faker")

faker.locale = "fr"

const seed = async () => {
  const db = knex(config.db)

  await db("product").del()
  await db("category").del()
  await db("material").del()

  await insertMaterials(db)

  await insertCategories(db)

  await insertProducts(db)
}

const insertProducts = async (db) => {
  const products = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    image: faker.image.imageUrl(),
    price: faker.datatype.number({ min: 100, max: 1000 }),
    promotion: faker.datatype.number({ min: 0, max: 100 }),
    quantity: faker.datatype.number({ min: 0, max: 100 }),
    categoryId: faker.datatype.number({ min: 1, max: 10 }),
    materialId: faker.datatype.number({ min: 1, max: 10 }),
  }))

  await db("product").insert(products)
}

const insertCategories = async (db) => {
  const categoryNames = [
    "canapé",
    "chaise",
    "table",
    "commode",
    "armoire",
    "bureau",
    "étagère",
    "lit",
    "meuble TV",
    "buffet",
  ]

  const getRandomCategoryName = () =>
    categoryNames[Math.floor(Math.random() * categoryNames.length)]

  const categories = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: getRandomCategoryName(),
    description: faker.lorem.sentence(),
    image: faker.image.imageUrl(),
  }))

  await db("category").insert(categories)
}

const insertMaterials = async (db) => {
  const materialNames = [
    "fer",
    "bois",
    "métal",
    "aluminium",
    "cuivre",
    "acier",
    "plastique",
    "verre",
    "pierre",
    "béton",
  ]

  const getRandomMaterialName = () =>
    materialNames[Math.floor(Math.random() * materialNames.length)]

  const materials = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: getRandomMaterialName(),
  }))

  await db("material").insert(materials)
}

module.exports = {
  seed,
}
