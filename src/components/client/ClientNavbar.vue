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
                class="nav-link active"
                :to="{ name: 'client.dashboard' }"
                aria-current="page"
                >Dashboard</router-link
              >
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Categories</a> -->
              <router-link
                class="nav-link active"
                :to="{ name: 'client.categories' }"
                aria-current="page"
                >Categories</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link active"
                :to="{ name: 'client.my-catrs' }"
                aria-current="page"
                >My Cart</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link active"
                :to="{ name: 'client.my-order' }"
                aria-current="page"
                >My Oders</router-link
              >
            </li>
          </ul>
          <div>
            <div class="dropdown ms-auto">
              <button
                class="btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="border-radius: 5px"
              >
                Actions
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Logout</a></li>
                <li>
                  <a class="dropdown-item" href="#">Change Password</a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item text-danger" href="#"
                    >Delete Account</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
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
  transition: none

}
.nav-link{
  margin-right: 5px;
}
</style>