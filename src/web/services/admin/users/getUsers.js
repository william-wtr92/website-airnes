import routes from "@/web/routes"

const getUsers =
  ({ api }) =>
  async (page, order, col) => {
    try {
      const { data } = await api.get(
        routes.api.admin.users.getUsers() +
          `?page=${page}&order=${order}&col=${col}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getUsers
