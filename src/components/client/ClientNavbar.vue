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
          <li class="nav-item dropdown">
            <a
              class="nav-link nav-icon-hover"
              href="javascript:void(0)"
              id="drop2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="../../assets/images/profile/user-1.jpg"
                alt=""
                width="35"
                height="35"
                class="rounded-circle"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
              aria-labelledby="drop2"
            >
              <div class="message-body">
                <a
                  href="javascript:void(0)"
                  class="d-flex align-items-center gap-2 dropdown-item"
                >
                  <i class="ti ti-user fs-6"></i>
                  <p class="mb-0 fs-3">Change Passsword</p>
                </a>
                <a
                  href="javascript:void(0)"
                  class="d-flex align-items-center gap-2 dropdown-item"
                >
                  <i class="ti ti-mail fs-6"></i>
                  <p class="mb-0 fs-3">Delete Account</p>
                </a>
                <!-- <a
                  href="javascript:void(0)"
                  class="d-flex align-items-center gap-2 dropdown-item"
                >
                  <i class="ti ti-list-check fs-6"></i>
                  <p class="mb-0 fs-3">My Task</p>
                </a> -->
                <router-link
                  :to="{ name: 'login' }"
                  class="btn btn-outline-primary mx-3 mt-2 d-block"
                  >Logout</router-link
                >
              </div>
            </div>
          </li>
        </ul>
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
  transition: none;
}
.nav-link {
  margin-right: 5px;
}
</style>