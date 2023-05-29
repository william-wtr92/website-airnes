import routes from "@/web/routes"

const contactData =
  ({ api }) =>
  async (contactId) => {
    try {
      const { data } = await api.get(
        routes.api.admin.contacts.contactData(contactId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default contactData
