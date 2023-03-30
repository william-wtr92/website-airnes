import routes from "@/web/routes"

const updateContact =
  ({ api, jwt }) =>
  async ({ contactId, status }) => {
    try {
      const { data } = await api.patch(routes.api.updateContact(contactId), {
        status,
        jwt,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updateContact
