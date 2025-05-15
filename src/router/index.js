import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: () =>
        import(/*webpackChunkName : "Login-Page" */ "../views/LoginView.vue"),
    },
    // Client routes
    {
      path: "/client/dashboard",
      name: "client.dashboard",
      component: () =>
        import(
          /*webpackChunkName : "Clien-Dashboard-Page" */ "../views/client/ClientDashboard.vue"
        ),
      meta: {
        title: "Client Dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/client/categories",
      name: "client.categories",
      component: () =>
        import(
          /*webpackChunkName : "Clien-Dashboard-Page" */ "../views/client/Categories.vue"
        ),
      meta: {
        title: "Client Categories",
        requiresAuth: true,
      },
    },
    {
      path: "/client/categories/procucts/:id",
      name: "client.categories.products",
      component: () =>
        import(
          /*webpackChunkName : "Clien-Dashboard-Page" */ "../views/client/ProductView.vue"
        ),
      meta: {
        title: "client categories products",
        requiresAuth: true,
      },
    },
    {
      path: "/client/my-order",
      name: "client.my-order",
      component: () =>
        import(
          /*webpackChunkName : "Clien-Dashboard-Page" */ "../views/client/MyOrder.vue"
        ),
    },
    {
      path: "/client/my-catrs",
      name: "client.my-catrs",
      component: () =>
        import(
          /*webpackChunkName : "Clien-Dashboard-Page" */ "../views/client/MyCart.vue"
        ),
      meta: {
        title: "Client My Cart",
        requiresAuth: true,
      },
    },
    // end of Client route
    {
      path: "/admin/dashboard",
      name: "admin.dashboard",
      component: () =>
        import(
          /*webpackChunkName : "Admin-Dashboard-Page" */ "../views/admin/AdminDashbaord.vue"
        ),
      meta: {
        title: "Admin Dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/new-account",
      name: "new.account",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/NewAccount.vue"
        ),
      meta: {
        title: "New Account",
        // requiresAuth: true,
      },
    },
    // Admin side
    {
      path: "/admins-records",
      name: "admins.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/AdminRecordView.vue"
        ),
      meta: {
        title: "Admins Records",
        requiresAuth: true,
      },
    },
    {
      path: "/register-admin",
      name: "register.admins",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/users/admin/RegisterAdmin.vue"
        ),
      meta: {
        title: "Register Admin",
        requiresAuth: true,
      },
    },
    {
      path: "/update-admin/:id",
      name: "update.admins",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/users/admin/UpdateAdmin.vue"
        ),
      meta: {
        title: "Update Admin",
        requiresAuth: true,
      },
    },

    {
      path: "/client-records",
      name: "client.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/ClientRecordView.vue"
        ),
      meta: {
        title: "Client Records",
        requiresAuth: true,
      },
    },
    {
      path: "/register-client",
      name: "register.client",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/users/client/RegisterClient.vue"
        ),
      meta: {
        title: "Register Client",
        requiresAuth: true,
      },
    },
    {
      path: "/update-client/:id",
      name: "update.client",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/users/client/UpdateClient.vue"
        ),
      meta: {
        title: "Update Client",
        requiresAuth: true,
      },
    },

    {
      path: "/categotry-records",
      name: "category.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/CategoryView.vue"
        ),
      meta: {
        title: "Category Records",
        requiresAuth: true,
      },
    },
    {
      path: "/register-category",
      name: "register.category",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/categories/RegisterCategory.vue"
        ),
      meta: {
        title: "Register Category",
        requiresAuth: true,
      },
    },
    {
      path: "/update-category/:id",
      name: "update.category",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/categories/UpdateCategory.vue"
        ),
      meta: {
        title: "Update Category",
        requiresAuth: true,
      },
    },

    {
      path: "/product-records",
      name: "product.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/ProductView.vue"
        ),
      meta: {
        title: "Product Records",
        requiresAuth: true,
      },
    },
    {
      path: "/register-product",
      name: "register.product",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/products/RegisterProduct.vue"
        ),
      meta: {
        title: "Register Product",
        requiresAuth: true,
      },
    },
    {
      path: "/update-product/:id",
      name: "update.product",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/products/UpdateProduct.vue"
        ),
      meta: {
        title: "Update Product",
        requiresAuth: true,
      },
    },

    {
      path: "/order-records",
      name: "order.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/OrderView.vue"
        ),
    },

    // {
    //   path: "/:catchAll(.*)",
    //   name: "NotFound",
    //   component: () =>
    //     import(
    //       /*webpackChunkaName: "Not-Found-Page" */ "../components/private/NotFound.vue"
    //     ),
    // },
  ],
});

router.beforeEach((to, from, next) => {
  const authUser = JSON.parse(localStorage.getItem("e_commace_active_user"));

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!authUser) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
