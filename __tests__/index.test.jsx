import { render, screen } from "@testing-library/react"
import Main, { getServerSideProps } from "@/pages/index"
import axios from "axios"

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
      t: (str) => str,
    }
  },
  serverSideTranslations: jest.fn().mockReturnValue({ props: {} }),
}))

describe("MainPage", () => {
  it("display components", async () => {
    const carousel = [{ id: 1, image: "/image1" }]
    const categories = [
      {
        category: {
          id: 1,
          name: "category1",
          image: "/image1",
        },
      },
    ]

    const products = [
      {
        product: {
          id: 1,
          name: "product1",
          image: [{ url: "/image1" }],
          price: 100,
          promotion: true,
        },
      },
    ]

    const sales = [
      {
        id: 2,
        name: "salesProduct1",
        image: [{ url: "/image2" }],
        price: 200,
        promotion: false,
      },
    ]

    render(
      <Main
        carousel={carousel}
        categories={categories}
        products={products}
        sales={sales}
      />
    )

    expect(screen.getByText(/highlands/i)).toBeInTheDocument()
    expect(screen.getByText(/ourFurniture/i)).toBeInTheDocument()
    expect(screen.getByText(/popularProducts/i)).toBeInTheDocument()
    expect(screen.getByText(/promotions/i)).toBeInTheDocument()

    expect(screen.getAllByAltText(/product1/i)).toHaveLength(2)
    expect(screen.getByAltText(/salesProduct1/i)).toBeInTheDocument()
    expect(screen.getByAltText(/category1$/i)).toBeInTheDocument()
  })

  it("redirect", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"))

    const context = {
      req: {
        cookies: {
          session: "",
        },
      },
      locale: "en",
    }

    const response = await getServerSideProps(context)

    expect(response).toEqual({
      redirect: {
        destination: "/categories/all",
      },
    })
  })
})
