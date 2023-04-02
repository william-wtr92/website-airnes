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
    updateCategory: (categoryId) => `/admin/categories/${categoryId}`,
    categoryData: (categoryId) => `/api/admin/${categoryId}`,
    //products: probably needs to get cleaned up as well
    createProduct: () => "/admin/products/product",
    getProducts: () => "/admin/products/product",
    productData: (productId) => `api/admin/${productId}`,
    //materials:
    getMaterialsAndCategory: () => "/admin/materials/material",
    //users: probably needs to get cleaned up as well
    getUsers: () => "/admin/users/user",
    carousel: {
      addImage: () => "/admin/carousel/add",
      getImages: () => "/admin/carousel/images",
      deleteImage: (imageId) => `/admin/carousel/${imageId}`,
      changeOrder: (imageId) => `/admin/carousel/${imageId}`,
    },
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
