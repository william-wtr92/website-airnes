import routes from "@/web/routes"

const getSelectCategory =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(
        `${routes.api.admin.selectCategory.getSelectCategory()}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getSelectCategory
