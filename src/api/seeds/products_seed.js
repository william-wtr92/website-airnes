const knex = require("knex")
const config = require("../config.js")
const faker = require("faker")

faker.locale = "fr"

const seed = async () => {
  const db = knex(config.db)

  await db("selected_category").del()
  await db("selected_product").del()
  await db("product").del()
  await db("category").del()
  await db("material").del()
  await db("carousel_image").del()

  await insertMaterials(db)

  const categories = await insertCategories(db)

  const products = await insertProducts(db)

  await insertSelectedCategories(db, categories)

  await insertSelectedProducts(db, products)

  await insertCarousel(db)
}

const insertSelectedCategories = async (db, categories) => {
  const selectedCategories = categories
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  await db("selected_category").insert(
    selectedCategories.map((category, index) => ({
      id: index + 1,
      category_id: category.id,
      order: index + 1
    }))
  )
}

const insertSelectedProducts = async (db, products) => {
  const selectedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3)

  await db("selected_product").insert(
    selectedProducts.map((product, index) => ({
      id: index + 1,
      product_id: product.id,
      order: index + 1
    }))
  )
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
    materialId: faker.datatype.number({ min: 1, max: 10 })
  }))

  await db("product").insert(products)

  return products
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
    "buffet"
  ]

  const getRandomCategoryName = () =>
    categoryNames[Math.floor(Math.random() * categoryNames.length)]

  const categories = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: getRandomCategoryName(),
    description: faker.lorem.sentence(),
    image: faker.image.imageUrl()
  }))

  await db("category").insert({
    id: 0,
    name: "No category",
    description: "No categories",
    // needs to be changed once the db and image link handler are set up
    image:
      "https://images.unsplash.com/photo-1630699144339-420f59b4747b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  })

  await db("category").insert(categories)

  return categories
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
    "béton"
  ]

  const getRandomMaterialName = () =>
    materialNames[Math.floor(Math.random() * materialNames.length)]

  const materials = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: getRandomMaterialName()
  }))

  await db("material").insert(materials)
}

const insertCarousel = async (db) => {
  const images = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    label: faker.commerce.productName(),
    url: faker.image.imageUrl(),
    order: index + 1
  }))

  await db("carousel_image").insert(images)
}

module.exports = {
  seed
}
