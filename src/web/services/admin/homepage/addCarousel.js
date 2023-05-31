import routes from "@/web/routes"

const addCarousel =
  ({ api }) =>
  async ({ url, label }) => {
    try {
      const { data } = await api.post(routes.api.admin.carousel.addImage(), {
        url,
        label,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addCarousel
