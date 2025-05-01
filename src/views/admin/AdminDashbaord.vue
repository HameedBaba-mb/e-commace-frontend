<template>
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <!-- Sidebar Start -->
    <sidebar />
    <!--  Sidebar End -->
    <!--  Main wrapper -->
    <div class="body-wrapper">
      <!--  Header Start -->
      <headerbar />
      <!--  Header End -->
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 bg-primary text-white mb-4 rounded-3">
            <div class="user-details mt-5 mb-4">
              <h3 class="">Welcome</h3>
              <p class="">
                {{ userName.first_name + " " + userName.last_name }}
              </p>
            </div>
          </div>
          <div class="col-lg-8 ps-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title fs-7">Recent 5 Orders</h5>
                <div class="table-responsive">
                  <table class="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr
                        class="border-2 border-bottom border-primary border-0"
                      >
                        <th scope="col" class="ps-0">#</th>
                        <th scope="col" class="ps-0">User</th>
                        <th scope="col" class="ps-0">Product Name</th>
                        <th scope="col" class="ps-0">Order Status</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      <tr v-if="isLoadingRecentOrders" class="text-center">
                        <td colspan="4">
                          <div
                            class="spinner-border text-primary"
                            role="status"
                          ></div>
                        </td>
                      </tr>
                      <tr
                        v-if="
                          !isLoadingRecentOrders && recentOrders.length === 0
                        "
                      >
                        <td colspan="4" class="text-center">
                          No recent orders found.
                        </td>
                      </tr>
                      <tr v-for="(order, index) in recentOrders" :key="index">
                        <th>{{ index + 1 }}</th>
                        <td>
                          {{
                            order.User?.first_name + " " + order.User?.last_name
                          }}
                        </td>
                        <td>{{ order.Product?.title }}</td>
                        <td>
                          <div
                            :style="{
                              color: setOrderStatusColor(order.order_status),
                              textTransform: 'capitalize',
                              fontWeight: 'bold',
                            }"
                          >
                            {{ order.order_status }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 pe-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title er gap-2 mb-5 pb-3">
                  Todays Analysis <br />
                  <div class="mt-1 fs-3 text-primary">
                    {{ new Date().toDateString() }}
                  </div>
                  <span> </span>
                </h5>
                <div class="row">
                  <div class="col-4">
                    <i class="fa fa-check-circle fs-5 d-flex text-success"></i>
                    <span class="fs-11 mt-2 d-block text-nowrap"
                      >Delivered</span
                    >
                    <h4 class="mb-0 mt-1">{{ percentages.delivered }}%</h4>
                  </div>
                  <div class="col-4">
                    <i
                      class="fa fa-hourglass-half text-warning fs-5 d-flex"
                    ></i>
                    <span class="fs-11 mt-2 d-block text-nowrap">Pending</span>
                    <h4 class="mb-0 mt-1">{{ percentages.pending }} %</h4>
                  </div>
                  <div class="col-4">
                    <i class="fa fa-times-circle fs-5 d-flex text-danger"></i>
                    <span class="fs-11 mt-2 d-block text-nowrap"
                      >Cancelled</span
                    >
                    <h4 class="mb-0 mt-1">{{ percentages.cancelled }}%</h4>
                  </div>
                </div>

                <div class="vstack gap-4 mt-7 pt-2">
                  <div>
                    <div class="hstack justify-content-between">
                      <span class="fs-3 fw-medium">Delivered</span>
                      <h6 class="fs-3 fw-medium text-dark lh-base mb-0">
                        {{ percentages.delivered }}%
                      </h6>
                    </div>
                    <div
                      class="progress mt-6"
                      role="progressbar"
                      aria-label="Warning example"
                      :aria-valuenow="percentages.delivered"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="progress-bar bg-danger"
                        :style="{ width: percentages.delivered + '%' }"
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div class="hstack justify-content-between">
                      <span class="fs-3 fw-medium">Pending</span>
                      <h6 class="fs-3 fw-medium text-dark lh-base mb-0">
                        {{ percentages.pending }} %
                      </h6>
                    </div>
                    <div
                      class="progress mt-6"
                      role="progressbar"
                      aria-label="Warning example"
                      :aria-valuenow="percentages.pending"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="progress-bar bg-warning"
                        :style="{ width: percentages.pending + '%' }"
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div class="hstack justify-content-between">
                      <span class="fs-3 fw-medium">Cancelled</span>
                      <h6 class="fs-3 fw-medium text-dark lh-base mb-0">
                        {{ percentages.cancelled }}%
                      </h6>
                    </div>
                    <div
                      class="progress mt-6"
                      role="progressbar"
                      aria-label="Warning example"
                      :aria-valuenow="percentages.cancelled"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="progress-bar bg-danger"
                        :style="{ width: percentages.cancelled + '%' }"
                      ></div>
                    </div>
                  </div>
                  <!-- <pre>{{ percentages }}</pre> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import headerbar from "../../components/public/headerbar.vue";
import sidebar from "../../components/public/sidebar.vue";
import ApiServices from "../../services/ApiServices";
export default {
  components: {
    sidebar,
    headerbar,
  },
  data() {
    return {
      recentOrders: [],
      isLoadingRecentOrders: false,
      isLoadingPercentage: false,
      percentages: [],
      userName: "",
    };
  },
  methods: {
    getAdminRecentOrders() {
      this.isLoadingRecentOrders = true;
      ApiServices.getAdminRecentOrders()
        .then((response) => {
          this.recentOrders = response.data.data;
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        })
        .finally(() => {
          this.isLoadingRecentOrders = false;
        });
    },
    getOrderPercentage() {
      this.isLoadingPercentage = true;
      ApiServices.getOrderPercentage()
        .then((response) => {
          this.percentages = response.data.data;
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        })
        .finally(() => {
          this.isLoadingPercentage = false;
        });
    },
    setOrderStatusColor(status) {
      switch (status) {
        case "cancelled":
          return "#F04438";
        case "delivered":
          return "#067647";
        case "pending":
          return "#DC6803";
        default:
          return "#23383f";
      }
    },
  },
  mounted() {
    this.getAdminRecentOrders();
    this.getOrderPercentage();
    this.userName = JSON.parse(localStorage.getItem("e_commace_active_user"));
  },
};
</script>
  
  <style lang="css" scoped>
.user-details h3 {
  /* font-size: 2.5rem; */
  /* font-weight: 700; */
  color: #fff;
}

.user-details p {
  /* font-size: 2.5rem; */
  font-weight: 600;
  color: #fff;
}
</style>