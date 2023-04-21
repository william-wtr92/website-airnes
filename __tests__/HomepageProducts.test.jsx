import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import HomepageProducts from "@/components/app/content/HomepageProducts"
import axios from "axios"
import { useRouter } from "next/router"

jest.mock("axios")

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

describe("HomepageProducts", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        result: [
          {
            user: {
              id: 1,
              name: "Product 1",
              image: "https://example.com/image1.jpg",
              order: 1,
            },
          },
        ],
      },
    })
  })

  it("renders the component correctly", async () => {
    render(<HomepageProducts initialProducts={mockProducts} />)
    const loadingText = screen.getByText(/Loading .../i)
    expect(loadingText).toBeInTheDocument()

    await waitForElementToBeRemoved(loadingText)

    const productName = await screen.findByText(/Product 1/i)
    expect(productName).toBeInTheDocument()
  })
})
