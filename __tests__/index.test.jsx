import { render, screen } from "@testing-library/react"
import Main, { getServerSideProps } from "@/pages/index"
import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

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
  it("display component's", async () => {
    const carousel = [{ id: 1, image: "/image1" }]
    const categories = [
      {
        id: 1,
        user: {
          id: 1,
          name: "category1",
          image: "/image1",
        },
      },
    ]

    const products = [
      {
        id: 1,
        name: "product1",
        image: "/image1",
        price: 100,
        promotion: true,
      },
    ]
    const selectedProduct = [
      {
        id: 2,
        user: {
          id: 2,
          name: "selectedProduct1",
          image: "/image2",
          price: 200,
          promotion: false,
        },
      },
    ]

    const mockResponseData = {
      data: { result: [] },
    }
    axios.get
      .mockResolvedValueOnce(mockResponseData)
      .mockResolvedValueOnce(mockResponseData)
      .mockResolvedValueOnce(mockResponseData)
      .mockResolvedValueOnce(mockResponseData)

    render(
      <Main
        carousel={carousel}
        categories={categories}
        selectedProduct={selectedProduct}
        products={products}
      />
    )

    expect(screen.getByText(/highlands/i)).toBeInTheDocument()
    expect(screen.getByText(/ourFurniture/i)).toBeInTheDocument()
    expect(screen.getByText(/popularProducts/i)).toBeInTheDocument()
    expect(screen.getByText(/promotions/i)).toBeInTheDocument()

    expect(screen.getAllByAltText(/product1/i)).toHaveLength(2)
    expect(screen.getByAltText(/selectedProduct1$/i)).toBeInTheDocument()
    expect(screen.getByAltText(/category1$/i)).toBeInTheDocument()
  })

  it("serverSideProps", async () => {
    const mockResponseData = {
      data: { result: [] },
    }
    axios.get.mockResolvedValueOnce(mockResponseData)

    const response = await getServerSideProps({ locale: "en" })
    expect(response).toEqual({
      props: {
        carousel: [],
        categories: [],
        selectedProduct: [],
        products: [],
        ...(await serverSideTranslations("en", ["common", "footer", "navbar"])),
      },
    })
  })
})
