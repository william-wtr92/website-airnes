import { render, screen, waitFor } from "@testing-library/react"
import HomepageCategories from "@/components/app/content/HomepageCategories"
import axios from "axios"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

useRouter.mockImplementation(() => ({
  asPath: "/",
  push: jest.fn(),
}))

jest.mock("axios")

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

describe("HomepageCategories", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        result: mockCategories,
      },
    })
  })

  it("renders the component correctly", async () => {
    render(<HomepageCategories />)
    const loadingText = screen.getByText(/Loading .../i)
    expect(loadingText).toBeInTheDocument()

    await waitFor(() => {
      const categoryName = screen.getByText(/Category 1/i)
      expect(categoryName).toBeInTheDocument()
    })
  })
})
