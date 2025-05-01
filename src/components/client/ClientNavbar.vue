<template>
  <div class="container-lg">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <!-- <a class="navbar-brand" href="#">Navbar scroll</a> -->
        <button
          class="navbar-toggler ms-auto btn-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li class="nav-item">
              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
              <router-link
                class="nav-link active mb-1 ps-1"
                :to="{ name: 'client.dashboard' }"
                aria-current="page"
                >Dashboard</router-link
              >
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Categories</a> -->
              <router-link
                class="nav-link active mb-1 ps-1"
                :to="{ name: 'client.categories' }"
                aria-current="page"
                >Categories</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link active mb-1 ps-1"
                :to="{ name: 'client.my-catrs' }"
                aria-current="page"
                >My Cart</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link active mb-1 ps-1"
                :to="{ name: 'client.my-order' }"
                aria-current="page"
                >My Oders</router-link
              >
            </li>
          </ul>
          <div class="navbar-collapse justify-content-end px-0" id="navbarNav">
            <ul
              class="navbar-nav flex-row ms-auto align-items-center justify-content-end"
            >
              <li class="nav-item">
                <button
                  @click="logOut"
                  class="btn btn-outline-light mx-3 mt-2 d-block"
                >
                  <i class="fa fa-sign-out me-2"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import apiClient from "../../services/apiClient";
export default {
  data() {
    return {
      authUser: JSON.parse(localStorage.getItem("e_commace_active_user")),
    };
  },
  methods: {
    async logOut() {
      if (this.authUser) {
        localStorage.removeItem("e_commace_active_user");

        apiClient.defaults.headers.common["Authorization"] = "";

        await this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.router-link-active {
  font-weight: 700;
  background: #fff;
  color: #2142cc !important;
  border-radius: 5px;
}
.nav-link:hover {
  background: #fff;
  color: #2142cc !important;
  border-radius: 5px;
  font-weight: 700;
  transition: none;
}
.nav-link {
  margin-right: 5px;
}
</style>