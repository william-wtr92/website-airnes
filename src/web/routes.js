const routes = {
  home: () => "/",
  signUp: () => "/sign-up",
  signIn: () => "/sign-in",
  contact: () => "/contact",
  api: {
    signUp: () => "/sign-up",
    signIn: () => "/sign-in",
    contact: () => "/contact",
    createCategory: () => "/admin/category/create",
    addAdress: () => "/create/address",
  },
}

export default routes
