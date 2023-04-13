import routes from "@/web/routes"

const updateProduct =
  ({ api, jwt }) =>
  async ({
    productId,
    image,
    name,
    description,
    categoryId,
    price,
    promotion,
    materialId,
    quantity,
  }) => {
    try {
      const { data } = await api.patch(
        routes.api.admin.products.updateProduct(productId),
        {
          image,
          name,
          description,
          categoryId,
          price,
          promotion,
          materialId,
          quantity,
          jwt,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updateProduct
