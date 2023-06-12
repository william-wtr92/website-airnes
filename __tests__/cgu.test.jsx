import { render } from "@testing-library/react"
import CguPage from "@/pages/help/cgu"

jest.mock("next-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
    }
  },
  serverSideTranslations: jest.fn().mockReturnValue({ props: {} }),
}))

describe("CGU Page", () => {
  it("CGU text", () => {
    const { getByText } = render(<CguPage />)
    expect(getByText(/main/i)).toBeInTheDocument()
    expect(getByText(/\bp1\b/i)).toBeInTheDocument()
    expect(getByText(/\bp2\b/i)).toBeInTheDocument()
    expect(getByText(/\bp3\b/i)).toBeInTheDocument()
    expect(getByText(/\bp4\b/i)).toBeInTheDocument()
    expect(getByText(/\bp5\b/i)).toBeInTheDocument()
    expect(getByText(/\bp6\b/i)).toBeInTheDocument()
    expect(getByText(/\bp7\b/i)).toBeInTheDocument()
    expect(getByText(/\bp8\b/i)).toBeInTheDocument()
    expect(getByText(/\bp9\b/i)).toBeInTheDocument()
    expect(getByText(/\bp10\b/i)).toBeInTheDocument()
    expect(getByText(/\bp11-1\b/i)).toBeInTheDocument()
    expect(getByText(/\bp11-2\b/i)).toBeInTheDocument()
    expect(getByText(/\bp12\b/i)).toBeInTheDocument()
    expect(getByText(/\bp13\b/i)).toBeInTheDocument()
    expect(getByText(/\bp14\b/i)).toBeInTheDocument()
    expect(getByText(/\bend\b/i)).toBeInTheDocument()
  })
})
