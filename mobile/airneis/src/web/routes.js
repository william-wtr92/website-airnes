const routes = {
  home: () => "/",
  signUp: () => "/sign-up",
  signIn: () => "/sign-in",
  contact: () => "/contact",
  api: {
    signUp: () => "/sign-up",
    signIn: () => "/sign-in",
    logout: () => "/logout",
    contact: () => "/contact",
    sendMail: () => "/reset_password",
    resetPwd: () => "/reset_password",
    app: {
      products: {
        getProduct: (productId) => `/app/products/${productId}`,
        getProducts: () => "/app/products/all",
        searchProducts: () => "/app/products/search",
        getFilter: () => "/app/products/filter",
      },
      categories: {
        getCategories: () => "/app/categories/all",
        getCategory: (categoryId) => `/app/categories/${categoryId}`,
      },
    },
    admin: {
      carousel: {
        addImage: () => "/admin/carousel/add",
        getImages: () => "/admin/carousel/images",
        getProducts: () => "/admin/carousel/products",
        getCategories: () => "/admin/carousel/categories",
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
        updateContact: (contactId) => `/admin/contacts/${contactId}`,
        deleteContact: (contactId) => `/admin/contacts/${contactId}`,
      },
      categories: {
        createCategory: () => "/admin/categories/category",
        getCategories: () => "/admin/categories/category",
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
    dashboard: {
      getStats: () => "/admin/dashboard/stats",
    },
    user: {
      addAddress: () => "/user/create/address",
      userData: (userId) => `/user/${userId}`,
      patchUser: (userId) => `/user/${userId}`,
      deleteUser: (userId) => `/user/${userId}`,
      getOrder: (userId) => `/user/${userId}/getOrder`,
      orderData: (userId, orderId) => `/user/${userId}/order/${orderId}`,
      address: {
        addressData: (userId, addressId) => `/user/${userId}/${addressId}`,
        patchAddress: (userId, addressId) => `/user/${userId}/${addressId}`,
        deleteAddress: (userId, addressId) => `/user/${userId}/${addressId}`,
      },
    },
    cart: {
      payment: () => "/cart/payment",
      confirmOrder: () => "/cart/confirmOrder",
      getaddress: (userId) => `/cart/${userId}`,
    },
  },
}

export default routes
