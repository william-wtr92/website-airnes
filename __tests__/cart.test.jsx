import { fireEvent, render, screen } from "@testing-library/react"
import Cart from "@/pages/user/cart"

const mockRemoveFromCart = jest.fn()
const mockUpdateCartQuantity = jest.fn()

jest.mock("@/web/hooks/useAppContext", () => ({
  __esModule: true,
  default: () => ({
    state: {
      session: "",
      cartItems: [
        {
          id: "1",
          name: "Table en bois",
          price: 125,
          quantity: 1,
          product_quantity: 1,
          description: "A product",
          image: [{ url: "https://example.com/image.png" }],
        },
      ],
    },
    actions: {
      removeFromCart: mockRemoveFromCart,
      updateCartQuantity: mockUpdateCartQuantity,
    },
  }),
}))

jest.mock("@/components/utils/NavLink", () => ({
  __esModule: true,
  NavLink: ({ children }) => <div>{children}</div>,
}))

jest.mock("next-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
    }
  },
  serverSideTranslations: jest.fn().mockReturnValue({ props: {} }),
}))

describe("Cart", () => {
  it("name render", () => {
    render(<Cart />)
    expect(screen.getByText("Table en bois")).toBeInTheDocument()
  })

  it("price render", () => {
    render(<Cart />)
    expect(screen.getByText("125 €")).toBeInTheDocument()
  })

  it("quantity render", () => {
    render(<Cart />)
    const quantityInput = screen.getByDisplayValue("1")
    expect(quantityInput).toBeInTheDocument()
    expect(quantityInput).toHaveValue(1)
  })

  it("delete", () => {
    render(<Cart />)
    fireEvent.click(screen.getByTestId("trash-button-1"))
    expect(mockRemoveFromCart).toBeCalledWith("1")
  })

  it("update quantity", () => {
    render(<Cart />)
    fireEvent.change(screen.getByDisplayValue("1"), { target: { value: "3" } })
    expect(mockUpdateCartQuantity).toBeCalledWith("1", 1)
  })
})
