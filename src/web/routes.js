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
    deleteContact: (contactId) => `/admin/contacts/${contactId}`,
    //categories: probably needs to get cleaned up as well
    createCategory: () => "/admin/categories/category",
    getCategories: () => "/admin/categories/category",
    deleteCategory: (categoryId) => `/admin/categories/${categoryId}`,
    updateCategory: (categoryId) => `/admin/categories/${categoryId}`,
    categoryData: (categoryId) => `/api/admin/categories/${categoryId}`,
    //products: probably needs to get cleaned up as well
    createProduct: () => "/admin/products/product",
    getProducts: () => "/admin/products/product",
    updateProduct: (productId) => `/admin/products/${productId}`,
    productData: (productId) => `/api/admin/products/${productId}`,
    //materials:
    getMaterialsAndCategory: () => "/admin/materials/material",
    //users: probably needs to get cleaned up as well
    getUsers: () => "/admin/users/user",
    userData: (userId) => `/api/admin/users/${userId}`,
    patchRole: (userId) => `/admin/users/${userId}`,
    carousel: {
      addImage: () => "/admin/carousel/add",
      getImages: () => "/admin/carousel/images",
      deleteImage: (imageId) => `/admin/carousel/${imageId}`,
      changeOrder: (imageId) => `/admin/carousel/${imageId}`,
    },
    selectCategory: {
      getSelectCategory: () => "/admin/categories/homepage/selected",
      deleteSelectCategory: (categoryId) =>
        `/admin/categories/homepage/${categoryId}`,
      orderSelectedCategory: (categoryId) =>
        `/admin/categories/homepage/${categoryId}`,
      addSelectedCategory: () => "/admin/categories/homepage/selected",
    },
    selectProduct: {
      deleteSelectProduct: (productId) =>
        `/admin/products/homepage/${productId}`,
      orderSelectedProduct: (productId) =>
        `/admin/products/homepage/${productId}`,
      getSelectProducts: () => "/admin/products/homepage/selected",
      addSelectedProduct: () => "/admin/products/homepage/selected",
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
