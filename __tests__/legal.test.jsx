import { render } from "@testing-library/react"
import LegalPage from "@/pages/help/legal"

jest.mock("next-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
    }
  },
  serverSideTranslations: jest.fn().mockReturnValue({ props: {} }),
}))

describe("Legal Page", () => {
  it("Legal text", () => {
    const { getAllByText } = render(<LegalPage />)
    expect(getAllByText(/\bp1\b/i)).toHaveLength(2)
    expect(getAllByText(/\bp1\b/i)).toHaveLength(2)
    expect(getAllByText(/\bp1-1\b/i)).toHaveLength(1)
    expect(getAllByText(/\bp2\b/i)).toHaveLength(2)
    expect(getAllByText(/\bp2-1\b/i)).toHaveLength(1)
    expect(getAllByText(/\bp3\b/i)).toHaveLength(2)
    expect(getAllByText(/\bp3-1\b/i)).toHaveLength(1)
    expect(getAllByText(/\btitle4\b/i)).toHaveLength(1)
    expect(getAllByText(/\bp4\b/i)).toHaveLength(1)
    expect(getAllByText(/\btitle5\b/i)).toHaveLength(1)
    expect(getAllByText(/\bp5\b/i)).toHaveLength(2)
    expect(getAllByText(/\bp5-1\b/i)).toHaveLength(1)
    expect(getAllByText(/\btitle6\b/i)).toHaveLength(1)
    expect(getAllByText(/\bp6\b/i)).toHaveLength(1)
    expect(getAllByText(/\btitle7\b/i)).toHaveLength(1)
    expect(getAllByText(/\bp7\b/i)).toHaveLength(1)
  })
})
