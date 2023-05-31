import { render } from "@testing-library/react"
import Main from "@/pages/index"

describe("Main page", () => {
  it("renders correctly", () => {
    const mockProps = {
      carousel: [],
      categories: [],
      selectedProduct: [],
      products: [],
    }

    const tree = render(<Main {...mockProps} />)
    expect(tree).toMatchSnapshot()
  })
})
