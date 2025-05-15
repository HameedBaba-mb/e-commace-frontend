<template>
  <aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div>
      <div class="brand-logo d-flex align-items-center justify-content-center">
        <p class="fw-bold text-dark mb-0 d-none d-sm-block">
          Campus <span>Store</span>
        </p>
        <div
          class="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
          id="sidebarCollapse"
          @click="toggleSidebar"
        >
          <i class="ti ti-x fs-8"></i>
        </div>
      </div>
      <!-- Sidebar navigation-->
      <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-6"></i>
            <span class="hide-menu">Menus</span>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              :to="{ name: 'admin.dashboard' }"
              aria-expanded="false"
            >
              <span>
                <i class="fa fa-tachometer" aria-hidden="true"></i>
              </span>
              <span class="hide-menu">Dashboard</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              :to="{ name: 'category.records' }"
              aria-expanded="false"
            >
              <span>
                <i class="fa fa-briefcase" aria-hidden="true"></i>
              </span>
              <span class="hide-menu">Categories</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              :to="{ name: 'product.records' }"
              aria-expanded="false"
            >
              <span>
                <i class="fa fa-tag" aria-hidden="true"></i>
              </span>
              <span class="hide-menu">Products</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              :to="{ name: 'order.records' }"
              aria-expanded="false"
            >
              <span>
                <i class="fa fa-truck" aria-hidden="true"></i>
              </span>
              <span class="hide-menu">Orders</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              :to="{ name: 'admins.records' }"
              aria-expanded="false"
            >
              <span>
                <i class="fa fa-user"></i>
              </span>
              <span class="hide-menu">Admins</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              :to="{ name: 'client.records' }"
              aria-expanded="false"
            >
              <span>
                <i class="fa fa-users"></i>
              </span>
              <span class="hide-menu">Clients</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              :to="{ name: 'login' }"
              aria-expanded="false"
            >
              <span>
                <i class="fa fa-sign-out"></i>
              </span>
              <span class="hide-menu">Logout</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
  </aside>
</template>


<script>
export default {
  data() {
    return {
      isMiniSidebar: false,
    };
  },
  methods: {
    toggleSidebar() {
      const wrapper = document.getElementById("main-wrapper");

      // Toggle classes
      wrapper.classList.toggle("mini-sidebar");
      wrapper.classList.toggle("show-sidebar");

      // Update state
      this.isMiniSidebar = wrapper.classList.contains("mini-sidebar");

      // Update attribute
      wrapper.setAttribute(
        "data-sidebartype",
        this.isMiniSidebar ? "mini-sidebar" : "full"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Poppins:wght@400;500;600&display=swap');

.left-sidebar {
  width: 250px;
  background-color: #1f2937; // Dark gray
  color: #f9fafb; // Light text
  height: 100vh;
  padding-top: 1rem;
  position: fixed;
  transition: all 0.3s ease;
}

.brand-logo {
  padding: 1rem;
  color: #374151; 
  font-size: 1.9rem;
  font-family: 'DM Serif Display', serif;

  span {
    color:  #4F46E5;
  }
}

.sidebar-nav {
  margin-top: 1rem;
}

ul#sidebarnav {
  list-style: none;
  padding: 0;
}

.nav-small-cap {
  padding: 0.75rem 1.25rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.6;
  letter-spacing: 1px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: #f9fafb;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background 0.2s ease;
}

.sidebar-link:hover {
  background-color: #374151; // hover color
  color:  #374151;
  border-left: 4px solid   #ffff;
}

.sidebar-link i {
  margin-right: 10px;
  font-size: 1.1rem;
}

</style>

