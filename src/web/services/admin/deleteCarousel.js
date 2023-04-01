import routes from "@/web/routes"

const deleteCarousel =
  ({ api }) =>
  async (imageId) => {
    try {
      const { data } = await api.delete(
        routes.api.carousel.deleteImage(imageId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteCarousel
