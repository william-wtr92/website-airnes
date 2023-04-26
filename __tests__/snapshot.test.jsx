import { render } from "@testing-library/react"
import Main from "../src/pages/index"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

useRouter.mockImplementation(() => ({
  asPath: "/",
  push: jest.fn(),
}))

const mockProducts = [
  {
    id: 1,
    image: "https://example.com/image1.jpg",
    name: "Product 1",
    price: 100,
    promotion: 10,
  },
  {
    id: 2,
    image: "https://example.com/image2.jpg",
    name: "Product 2",
    price: 200,
    promotion: 20,
  },
]

const mockCategories = [
  {
    user: {
      id: 1,
      image: "https://example.com/image1.jpg",
      name: "Category 1",
    },
  },
  {
    user: {
      id: 2,
      image: "https://example.com/image2.jpg",
      name: "Category 2",
    },
  },
]

const mockCarouselImages = [
  {
    id: 1,
    src: "https://example.com/carousel-image1.jpg",
    alt: "Carousel Image 1",
  },
  {
    id: 2,
    src: "https://example.com/carousel-image2.jpg",
    alt: "Carousel Image 2",
  },
]

it("renders homepage unchanged", () => {
  const { container } = render(
    <Main
      products={mockProducts}
      categories={mockCategories}
      carouselImages={mockCarouselImages}
    />
  )
  expect(container).toMatchSnapshot()
})
