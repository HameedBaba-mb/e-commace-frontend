<template>
  <aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div>
      <div class="brand-logo d-flex align-items-center justify-content-between">
        <a href="./index.html" class="text-nowrap logo-img">
          <img src="../../assets/images/logos/logo-light.svg" alt="" />
        </a>
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
            <router-link class="sidebar-link" :to="{name:'category.records'}" aria-expanded="false">
              <span>
                <i class="fa fa-briefcase" aria-hidden="true"></i>
              </span>
              <span class="hide-menu">Categories</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <a class="sidebar-link" href="./index.html" aria-expanded="false">
              <span>
                <i class="fa fa-tag" aria-hidden="true"></i>
              </span>
              <span class="hide-menu">Products</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a class="sidebar-link" href="./index.html" aria-expanded="false">
              <span>
                <i class="fa fa-truck" aria-hidden="true"></i>
              </span>
              <span class="hide-menu">Orders</span>
            </a>
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
</style>