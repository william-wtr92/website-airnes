import routes from "@/web/routes"

const addProduct =
  ({ api, jwt }) =>
  async ({
    image,
    name,
    description,
    category,
    price,
    promotion,
    material,
    material2,
    material3,
    quantity,
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
          material2,
          material3,
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

export default addProduct
