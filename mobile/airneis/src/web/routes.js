const routes = {
  home: () => "/",
  signUp: () => "/sign-up",
  signIn: () => "/sign-in",
  contact: () => "/contact",
  api: {
    signUp: () => "/sign-up",
    signIn: () => "/sign-in",
    contact: () => "/contact",
    admin: {
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
      contacts: {
        getContacts: () => "/admin/contacts/contacts",
        contactData: (contactId) => `/admin/contacts/${contactId}`,
        deleteContact: (contactId) => `/admin/contacts/${contactId}`,
      },
      categories: {
        createCategory: () => "/admin/categories/categories",
        getCategories: () => "/admin/categories/categories",
        deleteCategory: (categoryId) => `/admin/categories/${categoryId}`,
        updateCategory: (categoryId) => `/admin/categories/${categoryId}`,
        categoryData: (categoryId) => `/admin/categories/${categoryId}`,
      },
      materials: {
        getMaterialsAndCategory: () => "/admin/materials/material",
      },
      products: {
        createProduct: () => "/admin/products/product",
        getProducts: () => "/admin/products/product",
        updateProduct: (productId) => `/admin/products/${productId}`,
        productData: (productId) => `/admin/products/${productId}`,
        deleteProduct: (productId) => `/admin/products/${productId}`,
      },
      users: {
        getUsers: () => "/admin/users/user",
        userData: (userId) => `/admin/users/${userId}`,
        patchRole: (userId) => `/admin/users/${userId}`,
      },
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
