import routes from "../routes"

const signUp =
  ({ api }) =>
  async ({ name, email, password, passwordConfirmation, cgu }) => {
    try {
      const { data } = await api.post(routes.api.signUp(), {
        name,
        email,
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
