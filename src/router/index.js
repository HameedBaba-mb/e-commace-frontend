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
    },
    {
      path: "/client/categories",
      name: "client.categories",
      component: () =>
        import(
          /*webpackChunkName : "Clien-Dashboard-Page" */ "../views/client/Categories.vue"
        ),
    },
    {
      path: "/client/categories/procucts/:id",
      name: "client.categories.products",
      component: () =>
        import(
          /*webpackChunkName : "Clien-Dashboard-Page" */ "../views/client/ProductView.vue"
        ),
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
    },
    // end of Client route
    {
      path: "/admin/dashboard",
      name: "admin.dashboard",
      component: () =>
        import(
          /*webpackChunkName : "Admin-Dashboard-Page" */ "../views/admin/AdminDashbaord.vue"
        ),
    },
    {
      path: "/new-account",
      name: "new.account",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/NewAccount.vue"
        ),
    },
    // Admin side
    {
      path: "/admins-records",
      name: "admins.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/AdminRecordView.vue"
        ),
    },
    {
      path: "/register-admin",
      name: "register.admins",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/users/admin/RegisterAdmin.vue"
        ),
    },
    {
      path: "/update-admin/:id",
      name: "update.admins",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/users/admin/UpdateAdmin.vue"
        ),
    },

    {
      path: "/client-records",
      name: "client.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/ClientRecordView.vue"
        ),
    },
    {
      path: "/register-client",
      name: "register.client",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/users/client/RegisterClient.vue"
        ),
    },
    {
      path: "/update-client/:id",
      name: "update.client",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/users/client/UpdateClient.vue"
        ),
    },

    {
      path: "/categotry-records",
      name: "category.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/CategoryView.vue"
        ),
    },
    {
      path: "/register-category",
      name: "register.category",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/categories/RegisterCategory.vue"
        ),
    },
    {
      path: "/update-category/:id",
      name: "update.category",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/categories/UpdateCategory.vue"
        ),
    },

    {
      path: "/product-records",
      name: "product.records",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/ProductView.vue"
        ),
    },
    {
      path: "/register-product",
      name: "register.product",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/products/RegisterProduct.vue"
        ),
    },
    {
      path: "/update-product/:id",
      name: "update.product",
      component: () =>
        import(
          /*webpackChunkName : "New-Client-Registration-Page" */ "../views/admin/products/UpdateProduct.vue"
        ),
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

  // if (to.name !== "Login") {
  //   localStorage.setItem("zainpos_last_route", to.fullPath);
  // }

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!authUser) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
