import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Contact from "@/pages/support/contact"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router"

jest.mock("@/web/hooks/useAppContext")
jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key) => key })
}))
jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))

describe("Contact Component", () => {
  let mockContact
  let mockRouter

  beforeEach(() => {
    mockContact = jest.fn()
    useAppContext.mockReturnValue({
      actions: { contact: mockContact }
    })

    mockRouter = { push: jest.fn() }
    useRouter.mockReturnValue(mockRouter)
  })

  it("renders contact form", () => {
    render(<Contact />)

    expect(screen.getByLabelText("labelEmail")).toBeInTheDocument()
    expect(screen.getByLabelText("labelSubject")).toBeInTheDocument()
    expect(screen.getByLabelText("labelContent")).toBeInTheDocument()
    expect(screen.getByText("send")).toBeInTheDocument()
  })

  it("submits form and calls contact action", async () => {
    render(<Contact />)

    const email = screen.getByLabelText("labelEmail")
    const subject = screen.getByLabelText("labelSubject")
    const content = screen.getByLabelText("labelContent")
    const button = screen.getByText("send")

    fireEvent.change(email, { target: { value: "test@example.com" } })
    fireEvent.change(subject, { target: { value: "Test Subject" } })
    fireEvent.change(content, { target: { value: "Test Content" } })

    fireEvent.click(button)

    await waitFor(() => {
      expect(mockContact).toHaveBeenCalled()
    })
  })
})
