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
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_3_vitres.avif?sp=r&st=2023-06-07T11:20:32Z&se=2023-10-06T19:20:32Z&sv=2022-11-02&sr=b&sig=5Ye1auBKfVwXroweNvHaXD1GYg%2BZNMZMQRy8oJloX2U%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_3_vitres.avif?sp=r&st=2023-06-07T11:20:32Z&se=2023-10-06T19:20:32Z&sv=2022-11-02&sr=b&sig=5Ye1auBKfVwXroweNvHaXD1GYg%2BZNMZMQRy8oJloX2U%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_3_vitres.avif?sp=r&st=2023-06-07T11:20:32Z&se=2023-10-06T19:20:32Z&sv=2022-11-02&sr=b&sig=5Ye1auBKfVwXroweNvHaXD1GYg%2BZNMZMQRy8oJloX2U%3D",
        },
      ]),
      price: 758,
      promotion: 0,
      quantity: 50,
      categoryId: 3,
      materialId: 2,
    },
    {
      id: 2,
      name: "Armoire Rustique en Chêne Massif",
      description:
        "Cette armoire rustique en chêne massif offre un espace de rangement généreux et un design intemporel.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_bibliotheque.avif?sp=r&st=2023-06-07T11:22:47Z&se=2023-10-04T19:22:47Z&sv=2022-11-02&sr=b&sig=uAaXGUX5bS4AHag%2BC0JQClfGYqM%2BHwK2egMbI9QlkTE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_bibliotheque.avif?sp=r&st=2023-06-07T11:22:47Z&se=2023-10-04T19:22:47Z&sv=2022-11-02&sr=b&sig=uAaXGUX5bS4AHag%2BC0JQClfGYqM%2BHwK2egMbI9QlkTE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_bibliotheque.avif?sp=r&st=2023-06-07T11:22:47Z&se=2023-10-04T19:22:47Z&sv=2022-11-02&sr=b&sig=uAaXGUX5bS4AHag%2BC0JQClfGYqM%2BHwK2egMbI9QlkTE%3D",
        },
      ]),
      price: 2800,
      promotion: 0,
      quantity: 100,
      categoryId: 3,
      materialId: 2,
    },
    {
      id: 3,
      name: "Armoire Luxueuse avec Vitrine",
      description:
        "Armoire luxueuse dotée d'une vitrine en verre, parfaite pour exposer vos objets précieux tout en les gardant en sécurité.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_dressing_luxueux.avif?sp=r&st=2023-06-07T11:23:51Z&se=2023-10-04T19:23:51Z&sv=2022-11-02&sr=b&sig=9XAk%2Bp%2FkgkqtcZUnrHl5o%2BNctKQuATw3CUoPf54Mcb4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_dressing_luxueux.avif?sp=r&st=2023-06-07T11:23:51Z&se=2023-10-04T19:23:51Z&sv=2022-11-02&sr=b&sig=9XAk%2Bp%2FkgkqtcZUnrHl5o%2BNctKQuATw3CUoPf54Mcb4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_dressing_luxueux.avif?sp=r&st=2023-06-07T11:23:51Z&se=2023-10-04T19:23:51Z&sv=2022-11-02&sr=b&sig=9XAk%2Bp%2FkgkqtcZUnrHl5o%2BNctKQuATw3CUoPf54Mcb4%3D",
        },
      ]),
      price: 5200,
      promotion: 0,
      quantity: 100,
      categoryId: 3,
      materialId: 7,
    },
    {
      id: 4,
      name: "Dressing Moderne en Noyer",
      description:
        "Un dressing moderne en noyer pour un rangement optimal de votre garde-robe. Comprend plusieurs compartiments pour une organisation facile.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_dressing_penderie.avif?sp=r&st=2023-06-07T11:24:26Z&se=2023-10-05T19:24:26Z&sv=2022-11-02&sr=b&sig=Lg5juANcNNzBJouV7ZuuGreiWr1suiWELcPaIqNgf1s%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_dressing_penderie.avif?sp=r&st=2023-06-07T11:24:26Z&se=2023-10-05T19:24:26Z&sv=2022-11-02&sr=b&sig=Lg5juANcNNzBJouV7ZuuGreiWr1suiWELcPaIqNgf1s%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_dressing_penderie.avif?sp=r&st=2023-06-07T11:24:26Z&se=2023-10-05T19:24:26Z&sv=2022-11-02&sr=b&sig=Lg5juANcNNzBJouV7ZuuGreiWr1suiWELcPaIqNgf1s%3D",
        },
      ]),
      price: 900,
      promotion: 100,
      quantity: 100,
      categoryId: 3,
      materialId: 2,
    },
    {
      id: 5,
      name: "Armoire Scandinave avec Miroir Intégré",
      description:
        "Une armoire scandinave épurée avec miroir intégré, conçue pour les espaces modernes et minimalistes.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_miroir_design.avif?sp=r&st=2023-06-07T11:25:02Z&se=2023-10-04T19:25:02Z&sv=2022-11-02&sr=b&sig=%2BHYJSEBKI%2BnJDCslaVFrxWXxE52fPXbXmN77miA5%2FHQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_miroir_design.avif?sp=r&st=2023-06-07T11:25:02Z&se=2023-10-04T19:25:02Z&sv=2022-11-02&sr=b&sig=%2BHYJSEBKI%2BnJDCslaVFrxWXxE52fPXbXmN77miA5%2FHQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_miroir_design.avif?sp=r&st=2023-06-07T11:25:02Z&se=2023-10-04T19:25:02Z&sv=2022-11-02&sr=b&sig=%2BHYJSEBKI%2BnJDCslaVFrxWXxE52fPXbXmN77miA5%2FHQ%3D",
        },
      ]),
      price: 2050,
      promotion: 160,
      quantity: 100,
      categoryId: 3,
      materialId: 2,
    },
    {
      id: 6,
      name: "Penderie Élégante avec Portes en Verre",
      description:
        "Penderie élégante avec portes en verre, permettant une vision claire de vos vêtements tout en les protégeant de la poussière.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_vitree_elegante.avif?sp=r&st=2023-06-07T11:25:40Z&se=2023-10-04T19:25:40Z&sv=2022-11-02&sr=b&sig=42zg3DQd225vD8dlbw%2BiUZO98b5kl%2FrVt%2Fc1c%2BLmBrI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_vitree_elegante.avif?sp=r&st=2023-06-07T11:25:40Z&se=2023-10-04T19:25:40Z&sv=2022-11-02&sr=b&sig=42zg3DQd225vD8dlbw%2BiUZO98b5kl%2FrVt%2Fc1c%2BLmBrI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_vitree_elegante.avif?sp=r&st=2023-06-07T11:25:40Z&se=2023-10-04T19:25:40Z&sv=2022-11-02&sr=b&sig=42zg3DQd225vD8dlbw%2BiUZO98b5kl%2FrVt%2Fc1c%2BLmBrI%3D",
        },
      ]),
      price: 600,
      promotion: 41,
      quantity: 100,
      categoryId: 3,
      materialId: 7,
    },
    {
      id: 7,
      name: "Buffet Elegance Chêne",
      description:
        "Le raffinement naturel du bois de chêne se mêle à une conception robuste pour offrir un espace de rangement de style rustique. Parfait pour ajouter une touche d'élégance à tout espace de vie.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_a_lancienne.avif?sp=r&st=2023-06-07T11:26:29Z&se=2023-10-04T19:26:29Z&sv=2022-11-02&sr=b&sig=N%2BwhgaA5Mcf3lFW9vIIP5k%2BrddmumWrrw2eYghkr16M%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_a_lancienne.avif?sp=r&st=2023-06-07T11:26:29Z&se=2023-10-04T19:26:29Z&sv=2022-11-02&sr=b&sig=N%2BwhgaA5Mcf3lFW9vIIP5k%2BrddmumWrrw2eYghkr16M%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_a_lancienne.avif?sp=r&st=2023-06-07T11:26:29Z&se=2023-10-04T19:26:29Z&sv=2022-11-02&sr=b&sig=N%2BwhgaA5Mcf3lFW9vIIP5k%2BrddmumWrrw2eYghkr16M%3D",
        },
      ]),
      price: 200,
      promotion: 0,
      quantity: 100,
      categoryId: 9,
      materialId: 2,
    },
    {
      id: 8,
      name: "Buffet Contemporain",
      description:
        "Le Buffet Contemporain allie design moderne et fonctionnalité, offrant un espace de rangement idéal tout en rehaussant le style de votre intérieur. La finition épurée s'harmonise avec tout type de décoration.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_asymetrique.avif?sp=r&st=2023-06-07T11:27:13Z&se=2023-10-04T19:27:13Z&sv=2022-11-02&sr=b&sig=b8SwISE0XRxJ%2BBp9WlGl3nGmYtECYW%2FbYV8%2FcXrX2Ko%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_asymetrique.avif?sp=r&st=2023-06-07T11:27:13Z&se=2023-10-04T19:27:13Z&sv=2022-11-02&sr=b&sig=b8SwISE0XRxJ%2BBp9WlGl3nGmYtECYW%2FbYV8%2FcXrX2Ko%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_asymetrique.avif?sp=r&st=2023-06-07T11:27:13Z&se=2023-10-04T19:27:13Z&sv=2022-11-02&sr=b&sig=b8SwISE0XRxJ%2BBp9WlGl3nGmYtECYW%2FbYV8%2FcXrX2Ko%3D",
        },
      ]),
      price: 320,
      promotion: 0,
      quantity: 100,
      categoryId: 9,
      materialId: 3,
    },
    {
      id: 9,
      name: "Buffet Panorama Vitré",
      description:
        "Avec ses portes vitrées, le Buffet Panorama Vitré permet de mettre en valeur vos objets préférés tout en les gardant à l'abri de la poussière. Il est idéal pour exposer vos plus belles pièces de vaisselle ou vos objets de collection.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_design.avif?sp=r&st=2023-06-07T11:27:47Z&se=2023-10-04T19:27:47Z&sv=2022-11-02&sr=b&sig=MsROsjC7Yqt16ms5aLsQivDpZqAUkKOwRIzGdRyPFr4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_design.avif?sp=r&st=2023-06-07T11:27:47Z&se=2023-10-04T19:27:47Z&sv=2022-11-02&sr=b&sig=MsROsjC7Yqt16ms5aLsQivDpZqAUkKOwRIzGdRyPFr4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_design.avif?sp=r&st=2023-06-07T11:27:47Z&se=2023-10-04T19:27:47Z&sv=2022-11-02&sr=b&sig=MsROsjC7Yqt16ms5aLsQivDpZqAUkKOwRIzGdRyPFr4%3D",
        },
      ]),
      price: 160,
      promotion: 22,
      quantity: 100,
      categoryId: 9,
      materialId: 7,
    },
    {
      id: 10,
      name: "Buffet Étagère Ouverte",
      description:
        "Le Buffet Étagère Ouverte offre un espace de rangement ouvert pour un accès facile à vos objets du quotidien. Sa conception simple et efficace le rend parfait pour n'importe quel espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_geometrique.avif?sp=r&st=2023-06-07T11:28:22Z&se=2023-10-04T19:28:22Z&sv=2022-11-02&sr=b&sig=F%2F3qPsvn%2Fr3EK4q1chyJGu89fpkCI2aLnoVpYKKWH9g%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_geometrique.avif?sp=r&st=2023-06-07T11:28:22Z&se=2023-10-04T19:28:22Z&sv=2022-11-02&sr=b&sig=F%2F3qPsvn%2Fr3EK4q1chyJGu89fpkCI2aLnoVpYKKWH9g%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_geometrique.avif?sp=r&st=2023-06-07T11:28:22Z&se=2023-10-04T19:28:22Z&sv=2022-11-02&sr=b&sig=F%2F3qPsvn%2Fr3EK4q1chyJGu89fpkCI2aLnoVpYKKWH9g%3D",
        },
      ]),
      price: 470,
      promotion: 0,
      quantity: 100,
      categoryId: 9,
      materialId: 4,
    },
    {
      id: 11,
      name: "Buffet Marbre Majestueux",
      description:
        "Faites une déclaration audacieuse avec le Buffet Marbre Majestueux. Avec sa finition en marbre, ce buffet ajoute une touche de luxe et de sophistication à n'importe quelle pièce.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_marbre.avif?sp=r&st=2023-06-07T11:29:00Z&se=2023-10-04T19:29:00Z&sv=2022-11-02&sr=b&sig=4xWtAt4KrgYNnENMQG%2FXXJTsyv%2Ba52g2xKU5ERqnVQo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_marbre.avif?sp=r&st=2023-06-07T11:29:00Z&se=2023-10-04T19:29:00Z&sv=2022-11-02&sr=b&sig=4xWtAt4KrgYNnENMQG%2FXXJTsyv%2Ba52g2xKU5ERqnVQo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_marbre.avif?sp=r&st=2023-06-07T11:29:00Z&se=2023-10-04T19:29:00Z&sv=2022-11-02&sr=b&sig=4xWtAt4KrgYNnENMQG%2FXXJTsyv%2Ba52g2xKU5ERqnVQo%3D",
        },
      ]),
      price: 1300,
      promotion: 100,
      quantity: 100,
      categoryId: 9,
      materialId: 2,
    },
    {
      id: 12,
      name: "Buffet Minimaliste",
      description:
        "Pour ceux qui préfèrent la simplicité, le Buffet Minimaliste offre un design épuré sans compromettre l'espace de rangement. Idéal pour un intérieur moderne et minimaliste.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_simple.avif?sp=r&st=2023-06-07T11:29:31Z&se=2023-10-04T19:29:31Z&sv=2022-11-02&sr=b&sig=UUeY73FB52Pr6Ugk2NUuCpQM1RjdZzV33uyXyYqTmSg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_simple.avif?sp=r&st=2023-06-07T11:29:31Z&se=2023-10-04T19:29:31Z&sv=2022-11-02&sr=b&sig=UUeY73FB52Pr6Ugk2NUuCpQM1RjdZzV33uyXyYqTmSg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_simple.avif?sp=r&st=2023-06-07T11:29:31Z&se=2023-10-04T19:29:31Z&sv=2022-11-02&sr=b&sig=UUeY73FB52Pr6Ugk2NUuCpQM1RjdZzV33uyXyYqTmSg%3D",
        },
      ]),
      price: 90,
      promotion: 0,
      quantity: 100,
      categoryId: 9,
      materialId: 2,
    },
    {
      id: 13,
      name: "Buffet Multimédia",
      description:
        "Le Buffet Multimédia est conçu pour être le centre de votre divertissement à domicile, avec suffisamment d'espace pour ranger tous vos appareils multimédia. Il combine style et fonctionnalité pour une utilisation quotidienne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_tv.avif?sp=r&st=2023-06-07T11:30:01Z&se=2023-10-04T19:30:01Z&sv=2022-11-02&sr=b&sig=rQqfQxdahdGoS5pewo7%2FhOBinuqHnqLha%2B7GAq2%2FePw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_tv.avif?sp=r&st=2023-06-07T11:30:01Z&se=2023-10-04T19:30:01Z&sv=2022-11-02&sr=b&sig=rQqfQxdahdGoS5pewo7%2FhOBinuqHnqLha%2B7GAq2%2FePw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_tv.avif?sp=r&st=2023-06-07T11:30:01Z&se=2023-10-04T19:30:01Z&sv=2022-11-02&sr=b&sig=rQqfQxdahdGoS5pewo7%2FhOBinuqHnqLha%2B7GAq2%2FePw%3D",
        },
      ]),
      price: 209,
      promotion: 0,
      quantity: 100,
      categoryId: 9,
      materialId: 3,
    },
    {
      id: 14,
      name: "Buffet Charme du Bois",
      description:
        "Le Buffet Charme du Bois allie le charme du bois naturel à une conception solide pour offrir un espace de rangement durable. Sa polyvalence en fait un choix parfait pour tout espace de vie.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_vitre.avif?sp=r&st=2023-06-07T11:30:32Z&se=2023-10-04T19:30:32Z&sv=2022-11-02&sr=b&sig=OOlVQG7W70CU1rLgfIf%2BV1xP%2BJTys3dmjqAl25l7gGA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_vitre.avif?sp=r&st=2023-06-07T11:30:32Z&se=2023-10-04T19:30:32Z&sv=2022-11-02&sr=b&sig=OOlVQG7W70CU1rLgfIf%2BV1xP%2BJTys3dmjqAl25l7gGA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/buffet/produits/buffet_vitre.avif?sp=r&st=2023-06-07T11:30:32Z&se=2023-10-04T19:30:32Z&sv=2022-11-02&sr=b&sig=OOlVQG7W70CU1rLgfIf%2BV1xP%2BJTys3dmjqAl25l7gGA%3D",
        },
      ]),
      price: 140,
      promotion: 15,
      quantity: 100,
      categoryId: 9,
      materialId: 2,
    },
    {
      id: 15,
      name: "Bureau de l'Artiste",
      description:
        "Conçu pour stimuler la créativité, le Bureau Créatif de l'Artiste offre un espace de travail optimal pour tous vos projets artistiques. Son design inspirant contribuera à faire jaillir vos idées les plus innovantes.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_dartiste.avif?sp=r&st=2023-06-07T11:33:15Z&se=2023-10-04T19:33:15Z&sv=2022-11-02&sr=b&sig=mw%2ByFhrtZbQf4U7NNnyd8kAauMK7%2BmgtKJCC4ZXPs%2FQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_dartiste.avif?sp=r&st=2023-06-07T11:33:15Z&se=2023-10-04T19:33:15Z&sv=2022-11-02&sr=b&sig=mw%2ByFhrtZbQf4U7NNnyd8kAauMK7%2BmgtKJCC4ZXPs%2FQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_dartiste.avif?sp=r&st=2023-06-07T11:33:15Z&se=2023-10-04T19:33:15Z&sv=2022-11-02&sr=b&sig=mw%2ByFhrtZbQf4U7NNnyd8kAauMK7%2BmgtKJCC4ZXPs%2FQ%3D",
        },
      ]),
      price: 400,
      promotion: 0,
      quantity: 100,
      categoryId: 4,
      materialId: 2,
    },
    {
      id: 16,
      name: "Bureau Angle Aiguisé",
      description:
        "Le Bureau Angle Aiguisé se distingue par ses lignes géométriques nettes qui ajoutent une touche moderne à n'importe quel espace de travail. Ce design audacieux est complété par une fonctionnalité sans compromis.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_geometrique.avif?sp=r&st=2023-06-07T11:33:50Z&se=2023-10-04T19:33:50Z&sv=2022-11-02&sr=b&sig=yECqMFooZUBj6UsUgmjH9NLZo%2FhGzVAF%2BsiodqJ7NhU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_geometrique.avif?sp=r&st=2023-06-07T11:33:50Z&se=2023-10-04T19:33:50Z&sv=2022-11-02&sr=b&sig=yECqMFooZUBj6UsUgmjH9NLZo%2FhGzVAF%2BsiodqJ7NhU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_geometrique.avif?sp=r&st=2023-06-07T11:33:50Z&se=2023-10-04T19:33:50Z&sv=2022-11-02&sr=b&sig=yECqMFooZUBj6UsUgmjH9NLZo%2FhGzVAF%2BsiodqJ7NhU%3D",
        },
      ]),
      price: 230,
      promotion: 0,
      quantity: 100,
      categoryId: 4,
      materialId: 5,
    },
    {
      id: 17,
      name: "Bureau Épuré",
      description:
        "Avec son design minimaliste et son allure épurée, le Bureau Épure offre un espace de travail organisé et dégagé, favorisant la concentration et la productivité. L'essence de la simplicité se reflète dans chaque détail.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_minimalist.avif?sp=r&st=2023-06-07T11:34:18Z&se=2023-10-04T19:34:18Z&sv=2022-11-02&sr=b&sig=R4cGw0i5m3nBhNkbP%2Fomn%2FrKeNSj7DCs7%2FVyTKnifOI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_minimalist.avif?sp=r&st=2023-06-07T11:34:18Z&se=2023-10-04T19:34:18Z&sv=2022-11-02&sr=b&sig=R4cGw0i5m3nBhNkbP%2Fomn%2FrKeNSj7DCs7%2FVyTKnifOI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_minimalist.avif?sp=r&st=2023-06-07T11:34:18Z&se=2023-10-04T19:34:18Z&sv=2022-11-02&sr=b&sig=R4cGw0i5m3nBhNkbP%2Fomn%2FrKeNSj7DCs7%2FVyTKnifOI%3D",
        },
      ]),
      price: 100,
      promotion: 0,
      quantity: 100,
      categoryId: 4,
      materialId: 2,
    },
    {
      id: 18,
      name: "Bureau Blanc Multifonction",
      description:
        "Le Bureau Blanc Multifonction offre non seulement un espace de travail généreux, mais aussi une solution de rangement intégrée. La combinaison de son design élégant et de sa fonctionnalité en fait un choix parfait pour tout espace de travail moderne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_rangement.avif?sp=r&st=2023-06-07T11:34:59Z&se=2023-10-04T19:34:59Z&sv=2022-11-02&sr=b&sig=4xkKTuhIGWeZjtFfwkyvc5v%2Fr4lpG5%2FyRah11KjgwXc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_rangement.avif?sp=r&st=2023-06-07T11:34:59Z&se=2023-10-04T19:34:59Z&sv=2022-11-02&sr=b&sig=4xkKTuhIGWeZjtFfwkyvc5v%2Fr4lpG5%2FyRah11KjgwXc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_rangement.avif?sp=r&st=2023-06-07T11:34:59Z&se=2023-10-04T19:34:59Z&sv=2022-11-02&sr=b&sig=4xkKTuhIGWeZjtFfwkyvc5v%2Fr4lpG5%2FyRah11KjgwXc%3D",
        },
      ]),
      price: 190,
      promotion: 20,
      quantity: 100,
      categoryId: 4,
      materialId: 2,
    },
    {
      id: 19,
      name: "Bureau Bois Nature",
      description:
        "Le Bureau Bois Nature allie le charme du bois naturel à une conception simple pour offrir un espace de travail confortable et accueillant. L'authenticité du bois donne une ambiance chaleureuse à votre espace de travail.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_simple.avif?sp=r&st=2023-06-07T11:35:30Z&se=2023-10-04T19:35:30Z&sv=2022-11-02&sr=b&sig=qf67mCoFlc3NFLvSLeGonLuIW%2Buf8IItXvnb8K9VrjE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_simple.avif?sp=r&st=2023-06-07T11:35:30Z&se=2023-10-04T19:35:30Z&sv=2022-11-02&sr=b&sig=qf67mCoFlc3NFLvSLeGonLuIW%2Buf8IItXvnb8K9VrjE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/bureau/produits/bureau_simple.avif?sp=r&st=2023-06-07T11:35:30Z&se=2023-10-04T19:35:30Z&sv=2022-11-02&sr=b&sig=qf67mCoFlc3NFLvSLeGonLuIW%2Buf8IItXvnb8K9VrjE%3D",
        },
      ]),
      price: 200,
      promotion: 0,
      quantity: 100,
      categoryId: 4,
      materialId: 5,
    },
    {
      id: 20,
      name: "Chevet Charme Rustique",
      description:
        "Le Chevet Charme Rustique, avec sa finition en bois marron, apporte une touche de chaleur et de confort à votre chambre. Son design robuste garantit un espace de rangement durable à portée de main.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_ancien.avif?sp=r&st=2023-06-07T11:36:12Z&se=2023-10-11T19:36:12Z&sv=2022-11-02&sr=b&sig=opZDCEtJmgb2Bps1tNiLzlRn%2F29bDtxvcQyUzRspaSw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_ancien.avif?sp=r&st=2023-06-07T11:36:12Z&se=2023-10-11T19:36:12Z&sv=2022-11-02&sr=b&sig=opZDCEtJmgb2Bps1tNiLzlRn%2F29bDtxvcQyUzRspaSw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_ancien.avif?sp=r&st=2023-06-07T11:36:12Z&se=2023-10-11T19:36:12Z&sv=2022-11-02&sr=b&sig=opZDCEtJmgb2Bps1tNiLzlRn%2F29bDtxvcQyUzRspaSw%3D",
        },
      ]),
      price: 50,
      promotion: 0,
      quantity: 100,
      categoryId: 8,
      materialId: 2,
    },
    {
      id: 21,
      name: "Chevet Blanc Elégant",
      description:
        "Le Chevet Blanc Elégant est un ajout raffiné à toute chambre. Avec son tiroir intégré, il offre un rangement discret tout en complétant parfaitement tout style de décoration intérieure.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_bois.avif?sp=r&st=2023-06-07T11:36:38Z&se=2023-10-04T19:36:38Z&sv=2022-11-02&sr=b&sig=%2FVBu0MpYWvnXMmM%2FjjAahK4w9Xw8auqpmBzu4DUZmHM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_bois.avif?sp=r&st=2023-06-07T11:36:38Z&se=2023-10-04T19:36:38Z&sv=2022-11-02&sr=b&sig=%2FVBu0MpYWvnXMmM%2FjjAahK4w9Xw8auqpmBzu4DUZmHM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_bois.avif?sp=r&st=2023-06-07T11:36:38Z&se=2023-10-04T19:36:38Z&sv=2022-11-02&sr=b&sig=%2FVBu0MpYWvnXMmM%2FjjAahK4w9Xw8auqpmBzu4DUZmHM%3D",
        },
      ]),
      price: 75,
      promotion: 0,
      quantity: 100,
      categoryId: 8,
      materialId: 2,
    },
    {
      id: 22,
      name: "Chevet Gris Fonctionnel",
      description:
        "Le Chevet Gris Fonctionnel combine style et utilité avec son design gris moderne et son espace de rangement généreux. C'est le compagnon de lit idéal pour garder tous vos essentiels à portée de main.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_large.avif?sp=r&st=2023-06-07T11:37:04Z&se=2023-10-04T19:37:04Z&sv=2022-11-02&sr=b&sig=cZHkXQWH0S%2FO6QP%2F6keKcmtnYyHjciUqb8gIJvlT70I%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_large.avif?sp=r&st=2023-06-07T11:37:04Z&se=2023-10-04T19:37:04Z&sv=2022-11-02&sr=b&sig=cZHkXQWH0S%2FO6QP%2F6keKcmtnYyHjciUqb8gIJvlT70I%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_large.avif?sp=r&st=2023-06-07T11:37:04Z&se=2023-10-04T19:37:04Z&sv=2022-11-02&sr=b&sig=cZHkXQWH0S%2FO6QP%2F6keKcmtnYyHjciUqb8gIJvlT70I%3D",
        },
      ]),
      price: 123,
      promotion: 10,
      quantity: 100,
      categoryId: 8,
      materialId: 2,
    },
    {
      id: 23,
      name: "Chevet Luxe Marbre",
      description:
        "Élevez le niveau de sophistication de votre chambre avec le Chevet Luxe Marbre. Son design luxueux en marbre offre une touche d'élégance et de style inégalée, tout en servant d'espace de rangement pratique.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_lune.avif?sp=r&st=2023-06-07T11:37:34Z&se=2023-10-04T19:37:34Z&sv=2022-11-02&sr=b&sig=WiFmHY0xulUwOY5kddwgMS2REd7qiVDbTjphSDiqBTg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_lune.avif?sp=r&st=2023-06-07T11:37:34Z&se=2023-10-04T19:37:34Z&sv=2022-11-02&sr=b&sig=WiFmHY0xulUwOY5kddwgMS2REd7qiVDbTjphSDiqBTg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chevet/produits/table_chevet_lune.avif?sp=r&st=2023-06-07T11:37:34Z&se=2023-10-04T19:37:34Z&sv=2022-11-02&sr=b&sig=WiFmHY0xulUwOY5kddwgMS2REd7qiVDbTjphSDiqBTg%3D",
        },
      ]),
      price: 400,
      promotion: 30,
      quantity: 100,
      categoryId: 8,
      materialId: 3,
    },
    {
      id: 24,
      name: "Abajour Élégance du Salon",
      description:
        "L'Abajour Élégance du Salon donne une lumière douce et agréable, idéale pour créer une atmosphère chaleureuse et accueillante dans votre salon. Son design classique s'intègre harmonieusement dans toute décoration intérieure.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_ancien.avif?sp=r&st=2023-06-07T11:38:42Z&se=2023-10-04T19:38:42Z&sv=2022-11-02&sr=b&sig=5H4G0BiuMtNLpWTTtwBYAPvPcUtQtDLn6MqBHNbhwcY%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_ancien.avif?sp=r&st=2023-06-07T11:38:42Z&se=2023-10-04T19:38:42Z&sv=2022-11-02&sr=b&sig=5H4G0BiuMtNLpWTTtwBYAPvPcUtQtDLn6MqBHNbhwcY%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_ancien.avif?sp=r&st=2023-06-07T11:38:42Z&se=2023-10-04T19:38:42Z&sv=2022-11-02&sr=b&sig=5H4G0BiuMtNLpWTTtwBYAPvPcUtQtDLn6MqBHNbhwcY%3D",
        },
      ]),
      price: 35,
      promotion: 0,
      quantity: 100,
      categoryId: 6,
      materialId: 6,
    },
    {
      id: 25,
      name: "Lampe Sphère Contemporaine",
      description:
        "La Lampe Sphère Contemporaine avec son design moderne et élégant est plus qu'une source de lumière, c'est un véritable élément de décoration qui donne du caractère à votre intérieur.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_boule.avif?sp=r&st=2023-06-07T11:39:11Z&se=2023-10-04T19:39:11Z&sv=2022-11-02&sr=b&sig=W%2FUxqtOqgPqwt%2Fo4cxK2o%2BfuQiT8aCRSr%2BJS94Cnqj0%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_boule.avif?sp=r&st=2023-06-07T11:39:11Z&se=2023-10-04T19:39:11Z&sv=2022-11-02&sr=b&sig=W%2FUxqtOqgPqwt%2Fo4cxK2o%2BfuQiT8aCRSr%2BJS94Cnqj0%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_boule.avif?sp=r&st=2023-06-07T11:39:11Z&se=2023-10-04T19:39:11Z&sv=2022-11-02&sr=b&sig=W%2FUxqtOqgPqwt%2Fo4cxK2o%2BfuQiT8aCRSr%2BJS94Cnqj0%3D",
        },
      ]),
      price: 20,
      promotion: 0,
      quantity: 100,
      categoryId: 6,
      materialId: 6,
    },
    {
      id: 26,
      name: "Lampe Bulles Fantaisie",
      description:
        "La Lampe Bulles Fantaisie est une pièce unique qui ajoute un charme ludique à n'importe quelle pièce. Son design bulleux crée un effet de lumière fascinant qui illuminera votre espace de manière spectaculaire.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_bulles.avif?sp=r&st=2023-06-07T11:39:40Z&se=2023-10-05T19:39:40Z&sv=2022-11-02&sr=b&sig=M2s6y1jo%2BRt3yfhcDr1WRDThjEpa9v8CNUAp2xJMN8g%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_bulles.avif?sp=r&st=2023-06-07T11:39:40Z&se=2023-10-05T19:39:40Z&sv=2022-11-02&sr=b&sig=M2s6y1jo%2BRt3yfhcDr1WRDThjEpa9v8CNUAp2xJMN8g%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_bulles.avif?sp=r&st=2023-06-07T11:39:40Z&se=2023-10-05T19:39:40Z&sv=2022-11-02&sr=b&sig=M2s6y1jo%2BRt3yfhcDr1WRDThjEpa9v8CNUAp2xJMN8g%3D",
        },
      ]),
      price: 100,
      promotion: 10,
      quantity: 100,
      categoryId: 6,
      materialId: 3,
    },
    {
      id: 27,
      name: "Lampe de Bureau Focalisée",
      description:
        "La Lampe de Bureau Focalisée est conçue pour éclairer votre espace de travail avec une lumière concentrée, augmentant ainsi votre concentration et votre productivité. Son design simple et épuré s'adapte à tout environnement de bureau.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_bureau.avif?sp=r&st=2023-06-07T11:40:04Z&se=2023-10-05T19:40:04Z&sv=2022-11-02&sr=b&sig=TeX%2FLp4r1vJVkYvwisUAqV8T6RZXBCamcVcwJUD8TLI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_bureau.avif?sp=r&st=2023-06-07T11:40:04Z&se=2023-10-05T19:40:04Z&sv=2022-11-02&sr=b&sig=TeX%2FLp4r1vJVkYvwisUAqV8T6RZXBCamcVcwJUD8TLI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_bureau.avif?sp=r&st=2023-06-07T11:40:04Z&se=2023-10-05T19:40:04Z&sv=2022-11-02&sr=b&sig=TeX%2FLp4r1vJVkYvwisUAqV8T6RZXBCamcVcwJUD8TLI%3D",
        },
      ]),
      price: 40,
      promotion: 5,
      quantity: 100,
      categoryId: 6,
      materialId: 2,
    },
    {
      id: 28,
      name: "Lampe Éclat Moderne",
      description:
        "La Lampe Éclat Moderne combine une esthétique contemporaine avec une fonctionnalité efficace. Son design moderne et sa lumière brillante en font une pièce maîtresse dans n'importe quel espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_design.avif?sp=r&st=2023-06-07T11:41:01Z&se=2023-10-04T19:41:01Z&sv=2022-11-02&sr=b&sig=rOewtKL1h9OeopBGQj9%2BdMesJ%2B%2BD5YsFzLbHJfXJ0QQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_design.avif?sp=r&st=2023-06-07T11:41:01Z&se=2023-10-04T19:41:01Z&sv=2022-11-02&sr=b&sig=rOewtKL1h9OeopBGQj9%2BdMesJ%2B%2BD5YsFzLbHJfXJ0QQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_design.avif?sp=r&st=2023-06-07T11:41:01Z&se=2023-10-04T19:41:01Z&sv=2022-11-02&sr=b&sig=rOewtKL1h9OeopBGQj9%2BdMesJ%2B%2BD5YsFzLbHJfXJ0QQ%3D",
        },
      ]),
      price: 100,
      promotion: 0,
      quantity: 100,
      categoryId: 6,
      materialId: 7,
    },
    {
      id: 29,
      name: "Lampe Formes Géométriques",
      description:
        "Avec son design audacieux, la Lampe Formes Géométriques crée un éclairage saisissant qui sert à la fois d'élément de décoration et de source de lumière. Elle est parfaite pour ceux qui apprécient un design unique et audacieux.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_geometrique.avif?sp=r&st=2023-06-07T11:41:25Z&se=2023-10-04T19:41:25Z&sv=2022-11-02&sr=b&sig=02dT13m9U2tLYMiGOOAV%2B06SpujsgbFuP7IHt1ylOBI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_geometrique.avif?sp=r&st=2023-06-07T11:41:25Z&se=2023-10-04T19:41:25Z&sv=2022-11-02&sr=b&sig=02dT13m9U2tLYMiGOOAV%2B06SpujsgbFuP7IHt1ylOBI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_geometrique.avif?sp=r&st=2023-06-07T11:41:25Z&se=2023-10-04T19:41:25Z&sv=2022-11-02&sr=b&sig=02dT13m9U2tLYMiGOOAV%2B06SpujsgbFuP7IHt1ylOBI%3D",
        },
      ]),
      price: 95,
      promotion: 5,
      quantity: 100,
      categoryId: 6,
      materialId: 4,
    },
    {
      id: 30,
      name: "Lampe Style Industriel",
      description:
        "La Lampe Style Industriel est une façon chic de faire entrer le look industriel dans votre maison. Elle combine des matériaux robustes et un design minimaliste pour créer une pièce d'éclairage qui fait une déclaration audacieuse.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_industrielle.avif?sp=r&st=2023-06-07T11:41:50Z&se=2023-11-02T20:41:50Z&sv=2022-11-02&sr=b&sig=aWU97DTBaXb36tv2fdqmkHMwyHdh2X%2Ba6lRNXMAagZM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_industrielle.avif?sp=r&st=2023-06-07T11:41:50Z&se=2023-11-02T20:41:50Z&sv=2022-11-02&sr=b&sig=aWU97DTBaXb36tv2fdqmkHMwyHdh2X%2Ba6lRNXMAagZM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_industrielle.avif?sp=r&st=2023-06-07T11:41:50Z&se=2023-11-02T20:41:50Z&sv=2022-11-02&sr=b&sig=aWU97DTBaXb36tv2fdqmkHMwyHdh2X%2Ba6lRNXMAagZM%3D",
        },
      ]),
      price: 20,
      promotion: 0,
      quantity: 100,
      categoryId: 6,
      materialId: 4,
    },
    {
      id: 31,
      name: "Lampe Métal Rose Charmante",
      description:
        "La Lampe Métal Rose Charmante est l'ajout parfait à tout espace qui a besoin d'une touche de douceur. Sa teinte rose et son design en métal offrent une combinaison charmante de douceur et de robustesse.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_metal_rose.avif?sp=r&st=2023-06-07T11:42:14Z&se=2023-10-05T19:42:14Z&sv=2022-11-02&sr=b&sig=HIFioP32TlHCVTDTpYW8YtfhYwmKBhSp7d1OVlMEhBc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_metal_rose.avif?sp=r&st=2023-06-07T11:42:14Z&se=2023-10-05T19:42:14Z&sv=2022-11-02&sr=b&sig=HIFioP32TlHCVTDTpYW8YtfhYwmKBhSp7d1OVlMEhBc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_metal_rose.avif?sp=r&st=2023-06-07T11:42:14Z&se=2023-10-05T19:42:14Z&sv=2022-11-02&sr=b&sig=HIFioP32TlHCVTDTpYW8YtfhYwmKBhSp7d1OVlMEhBc%3D",
        },
      ]),
      price: 30,
      promotion: 0,
      quantity: 100,
      categoryId: 6,
      materialId: 5,
    },
    {
      id: 32,
      name: "Lampe Néon Futuriste",
      description:
        "La Lampe Néon Futuriste donne une touche de modernité à n'importe quel espace avec son éclairage vif et son design contemporain. C'est une déclaration audacieuse qui ajoutera un éclat futuriste à votre décor.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_neon.avif?sp=r&st=2023-06-07T11:42:44Z&se=2023-11-02T20:42:44Z&sv=2022-11-02&sr=b&sig=3GWqUuJOmLqSNFGMErKuTghQOmHhWItgpmB1rSKWNE8%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_neon.avif?sp=r&st=2023-06-07T11:42:44Z&se=2023-11-02T20:42:44Z&sv=2022-11-02&sr=b&sig=3GWqUuJOmLqSNFGMErKuTghQOmHhWItgpmB1rSKWNE8%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lampe/produits/lampe_neon.avif?sp=r&st=2023-06-07T11:42:44Z&se=2023-11-02T20:42:44Z&sv=2022-11-02&sr=b&sig=3GWqUuJOmLqSNFGMErKuTghQOmHhWItgpmB1rSKWNE8%3D",
        },
      ]),
      price: 60,
      promotion: 3,
      quantity: 100,
      categoryId: 6,
      materialId: 7,
    },
    {
      id: 33,
      name: "Lit Cocooning Enfant 1 Place",
      description:
        "Le Lit Cocooning Enfant 1 Place est parfait pour les chambres d'enfant. Son design compact et ses barrières latérales en font un choix sûr et confortable pour votre petit. Son style simple s'harmonise avec tous types de décoration.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/alen-rojnic-T1Yvmf4oleQ-unsplash.jpg?sp=r&st=2023-06-07T11:43:12Z&se=2023-10-05T19:43:12Z&sv=2022-11-02&sr=b&sig=UvHidfxFDt2cckEKZyvaE90rM6aQjrTGShWXy8rHGlI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/alen-rojnic-T1Yvmf4oleQ-unsplash.jpg?sp=r&st=2023-06-07T11:43:12Z&se=2023-10-05T19:43:12Z&sv=2022-11-02&sr=b&sig=UvHidfxFDt2cckEKZyvaE90rM6aQjrTGShWXy8rHGlI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/alen-rojnic-T1Yvmf4oleQ-unsplash.jpg?sp=r&st=2023-06-07T11:43:12Z&se=2023-10-05T19:43:12Z&sv=2022-11-02&sr=b&sig=UvHidfxFDt2cckEKZyvaE90rM6aQjrTGShWXy8rHGlI%3D",
        },
      ]),
      price: 200,
      promotion: 15,
      quantity: 100,
      categoryId: 5,
      materialId: 2,
    },
    {
      id: 34,
      name: "Lit Double en Métal Noir",
      description:
        "Le Lit Double Élégance en Métal Noir offre une touche d'élégance et de modernité à votre chambre. Son cadre en métal robuste assure une longévité exceptionnelle, tandis que son fini noir apporte un style intemporel.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/chuttersnap-ftG8WcHwg7o-unsplash.jpg?sp=r&st=2023-06-07T11:43:34Z&se=2023-11-01T20:43:34Z&sv=2022-11-02&sr=b&sig=%2ByIcT%2BjJoz5VNSpPySuOtlZaq5rZ5B5eXjPTHP%2B%2FonU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/chuttersnap-ftG8WcHwg7o-unsplash.jpg?sp=r&st=2023-06-07T11:43:34Z&se=2023-11-01T20:43:34Z&sv=2022-11-02&sr=b&sig=%2ByIcT%2BjJoz5VNSpPySuOtlZaq5rZ5B5eXjPTHP%2B%2FonU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/chuttersnap-ftG8WcHwg7o-unsplash.jpg?sp=r&st=2023-06-07T11:43:34Z&se=2023-11-01T20:43:34Z&sv=2022-11-02&sr=b&sig=%2ByIcT%2BjJoz5VNSpPySuOtlZaq5rZ5B5eXjPTHP%2B%2FonU%3D",
        },
      ]),
      price: 430,
      promotion: 0,
      quantity: 100,
      categoryId: 5,
      materialId: 3,
    },
    {
      id: 35,
      name: "Lit Spacieux en Bois",
      description:
        "Le Lit Spacieux Nature en Bois est idéal pour ceux qui apprécient le confort et le style naturel. Le cadre en bois robuste offre une base solide, tandis que la grande taille offre beaucoup d'espace pour une nuit de sommeil reposante.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/laura-adai-J60bPeDiR8A-unsplash.jpg?sp=r&st=2023-06-07T11:43:58Z&se=2023-10-13T19:43:58Z&sv=2022-11-02&sr=b&sig=t%2FquhnCJ6TbUL8E4%2FGenRwsmLtnxuTyZoW1k2Sl2IlA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/laura-adai-J60bPeDiR8A-unsplash.jpg?sp=r&st=2023-06-07T11:43:58Z&se=2023-10-13T19:43:58Z&sv=2022-11-02&sr=b&sig=t%2FquhnCJ6TbUL8E4%2FGenRwsmLtnxuTyZoW1k2Sl2IlA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/laura-adai-J60bPeDiR8A-unsplash.jpg?sp=r&st=2023-06-07T11:43:58Z&se=2023-10-13T19:43:58Z&sv=2022-11-02&sr=b&sig=t%2FquhnCJ6TbUL8E4%2FGenRwsmLtnxuTyZoW1k2Sl2IlA%3D",
        },
      ]),
      price: 710,
      promotion: 20,
      quantity: 100,
      categoryId: 5,
      materialId: 2,
    },
    {
      id: 36,
      name: "Lit Luxueux",
      description:
        "Le Lit Luxueux Royale est une pièce maîtresse dans toute chambre. Son design luxueux, avec des détails raffinés et une finition de qualité supérieure, offre un lieu de repos qui combine confort et style de manière exceptionnelle.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/laura-adai-j67CwQzRLPg-unsplash.jpg?sp=r&st=2023-06-07T11:44:23Z&se=2023-10-12T19:44:23Z&sv=2022-11-02&sr=b&sig=oTp1gytmLs3lPamtHmJfS5eePFoq%2BgZoCIhjl%2BKfN7o%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/laura-adai-j67CwQzRLPg-unsplash.jpg?sp=r&st=2023-06-07T11:44:23Z&se=2023-10-12T19:44:23Z&sv=2022-11-02&sr=b&sig=oTp1gytmLs3lPamtHmJfS5eePFoq%2BgZoCIhjl%2BKfN7o%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/lit/laura-adai-j67CwQzRLPg-unsplash.jpg?sp=r&st=2023-06-07T11:44:23Z&se=2023-10-12T19:44:23Z&sv=2022-11-02&sr=b&sig=oTp1gytmLs3lPamtHmJfS5eePFoq%2BgZoCIhjl%2BKfN7o%3D",
        },
      ]),
      price: 900,
      promotion: 0,
      quantity: 100,
      categoryId: 5,
      materialId: 2,
    },
    {
      id: 37,
      name: "Table Basse Épurée Moderne",
      description:
        "La Table Basse Épurée Moderne offre une touche contemporaine à votre salon. Son design simple et élégant complète parfaitement tous types de décoration intérieure.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_bois.avif?sp=r&st=2023-06-07T11:45:07Z&se=2023-11-09T20:45:07Z&sv=2022-11-02&sr=b&sig=x4DPc%2F8%2F7WTrwlA9g47HRmBbaVOlMbWmmF25RDvZVOg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_bois.avif?sp=r&st=2023-06-07T11:45:07Z&se=2023-11-09T20:45:07Z&sv=2022-11-02&sr=b&sig=x4DPc%2F8%2F7WTrwlA9g47HRmBbaVOlMbWmmF25RDvZVOg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_bois.avif?sp=r&st=2023-06-07T11:45:07Z&se=2023-11-09T20:45:07Z&sv=2022-11-02&sr=b&sig=x4DPc%2F8%2F7WTrwlA9g47HRmBbaVOlMbWmmF25RDvZVOg%3D",
        },
      ]),
      price: 400,
      promotion: 20,
      quantity: 100,
      categoryId: 1,
      materialId: 2,
    },
    {
      id: 38,
      name: "Table Basse Douceur Coussin",
      description:
        "La Table Basse Douceur Coussin combine confort et fonctionnalité, avec une surface rembourrée pour plus de confort lors de l'utilisation du canapé. Parfaite pour les espaces détente.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_coussin.avif?sp=r&st=2023-06-07T11:45:30Z&se=2023-10-04T19:45:30Z&sv=2022-11-02&sr=b&sig=zo3fwsKAVr%2FYsYHfUrGQwmS8fikmDbCPeD4LJydlxXQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_coussin.avif?sp=r&st=2023-06-07T11:45:30Z&se=2023-10-04T19:45:30Z&sv=2022-11-02&sr=b&sig=zo3fwsKAVr%2FYsYHfUrGQwmS8fikmDbCPeD4LJydlxXQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_coussin.avif?sp=r&st=2023-06-07T11:45:30Z&se=2023-10-04T19:45:30Z&sv=2022-11-02&sr=b&sig=zo3fwsKAVr%2FYsYHfUrGQwmS8fikmDbCPeD4LJydlxXQ%3D",
        },
      ]),
      price: 60,
      promotion: 0,
      quantity: 100,
      categoryId: 1,
      materialId: 2,
    },
    {
      id: 39,
      name: "Table Basse Concept Design",
      description:
        "La Table Basse Concept Design est une pièce maîtresse qui attire l'attention dans tout salon. Son design unique offre un espace de stockage et une fonctionnalité sans compromis sur le style.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_design.avif?sp=r&st=2023-06-07T11:45:56Z&se=2023-10-04T19:45:56Z&sv=2022-11-02&sr=b&sig=BaBb4OAP15xcQ1w8vyIHSdRG8bxhh64WtFi%2B9i3KABs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_design.avif?sp=r&st=2023-06-07T11:45:56Z&se=2023-10-04T19:45:56Z&sv=2022-11-02&sr=b&sig=BaBb4OAP15xcQ1w8vyIHSdRG8bxhh64WtFi%2B9i3KABs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_design.avif?sp=r&st=2023-06-07T11:45:56Z&se=2023-10-04T19:45:56Z&sv=2022-11-02&sr=b&sig=BaBb4OAP15xcQ1w8vyIHSdRG8bxhh64WtFi%2B9i3KABs%3D",
        },
      ]),
      price: 50,
      promotion: 0,
      quantity: 100,
      categoryId: 1,
      materialId: 2,
    },
    {
      id: 40,
      name: "Table Basse Classique Élégante",
      description:
        "La Table Basse Classique Élégante apporte une touche de charme vintage à votre salon. Son design raffiné et sa finition antique ajoutent une touche d'élégance à tout espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_elegant.avif?sp=r&st=2023-06-07T11:46:29Z&se=2023-10-11T19:46:29Z&sv=2022-11-02&sr=b&sig=fjkceh%2Bau6SAhE1GMxdIfkmHDIIWnI63gYDaWXBMl8w%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_elegant.avif?sp=r&st=2023-06-07T11:46:29Z&se=2023-10-11T19:46:29Z&sv=2022-11-02&sr=b&sig=fjkceh%2Bau6SAhE1GMxdIfkmHDIIWnI63gYDaWXBMl8w%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_elegant.avif?sp=r&st=2023-06-07T11:46:29Z&se=2023-10-11T19:46:29Z&sv=2022-11-02&sr=b&sig=fjkceh%2Bau6SAhE1GMxdIfkmHDIIWnI63gYDaWXBMl8w%3D",
        },
      ]),
      price: 300,
      promotion: 20,
      quantity: 100,
      categoryId: 1,
      materialId: 2,
    },
    {
      id: 41,
      name: "Table Basse Géométrique Audacieuse",
      description:
        "La Table Basse Géométrique Audacieuse est une pièce qui attire l'attention avec son design contemporain. Les formes géométriques audacieuses ajoutent un élément visuel attrayant à votre salon.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_geometrique.avif?sp=r&st=2023-06-07T11:46:57Z&se=2023-10-06T19:46:57Z&sv=2022-11-02&sr=b&sig=WsTDOsRcfkHxnu6y0I1eLMz9bglfCWuH5dszCCRTuCg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_geometrique.avif?sp=r&st=2023-06-07T11:46:57Z&se=2023-10-06T19:46:57Z&sv=2022-11-02&sr=b&sig=WsTDOsRcfkHxnu6y0I1eLMz9bglfCWuH5dszCCRTuCg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_geometrique.avif?sp=r&st=2023-06-07T11:46:57Z&se=2023-10-06T19:46:57Z&sv=2022-11-02&sr=b&sig=WsTDOsRcfkHxnu6y0I1eLMz9bglfCWuH5dszCCRTuCg%3D",
        },
      ]),
      price: 100,
      promotion: 0,
      quantity: 100,
      categoryId: 1,
      materialId: 3,
    },
    {
      id: 42,
      name: "Table Basse Malle Vintage",
      description:
        "La Table Basse Malle Vintage apporte une touche d'originalité à votre salon. Sa conception unique en forme de malle offre une grande capacité de stockage tout en servant de point de mire.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_malle.avif?sp=r&st=2023-06-07T11:47:22Z&se=2023-12-06T20:47:22Z&sv=2022-11-02&sr=b&sig=hGH86ROy8wgM5BaOv9PpOgoBq5e%2BvCE3St%2FPLKHTV5Q%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_malle.avif?sp=r&st=2023-06-07T11:47:22Z&se=2023-12-06T20:47:22Z&sv=2022-11-02&sr=b&sig=hGH86ROy8wgM5BaOv9PpOgoBq5e%2BvCE3St%2FPLKHTV5Q%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_malle.avif?sp=r&st=2023-06-07T11:47:22Z&se=2023-12-06T20:47:22Z&sv=2022-11-02&sr=b&sig=hGH86ROy8wgM5BaOv9PpOgoBq5e%2BvCE3St%2FPLKHTV5Q%3D",
        },
      ]),
      price: 115,
      promotion: 5,
      quantity: 100,
      categoryId: 1,
      materialId: 2,
    },
    {
      id: 43,
      name: "Table Basse Métal Urbain",
      description:
        "La Table Basse Métal Urbain offre un style industriel à votre salon. Son cadre en métal robuste et sa finition polie ajoutent une touche de modernité à tout espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_metal.avif?sp=r&st=2023-06-07T11:47:50Z&se=2023-11-01T20:47:50Z&sv=2022-11-02&sr=b&sig=RBHh959cuuWid2rlpkNZpK7cKx%2FEeLdL%2BxwViRJG9ZU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_metal.avif?sp=r&st=2023-06-07T11:47:50Z&se=2023-11-01T20:47:50Z&sv=2022-11-02&sr=b&sig=RBHh959cuuWid2rlpkNZpK7cKx%2FEeLdL%2BxwViRJG9ZU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_metal.avif?sp=r&st=2023-06-07T11:47:50Z&se=2023-11-01T20:47:50Z&sv=2022-11-02&sr=b&sig=RBHh959cuuWid2rlpkNZpK7cKx%2FEeLdL%2BxwViRJG9ZU%3D",
        },
      ]),
      price: 25,
      promotion: 0,
      quantity: 100,
      categoryId: 1,
      materialId: 3,
    },
    {
      id: 44,
      name: "Table Basse Ronde Harmonie",
      description:
        "La Table Basse Ronde Harmonie ajoute une touche d'élégance à votre salon. Son design rond offre un look harmonieux, rendant l'espace plus accueillant.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_rond.avif?sp=r&st=2023-06-07T11:48:14Z&se=2023-11-02T20:48:14Z&sv=2022-11-02&sr=b&sig=6gCDVrCjcjhaQFd1llynD%2B7dLJFbAxOq%2F%2FKhVJPdlsA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_rond.avif?sp=r&st=2023-06-07T11:48:14Z&se=2023-11-02T20:48:14Z&sv=2022-11-02&sr=b&sig=6gCDVrCjcjhaQFd1llynD%2B7dLJFbAxOq%2F%2FKhVJPdlsA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_rond.avif?sp=r&st=2023-06-07T11:48:14Z&se=2023-11-02T20:48:14Z&sv=2022-11-02&sr=b&sig=6gCDVrCjcjhaQFd1llynD%2B7dLJFbAxOq%2F%2FKhVJPdlsA%3D",
        },
      ]),
      price: 90,
      promotion: 0,
      quantity: 100,
      categoryId: 1,
      materialId: 2,
    },
    {
      id: 45,
      name: "Table Basse Noir Sophistiquée",
      description:
        "La Table Basse Noir Sophistiquée est une pièce chic qui apporte de l'élégance à votre salon. Sa finition noire et son design moderne sont parfaits pour un décor contemporain.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_simple.avif?sp=r&st=2023-06-07T11:48:44Z&se=2023-10-11T19:48:44Z&sv=2022-11-02&sr=b&sig=BRhiSDmQi%2Bl1hRNzdRUgLjsUhrzqbB5FwrTJRJKIRy4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_simple.avif?sp=r&st=2023-06-07T11:48:44Z&se=2023-10-11T19:48:44Z&sv=2022-11-02&sr=b&sig=BRhiSDmQi%2Bl1hRNzdRUgLjsUhrzqbB5FwrTJRJKIRy4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_simple.avif?sp=r&st=2023-06-07T11:48:44Z&se=2023-10-11T19:48:44Z&sv=2022-11-02&sr=b&sig=BRhiSDmQi%2Bl1hRNzdRUgLjsUhrzqbB5FwrTJRJKIRy4%3D",
        },
      ]),
      price: 28,
      promotion: 0,
      quantity: 100,
      categoryId: 1,
      materialId: 2,
    },
    {
      id: 46,
      name: "Table Basse Vitrage Élégante",
      description:
        "La Table Basse Vitrage Élégant est une pièce d'art fonctionnelle. Sa surface en verre permet de voir à travers, rendant votre salon plus spacieux et lumineux.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_vitre.avif?sp=r&st=2023-06-07T11:49:21Z&se=2023-10-11T19:49:21Z&sv=2022-11-02&sr=b&sig=LVvl4SRj4c%2F%2FzaqoWmuAEsY0R3noodBYG3Mes2Jk6Cw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_vitre.avif?sp=r&st=2023-06-07T11:49:21Z&se=2023-10-11T19:49:21Z&sv=2022-11-02&sr=b&sig=LVvl4SRj4c%2F%2FzaqoWmuAEsY0R3noodBYG3Mes2Jk6Cw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/produits/table_basse_vitre.avif?sp=r&st=2023-06-07T11:49:21Z&se=2023-10-11T19:49:21Z&sv=2022-11-02&sr=b&sig=LVvl4SRj4c%2F%2FzaqoWmuAEsY0R3noodBYG3Mes2Jk6Cw%3D",
        },
      ]),
      price: 100,
      promotion: 30,
      quantity: 100,
      categoryId: 1,
      materialId: 7,
    },
    {
      id: 47,
      name: "Table Carrée Éclatante Blanche",
      description:
        "La Table Carrée Éclatante Blanche donne une touche d'éclat et d'élégance à n'importe quelle pièce. Parfaite pour les dîners intimes ou les grandes réceptions.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/ashley-byrd-bQDDg-h-MmM-unsplash.jpg?sp=r&st=2023-06-07T11:50:09Z&se=2023-10-04T19:50:09Z&sv=2022-11-02&sr=b&sig=53K%2BVJYEbaLaDgX5NYQqlyTmFR4%2BL8OXIL3V3pPCln8%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/ashley-byrd-bQDDg-h-MmM-unsplash.jpg?sp=r&st=2023-06-07T11:50:09Z&se=2023-10-04T19:50:09Z&sv=2022-11-02&sr=b&sig=53K%2BVJYEbaLaDgX5NYQqlyTmFR4%2BL8OXIL3V3pPCln8%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/ashley-byrd-bQDDg-h-MmM-unsplash.jpg?sp=r&st=2023-06-07T11:50:09Z&se=2023-10-04T19:50:09Z&sv=2022-11-02&sr=b&sig=53K%2BVJYEbaLaDgX5NYQqlyTmFR4%2BL8OXIL3V3pPCln8%3D",
        },
      ]),
      price: 460,
      promotion: 95,
      quantity: 100,
      categoryId: 2,
      materialId: 6,
    },
    {
      id: 48,
      name: "Table Longue Élégante en Bois",
      description:
        "La Table Longue Élégante en Bois est idéale pour les grandes familles ou les soirées entre amis. Son bois naturel ajoute une chaleur rustique à votre maison.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/beazy-eolyFaY8940-unsplash.jpg?sp=r&st=2023-06-07T11:50:34Z&se=2023-11-02T20:50:34Z&sv=2022-11-02&sr=b&sig=N3ey2s8tor12B%2BGS1r7PGJvrseRHr5rS7XrHtl9HGyk%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/beazy-eolyFaY8940-unsplash.jpg?sp=r&st=2023-06-07T11:50:34Z&se=2023-11-02T20:50:34Z&sv=2022-11-02&sr=b&sig=N3ey2s8tor12B%2BGS1r7PGJvrseRHr5rS7XrHtl9HGyk%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/beazy-eolyFaY8940-unsplash.jpg?sp=r&st=2023-06-07T11:50:34Z&se=2023-11-02T20:50:34Z&sv=2022-11-02&sr=b&sig=N3ey2s8tor12B%2BGS1r7PGJvrseRHr5rS7XrHtl9HGyk%3D",
        },
      ]),
      price: 1600,
      promotion: 0,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 49,
      name: "Table de Salon Avant-gardiste",
      description:
        "La Table de Salon Avant-gardiste apporte une sensation de modernité à votre espace de vie. Sa conception contemporaine s'harmonise parfaitement avec un intérieur moderne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/beazy-JggpIf_rt4E-unsplash.jpg?sp=r&st=2023-06-07T11:50:59Z&se=2023-11-09T20:50:59Z&sv=2022-11-02&sr=b&sig=24ep9KNha0H74NfOhVEeA91ZLtLI1SqCjfrRhAPAz14%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/beazy-JggpIf_rt4E-unsplash.jpg?sp=r&st=2023-06-07T11:50:59Z&se=2023-11-09T20:50:59Z&sv=2022-11-02&sr=b&sig=24ep9KNha0H74NfOhVEeA91ZLtLI1SqCjfrRhAPAz14%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/beazy-JggpIf_rt4E-unsplash.jpg?sp=r&st=2023-06-07T11:50:59Z&se=2023-11-09T20:50:59Z&sv=2022-11-02&sr=b&sig=24ep9KNha0H74NfOhVEeA91ZLtLI1SqCjfrRhAPAz14%3D",
        },
      ]),
      price: 1000,
      promotion: 0,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 50,
      name: "Table Noire Simple Sophistiquée",
      description:
        "La Table Noire Simple Sophistiquée offre un style minimaliste et élégant. Sa finition noire apporte une touche de sophistication à tout intérieur.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/edgar-vnjMGEb55VQ-unsplash.jpg?sp=r&st=2023-06-07T11:51:22Z&se=2023-11-08T20:51:22Z&sv=2022-11-02&sr=b&sig=8W4AiFo5b2VbAv0q3NbXbfjGAdkWi%2B3Bf3OQzMLtpCc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/edgar-vnjMGEb55VQ-unsplash.jpg?sp=r&st=2023-06-07T11:51:22Z&se=2023-11-08T20:51:22Z&sv=2022-11-02&sr=b&sig=8W4AiFo5b2VbAv0q3NbXbfjGAdkWi%2B3Bf3OQzMLtpCc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/edgar-vnjMGEb55VQ-unsplash.jpg?sp=r&st=2023-06-07T11:51:22Z&se=2023-11-08T20:51:22Z&sv=2022-11-02&sr=b&sig=8W4AiFo5b2VbAv0q3NbXbfjGAdkWi%2B3Bf3OQzMLtpCc%3D",
        },
      ]),
      price: 400,
      promotion: 0,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 51,
      name: "Table Haute de Salon Majestueuse",
      description:
        "La Table Haute de Salon Majestueuse est un ajout élégant à votre salon. Sa hauteur la rend idéale pour une utilisation comme table d'appoint ou de décoration.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jean-philippe-delberghe-F0DdaYs0EeQ-unsplash.jpg?sp=r&st=2023-06-07T11:51:42Z&se=2023-10-05T19:51:42Z&sv=2022-11-02&sr=b&sig=syRT%2BHk7OpYpA6tnr5v%2BPIHUe5YuHy6gntfXrt3CYDc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jean-philippe-delberghe-F0DdaYs0EeQ-unsplash.jpg?sp=r&st=2023-06-07T11:51:42Z&se=2023-10-05T19:51:42Z&sv=2022-11-02&sr=b&sig=syRT%2BHk7OpYpA6tnr5v%2BPIHUe5YuHy6gntfXrt3CYDc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jean-philippe-delberghe-F0DdaYs0EeQ-unsplash.jpg?sp=r&st=2023-06-07T11:51:42Z&se=2023-10-05T19:51:42Z&sv=2022-11-02&sr=b&sig=syRT%2BHk7OpYpA6tnr5v%2BPIHUe5YuHy6gntfXrt3CYDc%3D",
        },
      ]),
      price: 3200,
      promotion: 0,
      quantity: 100,
      categoryId: 2,
      materialId: 5,
    },
    {
      id: 52,
      name: "Table Éclatante en Verre",
      description:
        "La Table Éclatante en Verre est une pièce d'art fonctionnelle qui apporte une touche d'élégance à votre salon. Sa surface en verre ajoute de la luminosité à votre espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jean-philippe-delberghe-ipQ8lzUM4Rk-unsplash.jpg?sp=r&st=2023-06-07T11:52:07Z&se=2023-11-08T20:52:07Z&sv=2022-11-02&sr=b&sig=3ssX0EHFkVZEwsdvnfA5Swfssbb7kEechvkR4TLaScA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jean-philippe-delberghe-ipQ8lzUM4Rk-unsplash.jpg?sp=r&st=2023-06-07T11:52:07Z&se=2023-11-08T20:52:07Z&sv=2022-11-02&sr=b&sig=3ssX0EHFkVZEwsdvnfA5Swfssbb7kEechvkR4TLaScA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jean-philippe-delberghe-ipQ8lzUM4Rk-unsplash.jpg?sp=r&st=2023-06-07T11:52:07Z&se=2023-11-08T20:52:07Z&sv=2022-11-02&sr=b&sig=3ssX0EHFkVZEwsdvnfA5Swfssbb7kEechvkR4TLaScA%3D",
        },
      ]),
      price: 1780,
      promotion: 120,
      quantity: 100,
      categoryId: 2,
      materialId: 7,
    },
    {
      id: 53,
      name: "Table Simple Essentielle",
      description:
        "La Table Simple Essentielle est une pièce polyvalente qui s'intègre facilement dans n'importe quel décor. Parfaite pour une utilisation quotidienne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jose-losada-9dRBM8Qw2TE-unsplash.jpg?sp=r&st=2023-06-07T11:52:33Z&se=2023-11-10T20:52:33Z&sv=2022-11-02&sr=b&sig=4YEKaWB%2BPP755zLuTsk3wXcSob%2BZroCAELx3danmzzw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jose-losada-9dRBM8Qw2TE-unsplash.jpg?sp=r&st=2023-06-07T11:52:33Z&se=2023-11-10T20:52:33Z&sv=2022-11-02&sr=b&sig=4YEKaWB%2BPP755zLuTsk3wXcSob%2BZroCAELx3danmzzw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/jose-losada-9dRBM8Qw2TE-unsplash.jpg?sp=r&st=2023-06-07T11:52:33Z&se=2023-11-10T20:52:33Z&sv=2022-11-02&sr=b&sig=4YEKaWB%2BPP755zLuTsk3wXcSob%2BZroCAELx3danmzzw%3D",
        },
      ]),
      price: 520,
      promotion: 0,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 54,
      name: "Table à Pieds Fins Élégante",
      description:
        "La Table à Pieds Fins Élégante est une pièce délicate et raffinée qui ajoute une touche d'élégance à n'importe quel espace. Ses pieds fins lui confèrent une allure légère et aérienne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/lui-peng-eHytul-4rmo-unsplash.jpg?sp=r&st=2023-06-07T11:52:56Z&se=2023-11-02T20:52:56Z&sv=2022-11-02&sr=b&sig=oAFDcBoYL%2BpiEZIkq7I7wOEP6O754C%2FpvoUe2dzCm14%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/lui-peng-eHytul-4rmo-unsplash.jpg?sp=r&st=2023-06-07T11:52:56Z&se=2023-11-02T20:52:56Z&sv=2022-11-02&sr=b&sig=oAFDcBoYL%2BpiEZIkq7I7wOEP6O754C%2FpvoUe2dzCm14%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/lui-peng-eHytul-4rmo-unsplash.jpg?sp=r&st=2023-06-07T11:52:56Z&se=2023-11-02T20:52:56Z&sv=2022-11-02&sr=b&sig=oAFDcBoYL%2BpiEZIkq7I7wOEP6O754C%2FpvoUe2dzCm14%3D",
        },
      ]),
      price: 960,
      promotion: 80,
      quantity: 100,
      categoryId: 2,
      materialId: 5,
    },
    {
      id: 55,
      name: "Table Large Spacieuse",
      description:
        "La Table Large Spacieuse est parfaite pour les grandes familles et les soirées. Sa largeur permet d'accueillir plusieurs convives confortablement.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/stephan-coudassot-xstTzTRiJ4k-unsplash.jpg?sp=r&st=2023-06-07T11:53:20Z&se=2023-11-09T20:53:20Z&sv=2022-11-02&sr=b&sig=SUwW9Oe%2FLldeDhHbE9VNKSoFOL%2BGAs2G%2Fz9y8SGQMtY%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/stephan-coudassot-xstTzTRiJ4k-unsplash.jpg?sp=r&st=2023-06-07T11:53:20Z&se=2023-11-09T20:53:20Z&sv=2022-11-02&sr=b&sig=SUwW9Oe%2FLldeDhHbE9VNKSoFOL%2BGAs2G%2Fz9y8SGQMtY%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/stephan-coudassot-xstTzTRiJ4k-unsplash.jpg?sp=r&st=2023-06-07T11:53:20Z&se=2023-11-09T20:53:20Z&sv=2022-11-02&sr=b&sig=SUwW9Oe%2FLldeDhHbE9VNKSoFOL%2BGAs2G%2Fz9y8SGQMtY%3D",
        },
      ]),
      price: 3900,
      promotion: 0,
      quantity: 100,
      categoryId: 2,
      materialId: 2,
    },
    {
      id: 56,
      name: "Table Ronde Blanche Harmonieuse",
      description:
        "La Table Ronde Blanche Harmonieuse ajoute une touche d'élégance à votre salon. Son design rond offre un look harmonieux, rendant l'espace plus accueillant.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/tabitha-turner-rhcllVy2zBU-unsplash.jpg?sp=r&st=2023-06-07T11:53:45Z&se=2023-11-02T20:53:45Z&sv=2022-11-02&sr=b&sig=oAt2AOpbVAgNWp4TXOfnuSk1hVIo5wdTBVTy6SWwFXM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/tabitha-turner-rhcllVy2zBU-unsplash.jpg?sp=r&st=2023-06-07T11:53:45Z&se=2023-11-02T20:53:45Z&sv=2022-11-02&sr=b&sig=oAt2AOpbVAgNWp4TXOfnuSk1hVIo5wdTBVTy6SWwFXM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/table/tabitha-turner-rhcllVy2zBU-unsplash.jpg?sp=r&st=2023-06-07T11:53:45Z&se=2023-11-02T20:53:45Z&sv=2022-11-02&sr=b&sig=oAt2AOpbVAgNWp4TXOfnuSk1hVIo5wdTBVTy6SWwFXM%3D",
        },
      ]),
      price: 700,
      promotion: 0,
      quantity: 100,
      categoryId: 2,
      materialId: 4,
    },
    {
      id: 57,
      name: "Chaise Confort Absolu",
      description:
        "La Chaise Confort Absolu est conçue pour le confort et le soutien. Son rembourrage généreux et sa conception ergonomique en font un choix idéal pour les longues sessions de travail ou de détente.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/behnam-norouzi-phXwnWWz-BM-unsplash.jpg?sp=r&st=2023-06-07T11:54:11Z&se=2023-11-09T20:54:11Z&sv=2022-11-02&sr=b&sig=MgHpzhWApHKN9dLlLzjlJ8Fx3P3zv9Ipbi6F4yiBhCE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/behnam-norouzi-phXwnWWz-BM-unsplash.jpg?sp=r&st=2023-06-07T11:54:11Z&se=2023-11-09T20:54:11Z&sv=2022-11-02&sr=b&sig=MgHpzhWApHKN9dLlLzjlJ8Fx3P3zv9Ipbi6F4yiBhCE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/behnam-norouzi-phXwnWWz-BM-unsplash.jpg?sp=r&st=2023-06-07T11:54:11Z&se=2023-11-09T20:54:11Z&sv=2022-11-02&sr=b&sig=MgHpzhWApHKN9dLlLzjlJ8Fx3P3zv9Ipbi6F4yiBhCE%3D",
        },
      ]),
      price: 70,
      promotion: 0,
      quantity: 100,
      categoryId: 7,
      materialId: 2,
    },
    {
      id: 58,
      name: "Chaise Ancienne Charmante",
      description:
        "La Chaise Ancienne Charmante vous transporte dans une autre époque avec son design vintage. Parfaite pour ajouter une touche de charme antique à votre intérieur.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/daniil-silantev-1P6AnKDw6S8-unsplash.jpg?sp=r&st=2023-06-07T11:54:32Z&se=2023-10-24T19:54:32Z&sv=2022-11-02&sr=b&sig=EMqWvsg5JAMKWPzhxMY5ZZYCaqEZf%2BIqTxnCAU95qDo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/daniil-silantev-1P6AnKDw6S8-unsplash.jpg?sp=r&st=2023-06-07T11:54:32Z&se=2023-10-24T19:54:32Z&sv=2022-11-02&sr=b&sig=EMqWvsg5JAMKWPzhxMY5ZZYCaqEZf%2BIqTxnCAU95qDo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/daniil-silantev-1P6AnKDw6S8-unsplash.jpg?sp=r&st=2023-06-07T11:54:32Z&se=2023-10-24T19:54:32Z&sv=2022-11-02&sr=b&sig=EMqWvsg5JAMKWPzhxMY5ZZYCaqEZf%2BIqTxnCAU95qDo%3D",
        },
      ]),
      price: 140,
      promotion: 20,
      quantity: 100,
      categoryId: 7,
      materialId: 3,
    },
    {
      id: 59,
      name: "Chaise Haute Majestueuse",
      description:
        "La Chaise Haute Majestueuse se démarque par son design élégant et son assise surélevée. Idéale pour un bar à la maison ou une table de cuisine haute.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/djebi-abraham-philippe-uNZ3wWKsnuQ-unsplash.jpg?sp=r&st=2023-06-07T11:54:55Z&se=2023-11-08T20:54:55Z&sv=2022-11-02&sr=b&sig=KRZQSnJRlteTvdsc4n04ODl54NIJ1%2FrUxoCZmHrRd9c%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/djebi-abraham-philippe-uNZ3wWKsnuQ-unsplash.jpg?sp=r&st=2023-06-07T11:54:55Z&se=2023-11-08T20:54:55Z&sv=2022-11-02&sr=b&sig=KRZQSnJRlteTvdsc4n04ODl54NIJ1%2FrUxoCZmHrRd9c%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/djebi-abraham-philippe-uNZ3wWKsnuQ-unsplash.jpg?sp=r&st=2023-06-07T11:54:55Z&se=2023-11-08T20:54:55Z&sv=2022-11-02&sr=b&sig=KRZQSnJRlteTvdsc4n04ODl54NIJ1%2FrUxoCZmHrRd9c%3D",
        },
      ]),
      price: 90,
      promotion: 0,
      quantity: 100,
      categoryId: 7,
      materialId: 1,
    },
    {
      id: 60,
      name: "Chaise Moderne Minimaliste",
      description:
        "La Chaise Moderne Minimaliste apporte une touche contemporaine à votre espace avec son design épuré. Un choix parfait pour ceux qui apprécient le style moderne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/eugene-chystiakov-3neSwyntbQ8-unsplash.jpg?sp=r&st=2023-06-07T11:55:17Z&se=2023-10-12T19:55:17Z&sv=2022-11-02&sr=b&sig=4MCXe1R3SeaFsq%2F9G0hzvtBxoQJKklAX%2F5fnKbotZBE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/eugene-chystiakov-3neSwyntbQ8-unsplash.jpg?sp=r&st=2023-06-07T11:55:17Z&se=2023-10-12T19:55:17Z&sv=2022-11-02&sr=b&sig=4MCXe1R3SeaFsq%2F9G0hzvtBxoQJKklAX%2F5fnKbotZBE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/eugene-chystiakov-3neSwyntbQ8-unsplash.jpg?sp=r&st=2023-06-07T11:55:17Z&se=2023-10-12T19:55:17Z&sv=2022-11-02&sr=b&sig=4MCXe1R3SeaFsq%2F9G0hzvtBxoQJKklAX%2F5fnKbotZBE%3D",
        },
      ]),
      price: 95,
      promotion: 0,
      quantity: 100,
      categoryId: 7,
      materialId: 2,
    },
    {
      id: 61,
      name: "Chaise Rose Élégante",
      description:
        "La Chaise Rose Élégante apporte une touche de couleur et de féminité à votre espace. Son ton rose doux apporte de la chaleur et de l'élégance à n'importe quelle pièce.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/eugenivy_now-1JJJIHh7-Mk-unsplash.jpg?sp=r&st=2023-06-07T11:55:37Z&se=2023-11-02T20:55:37Z&sv=2022-11-02&sr=b&sig=QZwHHqK7%2BGbrge7ROgBdzbzpWX%2FYVl7%2FJzCLZDrMA2k%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/eugenivy_now-1JJJIHh7-Mk-unsplash.jpg?sp=r&st=2023-06-07T11:55:37Z&se=2023-11-02T20:55:37Z&sv=2022-11-02&sr=b&sig=QZwHHqK7%2BGbrge7ROgBdzbzpWX%2FYVl7%2FJzCLZDrMA2k%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/eugenivy_now-1JJJIHh7-Mk-unsplash.jpg?sp=r&st=2023-06-07T11:55:37Z&se=2023-11-02T20:55:37Z&sv=2022-11-02&sr=b&sig=QZwHHqK7%2BGbrge7ROgBdzbzpWX%2FYVl7%2FJzCLZDrMA2k%3D",
        },
      ]),
      price: 60,
      promotion: 5,
      quantity: 100,
      categoryId: 7,
      materialId: 2,
    },
    {
      id: 62,
      name: "Chaise Rustique en Bois",
      description:
        "La Chaise Rustique en Bois combine la robustesse du bois avec une esthétique rustique. Parfaite pour donner une sensation de nature à votre maison.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/jesse-donoghoe-1BHQ22EL3NI-unsplash.jpg?sp=r&st=2023-06-07T11:56:00Z&se=2023-10-04T19:56:00Z&sv=2022-11-02&sr=b&sig=pm%2BKJ%2B636Rp45XRLCx3B%2FKOfwBAPWBcOC3xTevEGjcs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/jesse-donoghoe-1BHQ22EL3NI-unsplash.jpg?sp=r&st=2023-06-07T11:56:00Z&se=2023-10-04T19:56:00Z&sv=2022-11-02&sr=b&sig=pm%2BKJ%2B636Rp45XRLCx3B%2FKOfwBAPWBcOC3xTevEGjcs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits/chaise/jesse-donoghoe-1BHQ22EL3NI-unsplash.jpg?sp=r&st=2023-06-07T11:56:00Z&se=2023-10-04T19:56:00Z&sv=2022-11-02&sr=b&sig=pm%2BKJ%2B636Rp45XRLCx3B%2FKOfwBAPWBcOC3xTevEGjcs%3D",
        },
      ]),
      price: 100,
      promotion: 0,
      quantity: 100,
      categoryId: 7,
      materialId: 2,
    },
  ]

  await db("product").insert(products)

  return products
}

const insertCategories = async (db) => {
  const categories = [
    {
      id: 1,
      name: "Table Basse",
      description:
        "Une variété de tables basses pour s'adapter à n'importe quel salon ou espace de vie.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/table%20basse/photo-1581428982868-e410dd047a90.avif?sp=r&st=2023-06-07T12:33:41Z&se=2023-10-18T20:33:41Z&sv=2022-11-02&sr=b&sig=fmUEHJMrefVUKha8i1NnPDM3FcifzjUhQox%2FVtsIjmw%3D",
    },
    {
      id: 2,
      name: "Table",
      description:
        "Tables pour diverses utilisations, des tables à manger aux tables d'appoint.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/table/stephan-coudassot-xstTzTRiJ4k-unsplash.jpg?sp=r&st=2023-06-07T11:53:20Z&se=2023-11-09T20:53:20Z&sv=2022-11-02&sr=b&sig=SUwW9Oe%2FLldeDhHbE9VNKSoFOL%2BGAs2G%2Fz9y8SGQMtY%3D",
    },
    {
      id: 3,
      name: "Armoire",
      description:
        "Armoires spacieuses et élégantes pour tous vos besoins de rangement.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/armoire/armoire_category.avif?sp=r&st=2023-06-07T12:31:19Z&se=2023-10-24T20:31:19Z&sv=2022-11-02&sr=b&sig=cmbS%2BLdzvXhwMQ1p%2FQ9t4lgiKCYBmK9mo78%2FHhZkEzM%3D",
    },
    {
      id: 4,
      name: "Bureau",
      description:
        "Des bureaux fonctionnels et bien conçus pour votre espace de travail à domicile.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/bureau/photo-1621570361070-896021ba01cc.avif?sp=r&st=2023-06-07T12:32:03Z&se=2023-10-06T20:32:03Z&sv=2022-11-02&sr=b&sig=jSRTifSkSzpn4CnnTSksW7l3t%2FBtQV9Vi0pVS7NFiFA%3D",
    },
    {
      id: 5,
      name: "Lit",
      description: "Des lits confortables pour une bonne nuit de sommeil.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/lit/laura-adai-j67CwQzRLPg-unsplash.jpg?sp=r&st=2023-06-07T11:44:23Z&se=2023-10-12T19:44:23Z&sv=2022-11-02&sr=b&sig=oTp1gytmLs3lPamtHmJfS5eePFoq%2BgZoCIhjl%2BKfN7o%3D",
    },
    {
      id: 6,
      name: "Lampe",
      description: "Illuminez votre espace avec notre sélection de lampes.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/lampe/photo-1513506003901-1e6a229e2d15.avif?sp=r&st=2023-06-07T12:32:52Z&se=2023-11-01T21:32:52Z&sv=2022-11-02&sr=b&sig=1ZDD8VRdhCv5mAO0eDGwJPMbmBkVSt1m8kRjQ4EYKlQ%3D",
    },
    {
      id: 7,
      name: "Chaise",
      description:
        "Chaises confortables pour votre salon, salle à manger et plus encore.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/chaise/jesse-donoghoe-1BHQ22EL3NI-unsplash.jpg?sp=r&st=2023-06-07T11:56:00Z&se=2023-10-04T19:56:00Z&sv=2022-11-02&sr=b&sig=pm%2BKJ%2B636Rp45XRLCx3B%2FKOfwBAPWBcOC3xTevEGjcs%3D",
    },
    {
      id: 8,
      name: "Chevet",
      description:
        "Tables de chevet pratiques et élégantes pour votre chambre.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/chevet/category_chevet.avif?sp=r&st=2023-06-07T12:32:29Z&se=2023-11-08T21:32:29Z&sv=2022-11-02&sr=b&sig=i86qcEbRklZet2joF18Z3wL3nKdLWehKYXFDiNyYNIY%3D",
    },
    {
      id: 9,
      name: "Buffet",
      description:
        "Buffets de style pour le stockage supplémentaire dont vous avez besoin.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/buffet/photo-1618220048045-10a6dbdf83e0.avif?sp=r&st=2023-06-07T12:31:41Z&se=2023-11-02T21:31:41Z&sv=2022-11-02&sr=b&sig=ML97HSAdSbZnv6F0OelTd6I799sYDvjty4Be1wC9Lls%3D",
    },
  ]

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
  const materials = [
    {
      id: 1,
      name: "Fer",
    },
    {
      id: 2,
      name: "Bois",
    },
    {
      id: 3,
      name: "Métal",
    },
    {
      id: 4,
      name: "Aluminium",
    },
    {
      id: 5,
      name: "Acier",
    },
    {
      id: 6,
      name: "Plastique",
    },
    {
      id: 7,
      name: "Verre",
    },
  ]

  await db("material").insert(materials)
}

const insertCarousel = async (db) => {
  const images = [
    {
      id: 1,
      label: "Produit 1",
      url: "https://airnes.blob.core.windows.net/airnes/carrousel/photo-1522708323590-d24dbb6b0267.avif?sp=r&st=2023-06-07T12:41:51Z&se=2023-10-18T20:41:51Z&sv=2022-11-02&sr=b&sig=7Wy7vPTIuSgdBwSiZdfYGGtTRZ%2FoBovGFABxqJIeETE%3D",
      order: 1,
    },
    {
      id: 2,
      label: "Produit 2",
      url: "https://airnes.blob.core.windows.net/airnes/carrousel/photo-1522771739844-6a9f6d5f14af.avif?sp=r&st=2023-06-07T12:42:13Z&se=2023-11-01T21:42:13Z&sv=2022-11-02&sr=b&sig=MVIdIK1SDAQl9iS%2FRtYfT57uB9rMM6ROkjug3%2BUtVAk%3D",
      order: 2,
    },
    {
      id: 3,
      label: "Produit 3",
      url: "https://airnes.blob.core.windows.net/airnes/carrousel/photo-1586023492125-27b2c045efd7.avif?sp=r&st=2023-06-07T12:42:32Z&se=2023-10-11T20:42:32Z&sv=2022-11-02&sr=b&sig=GF23yaK%2F0MFFPQgTje%2FbTelft4lHg%2Blnh2NyUeFoNyE%3D",
      order: 3,
    },
  ]

  await db("carousel_image").insert(images)
}

module.exports = {
  seed,
}
