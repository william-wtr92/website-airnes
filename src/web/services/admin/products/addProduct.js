import routes from "@/web/routes"

const addProduct =
  ({ api }) =>
  async ({
    image,
    name,
    description,
    category,
    price,
    promotion,
    material,
    quantity,
    priority
  }) => {
    try {
      const { data } = await api.post(
        routes.api.admin.products.createProduct(),
        {
          image,
          name,
          description,
          category,
          price,
          promotion,
          material,
          quantity,
          priority,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addProduct
