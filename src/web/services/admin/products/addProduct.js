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
    materials,
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
          quantity,
          materials,
          jwt,
        }
      )
        console.log("services add product")

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oopsy. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addProduct
