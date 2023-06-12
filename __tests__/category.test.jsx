import Category from "@/pages/categories/[categoryId]/category"
import { render } from "@testing-library/react"

import { screen } from "@testing-library/react"

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
  }),
}))

jest.mock("axios")
jest.mock("next-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
  },
  serverSideTranslations: jest.fn().mockReturnValue({ props: {} })
}))

describe("CategoryPage", () => {
  it("display components", async () => {
    const category = {
      id: 3,
      name: "Armoire",
      description: "Armoires spacieuses et élégantes pour tous vos besoins de rangement.",
      image: "https://airnes.blob.core.windows.net/airnes/produits/armoire/armoire_category.avif?sp=r&st=2023-06-07T12:31:19Z&se=2023-10-24T20:31:19Z&sv=2022-11-02&sr=b&sig=cmbS%2BLdzvXhwMQ1p%2FQ9t4lgiKCYBmK9mo78%2FHhZkEzM%3D",
      products: [
        {
          categoryId: 3,
          description: "Armoire luxueuse dotée d'une vitrine en verre, parfaite pour exposer vos objets précieux tout en les gardant en sécurité.",
          id: 3,
          image: [{
            url: "https://airnes.blob.core.windows.net/airnes/produits/armoire/produits/armoire_dressing_luxueux.avif?sp=r&st=2023-06-07T11:23:51Z&se=2023-10-04T19:23:51Z&sv=2022-11-02&sr=b&sig=9XAk%2Bp%2FkgkqtcZUnrHl5o%2BNctKQuATw3CUoPf54Mcb4%3D"
          }],
          materialId: 7,
          name: "Armoire Luxueuse avec Vitrine",
          price: 5200,
          promotion: null,
          quantity: 100
        }
      ]
    }

    render(<Category category={category} />)

    expect(screen.getByText(category.name)).toBeInTheDocument()

    expect(screen.getByText(category.description)).toBeInTheDocument()

    expect(screen.getByAltText(category.products[0].name)).toBeInTheDocument()
  })
})