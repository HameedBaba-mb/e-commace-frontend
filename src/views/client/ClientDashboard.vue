<template>
  <div class="page-wrapper">
    <dashboard-banner>
      <template #banner-body>
        <div class="row justify-content-centers">
          <!-- Total Orders Card -->
          <div class="col-lg-3 col-md-6 col-sm-12 p-0">
            <ClientCard
              icon="fa fa-shopping-cart"
              :value="orderStats.totalOrders"
              title="Total Orders"
            />
          </div>

          <!-- Pending Orders Card -->
          <div class="col-lg-3 col-md-6 col-sm-12 p-0">
            <ClientCard
              icon="fa fa-hourglass-half"
              :value="orderStats.pendingOrders"
              title="Pending Orders"
            />
          </div>

          <!-- Delivered Orders Card -->
          <div class="col-lg-3 col-md-6 col-sm-12 p-0">
            <ClientCard
              icon="fa fa-check-circle"
              :value="orderStats.deliveredOrders"
              title="Delivered Orders"
            />
          </div>

          <!-- Cancelled Orders Card -->
          <div class="col-lg-3 col-md-6 col-sm-12 p-0">
            <ClientCard
              icon="fa fa-times-circle"
              :value="orderStats.cancelledOrders"
              title="Cancelled Orders"
            />
          </div>
        </div>
      </template>
    </dashboard-banner>

    <div class="container-lg mt-4">
      <div class="row">
        <div class="col-12">
          <div class="card card-body client-border">
            <h1>Recent 5 Orders</h1>
            <hr />
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Item Quentity</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Order Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in recentOrders" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ order.Product?.title }}</td>
                  <td>{{ order.item_quentity }}</td>
                  <td>{{ order.total_amount }}</td>
                  <td>
                    <!-- {{ order.order_status }} -->
                    <p
                      class="transaction-status w-50"
                      :style="{
                        color: setOrderStatusColor(order.order_status).color,
                        backgroundColor: setOrderStatusColor(order.order_status)
                          .backgroundColor,
                        border: setOrderStatusColor(order.order_status).border,
                      }"
                    >
                      {{ order.order_status }}
                    </p>
                  </td>
                  <td class="">
                    <!-- {{ order.order_status }} -->
                    <p
                      class="transaction-status w-50"
                      :style="{
                        color: setPaymentStatusColor(order.payment_status)
                          .color,
                        backgroundColor: setPaymentStatusColor(
                          order.payment_status
                        ).backgroundColor,
                        border: setPaymentStatusColor(order.payment_status)
                          .border,
                      }"
                    >
                      {{ order.payment_status }}
                    </p>
                  </td>
                  <td>
                    {{
                      order.createdAt ? order.createdAt.substring(0, 10) : ""
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardBanner from "../../components/client/DashboardBanner.vue";
import ClientCard from "../../components/client/ClientCard.vue";
import ApiServices from "../../services/ApiServices.js";
export default {
  components: {
    DashboardBanner,
    ClientCard,
  },
  name: "ClientDashboard",
  data() {
    return {
      isLoading: false,
      recentOrders: [],
      orderStats: {
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
      },
    };
  },
  methods: {
    getClientOrdersMatrix() {
      ApiServices.getClientOrdersMatrix(this.userId)
        .then((response) => {
          this.orderStats = response.data.data;
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    getClientRecentOrders() {
      ApiServices.getClientRecentOrders(this.userId)
        .then((response) => {
          this.recentOrders = response.data.data;
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    setOrderStatusColor(status) {
      switch (status) {
        case "cancelled":
          return {
            backgroundColor: "#FEE4E2",
            color: "#F04438",
            border: "1px solid #F04438",
          };
        case "delivered":
          return {
            backgroundColor: "#DCFAE6",
            color: "#067647",
            border: "1px solid #067647",
          };
        case "pending":
          return {
            backgroundColor: "#FEF0C7",
            color: "#DC6803",
            border: "1px solid #DC6803",
          };
        default:
          return {
            backgroundColor: "#f4f4f4",
            color: "#23383f",
            border: "1px solid #23383f",
          };
      }
    },
    setPaymentStatusColor(status) {
      switch (status) {
        case "unpaid":
          return {
            backgroundColor: "#FEE4E2",
            color: "#F04438",
            border: "1px solid #F04438",
          };
        case "paid":
          return {
            backgroundColor: "#DCFAE6",
            color: "#067647",
            border: "1px solid #067647",
          };
        case "partial payment":
          return {
            backgroundColor: "#FEF0C7",
            color: "#DC6803",
            border: "1px solid #DC6803",
          };
        default:
          return {
            backgroundColor: "#f4f4f4",
            color: "#23383f",
            border: "1px solid #23383f",
          };
      }
    },
  },
  computed: {
    userId() {
      return JSON.parse(localStorage.getItem("e_commace_active_user")).userId;
    },
  },
  mounted() {
    this.getClientOrdersMatrix();
    this.getClientRecentOrders();
  },
};
</script>

<style lang="css" scoped>
@import url("../../assets/css/client-style.css");
.transaction-status {
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
}
</style>