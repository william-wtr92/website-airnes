import { render, screen } from "@testing-library/react"
import SlideProducts from "@/components/app/content/SlideProducts"
import mockRouter from "next-router-mock"

jest.mock("next/router", () => ({
  useRouter: () => mockRouter,
}))

describe("SlideProducts", () => {
  it("renders the component correctly with promotion", () => {
    render(
      <SlideProducts
        image="https://example.com/image1.jpg"
        productId={1}
        productName="Product 1"
        productPrice={100}
        promotion={90}
      />
    )

    const productName = screen.getByText(/Product 1/i)
    expect(productName).toBeInTheDocument()

    const productPrice = screen.getByText(/100 €/i)
    expect(productPrice).toBeInTheDocument()

    const promotionPrice = screen.getByText(/90 €/i)
    expect(promotionPrice).toBeInTheDocument()
  })

  it("renders the component correctly without promotion", () => {
    render(
      <SlideProducts
        image="https://example.com/image2.jpg"
        productId={2}
        productName="Product 2"
        productPrice={200}
      />
    )

    const productName = screen.getByText(/Product 2/i)
    expect(productName).toBeInTheDocument()

    const productPrice = screen.getByText(/200 €/i)
    expect(productPrice).toBeInTheDocument()
  })
})
