import { render, screen, fireEvent } from "@testing-library/react"
import { useRouter } from "next/router"
import Users from "@/components/layouts/navs/Users"
import useAppContext from "@/web/hooks/useAppContext"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

jest.mock("@/web/hooks/useAppContext", () => jest.fn())

describe("Users", () => {
  beforeEach(() => {
    useAppContext.mockReturnValue({
      actions: { logout: jest.fn(), changeLanguage: jest.fn() },
      state: { session: null, cartItems: [] },
    })

    useRouter.mockReturnValue({
      push: jest.fn(),
      pathname: "/",
    })
  })

  it("logo name", () => {
    render(<Users />)
    expect(screen.getByText("Airneis")).toBeInTheDocument()
  })

  it("close bg menu", () => {
    render(<Users />)
    const burgerIcon = screen.getByRole("button")
    fireEvent.click(burgerIcon)

    expect(screen.getByTestId("close-icon")).toBeInTheDocument()
  })

  it("login with no session", () => {
    render(<Users />)
    const burgerIcon = screen.getByRole("button")
    fireEvent.click(burgerIcon)

    expect(screen.getByText("signin")).toBeInTheDocument()
    expect(screen.getByText("signup")).toBeInTheDocument()
  })
})
