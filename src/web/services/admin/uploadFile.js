import routes from "../../routes"

const uploadFile =
  ({ api }) =>
  async ({ file }) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      await api.post(routes.api.uploadFile(), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return [null]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default uploadFile
