import routes from "../../routes"

const addCarousel =
  ({ api, jwt }) =>
  async ({ url, label }) => {
    try {
      const { data } = await api.post(routes.api.carousel.addImage(), {
        url,
        label,
        jwt,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addCarousel