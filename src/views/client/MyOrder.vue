<template>
    <div class="page-wrapper">
      <dashboard-banner>
        <template #banner-body>
          <div class="container-lg text-centers mt-2">
            <h1 class="display-1 ">My Orders</h1>
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
                  <tr v-for="(order, index) in allOrders" :key="index">
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>John</td>
                    <td>Doe</td>
                    <td>@social</td>
                  </tr>
                </tbody>
              </table>
              <pre>{{ allOrders }}</pre>
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
      ClientCard
    },
    name: "ClientDashboard",
    data() {
      return {
        allOrders: []
      }
    },
    methods: {
      getClientOrders() {
      ApiServices.getClientOrders(this.userId)
        .then((response) => {
          this.allOrders = response.data.data;
        })
        .catch((error) => console.log(error));
    }
    },
    computed: {
      userId() {
        return JSON.parse(localStorage.getItem("e_commace_active_user")).userId;
      }
    },
    mounted() {
      this.getClientOrders();
    }
  };
  </script>
  
  <style lang="css" scoped>
  @import url("../../assets/css/client-style.css");
  .display-1{
    /* font-size: 2.5rem; */
    font-weight: 700;
    color: #fff;
  }
  </style>