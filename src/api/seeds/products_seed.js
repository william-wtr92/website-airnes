const knex = require("knex")
const config = require("../config.js")
const faker = require("faker")

faker.locale = "fr"
const db = knex(config.db)

const categoryId = async (db, name) => {
  const category = await db("category").select("id").where("name", name).first()

  return category.id
}

const seed = async () => {
  await db("selected_category").del()
  await db("selected_product").del()
  await db("selected_material").del()
  await db("product").del()
  await db("category").del()
  await db("material").del()
  await db("carousel_image").del()

  await insertMaterials(db)

  await insertCategories(db)

  const armoires = [
    {
      name: "Armoire Coloniale en Bois Blanc",
      description:
        "Une armoire coloniale conçue en bois blanc, idéale pour ranger vos vêtements et autres objets personnels.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_3_vitres.png?sp=r&st=2023-06-14T19:26:47Z&se=2023-11-09T04:26:47Z&sv=2022-11-02&sr=b&sig=fTLrXBSuHuQnAOW8GQt2yq8O39Z6VWeoZdpoL9CquLE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_3_vitres.png?sp=r&st=2023-06-14T19:26:47Z&se=2023-11-09T04:26:47Z&sv=2022-11-02&sr=b&sig=fTLrXBSuHuQnAOW8GQt2yq8O39Z6VWeoZdpoL9CquLE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_3_vitres.png?sp=r&st=2023-06-14T19:26:47Z&se=2023-11-09T04:26:47Z&sv=2022-11-02&sr=b&sig=fTLrXBSuHuQnAOW8GQt2yq8O39Z6VWeoZdpoL9CquLE%3D",
        },
      ]),
      price: 758,
      quantity: 50,
      materialId: 2,
    },
    {
      name: "Armoire Rustique en Chêne Massif",
      description:
        "Cette armoire rustique en chêne massif offre un espace de rangement généreux et un design intemporel.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_bibliotheque.png?sp=r&st=2023-06-14T19:27:57Z&se=2023-10-04T03:27:57Z&sv=2022-11-02&sr=b&sig=PMhUBRDbdVUh3Zr7cv%2FIEMyMA3a2gnUAaJbSXKbNBRo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_bibliotheque.png?sp=r&st=2023-06-14T19:27:57Z&se=2023-10-04T03:27:57Z&sv=2022-11-02&sr=b&sig=PMhUBRDbdVUh3Zr7cv%2FIEMyMA3a2gnUAaJbSXKbNBRo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_bibliotheque.png?sp=r&st=2023-06-14T19:27:57Z&se=2023-10-04T03:27:57Z&sv=2022-11-02&sr=b&sig=PMhUBRDbdVUh3Zr7cv%2FIEMyMA3a2gnUAaJbSXKbNBRo%3D",
        },
      ]),
      price: 2800,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Armoire Luxueuse avec Vitrine",
      description:
        "Armoire luxueuse dotée d'une vitrine en verre, parfaite pour exposer vos objets précieux tout en les gardant en sécurité.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_dressing_luxueux.png?sp=r&st=2023-06-14T19:28:37Z&se=2023-10-05T03:28:37Z&sv=2022-11-02&sr=b&sig=7is98qkCFpWlqoteVBLYIvysHXbYDK5rGztHyGcby9k%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_dressing_luxueux.png?sp=r&st=2023-06-14T19:28:37Z&se=2023-10-05T03:28:37Z&sv=2022-11-02&sr=b&sig=7is98qkCFpWlqoteVBLYIvysHXbYDK5rGztHyGcby9k%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_dressing_luxueux.png?sp=r&st=2023-06-14T19:28:37Z&se=2023-10-05T03:28:37Z&sv=2022-11-02&sr=b&sig=7is98qkCFpWlqoteVBLYIvysHXbYDK5rGztHyGcby9k%3D",
        },
      ]),
      price: 5200,
      quantity: 100,
      materialId: 7,
    },
    {
      name: "Dressing Moderne en Noyer",
      description:
        "Un dressing moderne en noyer pour un rangement optimal de votre garde-robe. Comprend plusieurs compartiments pour une organisation facile.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_dressing_penderie.png?sp=r&st=2023-06-14T19:29:02Z&se=2023-10-10T03:29:02Z&sv=2022-11-02&sr=b&sig=pEh6toisiLawArjJ6v1ayoyCTTMoudtvO8cvrlnQ3EQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_dressing_penderie.png?sp=r&st=2023-06-14T19:29:02Z&se=2023-10-10T03:29:02Z&sv=2022-11-02&sr=b&sig=pEh6toisiLawArjJ6v1ayoyCTTMoudtvO8cvrlnQ3EQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_dressing_penderie.png?sp=r&st=2023-06-14T19:29:02Z&se=2023-10-10T03:29:02Z&sv=2022-11-02&sr=b&sig=pEh6toisiLawArjJ6v1ayoyCTTMoudtvO8cvrlnQ3EQ%3D",
        },
      ]),
      price: 900,
      promotion: 800,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Armoire Scandinave avec Miroir Intégré",
      description:
        "Une armoire scandinave épurée avec miroir intégré, conçue pour les espaces modernes et minimalistes.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_miroir_design.png?sp=r&st=2023-06-14T19:29:34Z&se=2023-10-12T03:29:34Z&sv=2022-11-02&sr=b&sig=5IhD3SMd4V2eghVKulxo%2BoUuAoGFl4tMA3AK00xMYC4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_miroir_design.png?sp=r&st=2023-06-14T19:29:34Z&se=2023-10-12T03:29:34Z&sv=2022-11-02&sr=b&sig=5IhD3SMd4V2eghVKulxo%2BoUuAoGFl4tMA3AK00xMYC4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_miroir_design.png?sp=r&st=2023-06-14T19:29:34Z&se=2023-10-12T03:29:34Z&sv=2022-11-02&sr=b&sig=5IhD3SMd4V2eghVKulxo%2BoUuAoGFl4tMA3AK00xMYC4%3D",
        },
      ]),
      price: 2050,
      promotion: 1980,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Penderie Élégante avec Portes en Verre",
      description:
        "Penderie élégante avec portes en verre, permettant une vision claire de vos vêtements tout en les protégeant de la poussière.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_vitree_elegante.png?sp=r&st=2023-06-14T19:30:03Z&se=2023-10-05T03:30:03Z&sv=2022-11-02&sr=b&sig=z9KzOoADLLJ1auddiTNz6luoUrh834Ds9hxz7Epfwjw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_vitree_elegante.png?sp=r&st=2023-06-14T19:30:03Z&se=2023-10-05T03:30:03Z&sv=2022-11-02&sr=b&sig=z9KzOoADLLJ1auddiTNz6luoUrh834Ds9hxz7Epfwjw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/armoire/produits/armoire_vitree_elegante.png?sp=r&st=2023-06-14T19:30:03Z&se=2023-10-05T03:30:03Z&sv=2022-11-02&sr=b&sig=z9KzOoADLLJ1auddiTNz6luoUrh834Ds9hxz7Epfwjw%3D",
        },
      ]),
      price: 600,
      promotion: 541,
      quantity: 100,
      materialId: 7,
    },
  ]

  await insertProducts(db, "Armoire", armoires)

  const buffets = [
    {
      name: "Buffet Elegance Chêne",
      description:
        "Le raffinement naturel du bois de chêne se mêle à une conception robuste pour offrir un espace de rangement de style rustique. Parfait pour ajouter une touche d'élégance à tout espace de vie.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_a_lancienne.png?sp=r&st=2023-06-14T19:30:37Z&se=2023-10-11T03:30:37Z&sv=2022-11-02&sr=b&sig=RlA54l4sITdjnMMClInSw7eMsO9hcnoURHEMHwG1dbU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_a_lancienne.png?sp=r&st=2023-06-14T19:30:37Z&se=2023-10-11T03:30:37Z&sv=2022-11-02&sr=b&sig=RlA54l4sITdjnMMClInSw7eMsO9hcnoURHEMHwG1dbU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_a_lancienne.png?sp=r&st=2023-06-14T19:30:37Z&se=2023-10-11T03:30:37Z&sv=2022-11-02&sr=b&sig=RlA54l4sITdjnMMClInSw7eMsO9hcnoURHEMHwG1dbU%3D",
        },
      ]),
      price: 200,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Buffet Contemporain",
      description:
        "Le Buffet Contemporain allie design moderne et fonctionnalité, offrant un espace de rangement idéal tout en rehaussant le style de votre intérieur. La finition épurée s'harmonise avec tout type de décoration.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_asymetrique.png?sp=r&st=2023-06-14T19:31:10Z&se=2023-11-29T04:31:10Z&sv=2022-11-02&sr=b&sig=CfrWHvVxIiBZqhPW%2FWNsCD0fsDh2sIaYnG6uTlB6ywM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_asymetrique.png?sp=r&st=2023-06-14T19:31:10Z&se=2023-11-29T04:31:10Z&sv=2022-11-02&sr=b&sig=CfrWHvVxIiBZqhPW%2FWNsCD0fsDh2sIaYnG6uTlB6ywM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_asymetrique.png?sp=r&st=2023-06-14T19:31:10Z&se=2023-11-29T04:31:10Z&sv=2022-11-02&sr=b&sig=CfrWHvVxIiBZqhPW%2FWNsCD0fsDh2sIaYnG6uTlB6ywM%3D",
        },
      ]),
      price: 320,
      quantity: 100,
      materialId: 3,
    },
    {
      name: "Buffet Panorama Vitré",
      description:
        "Avec ses portes vitrées, le Buffet Panorama Vitré permet de mettre en valeur vos objets préférés tout en les gardant à l'abri de la poussière. Il est idéal pour exposer vos plus belles pièces de vaisselle ou vos objets de collection.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_design.png?sp=r&st=2023-06-14T19:32:13Z&se=2023-10-19T03:32:13Z&sv=2022-11-02&sr=b&sig=rkyRMftjekoJntgKtOqvZcgfHbBbOfADWyKb9en61PQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_design.png?sp=r&st=2023-06-14T19:32:13Z&se=2023-10-19T03:32:13Z&sv=2022-11-02&sr=b&sig=rkyRMftjekoJntgKtOqvZcgfHbBbOfADWyKb9en61PQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_design.png?sp=r&st=2023-06-14T19:32:13Z&se=2023-10-19T03:32:13Z&sv=2022-11-02&sr=b&sig=rkyRMftjekoJntgKtOqvZcgfHbBbOfADWyKb9en61PQ%3D",
        },
      ]),
      price: 160,
      promotion: 140,
      quantity: 100,
      materialId: 7,
    },
    {
      name: "Buffet Étagère Ouverte",
      description:
        "Le Buffet Étagère Ouverte offre un espace de rangement ouvert pour un accès facile à vos objets du quotidien. Sa conception simple et efficace le rend parfait pour n'importe quel espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_geometrique.png?sp=r&st=2023-06-14T19:32:41Z&se=2023-10-05T03:32:41Z&sv=2022-11-02&sr=b&sig=85doUCheS510JFAzaKjcw642OmTLRxfjYhfFpARc%2Fys%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_geometrique.png?sp=r&st=2023-06-14T19:32:41Z&se=2023-10-05T03:32:41Z&sv=2022-11-02&sr=b&sig=85doUCheS510JFAzaKjcw642OmTLRxfjYhfFpARc%2Fys%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_geometrique.png?sp=r&st=2023-06-14T19:32:41Z&se=2023-10-05T03:32:41Z&sv=2022-11-02&sr=b&sig=85doUCheS510JFAzaKjcw642OmTLRxfjYhfFpARc%2Fys%3D",
        },
      ]),
      price: 470,
      quantity: 100,
      materialId: 4,
    },
    {
      name: "Buffet Marbre Majestueux",
      description:
        "Faites une déclaration audacieuse avec le Buffet Marbre Majestueux. Avec sa finition en marbre, ce buffet ajoute une touche de luxe et de sophistication à n'importe quelle pièce.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_marbre.png?sp=r&st=2023-06-14T19:33:08Z&se=2023-10-06T03:33:08Z&sv=2022-11-02&sr=b&sig=CZ4FCcsoHJfq21eJKZwqujNE4LVUajKpSAOCG74Wovk%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_marbre.png?sp=r&st=2023-06-14T19:33:08Z&se=2023-10-06T03:33:08Z&sv=2022-11-02&sr=b&sig=CZ4FCcsoHJfq21eJKZwqujNE4LVUajKpSAOCG74Wovk%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_marbre.png?sp=r&st=2023-06-14T19:33:08Z&se=2023-10-06T03:33:08Z&sv=2022-11-02&sr=b&sig=CZ4FCcsoHJfq21eJKZwqujNE4LVUajKpSAOCG74Wovk%3D",
        },
      ]),
      price: 1300,
      promotion: 1200,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Buffet Minimaliste",
      description:
        "Pour ceux qui préfèrent la simplicité, le Buffet Minimaliste offre un design épuré sans compromettre l'espace de rangement. Idéal pour un intérieur moderne et minimaliste.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_simple.png?sp=r&st=2023-06-14T19:33:38Z&se=2023-10-06T03:33:38Z&sv=2022-11-02&sr=b&sig=u6ifGyLAYostLolMe09yeFWn5Zp179G8NDS5%2BrvcGEw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_simple.png?sp=r&st=2023-06-14T19:33:38Z&se=2023-10-06T03:33:38Z&sv=2022-11-02&sr=b&sig=u6ifGyLAYostLolMe09yeFWn5Zp179G8NDS5%2BrvcGEw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_simple.png?sp=r&st=2023-06-14T19:33:38Z&se=2023-10-06T03:33:38Z&sv=2022-11-02&sr=b&sig=u6ifGyLAYostLolMe09yeFWn5Zp179G8NDS5%2BrvcGEw%3D",
        },
      ]),
      price: 90,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Buffet Multimédia",
      description:
        "Le Buffet Multimédia est conçu pour être le centre de votre divertissement à domicile, avec suffisamment d'espace pour ranger tous vos appareils multimédia. Il combine style et fonctionnalité pour une utilisation quotidienne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_tv.png?sp=r&st=2023-06-14T19:34:31Z&se=2023-10-05T03:34:31Z&sv=2022-11-02&sr=b&sig=%2FtCBNDBhYpPQiIotymmpqvf6rEKCZsTiM3mPlLNlEcA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_tv.png?sp=r&st=2023-06-14T19:34:31Z&se=2023-10-05T03:34:31Z&sv=2022-11-02&sr=b&sig=%2FtCBNDBhYpPQiIotymmpqvf6rEKCZsTiM3mPlLNlEcA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_tv.png?sp=r&st=2023-06-14T19:34:31Z&se=2023-10-05T03:34:31Z&sv=2022-11-02&sr=b&sig=%2FtCBNDBhYpPQiIotymmpqvf6rEKCZsTiM3mPlLNlEcA%3D",
        },
      ]),
      price: 209,
      quantity: 100,
      materialId: 3,
    },
    {
      name: "Buffet Charme du Bois",
      description:
        "Le Buffet Charme du Bois allie le charme du bois naturel à une conception solide pour offrir un espace de rangement durable. Sa polyvalence en fait un choix parfait pour tout espace de vie.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_vitre.png?sp=r&st=2023-06-14T19:35:00Z&se=2023-11-08T04:35:00Z&sv=2022-11-02&sr=b&sig=eUWifFuh%2FHseRzdv1yyjQDurJJZZ6bG5AhPDvnVosBw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_vitre.png?sp=r&st=2023-06-14T19:35:00Z&se=2023-11-08T04:35:00Z&sv=2022-11-02&sr=b&sig=eUWifFuh%2FHseRzdv1yyjQDurJJZZ6bG5AhPDvnVosBw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/buffet/produits/buffet_vitre.png?sp=r&st=2023-06-14T19:35:00Z&se=2023-11-08T04:35:00Z&sv=2022-11-02&sr=b&sig=eUWifFuh%2FHseRzdv1yyjQDurJJZZ6bG5AhPDvnVosBw%3D",
        },
      ]),
      price: 140,
      promotion: 125,
      quantity: 100,
      materialId: 2,
    },
  ]

  await insertProducts(db, "Buffet", buffets)

  const bureaux = [
    {
      name: "Bureau de l'Artiste",
      description:
        "Conçu pour stimuler la créativité, le Bureau Créatif de l'Artiste offre un espace de travail optimal pour tous vos projets artistiques. Son design inspirant contribuera à faire jaillir vos idées les plus innovantes.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_dartiste.png?sp=r&st=2023-06-14T19:35:36Z&se=2023-10-12T03:35:36Z&sv=2022-11-02&sr=b&sig=r52Zo6Q7wm72BZhHbVJlwSq3vqnR03h8PbcTot6W%2F10%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_dartiste.png?sp=r&st=2023-06-14T19:35:36Z&se=2023-10-12T03:35:36Z&sv=2022-11-02&sr=b&sig=r52Zo6Q7wm72BZhHbVJlwSq3vqnR03h8PbcTot6W%2F10%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_dartiste.png?sp=r&st=2023-06-14T19:35:36Z&se=2023-10-12T03:35:36Z&sv=2022-11-02&sr=b&sig=r52Zo6Q7wm72BZhHbVJlwSq3vqnR03h8PbcTot6W%2F10%3D",
        },
      ]),
      price: 400,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Bureau Angle Aiguisé",
      description:
        "Le Bureau Angle Aiguisé se distingue par ses lignes géométriques nettes qui ajoutent une touche moderne à n'importe quel espace de travail. Ce design audacieux est complété par une fonctionnalité sans compromis.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_geometrique.png?sp=r&st=2023-06-14T19:36:09Z&se=2023-10-12T03:36:09Z&sv=2022-11-02&sr=b&sig=hfPm0JagVlaArsU38GMtyPPy9kJPiM0v9tA0FLy0Y1k%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_geometrique.png?sp=r&st=2023-06-14T19:36:09Z&se=2023-10-12T03:36:09Z&sv=2022-11-02&sr=b&sig=hfPm0JagVlaArsU38GMtyPPy9kJPiM0v9tA0FLy0Y1k%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_geometrique.png?sp=r&st=2023-06-14T19:36:09Z&se=2023-10-12T03:36:09Z&sv=2022-11-02&sr=b&sig=hfPm0JagVlaArsU38GMtyPPy9kJPiM0v9tA0FLy0Y1k%3D",
        },
      ]),
      price: 230,
      quantity: 100,
      materialId: 5,
    },
    {
      name: "Bureau Épuré",
      description:
        "Avec son design minimaliste et son allure épurée, le Bureau Épure offre un espace de travail organisé et dégagé, favorisant la concentration et la productivité. L'essence de la simplicité se reflète dans chaque détail.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_minimalist.png?sp=r&st=2023-06-14T19:36:42Z&se=2023-10-11T03:36:42Z&sv=2022-11-02&sr=b&sig=dcI1nCuafMd9Nm6fRZwiYcJu0JKm04XkKJZPEvDWzww%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_minimalist.png?sp=r&st=2023-06-14T19:36:42Z&se=2023-10-11T03:36:42Z&sv=2022-11-02&sr=b&sig=dcI1nCuafMd9Nm6fRZwiYcJu0JKm04XkKJZPEvDWzww%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_minimalist.png?sp=r&st=2023-06-14T19:36:42Z&se=2023-10-11T03:36:42Z&sv=2022-11-02&sr=b&sig=dcI1nCuafMd9Nm6fRZwiYcJu0JKm04XkKJZPEvDWzww%3D",
        },
      ]),
      price: 100,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Bureau Blanc Multifonction",
      description:
        "Le Bureau Blanc Multifonction offre non seulement un espace de travail généreux, mais aussi une solution de rangement intégrée. La combinaison de son design élégant et de sa fonctionnalité en fait un choix parfait pour tout espace de travail moderne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_rangement.png?sp=r&st=2023-06-14T19:37:06Z&se=2023-11-02T04:37:06Z&sv=2022-11-02&sr=b&sig=x26jCquysqyIq%2F8jGHGc%2FwTP3tjRMfbi0fqECAqiEEU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_rangement.png?sp=r&st=2023-06-14T19:37:06Z&se=2023-11-02T04:37:06Z&sv=2022-11-02&sr=b&sig=x26jCquysqyIq%2F8jGHGc%2FwTP3tjRMfbi0fqECAqiEEU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_rangement.png?sp=r&st=2023-06-14T19:37:06Z&se=2023-11-02T04:37:06Z&sv=2022-11-02&sr=b&sig=x26jCquysqyIq%2F8jGHGc%2FwTP3tjRMfbi0fqECAqiEEU%3D",
        },
      ]),
      price: 190,
      promotion: 170,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Bureau Bois Nature",
      description:
        "Le Bureau Bois Nature allie le charme du bois naturel à une conception simple pour offrir un espace de travail confortable et accueillant. L'authenticité du bois donne une ambiance chaleureuse à votre espace de travail.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_simple.png?sp=r&st=2023-06-14T19:37:32Z&se=2023-10-12T03:37:32Z&sv=2022-11-02&sr=b&sig=zzdg3KjYuudwYT0Zh21Ft%2FGVhNwRWNsgrDahMF3VeNw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_simple.png?sp=r&st=2023-06-14T19:37:32Z&se=2023-10-12T03:37:32Z&sv=2022-11-02&sr=b&sig=zzdg3KjYuudwYT0Zh21Ft%2FGVhNwRWNsgrDahMF3VeNw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/bureau/produits/bureau_simple.png?sp=r&st=2023-06-14T19:37:32Z&se=2023-10-12T03:37:32Z&sv=2022-11-02&sr=b&sig=zzdg3KjYuudwYT0Zh21Ft%2FGVhNwRWNsgrDahMF3VeNw%3D",
        },
      ]),
      price: 200,
      quantity: 100,
      materialId: 5,
    },
  ]

  await insertProducts(db, "Bureau", bureaux)

  const chevets = [
    {
      name: "Chevet Charme Rustique",
      description:
        "Le Chevet Charme Rustique, avec sa finition en bois marron, apporte une touche de chaleur et de confort à votre chambre. Son design robuste garantit un espace de rangement durable à portée de main.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_ancien.png?sp=r&st=2023-06-14T19:38:16Z&se=2023-10-24T03:38:16Z&sv=2022-11-02&sr=b&sig=j74yPgAQGpVOUHBF9%2FqPQ4ngVDkKoZfilWsa9gmDK8g%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_ancien.png?sp=r&st=2023-06-14T19:38:16Z&se=2023-10-24T03:38:16Z&sv=2022-11-02&sr=b&sig=j74yPgAQGpVOUHBF9%2FqPQ4ngVDkKoZfilWsa9gmDK8g%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_ancien.png?sp=r&st=2023-06-14T19:38:16Z&se=2023-10-24T03:38:16Z&sv=2022-11-02&sr=b&sig=j74yPgAQGpVOUHBF9%2FqPQ4ngVDkKoZfilWsa9gmDK8g%3D",
        },
      ]),
      price: 50,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Chevet Blanc Elégant",
      description:
        "Le Chevet Blanc Elégant est un ajout raffiné à toute chambre. Avec son tiroir intégré, il offre un rangement discret tout en complétant parfaitement tout style de décoration intérieure.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_bois.png?sp=r&st=2023-06-14T19:38:41Z&se=2023-10-06T03:38:41Z&sv=2022-11-02&sr=b&sig=3KdEbktwnPcLWfY0IOSjvl2JYENBp3wJ5pxNnCbexMU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_bois.png?sp=r&st=2023-06-14T19:38:41Z&se=2023-10-06T03:38:41Z&sv=2022-11-02&sr=b&sig=3KdEbktwnPcLWfY0IOSjvl2JYENBp3wJ5pxNnCbexMU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_bois.png?sp=r&st=2023-06-14T19:38:41Z&se=2023-10-06T03:38:41Z&sv=2022-11-02&sr=b&sig=3KdEbktwnPcLWfY0IOSjvl2JYENBp3wJ5pxNnCbexMU%3D",
        },
      ]),
      price: 75,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Chevet Gris Fonctionnel",
      description:
        "Le Chevet Gris Fonctionnel combine style et utilité avec son design gris moderne et son espace de rangement généreux. C'est le compagnon de lit idéal pour garder tous vos essentiels à portée de main.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_large.png?sp=r&st=2023-06-14T19:39:08Z&se=2023-10-05T03:39:08Z&sv=2022-11-02&sr=b&sig=WlhK45caFpKmwIPy2nMImVYl0UKTZlP0MEH2AMSVj0c%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_large.png?sp=r&st=2023-06-14T19:39:08Z&se=2023-10-05T03:39:08Z&sv=2022-11-02&sr=b&sig=WlhK45caFpKmwIPy2nMImVYl0UKTZlP0MEH2AMSVj0c%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_large.png?sp=r&st=2023-06-14T19:39:08Z&se=2023-10-05T03:39:08Z&sv=2022-11-02&sr=b&sig=WlhK45caFpKmwIPy2nMImVYl0UKTZlP0MEH2AMSVj0c%3D",
        },
      ]),
      price: 123,
      promotion: 110,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Chevet Luxe Marbre",
      description:
        "Élevez le niveau de sophistication de votre chambre avec le Chevet Luxe Marbre. Son design luxueux en marbre offre une touche d'élégance et de style inégalée, tout en servant d'espace de rangement pratique.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_lune.png?sp=r&st=2023-06-14T19:39:46Z&se=2023-10-05T03:39:46Z&sv=2022-11-02&sr=b&sig=YWpvqXlyfqU6CC17az%2B5TXUOKq6Okqv%2BTs6QYf00irY%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_lune.png?sp=r&st=2023-06-14T19:39:46Z&se=2023-10-05T03:39:46Z&sv=2022-11-02&sr=b&sig=YWpvqXlyfqU6CC17az%2B5TXUOKq6Okqv%2BTs6QYf00irY%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chevet/produits/table_chevet_lune.png?sp=r&st=2023-06-14T19:39:46Z&se=2023-10-05T03:39:46Z&sv=2022-11-02&sr=b&sig=YWpvqXlyfqU6CC17az%2B5TXUOKq6Okqv%2BTs6QYf00irY%3D",
        },
      ]),
      price: 400,
      promotion: 370,
      quantity: 100,
      materialId: 3,
    },
  ]

  await insertProducts(db, "Chevet", chevets)

  const lampes = [
    {
      name: "Abajour Élégance du Salon",
      description:
        "L'Abajour Élégance du Salon donne une lumière douce et agréable, idéale pour créer une atmosphère chaleureuse et accueillante dans votre salon. Son design classique s'intègre harmonieusement dans toute décoration intérieure.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_ancien.png?sp=r&st=2023-06-14T19:40:20Z&se=2023-10-06T03:40:20Z&sv=2022-11-02&sr=b&sig=Q948Y1K8acADxYFZcp%2FlK%2F5K8r5dmpdbWWr9sThlnDE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_ancien.png?sp=r&st=2023-06-14T19:40:20Z&se=2023-10-06T03:40:20Z&sv=2022-11-02&sr=b&sig=Q948Y1K8acADxYFZcp%2FlK%2F5K8r5dmpdbWWr9sThlnDE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_ancien.png?sp=r&st=2023-06-14T19:40:20Z&se=2023-10-06T03:40:20Z&sv=2022-11-02&sr=b&sig=Q948Y1K8acADxYFZcp%2FlK%2F5K8r5dmpdbWWr9sThlnDE%3D",
        },
      ]),
      price: 35,
      quantity: 100,
      materialId: 6,
    },
    {
      name: "Lampe Sphère Contemporaine",
      description:
        "La Lampe Sphère Contemporaine avec son design moderne et élégant est plus qu'une source de lumière, c'est un véritable élément de décoration qui donne du caractère à votre intérieur.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_boule.png?sp=r&st=2023-06-14T19:41:04Z&se=2023-10-12T03:41:04Z&sv=2022-11-02&sr=b&sig=RW0ebbJJqiGV%2BB4%2Bp59jFEMRaGriidY70jVw%2F3qRab4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_boule.png?sp=r&st=2023-06-14T19:41:04Z&se=2023-10-12T03:41:04Z&sv=2022-11-02&sr=b&sig=RW0ebbJJqiGV%2BB4%2Bp59jFEMRaGriidY70jVw%2F3qRab4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_boule.png?sp=r&st=2023-06-14T19:41:04Z&se=2023-10-12T03:41:04Z&sv=2022-11-02&sr=b&sig=RW0ebbJJqiGV%2BB4%2Bp59jFEMRaGriidY70jVw%2F3qRab4%3D",
        },
      ]),
      price: 20,
      quantity: 100,
      materialId: 6,
    },
    {
      name: "Lampe Bulles Fantaisie",
      description:
        "La Lampe Bulles Fantaisie est une pièce unique qui ajoute un charme ludique à n'importe quelle pièce. Son design bulleux crée un effet de lumière fascinant qui illuminera votre espace de manière spectaculaire.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_bulles.png?sp=r&st=2023-06-14T19:41:40Z&se=2023-10-06T03:41:40Z&sv=2022-11-02&sr=b&sig=9aQB6MnaDkgtDnQMxGWtzgtWqHGFHVVwWaJpycP0HBg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_bulles.png?sp=r&st=2023-06-14T19:41:40Z&se=2023-10-06T03:41:40Z&sv=2022-11-02&sr=b&sig=9aQB6MnaDkgtDnQMxGWtzgtWqHGFHVVwWaJpycP0HBg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_bulles.png?sp=r&st=2023-06-14T19:41:40Z&se=2023-10-06T03:41:40Z&sv=2022-11-02&sr=b&sig=9aQB6MnaDkgtDnQMxGWtzgtWqHGFHVVwWaJpycP0HBg%3D",
        },
      ]),
      price: 100,
      promotion: 90,
      quantity: 100,
      materialId: 3,
    },
    {
      name: "Lampe de Bureau Focalisée",
      description:
        "La Lampe de Bureau Focalisée est conçue pour éclairer votre espace de travail avec une lumière concentrée, augmentant ainsi votre concentration et votre productivité. Son design simple et épuré s'adapte à tout environnement de bureau.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_bureau.png?sp=r&st=2023-06-14T19:42:09Z&se=2023-11-02T04:42:09Z&sv=2022-11-02&sr=b&sig=XRFIUKhcV2T53r95Stu8GpXrY1tkFVf0LB0Y9Bfv53M%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_bureau.png?sp=r&st=2023-06-14T19:42:09Z&se=2023-11-02T04:42:09Z&sv=2022-11-02&sr=b&sig=XRFIUKhcV2T53r95Stu8GpXrY1tkFVf0LB0Y9Bfv53M%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_bureau.png?sp=r&st=2023-06-14T19:42:09Z&se=2023-11-02T04:42:09Z&sv=2022-11-02&sr=b&sig=XRFIUKhcV2T53r95Stu8GpXrY1tkFVf0LB0Y9Bfv53M%3D",
        },
      ]),
      price: 40,
      promotion: 35,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Lampe Éclat Moderne",
      description:
        "La Lampe Éclat Moderne combine une esthétique contemporaine avec une fonctionnalité efficace. Son design moderne et sa lumière brillante en font une pièce maîtresse dans n'importe quel espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_design.png?sp=r&st=2023-06-14T19:42:37Z&se=2023-10-20T03:42:37Z&sv=2022-11-02&sr=b&sig=YhSMn1%2B3ZKD0H4sPYpx8mCDFfmGDjdNRfBKkXgJvtIM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_design.png?sp=r&st=2023-06-14T19:42:37Z&se=2023-10-20T03:42:37Z&sv=2022-11-02&sr=b&sig=YhSMn1%2B3ZKD0H4sPYpx8mCDFfmGDjdNRfBKkXgJvtIM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_design.png?sp=r&st=2023-06-14T19:42:37Z&se=2023-10-20T03:42:37Z&sv=2022-11-02&sr=b&sig=YhSMn1%2B3ZKD0H4sPYpx8mCDFfmGDjdNRfBKkXgJvtIM%3D",
        },
      ]),
      price: 100,
      quantity: 100,
      materialId: 7,
    },
    {
      name: "Lampe Formes Géométriques",
      description:
        "Avec son design audacieux, la Lampe Formes Géométriques crée un éclairage saisissant qui sert à la fois d'élément de décoration et de source de lumière. Elle est parfaite pour ceux qui apprécient un design unique et audacieux.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_geometrique.png?sp=r&st=2023-06-14T19:43:07Z&se=2023-11-02T04:43:07Z&sv=2022-11-02&sr=b&sig=fadyXFfpqMTB6OpPRO%2FT%2FwD%2BC1tu3GjSpnx2otBcwFI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_geometrique.png?sp=r&st=2023-06-14T19:43:07Z&se=2023-11-02T04:43:07Z&sv=2022-11-02&sr=b&sig=fadyXFfpqMTB6OpPRO%2FT%2FwD%2BC1tu3GjSpnx2otBcwFI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_geometrique.png?sp=r&st=2023-06-14T19:43:07Z&se=2023-11-02T04:43:07Z&sv=2022-11-02&sr=b&sig=fadyXFfpqMTB6OpPRO%2FT%2FwD%2BC1tu3GjSpnx2otBcwFI%3D",
        },
      ]),
      price: 95,
      promotion: 90,
      quantity: 100,
      materialId: 4,
    },
    {
      name: "Lampe Style Industriel",
      description:
        "La Lampe Style Industriel est une façon chic de faire entrer le look industriel dans votre maison. Elle combine des matériaux robustes et un design minimaliste pour créer une pièce d'éclairage qui fait une déclaration audacieuse.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_industrielle.png?sp=r&st=2023-06-14T19:43:31Z&se=2023-11-15T04:43:31Z&sv=2022-11-02&sr=b&sig=ETw30tUCgW9eT9nnvJT6xBh4%2BOF0SikafnAdXLJF2NU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_industrielle.png?sp=r&st=2023-06-14T19:43:31Z&se=2023-11-15T04:43:31Z&sv=2022-11-02&sr=b&sig=ETw30tUCgW9eT9nnvJT6xBh4%2BOF0SikafnAdXLJF2NU%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_industrielle.png?sp=r&st=2023-06-14T19:43:31Z&se=2023-11-15T04:43:31Z&sv=2022-11-02&sr=b&sig=ETw30tUCgW9eT9nnvJT6xBh4%2BOF0SikafnAdXLJF2NU%3D",
        },
      ]),
      price: 20,
      quantity: 100,
      materialId: 4,
    },
    {
      name: "Lampe Métal Rose Charmante",
      description:
        "La Lampe Métal Rose Charmante est l'ajout parfait à tout espace qui a besoin d'une touche de douceur. Sa teinte rose et son design en métal offrent une combinaison charmante de douceur et de robustesse.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_metal_rose.png?sp=r&st=2023-06-14T19:43:57Z&se=2023-11-09T04:43:57Z&sv=2022-11-02&sr=b&sig=Mtbu%2BcANXbNbFW81nk2pjOUtT2oqdAsrrtIhd7ijWMo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_metal_rose.png?sp=r&st=2023-06-14T19:43:57Z&se=2023-11-09T04:43:57Z&sv=2022-11-02&sr=b&sig=Mtbu%2BcANXbNbFW81nk2pjOUtT2oqdAsrrtIhd7ijWMo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_metal_rose.png?sp=r&st=2023-06-14T19:43:57Z&se=2023-11-09T04:43:57Z&sv=2022-11-02&sr=b&sig=Mtbu%2BcANXbNbFW81nk2pjOUtT2oqdAsrrtIhd7ijWMo%3D",
        },
      ]),
      price: 30,
      quantity: 100,
      materialId: 5,
    },
    {
      name: "Lampe Néon Futuriste",
      description:
        "La Lampe Néon Futuriste donne une touche de modernité à n'importe quel espace avec son éclairage vif et son design contemporain. C'est une déclaration audacieuse qui ajoutera un éclat futuriste à votre décor.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_neon.png?sp=r&st=2023-06-14T19:44:27Z&se=2023-10-12T03:44:27Z&sv=2022-11-02&sr=b&sig=ZF7OyGAXGdnAonjxoUQvbZ4sXN0u4VSKH5ytg3RhXCE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_neon.png?sp=r&st=2023-06-14T19:44:27Z&se=2023-10-12T03:44:27Z&sv=2022-11-02&sr=b&sig=ZF7OyGAXGdnAonjxoUQvbZ4sXN0u4VSKH5ytg3RhXCE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lampe/produits/lampe_neon.png?sp=r&st=2023-06-14T19:44:27Z&se=2023-10-12T03:44:27Z&sv=2022-11-02&sr=b&sig=ZF7OyGAXGdnAonjxoUQvbZ4sXN0u4VSKH5ytg3RhXCE%3D",
        },
      ]),
      price: 60,
      promotion: 55,
      quantity: 100,
      materialId: 7,
    },
  ]

  await insertProducts(db, "Lampe", lampes)

  const lits = [
    {
      name: "Lit Cocooning Enfant 1 Place",
      description:
        "Le Lit Cocooning Enfant 1 Place est parfait pour les chambres d'enfant. Son design compact et ses barrières latérales en font un choix sûr et confortable pour votre petit. Son style simple s'harmonise avec tous types de décoration.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/alen-rojnic-T1Yvmf4oleQ-unsplash.jpg?sp=r&st=2023-06-14T19:44:57Z&se=2023-11-09T04:44:57Z&sv=2022-11-02&sr=b&sig=UZhJM%2FUcKDt2pnWW71we3OOcXkayKcKUlXB5kwI8Rp0%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/alen-rojnic-T1Yvmf4oleQ-unsplash.jpg?sp=r&st=2023-06-14T19:44:57Z&se=2023-11-09T04:44:57Z&sv=2022-11-02&sr=b&sig=UZhJM%2FUcKDt2pnWW71we3OOcXkayKcKUlXB5kwI8Rp0%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/alen-rojnic-T1Yvmf4oleQ-unsplash.jpg?sp=r&st=2023-06-14T19:44:57Z&se=2023-11-09T04:44:57Z&sv=2022-11-02&sr=b&sig=UZhJM%2FUcKDt2pnWW71we3OOcXkayKcKUlXB5kwI8Rp0%3D",
        },
      ]),
      price: 200,
      promotion: 190,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Lit Double en Métal Noir",
      description:
        "Le Lit Double Élégance en Métal Noir offre une touche d'élégance et de modernité à votre chambre. Son cadre en métal robuste assure une longévité exceptionnelle, tandis que son fini noir apporte un style intemporel.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/chuttersnap-ftG8WcHwg7o-unsplash.jpg?sp=r&st=2023-06-14T19:45:22Z&se=2023-10-04T03:45:22Z&sv=2022-11-02&sr=b&sig=Hz%2Fh0y3vlZFXq2sh74093qSDuOCgIPNer0Av4n5JtR0%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/chuttersnap-ftG8WcHwg7o-unsplash.jpg?sp=r&st=2023-06-14T19:45:22Z&se=2023-10-04T03:45:22Z&sv=2022-11-02&sr=b&sig=Hz%2Fh0y3vlZFXq2sh74093qSDuOCgIPNer0Av4n5JtR0%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/chuttersnap-ftG8WcHwg7o-unsplash.jpg?sp=r&st=2023-06-14T19:45:22Z&se=2023-10-04T03:45:22Z&sv=2022-11-02&sr=b&sig=Hz%2Fh0y3vlZFXq2sh74093qSDuOCgIPNer0Av4n5JtR0%3D",
        },
      ]),
      price: 430,
      quantity: 100,
      materialId: 3,
    },
    {
      name: "Lit Spacieux en Bois",
      description:
        "Le Lit Spacieux Nature en Bois est idéal pour ceux qui apprécient le confort et le style naturel. Le cadre en bois robuste offre une base solide, tandis que la grande taille offre beaucoup d'espace pour une nuit de sommeil reposante.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/laura-adai-J60bPeDiR8A-unsplash.jpg?sp=r&st=2023-06-14T19:45:43Z&se=2023-10-13T03:45:43Z&sv=2022-11-02&sr=b&sig=BEdhhBq1aMmqrgKMOTWIHM1df8BwxZAVha%2FeIYb82eI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/laura-adai-J60bPeDiR8A-unsplash.jpg?sp=r&st=2023-06-14T19:45:43Z&se=2023-10-13T03:45:43Z&sv=2022-11-02&sr=b&sig=BEdhhBq1aMmqrgKMOTWIHM1df8BwxZAVha%2FeIYb82eI%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/laura-adai-J60bPeDiR8A-unsplash.jpg?sp=r&st=2023-06-14T19:45:43Z&se=2023-10-13T03:45:43Z&sv=2022-11-02&sr=b&sig=BEdhhBq1aMmqrgKMOTWIHM1df8BwxZAVha%2FeIYb82eI%3D",
        },
      ]),
      price: 710,
      promotion: 690,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Lit Luxueux",
      description:
        "Le Lit Luxueux Royale est une pièce maîtresse dans toute chambre. Son design luxueux, avec des détails raffinés et une finition de qualité supérieure, offre un lieu de repos qui combine confort et style de manière exceptionnelle.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/laura-adai-j67CwQzRLPg-unsplash.jpg?sp=r&st=2023-06-14T19:46:08Z&se=2023-11-09T04:46:08Z&sv=2022-11-02&sr=b&sig=ztQB6KjEwvriaqKFZE3w1jUPeQmfH4jyjkQcUehoqu8%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/laura-adai-j67CwQzRLPg-unsplash.jpg?sp=r&st=2023-06-14T19:46:08Z&se=2023-11-09T04:46:08Z&sv=2022-11-02&sr=b&sig=ztQB6KjEwvriaqKFZE3w1jUPeQmfH4jyjkQcUehoqu8%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/lit/laura-adai-j67CwQzRLPg-unsplash.jpg?sp=r&st=2023-06-14T19:46:08Z&se=2023-11-09T04:46:08Z&sv=2022-11-02&sr=b&sig=ztQB6KjEwvriaqKFZE3w1jUPeQmfH4jyjkQcUehoqu8%3D",
        },
      ]),
      price: 900,
      quantity: 100,
      materialId: 2,
    },
  ]

  await insertProducts(db, "Lit", lits)

  const tableBasse = [
    {
      name: "Table Basse Épurée Moderne",
      description:
        "La Table Basse Épurée Moderne offre une touche contemporaine à votre salon. Son design simple et élégant complète parfaitement tous types de décoration intérieure.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_bois.png?sp=r&st=2023-06-14T19:46:50Z&se=2023-10-06T03:46:50Z&sv=2022-11-02&sr=b&sig=zaXYljhEFueuwwJj7dAYnPeikKMRoEEqi9ZOkuvEXXo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_bois.png?sp=r&st=2023-06-14T19:46:50Z&se=2023-10-06T03:46:50Z&sv=2022-11-02&sr=b&sig=zaXYljhEFueuwwJj7dAYnPeikKMRoEEqi9ZOkuvEXXo%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_bois.png?sp=r&st=2023-06-14T19:46:50Z&se=2023-10-06T03:46:50Z&sv=2022-11-02&sr=b&sig=zaXYljhEFueuwwJj7dAYnPeikKMRoEEqi9ZOkuvEXXo%3D",
        },
      ]),
      price: 400,
      promotion: 380,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Basse Douceur Coussin",
      description:
        "La Table Basse Douceur Coussin combine confort et fonctionnalité, avec une surface rembourrée pour plus de confort lors de l'utilisation du canapé. Parfaite pour les espaces détente.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_coussin.png?sp=r&st=2023-06-14T19:47:13Z&se=2023-10-05T03:47:13Z&sv=2022-11-02&sr=b&sig=%2Fc9OgKw5zWiM5XYUokbYGYpKV48%2BMdS6Upxrubw4Ung%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_coussin.png?sp=r&st=2023-06-14T19:47:13Z&se=2023-10-05T03:47:13Z&sv=2022-11-02&sr=b&sig=%2Fc9OgKw5zWiM5XYUokbYGYpKV48%2BMdS6Upxrubw4Ung%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_coussin.png?sp=r&st=2023-06-14T19:47:13Z&se=2023-10-05T03:47:13Z&sv=2022-11-02&sr=b&sig=%2Fc9OgKw5zWiM5XYUokbYGYpKV48%2BMdS6Upxrubw4Ung%3D",
        },
      ]),
      price: 60,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Basse Concept Design",
      description:
        "La Table Basse Concept Design est une pièce maîtresse qui attire l'attention dans tout salon. Son design unique offre un espace de stockage et une fonctionnalité sans compromis sur le style.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_design.png?sp=r&st=2023-06-14T19:47:48Z&se=2023-11-10T04:47:48Z&sv=2022-11-02&sr=b&sig=0sYoJQwlleewwIofPqBPE%2BWRz%2FVLjyr0kfeRnPVKeHA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_design.png?sp=r&st=2023-06-14T19:47:48Z&se=2023-11-10T04:47:48Z&sv=2022-11-02&sr=b&sig=0sYoJQwlleewwIofPqBPE%2BWRz%2FVLjyr0kfeRnPVKeHA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_design.png?sp=r&st=2023-06-14T19:47:48Z&se=2023-11-10T04:47:48Z&sv=2022-11-02&sr=b&sig=0sYoJQwlleewwIofPqBPE%2BWRz%2FVLjyr0kfeRnPVKeHA%3D",
        },
      ]),
      price: 50,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Basse Classique Élégante",
      description:
        "La Table Basse Classique Élégante apporte une touche de charme vintage à votre salon. Son design raffiné et sa finition antique ajoutent une touche d'élégance à tout espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_elegant.png?sp=r&st=2023-06-14T19:48:17Z&se=2023-10-26T03:48:17Z&sv=2022-11-02&sr=b&sig=%2Bui5xZ6QKG1gaA4IdVO8txX9GcIIR2%2FzM2YPEGA5JqA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_elegant.png?sp=r&st=2023-06-14T19:48:17Z&se=2023-10-26T03:48:17Z&sv=2022-11-02&sr=b&sig=%2Bui5xZ6QKG1gaA4IdVO8txX9GcIIR2%2FzM2YPEGA5JqA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_elegant.png?sp=r&st=2023-06-14T19:48:17Z&se=2023-10-26T03:48:17Z&sv=2022-11-02&sr=b&sig=%2Bui5xZ6QKG1gaA4IdVO8txX9GcIIR2%2FzM2YPEGA5JqA%3D",
        },
      ]),
      price: 300,
      promotion: 280,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Basse Géométrique Audacieuse",
      description:
        "La Table Basse Géométrique Audacieuse est une pièce qui attire l'attention avec son design contemporain. Les formes géométriques audacieuses ajoutent un élément visuel attrayant à votre salon.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_geometrique.png?sp=r&st=2023-06-14T19:48:42Z&se=2023-10-13T03:48:42Z&sv=2022-11-02&sr=b&sig=jf0tWTC%2F7EHek2%2BrDLokmE4KyOa0flFr8J9FmRwByYs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_geometrique.png?sp=r&st=2023-06-14T19:48:42Z&se=2023-10-13T03:48:42Z&sv=2022-11-02&sr=b&sig=jf0tWTC%2F7EHek2%2BrDLokmE4KyOa0flFr8J9FmRwByYs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_geometrique.png?sp=r&st=2023-06-14T19:48:42Z&se=2023-10-13T03:48:42Z&sv=2022-11-02&sr=b&sig=jf0tWTC%2F7EHek2%2BrDLokmE4KyOa0flFr8J9FmRwByYs%3D",
        },
      ]),
      price: 100,
      quantity: 100,
      materialId: 3,
    },
    {
      name: "Table Basse Malle Vintage",
      description:
        "La Table Basse Malle Vintage apporte une touche d'originalité à votre salon. Sa conception unique en forme de malle offre une grande capacité de stockage tout en servant de point de mire.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_malle.png?sp=r&st=2023-06-14T19:49:52Z&se=2023-11-09T04:49:52Z&sv=2022-11-02&sr=b&sig=7ot%2BtW2bhcpswpDSMmMsTvW%2FK5EiVGk1jxFHZevlSYs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_malle.png?sp=r&st=2023-06-14T19:49:52Z&se=2023-11-09T04:49:52Z&sv=2022-11-02&sr=b&sig=7ot%2BtW2bhcpswpDSMmMsTvW%2FK5EiVGk1jxFHZevlSYs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_malle.png?sp=r&st=2023-06-14T19:49:52Z&se=2023-11-09T04:49:52Z&sv=2022-11-02&sr=b&sig=7ot%2BtW2bhcpswpDSMmMsTvW%2FK5EiVGk1jxFHZevlSYs%3D",
        },
      ]),
      price: 115,
      promotion: 110,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Basse Métal Urbain",
      description:
        "La Table Basse Métal Urbain offre un style industriel à votre salon. Son cadre en métal robuste et sa finition polie ajoutent une touche de modernité à tout espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_metal.png?sp=r&st=2023-06-14T19:50:19Z&se=2023-11-10T04:50:19Z&sv=2022-11-02&sr=b&sig=U2p21ittA3cIgrehA3oOKjRD1uN0WLbKK6XHY4jfA0c%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_metal.png?sp=r&st=2023-06-14T19:50:19Z&se=2023-11-10T04:50:19Z&sv=2022-11-02&sr=b&sig=U2p21ittA3cIgrehA3oOKjRD1uN0WLbKK6XHY4jfA0c%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_metal.png?sp=r&st=2023-06-14T19:50:19Z&se=2023-11-10T04:50:19Z&sv=2022-11-02&sr=b&sig=U2p21ittA3cIgrehA3oOKjRD1uN0WLbKK6XHY4jfA0c%3D",
        },
      ]),
      price: 25,
      quantity: 100,
      materialId: 3,
    },
    {
      name: "Table Basse Ronde Harmonie",
      description:
        "La Table Basse Ronde Harmonie ajoute une touche d'élégance à votre salon. Son design rond offre un look harmonieux, rendant l'espace plus accueillant.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_rond.png?sp=r&st=2023-06-14T19:50:43Z&se=2023-11-02T04:50:43Z&sv=2022-11-02&sr=b&sig=KGlxqrhTo4E6aUCoooKDx3sQpRAqfdAPsLZ4EPUGO0Q%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_rond.png?sp=r&st=2023-06-14T19:50:43Z&se=2023-11-02T04:50:43Z&sv=2022-11-02&sr=b&sig=KGlxqrhTo4E6aUCoooKDx3sQpRAqfdAPsLZ4EPUGO0Q%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_rond.png?sp=r&st=2023-06-14T19:50:43Z&se=2023-11-02T04:50:43Z&sv=2022-11-02&sr=b&sig=KGlxqrhTo4E6aUCoooKDx3sQpRAqfdAPsLZ4EPUGO0Q%3D",
        },
      ]),
      price: 90,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Basse Noir Sophistiquée",
      description:
        "La Table Basse Noir Sophistiquée est une pièce chic qui apporte de l'élégance à votre salon. Sa finition noire et son design moderne sont parfaits pour un décor contemporain.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_simple.png?sp=r&st=2023-06-14T19:51:02Z&se=2023-11-10T04:51:02Z&sv=2022-11-02&sr=b&sig=dJCi3KYRoEczWLNih9wYgBOL5BqQUmABhmkcLslUwLs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_simple.png?sp=r&st=2023-06-14T19:51:02Z&se=2023-11-10T04:51:02Z&sv=2022-11-02&sr=b&sig=dJCi3KYRoEczWLNih9wYgBOL5BqQUmABhmkcLslUwLs%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_simple.png?sp=r&st=2023-06-14T19:51:02Z&se=2023-11-10T04:51:02Z&sv=2022-11-02&sr=b&sig=dJCi3KYRoEczWLNih9wYgBOL5BqQUmABhmkcLslUwLs%3D",
        },
      ]),
      price: 28,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Basse Vitrage Élégante",
      description:
        "La Table Basse Vitrage Élégant est une pièce d'art fonctionnelle. Sa surface en verre permet de voir à travers, rendant votre salon plus spacieux et lumineux.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_vitre.png?sp=r&st=2023-06-14T19:51:30Z&se=2023-11-10T04:51:30Z&sv=2022-11-02&sr=b&sig=ulK0noOG71uccrlFRwQyOK%2BNEWxOSGN%2BHkpWNwJV%2Boc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_vitre.png?sp=r&st=2023-06-14T19:51:30Z&se=2023-11-10T04:51:30Z&sv=2022-11-02&sr=b&sig=ulK0noOG71uccrlFRwQyOK%2BNEWxOSGN%2BHkpWNwJV%2Boc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/produits/table_basse_vitre.png?sp=r&st=2023-06-14T19:51:30Z&se=2023-11-10T04:51:30Z&sv=2022-11-02&sr=b&sig=ulK0noOG71uccrlFRwQyOK%2BNEWxOSGN%2BHkpWNwJV%2Boc%3D",
        },
      ]),
      price: 100,
      promotion: 70,
      quantity: 100,
      materialId: 7,
    },
  ]

  await insertProducts(db, "Table Basse", tableBasse)

  const tables = [
    {
      name: "Table Carrée Éclatante Blanche",
      description:
        "La Table Carrée Éclatante Blanche donne une touche d'éclat et d'élégance à n'importe quelle pièce. Parfaite pour les dîners intimes ou les grandes réceptions.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/ashley-byrd-bQDDg-h-MmM-unsplash.jpg?sp=r&st=2023-06-14T19:51:59Z&se=2023-10-12T03:51:59Z&sv=2022-11-02&sr=b&sig=133Qxyacmo3vdsJmDmU6wpE%2FyU%2BebKvn4ct6CgpqiW4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/ashley-byrd-bQDDg-h-MmM-unsplash.jpg?sp=r&st=2023-06-14T19:51:59Z&se=2023-10-12T03:51:59Z&sv=2022-11-02&sr=b&sig=133Qxyacmo3vdsJmDmU6wpE%2FyU%2BebKvn4ct6CgpqiW4%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/ashley-byrd-bQDDg-h-MmM-unsplash.jpg?sp=r&st=2023-06-14T19:51:59Z&se=2023-10-12T03:51:59Z&sv=2022-11-02&sr=b&sig=133Qxyacmo3vdsJmDmU6wpE%2FyU%2BebKvn4ct6CgpqiW4%3D",
        },
      ]),
      price: 460,
      promotion: 350,
      quantity: 100,
      materialId: 6,
    },
    {
      name: "Table Longue Élégante en Bois",
      description:
        "La Table Longue Élégante en Bois est idéale pour les grandes familles ou les soirées entre amis. Son bois naturel ajoute une chaleur rustique à votre maison.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/beazy-eolyFaY8940-unsplash.jpg?sp=r&st=2023-06-14T19:52:24Z&se=2023-10-12T03:52:24Z&sv=2022-11-02&sr=b&sig=aIKx0EasRl5TE3MU133vw6FnSgwe9V3iS3jBz6LFC4g%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/beazy-eolyFaY8940-unsplash.jpg?sp=r&st=2023-06-14T19:52:24Z&se=2023-10-12T03:52:24Z&sv=2022-11-02&sr=b&sig=aIKx0EasRl5TE3MU133vw6FnSgwe9V3iS3jBz6LFC4g%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/beazy-eolyFaY8940-unsplash.jpg?sp=r&st=2023-06-14T19:52:24Z&se=2023-10-12T03:52:24Z&sv=2022-11-02&sr=b&sig=aIKx0EasRl5TE3MU133vw6FnSgwe9V3iS3jBz6LFC4g%3D",
        },
      ]),
      price: 1600,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table de Salon Avant-gardiste",
      description:
        "La Table de Salon Avant-gardiste apporte une sensation de modernité à votre espace de vie. Sa conception contemporaine s'harmonise parfaitement avec un intérieur moderne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/beazy-JggpIf_rt4E-unsplash.jpg?sp=r&st=2023-06-14T19:52:46Z&se=2023-11-15T04:52:46Z&sv=2022-11-02&sr=b&sig=74WQoZKmGlY%2BaUNilsJTigws5nV6PliigYnlDshXoIg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/beazy-JggpIf_rt4E-unsplash.jpg?sp=r&st=2023-06-14T19:52:46Z&se=2023-11-15T04:52:46Z&sv=2022-11-02&sr=b&sig=74WQoZKmGlY%2BaUNilsJTigws5nV6PliigYnlDshXoIg%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/beazy-JggpIf_rt4E-unsplash.jpg?sp=r&st=2023-06-14T19:52:46Z&se=2023-11-15T04:52:46Z&sv=2022-11-02&sr=b&sig=74WQoZKmGlY%2BaUNilsJTigws5nV6PliigYnlDshXoIg%3D",
        },
      ]),
      price: 1000,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Noire Simple Sophistiquée",
      description:
        "La Table Noire Simple Sophistiquée offre un style minimaliste et élégant. Sa finition noire apporte une touche de sophistication à tout intérieur.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/edgar-vnjMGEb55VQ-unsplash.jpg?sp=r&st=2023-06-14T19:54:59Z&se=2023-11-08T04:54:59Z&sv=2022-11-02&sr=b&sig=KpkfOVBcnRYhf682dmXzq6u3MtU5ypF6KS70OOk7FWc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/edgar-vnjMGEb55VQ-unsplash.jpg?sp=r&st=2023-06-14T19:54:59Z&se=2023-11-08T04:54:59Z&sv=2022-11-02&sr=b&sig=KpkfOVBcnRYhf682dmXzq6u3MtU5ypF6KS70OOk7FWc%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/edgar-vnjMGEb55VQ-unsplash.jpg?sp=r&st=2023-06-14T19:54:59Z&se=2023-11-08T04:54:59Z&sv=2022-11-02&sr=b&sig=KpkfOVBcnRYhf682dmXzq6u3MtU5ypF6KS70OOk7FWc%3D",
        },
      ]),
      price: 400,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Haute de Salon Majestueuse",
      description:
        "La Table Haute de Salon Majestueuse est un ajout élégant à votre salon. Sa hauteur la rend idéale pour une utilisation comme table d'appoint ou de décoration.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jean-philippe-delberghe-F0DdaYs0EeQ-unsplash.jpg?sp=r&st=2023-06-14T19:55:37Z&se=2023-10-26T03:55:37Z&sv=2022-11-02&sr=b&sig=bdNjbqni6Oty%2FZLafqjWaiMygieffdKIWDVZhm%2FWumQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jean-philippe-delberghe-F0DdaYs0EeQ-unsplash.jpg?sp=r&st=2023-06-14T19:55:37Z&se=2023-10-26T03:55:37Z&sv=2022-11-02&sr=b&sig=bdNjbqni6Oty%2FZLafqjWaiMygieffdKIWDVZhm%2FWumQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jean-philippe-delberghe-F0DdaYs0EeQ-unsplash.jpg?sp=r&st=2023-06-14T19:55:37Z&se=2023-10-26T03:55:37Z&sv=2022-11-02&sr=b&sig=bdNjbqni6Oty%2FZLafqjWaiMygieffdKIWDVZhm%2FWumQ%3D",
        },
      ]),
      price: 3200,
      quantity: 100,
      materialId: 5,
    },
    {
      name: "Table Éclatante en Verre",
      description:
        "La Table Éclatante en Verre est une pièce d'art fonctionnelle qui apporte une touche d'élégance à votre salon. Sa surface en verre ajoute de la luminosité à votre espace.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jean-philippe-delberghe-ipQ8lzUM4Rk-unsplash.jpg?sp=r&st=2023-06-14T19:55:59Z&se=2023-10-18T03:55:59Z&sv=2022-11-02&sr=b&sig=6Mn6%2BigrIAddulsdL5DHWK%2B3d2SjjKyzuiBjpJuvDkE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jean-philippe-delberghe-ipQ8lzUM4Rk-unsplash.jpg?sp=r&st=2023-06-14T19:55:59Z&se=2023-10-18T03:55:59Z&sv=2022-11-02&sr=b&sig=6Mn6%2BigrIAddulsdL5DHWK%2B3d2SjjKyzuiBjpJuvDkE%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jean-philippe-delberghe-ipQ8lzUM4Rk-unsplash.jpg?sp=r&st=2023-06-14T19:55:59Z&se=2023-10-18T03:55:59Z&sv=2022-11-02&sr=b&sig=6Mn6%2BigrIAddulsdL5DHWK%2B3d2SjjKyzuiBjpJuvDkE%3D",
        },
      ]),
      price: 1780,
      promotion: 1600,
      quantity: 100,
      materialId: 7,
    },
    {
      name: "Table Simple Essentielle",
      description:
        "La Table Simple Essentielle est une pièce polyvalente qui s'intègre facilement dans n'importe quel décor. Parfaite pour une utilisation quotidienne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jose-losada-9dRBM8Qw2TE-unsplash.jpg?sp=r&st=2023-06-14T19:56:23Z&se=2023-11-16T04:56:23Z&sv=2022-11-02&sr=b&sig=WmpUK5zhOFXXG6%2F%2BazCyU21PNJY7JLtqKuYtVDHgMco%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jose-losada-9dRBM8Qw2TE-unsplash.jpg?sp=r&st=2023-06-14T19:56:23Z&se=2023-11-16T04:56:23Z&sv=2022-11-02&sr=b&sig=WmpUK5zhOFXXG6%2F%2BazCyU21PNJY7JLtqKuYtVDHgMco%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/jose-losada-9dRBM8Qw2TE-unsplash.jpg?sp=r&st=2023-06-14T19:56:23Z&se=2023-11-16T04:56:23Z&sv=2022-11-02&sr=b&sig=WmpUK5zhOFXXG6%2F%2BazCyU21PNJY7JLtqKuYtVDHgMco%3D",
        },
      ]),
      price: 520,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table à Pieds Fins Élégante",
      description:
        "La Table à Pieds Fins Élégante est une pièce délicate et raffinée qui ajoute une touche d'élégance à n'importe quel espace. Ses pieds fins lui confèrent une allure légère et aérienne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/lui-peng-eHytul-4rmo-unsplash.jpg?sp=r&st=2023-06-14T19:56:44Z&se=2023-10-13T03:56:44Z&sv=2022-11-02&sr=b&sig=At0WoOkW7Zm9FpGcccAf%2BtLmQBo5vLonI3mpQQ%2F3cOQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/lui-peng-eHytul-4rmo-unsplash.jpg?sp=r&st=2023-06-14T19:56:44Z&se=2023-10-13T03:56:44Z&sv=2022-11-02&sr=b&sig=At0WoOkW7Zm9FpGcccAf%2BtLmQBo5vLonI3mpQQ%2F3cOQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/lui-peng-eHytul-4rmo-unsplash.jpg?sp=r&st=2023-06-14T19:56:44Z&se=2023-10-13T03:56:44Z&sv=2022-11-02&sr=b&sig=At0WoOkW7Zm9FpGcccAf%2BtLmQBo5vLonI3mpQQ%2F3cOQ%3D",
        },
      ]),
      price: 960,
      quantity: 100,
      materialId: 5,
    },
    {
      name: "Table Large Spacieuse",
      description:
        "La Table Large Spacieuse est parfaite pour les grandes familles et les soirées. Sa largeur permet d'accueillir plusieurs convives confortablement.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/stephan-coudassot-xstTzTRiJ4k-unsplash.jpg?sp=r&st=2023-06-14T19:57:03Z&se=2023-11-10T04:57:03Z&sv=2022-11-02&sr=b&sig=cepnCfil%2BJl7vniRk5lyu2rVUlLG%2Fmj%2BoXfqIrrF8cw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/stephan-coudassot-xstTzTRiJ4k-unsplash.jpg?sp=r&st=2023-06-14T19:57:03Z&se=2023-11-10T04:57:03Z&sv=2022-11-02&sr=b&sig=cepnCfil%2BJl7vniRk5lyu2rVUlLG%2Fmj%2BoXfqIrrF8cw%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/stephan-coudassot-xstTzTRiJ4k-unsplash.jpg?sp=r&st=2023-06-14T19:57:03Z&se=2023-11-10T04:57:03Z&sv=2022-11-02&sr=b&sig=cepnCfil%2BJl7vniRk5lyu2rVUlLG%2Fmj%2BoXfqIrrF8cw%3D",
        },
      ]),
      price: 3900,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Table Ronde Blanche Harmonieuse",
      description:
        "La Table Ronde Blanche Harmonieuse ajoute une touche d'élégance à votre salon. Son design rond offre un look harmonieux, rendant l'espace plus accueillant.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/tabitha-turner-rhcllVy2zBU-unsplash.jpg?sp=r&st=2023-06-14T19:57:25Z&se=2023-10-13T03:57:25Z&sv=2022-11-02&sr=b&sig=3dYmyoLV4i9h98UAKAwJGv5rVdBrtAV09fEiCNoJ6FQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/tabitha-turner-rhcllVy2zBU-unsplash.jpg?sp=r&st=2023-06-14T19:57:25Z&se=2023-10-13T03:57:25Z&sv=2022-11-02&sr=b&sig=3dYmyoLV4i9h98UAKAwJGv5rVdBrtAV09fEiCNoJ6FQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/table/tabitha-turner-rhcllVy2zBU-unsplash.jpg?sp=r&st=2023-06-14T19:57:25Z&se=2023-10-13T03:57:25Z&sv=2022-11-02&sr=b&sig=3dYmyoLV4i9h98UAKAwJGv5rVdBrtAV09fEiCNoJ6FQ%3D",
        },
      ]),
      price: 700,
      quantity: 100,
      materialId: 4,
    },
  ]

  await insertProducts(db, "Table", tables)

  const chaises = [
    {
      name: "Chaise Confort Absolu",
      description:
        "La Chaise Confort Absolu est conçue pour le confort et le soutien. Son rembourrage généreux et sa conception ergonomique en font un choix idéal pour les longues sessions de travail ou de détente.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/behnam-norouzi-phXwnWWz-BM-unsplash.jpg?sp=r&st=2023-06-14T19:58:02Z&se=2023-11-09T04:58:02Z&sv=2022-11-02&sr=b&sig=enZXOwLkx9eWmCKr6A%2B9ize7xRwe2e5qQpclQrz3c1I%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/behnam-norouzi-phXwnWWz-BM-unsplash.jpg?sp=r&st=2023-06-14T19:58:02Z&se=2023-11-09T04:58:02Z&sv=2022-11-02&sr=b&sig=enZXOwLkx9eWmCKr6A%2B9ize7xRwe2e5qQpclQrz3c1I%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/behnam-norouzi-phXwnWWz-BM-unsplash.jpg?sp=r&st=2023-06-14T19:58:02Z&se=2023-11-09T04:58:02Z&sv=2022-11-02&sr=b&sig=enZXOwLkx9eWmCKr6A%2B9ize7xRwe2e5qQpclQrz3c1I%3D",
        },
      ]),
      price: 70,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Chaise Ancienne Charmante",
      description:
        "La Chaise Ancienne Charmante vous transporte dans une autre époque avec son design vintage. Parfaite pour ajouter une touche de charme antique à votre intérieur.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/daniil-silantev-1P6AnKDw6S8-unsplash.jpg?sp=r&st=2023-06-14T19:58:18Z&se=2023-10-12T03:58:18Z&sv=2022-11-02&sr=b&sig=Wfu3IRh6tbqZYrXFw%2BDUysfa%2FdGtwDmFMPSrATC8hg8%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/daniil-silantev-1P6AnKDw6S8-unsplash.jpg?sp=r&st=2023-06-14T19:58:18Z&se=2023-10-12T03:58:18Z&sv=2022-11-02&sr=b&sig=Wfu3IRh6tbqZYrXFw%2BDUysfa%2FdGtwDmFMPSrATC8hg8%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/daniil-silantev-1P6AnKDw6S8-unsplash.jpg?sp=r&st=2023-06-14T19:58:18Z&se=2023-10-12T03:58:18Z&sv=2022-11-02&sr=b&sig=Wfu3IRh6tbqZYrXFw%2BDUysfa%2FdGtwDmFMPSrATC8hg8%3D",
        },
      ]),
      price: 140,
      quantity: 100,
      materialId: 3,
    },
    {
      name: "Chaise Haute Majestueuse",
      description:
        "La Chaise Haute Majestueuse se démarque par son design élégant et son assise surélevée. Idéale pour un bar à la maison ou une table de cuisine haute.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/djebi-abraham-philippe-uNZ3wWKsnuQ-unsplash.jpg?sp=r&st=2023-06-14T19:58:41Z&se=2023-10-05T03:58:41Z&sv=2022-11-02&sr=b&sig=wHEY%2FwW9VSsim5s8HZoT1Dvne9c08p3SxY0iSTbzfhQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/djebi-abraham-philippe-uNZ3wWKsnuQ-unsplash.jpg?sp=r&st=2023-06-14T19:58:41Z&se=2023-10-05T03:58:41Z&sv=2022-11-02&sr=b&sig=wHEY%2FwW9VSsim5s8HZoT1Dvne9c08p3SxY0iSTbzfhQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/djebi-abraham-philippe-uNZ3wWKsnuQ-unsplash.jpg?sp=r&st=2023-06-14T19:58:41Z&se=2023-10-05T03:58:41Z&sv=2022-11-02&sr=b&sig=wHEY%2FwW9VSsim5s8HZoT1Dvne9c08p3SxY0iSTbzfhQ%3D",
        },
      ]),
      price: 90,
      quantity: 100,
      materialId: 1,
    },
    {
      name: "Chaise Moderne Minimaliste",
      description:
        "La Chaise Moderne Minimaliste apporte une touche contemporaine à votre espace avec son design épuré. Un choix parfait pour ceux qui apprécient le style moderne.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/eugene-chystiakov-3neSwyntbQ8-unsplash.jpg?sp=r&st=2023-06-14T19:58:59Z&se=2023-11-09T04:58:59Z&sv=2022-11-02&sr=b&sig=bm8Qcgw6N1WeWL56AjBtg3gdWq6R99izzhp97KtqoqQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/eugene-chystiakov-3neSwyntbQ8-unsplash.jpg?sp=r&st=2023-06-14T19:58:59Z&se=2023-11-09T04:58:59Z&sv=2022-11-02&sr=b&sig=bm8Qcgw6N1WeWL56AjBtg3gdWq6R99izzhp97KtqoqQ%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/eugene-chystiakov-3neSwyntbQ8-unsplash.jpg?sp=r&st=2023-06-14T19:58:59Z&se=2023-11-09T04:58:59Z&sv=2022-11-02&sr=b&sig=bm8Qcgw6N1WeWL56AjBtg3gdWq6R99izzhp97KtqoqQ%3D",
        },
      ]),
      price: 95,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Chaise Rose Élégante",
      description:
        "La Chaise Rose Élégante apporte une touche de couleur et de féminité à votre espace. Son ton rose doux apporte de la chaleur et de l'élégance à n'importe quelle pièce.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/eugenivy_now-1JJJIHh7-Mk-unsplash.jpg?sp=r&st=2023-06-14T19:59:19Z&se=2023-11-10T04:59:19Z&sv=2022-11-02&sr=b&sig=l4QEh7YC8syoPAhb1ZdWCokNO5MnPhAAcq7lybOGMzA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/eugenivy_now-1JJJIHh7-Mk-unsplash.jpg?sp=r&st=2023-06-14T19:59:19Z&se=2023-11-10T04:59:19Z&sv=2022-11-02&sr=b&sig=l4QEh7YC8syoPAhb1ZdWCokNO5MnPhAAcq7lybOGMzA%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/eugenivy_now-1JJJIHh7-Mk-unsplash.jpg?sp=r&st=2023-06-14T19:59:19Z&se=2023-11-10T04:59:19Z&sv=2022-11-02&sr=b&sig=l4QEh7YC8syoPAhb1ZdWCokNO5MnPhAAcq7lybOGMzA%3D",
        },
      ]),
      price: 60,
      quantity: 100,
      materialId: 2,
    },
    {
      name: "Chaise Rustique en Bois",
      description:
        "La Chaise Rustique en Bois combine la robustesse du bois avec une esthétique rustique. Parfaite pour donner une sensation de nature à votre maison.",
      image: JSON.stringify([
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/jesse-donoghoe-1BHQ22EL3NI-unsplash.jpg?sp=r&st=2023-06-14T19:59:40Z&se=2023-11-02T04:59:40Z&sv=2022-11-02&sr=b&sig=GZoW%2Fx%2BMX2zxeOiiVrexDk2TYO0PmTHkwZBEFZdfTEM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/jesse-donoghoe-1BHQ22EL3NI-unsplash.jpg?sp=r&st=2023-06-14T19:59:40Z&se=2023-11-02T04:59:40Z&sv=2022-11-02&sr=b&sig=GZoW%2Fx%2BMX2zxeOiiVrexDk2TYO0PmTHkwZBEFZdfTEM%3D",
        },
        {
          url: "https://airnes.blob.core.windows.net/airnes/produits2/chaise/jesse-donoghoe-1BHQ22EL3NI-unsplash.jpg?sp=r&st=2023-06-14T19:59:40Z&se=2023-11-02T04:59:40Z&sv=2022-11-02&sr=b&sig=GZoW%2Fx%2BMX2zxeOiiVrexDk2TYO0PmTHkwZBEFZdfTEM%3D",
        },
      ]),
      price: 100,
      quantity: 100,
      materialId: 2,
    },
  ]

  await insertProducts(db, "Chaise", chaises)

  const products = await db("product").select("*")

  const category = await db("category").select("*")

  const material = await db("material").select("*")

  await insertSelectedCategories(db, category)

  await insertSelectedMaterials(db, material)

  await insertSelectedProducts(db, products)

  await insertCarousel(db)
}

const insertSelectedCategories = async (db, categories) => {
  const selectedCategories = categories
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  await db("selected_category").insert(
    selectedCategories.map((category, index) => ({
      category_id: category.id,
      order: index + 1,
    }))
  )
}

const insertSelectedProducts = async (db, products) => {
  const selectedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3)

  await db("selected_product").insert(
    selectedProducts.map((product, index) => ({
      product_id: product.id,
      order: index + 1,
    }))
  )
}

const insertSelectedMaterials = async (db, materials) => {
  const selectedMaterials = materials
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

  await db("selected_material").insert(
      selectedMaterials.map((material, index) => ({
        material_id: material.id,
        order: index + 1,
      }))
  )
}


const insertProducts = async (db, categoryName, productData) => {
  const categoryIdVal = await categoryId(db, categoryName)

  const productCategory = productData.map((product) => ({
    ...product,
    categoryId: categoryIdVal,
  }))

  await db("product").insert(productCategory)

  return productCategory
}

const insertCategories = async (db) => {
  const categories = [
    {
      name: "Table Basse",
      description:
        "Une variété de tables basses pour s'adapter à n'importe quel salon ou espace de vie.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits2/table%20basse/photo-1581428982868-e410dd047a90.png?sp=r&st=2023-06-14T20:00:19Z&se=2023-11-08T05:00:19Z&sv=2022-11-02&sr=b&sig=S56jM5W6b3PVaBU6Dp56V0tof22PZ0zeukTLCgEEGRs%3D",
    },
    {
      name: "Table",
      description:
        "Tables pour diverses utilisations, des tables à manger aux tables d'appoint.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/table/stephan-coudassot-xstTzTRiJ4k-unsplash.jpg?sp=r&st=2023-06-07T11:53:20Z&se=2023-11-09T20:53:20Z&sv=2022-11-02&sr=b&sig=SUwW9Oe%2FLldeDhHbE9VNKSoFOL%2BGAs2G%2Fz9y8SGQMtY%3D",
    },
    {
      name: "Armoire",
      description:
        "Armoires spacieuses et élégantes pour tous vos besoins de rangement.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits2/armoire/armoire_category.png?sp=r&st=2023-06-14T20:00:48Z&se=2023-12-06T05:00:48Z&sv=2022-11-02&sr=b&sig=9tIws%2B3RZiLywCszRg22RVKTAUd4aaxXILiNCbOkjqw%3D",
    },
    {
      name: "Bureau",
      description:
        "Des bureaux fonctionnels et bien conçus pour votre espace de travail à domicile.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits2/bureau/photo-1621570361070-896021ba01cc.png?sp=r&st=2023-06-14T20:01:12Z&se=2023-10-18T04:01:12Z&sv=2022-11-02&sr=b&sig=OKwAhfQnHRLEj149TjPVUXja9oVzlQfXvU0eOl6BlTA%3D",
    },
    {
      name: "Lit",
      description: "Des lits confortables pour une bonne nuit de sommeil.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/lit/laura-adai-j67CwQzRLPg-unsplash.jpg?sp=r&st=2023-06-07T11:44:23Z&se=2023-10-12T19:44:23Z&sv=2022-11-02&sr=b&sig=oTp1gytmLs3lPamtHmJfS5eePFoq%2BgZoCIhjl%2BKfN7o%3D",
    },
    {
      name: "Lampe",
      description: "Illuminez votre espace avec notre sélection de lampes.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits2/lampe/photo-1513506003901-1e6a229e2d15.png?sp=r&st=2023-06-14T20:01:39Z&se=2023-12-14T05:01:39Z&sv=2022-11-02&sr=b&sig=VtItAsLotcCK9jPBRkwpv8YBZ%2F0GLTzebIAryILehhQ%3D",
    },
    {
      name: "Chaise",
      description:
        "Chaises confortables pour votre salon, salle à manger et plus encore.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/chaise/jesse-donoghoe-1BHQ22EL3NI-unsplash.jpg?sp=r&st=2023-06-07T11:56:00Z&se=2023-10-04T19:56:00Z&sv=2022-11-02&sr=b&sig=pm%2BKJ%2B636Rp45XRLCx3B%2FKOfwBAPWBcOC3xTevEGjcs%3D",
    },
    {
      name: "Chevet",
      description:
        "Tables de chevet pratiques et élégantes pour votre chambre.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits2/chevet/category_chevet.png?sp=r&st=2023-06-14T20:02:09Z&se=2023-12-19T05:02:09Z&sv=2022-11-02&sr=b&sig=n%2Bhz225AmXtMCjtF38tdJvanYmfSIlkfnoXPPRWR7to%3D",
    },
    {
      name: "Buffet",
      description:
        "Buffets de style pour le stockage supplémentaire dont vous avez besoin.",
      image:
        "https://airnes.blob.core.windows.net/airnes/produits/buffet/photo-1618220048045-10a6dbdf83e0.avif?sp=r&st=2023-06-07T12:31:41Z&se=2023-11-02T21:31:41Z&sv=2022-11-02&sr=b&sig=ML97HSAdSbZnv6F0OelTd6I799sYDvjty4Be1wC9Lls%3D",
    },
  ]

  await db("category").insert({
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
      description: "Ferite",
    },
    {
      id: 2,
      name: "Bois",
      description: "Ferite"
    },
    {
      id: 3,
      name: "Métal",
      description: "Ferite"
    },
    {
      id: 4,
      name: "Aluminium",
      description: "Ferite"
    },
    {
      id: 5,
      name: "Acier",
      description: "Ferite"
    },
    {
      id: 6,
      name: "Plastique",
      description: "Ferite"
    },
    {
      id: 7,
      name: "Verre",
      description: "Ferite"
    },
  ]

  await db("material").insert(materials)
}

const insertCarousel = async (db) => {
  const images = [
    {
      label: "Produit 1",
      url: "https://airnes.blob.core.windows.net/airnes/carrousel2/photo-1522708323590-d24dbb6b0267.png?sp=r&st=2023-06-14T20:06:10Z&se=2023-11-01T05:06:10Z&sv=2022-11-02&sr=b&sig=YJSnbjyCFR%2BJC74Xr0ku1tCfxL%2FHH7ZK7raNIEYQS0U%3D",
      order: 1,
    },
    {
      label: "Produit 2",
      url: "https://airnes.blob.core.windows.net/airnes/carrousel2/photo-1522771739844-6a9f6d5f14af.png?sp=r&st=2023-06-14T20:06:30Z&se=2023-11-17T05:06:30Z&sv=2022-11-02&sr=b&sig=w3FdTxW3hRqT5CS2e56%2FpPpn%2BjTlHO98N9mpbFxWyxY%3D",
      order: 2,
    },
    {
      label: "Produit 3",
      url: "https://airnes.blob.core.windows.net/airnes/carrousel2/photo-1586023492125-27b2c045efd7.png?sp=r&st=2023-06-14T20:06:50Z&se=2023-11-09T05:06:50Z&sv=2022-11-02&sr=b&sig=3%2BeH7lej7pE3Cu0rDq4GN38Rm2Gwibt%2F5auDwFWedrY%3D",
      order: 3,
    },
  ]

  await db("carousel_image").insert(images)
}

module.exports = {
  seed,
}
