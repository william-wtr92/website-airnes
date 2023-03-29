import routes from "@/web/routes"

const addProduct =
    ({api, jwt}) =>
        async ({
                   image,
                   name,
                   description,
                   category,
                   price,
                   promotion,
                   material,
                   quantity,
               }) => {
            try {
                const {data} = await api.post(routes.api.createProduct(), {
                    image,
                    name,
                    description,
                    category,
                    price,
                    promotion,
                    material,
                    quantity,
                    jwt,
                })

                return [null, data]
            } catch (err) {
                const error = err.response?.data?.error || "Oopsyyyyyyy. Something went wrong"

                return [Array.isArray(error) ? error : [error]]
            }
        }

export default addProduct