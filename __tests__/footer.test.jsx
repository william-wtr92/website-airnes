import { render, screen } from "@testing-library/react"
import UserFooter from "@/components/layouts/navs/UserFooter"

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
  }),
}))

jest.mock("next-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
    }
  },
  serverSideTranslations: jest.fn().mockReturnValue({ props: {} }),
}))

describe("UserFooter", () => {
  beforeEach(() => {
    render(<UserFooter />)
  })
  it("legal", () => {
    expect(screen.getByText("legal")).toBeInTheDocument()
  })

  it("contact", () => {
    expect(screen.getByText("contact")).toBeInTheDocument()
  })

  it("cgu", () => {
    expect(screen.getByText("cgu")).toBeInTheDocument()
  })

  it("icons", () => {
    const socialMediaIcons = screen.getAllByTestId("icon")
    expect(socialMediaIcons.length).toEqual(3)
  })
})
