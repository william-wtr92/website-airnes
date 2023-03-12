import routes from "../routes"

const contact =
    ({ api }) =>
        async ({ topic, mail, content }) => {
            try {
                const { data } = await api.post(routes.api.contact(), {
                    topic,
                    mail,
                    content,
                })

                return [null, data]
            } catch (err) {
                const error = err.response?.data?.error || "Oops. Something went wrong"

                return [Array.isArray(error) ? error : [error]]
            }
        }

export default contact