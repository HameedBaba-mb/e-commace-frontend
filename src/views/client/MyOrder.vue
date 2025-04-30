<template>
  <div class="page-wrapper">
    <dashboard-banner>
      <template #banner-body>
        <div class="container-lg text-centers mt-2">
          <h1 class="display-1">My Orders</h1>
        </div>
      </template>
    </dashboard-banner>

    <div class="container-lg mt-4">
      <div class="row">
        <div class="col-12">
          <div class="card card-body client-boder">
            <h1>Recent Orders</h1>
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
                <tr v-for="(order, index) in allOrders" :key="index">
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
import ApiServices from "../../services/ApiServices";
export default {
  components: {
    DashboardBanner,
    ClientCard,
  },
  name: "ClientDashboard",
  data() {
    return {
      allOrders: [],
    };
  },
  methods: {
    getClientOrders() {
      ApiServices.getClientOrders(this.userId)
        .then((response) => {
          this.allOrders = response.data.data.map((trx) => ({
            ...trx,
            total_amount: trx.total_amount.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            }),
          }));
        })
        .catch((error) => console.log(error));
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
    this.getClientOrders();
  },
};
</script>
  
  <style lang="css" scoped>
@import url("../../assets/css/client-style.css");
.display-1 {
  /* font-size: 2.5rem; */
  font-weight: 700;
  color: #fff;
}
.transaction-status {
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
}
</style>