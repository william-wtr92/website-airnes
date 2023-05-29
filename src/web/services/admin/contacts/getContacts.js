import routes from "@/web/routes"

const getContacts =
  ({ api }) =>
  async (page, order, col) => {
    try {
      const { data } = await api.get(
        routes.api.admin.contacts.getContacts() +
          `?page=${page}&order=${order}&col=${col}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getContacts
