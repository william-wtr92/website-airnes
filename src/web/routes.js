const createRouteWithQueryParams = (route, query) => {
  if (!query) {
    return route
  }

  const qs = new URLSearchParams(query).toString()

  return `${route}?${qs}`
}

const routes = {
  home: () => "/",
  signUp: () => "/sign-up",
  signIn: () => "/sign-in",
  contact: () => "/contact",
  api: {
    signUp: () => "/sign-up",
    signIn: () => "/sign-in",
    contact: () => "/contact",
    getContacts: () => "/admin/contacts",
    createCategory: () => "/admin/category",
    getCategories: () => "/admin/category",
    categoryData: (categoryId) => `/api/admin/${categoryId}?categoryId=${categoryId}`,
    addAdress: () => "/create/address",
    userInfo: {
      userData: (query) => createRouteWithQueryParams("/userInfo", query),
    },
  },
}

export default routes
