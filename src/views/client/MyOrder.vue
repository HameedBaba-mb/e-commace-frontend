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
                  <th scope="col">UserId</th>
                  <th scope="col">item_quentity</th>
                  <th scope="col">total_amount</th>
                  <th scope="col">order_status</th>
                  <th scope="col">payment_status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in allOrders" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ order.Product?.title }}</td>
                  <td>{{ order.UserId }}</td>
                  <td>{{ order.item_quentity }}</td>
                  <td>{{ order.total_amount }}</td>
                  <td>{{ order.order_status }}</td>
                  <td>{{ order.payment_status }}</td>
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
          this.allOrders = response.data.data;
        })
        .catch((error) => console.log(error));
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
</style>