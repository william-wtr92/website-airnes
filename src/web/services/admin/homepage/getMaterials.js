import routes from "@/web/routes"

const getMaterials =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(routes.api.admin.carousel.getMaterials())

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getMaterials
