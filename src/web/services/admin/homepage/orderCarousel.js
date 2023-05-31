import routes from "@/web/routes"

const orderCarousel =
  ({ api }) =>
    async (imageId, direction) => {
      try {
        const { data } = await api.patch(
          `${routes.api.admin.carousel.changeOrder(imageId)}`,
          {
            direction
          }
        )

        return [null, data]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    }

export default orderCarousel
