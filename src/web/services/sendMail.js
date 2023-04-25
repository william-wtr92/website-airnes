import routes from "../routes"

const sendMail =
  ({ api }) =>
  async ({ mail }) => {
    try {
      const { data } = await api.post(routes.api.sendMail(), {
        mail,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default sendMail
