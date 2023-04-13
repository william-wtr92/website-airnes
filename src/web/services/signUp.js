import routes from "../routes"

const signUp =
  ({ api }) =>
  async ({ name, mail, password, passwordConfirmation, cgu }) => {
    try {
      const { data } = await api.post(routes.api.signUp(), {
        name,
        mail,
        password,
        passwordConfirmation,
        cgu,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default signUp
