import routes from "@/web/routes"

const orderCarousel =
  ({ api, jwt }) =>
  async (imageId, direction) => {
    try {
      const { data } = await api.patch(
        `${routes.api.carousel.changeOrder(imageId)}`,
        {
          direction,
          jwt,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default orderCarousel
