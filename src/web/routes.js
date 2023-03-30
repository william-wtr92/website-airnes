const routes = {
  home: () => "/",
  signUp: () => "/sign-up",
  signIn: () => "/sign-in",
  contact: () => "/contact",
  api: {
    signUp: () => "/sign-up",
    signIn: () => "/sign-in",
    //contacts: probably needs to get cleaned up
    contact: () => "/contact",
    getContacts: () => "/admin/contacts/contacts",
    contactData: (contactId) => `/api/admin/contacts/${contactId}`,
    updateContact: (contactId) => `/admin/contacts/${contactId}`,
    //categories: probably needs to get cleaned up as well
    createCategory: () => "/admin/categories/category",
    getCategories: () => "/admin/categories/category",
    categoryData: (categoryId) => `/api/admin/categories/${categoryId}`,
    updateCategory: (categoryId) => `/admin/categories/${categoryId}`,
    // azure upload
    uploadFile: () => "/api/upload-file",
    user: {
      addAddress: () => "/user/create/address",
      userData: (userId) => `/user/${userId}`,
      patchUser: (userId) => `/user/${userId}`,
      deleteUser: (userId) => `/user/${userId}`,
      address: {
        addressData: (userId, addressId) => `/user/${userId}/${addressId}`,
        patchAddress: (userId, addressId) => `/user/${userId}/${addressId}`,
        deleteAddress: (userId, addressId) => `/user/${userId}/${addressId}`,
      },
    },
  },
}

export default routes
