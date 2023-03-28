const routes = {
  home: () => "/",
  signUp: () => "/sign-up",
  signIn: () => "/sign-in",
  contact: () => "/contact",
  api: {
    signUp: () => "/sign-up",
    signIn: () => "/sign-in",
    contact: () => "/contact",
    createCategory: () => "/admin/category",
    getCategories: () => "/admin/category",
    categoryData: (categoryId) =>
      `/api/admin/${categoryId}?categoryId=${categoryId}`,
    user: {
      addAddress: () => "/user/create/address",
      userData: (userId) => `/user/${userId}`,
      patchUser: () => "/user/modify",
      address: {
        addressData: (userId, addressId) => `/user/${userId}/${addressId}`,
        patchAddress: (userId, addressId) => `/user/${userId}/${addressId}`,
      },
    },
  },
}

export default routes
