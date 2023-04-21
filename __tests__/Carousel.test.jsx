import { render, screen, waitFor } from "@testing-library/react"
import Carousel from "@/components/app/ui/Carousel"
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

const mockCarousel = [
  {
    id: 1,
    url: "https://example.com/image1.jpg",
    order: 1,
  },
  {
    id: 2,
    url: "https://example.com/image2.jpg",
    order: 2,
  },
]

describe("Carousel", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        result: mockCarousel,
      },
    })
  })

  it("renders the component correctly", async () => {
    render(<Carousel />)
    const loadingText = screen.getByText(/Loading .../i)
    expect(loadingText).toBeInTheDocument()

    await waitFor(() => {
      const carouselSlide1 = screen.getByTestId("carousel-slide-0")
      expect(carouselSlide1.style.backgroundImage).toBe(
        `url(${mockCarousel[0].url})`
      )
    })
  })
})
