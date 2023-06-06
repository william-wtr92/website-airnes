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
      order: index + 1,
    }))
  )
}

const insertSelectedProducts = async (db, products) => {
  const selectedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3)

  await db("selected_product").insert(
    selectedProducts.map((product, index) => ({
      id: index + 1,
      product_id: product.id,
      order: index + 1,
    }))
  )
}

const insertProducts = async (db) => {
  const products = [
    {
      id: 1,
      name: "Armoire Coloniale en Bois Blanc",
      description:
        "Une armoire coloniale conçue en bois blanc, idéale pour ranger vos vêtements et autres objets personnels.",
      image: "",
      price: 500,
      promotion: 10,
      quantity: 50,
      categoryId: 1,
      materialId: 1,
    },
    {
      id: 2,
      name: "Armoire Rustique en Chêne Massif",
      description:
        "Cette armoire rustique en chêne massif offre un espace de rangement généreux et un design intemporel.",
      image: "",
      price: 1000,
      promotion: 20,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 3,
      name: "Armoire Luxueuse avec Vitrine",
      description:
        "Armoire luxueuse dotée d'une vitrine en verre, parfaite pour exposer vos objets précieux tout en les gardant en sécurité.",
      image: "",
      price: 1000,
      promotion: 20,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 4,
      name: "Dressing Moderne en Noyer",
      description:
        "Un dressing moderne en noyer pour un rangement optimal de votre garde-robe. Comprend plusieurs compartiments pour une organisation facile.",
      image: "",
      price: 1000,
      promotion: 20,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 5,
      name: "Armoire Scandinave avec Miroir Intégré",
      description:
        "Une armoire scandinave épurée avec miroir intégré, conçue pour les espaces modernes et minimalistes.",
      image: "",
      price: 1000,
      promotion: 20,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 6,
      name: "Penderie Élégante avec Portes en Verre",
      description:
        "Penderie élégante avec portes en verre, permettant une vision claire de vos vêtements tout en les protégeant de la poussière.",
      image: "",
      price: 1000,
      promotion: 20,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
  ]

  await db("product").insert(products)

  return products
}

const insertCategories = async (db) => {
  const categoryNames = [
    "table basse",
    "table",
    "armoire",
    "bureau",
    "lit",
    "lampe",
    "chaise",
    "chevet",
    "buffet",
  ]

  const getRandomCategoryName = () =>
    categoryNames[Math.floor(Math.random() * categoryNames.length)]

  const categories = Array.from(
    { length: categoryNames.length },
    (_, index) => ({
      id: index + 1,
      name: getRandomCategoryName(),
      description: faker.lorem.sentence(),
      image: faker.image.imageUrl(),
    })
  )

  await db("category").insert({
    id: 0,
    name: "No category",
    description: "No categories",
    // needs to be changed once the db and image link handler are set up
    image:
      "https://images.unsplash.com/photo-1630699144339-420f59b4747b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
    "acier",
    "plastique",
    "verre",
  ]

  const getRandomMaterialName = () =>
    materialNames[Math.floor(Math.random() * materialNames.length)]

  const materials = Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    name: getRandomMaterialName(),
  }))

  await db("material").insert(materials)
}

const insertCarousel = async (db) => {
  const images = [
    {
      id: 1,
      label: "Produit 1",
      url: "https://example.com/image1.jpg",
      order: 1,
    },
    {
      id: 2,
      label: "Produit 2",
      url: "https://example.com/image2.jpg",
      order: 2,
    },
    {
      id: 3,
      label: "Produit 3",
      url: "https://example.com/image3.jpg",
      order: 3,
    },
  ]

  await db("carousel_image").insert(images)
}

module.exports = {
  seed,
}
