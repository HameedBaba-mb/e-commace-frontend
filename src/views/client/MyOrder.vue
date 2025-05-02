<template>
  <div class="page-wrapper">
    <notification ref="notify" />
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
          <div class="card card-body client-border">
            <h1 class="fs-7">Recent Orders</h1>
            <!-- <hr /> -->
            <div class="table-responsive">
              <table class="table text-nowrap align-middle mb-0">
                <thead>
                  <tr class="border-2 border-bottom border-primary border-0">
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Item Quentity</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="8">
                      <div v-if="isLoadingOrder" class="text-center">
                        <i
                          class="spinner-border text-primary"
                          role="status"
                        ></i>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!isLoadingOrder && allOrders.length === 0">
                    <td colspan="4" class="text-center">
                      No recent carts found.
                    </td>
                  </tr>
                  <tr v-for="(order, index) in allOrders" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ order.Product?.title }}</td>
                    <td>{{ order.item_quentity }}</td>
                    <td>
                      {{
                        order.total_amount
                          ? order.total_amount.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            })
                          : ""
                      }}
                    </td>
                    <td>
                      {{
                        order.createdAt ? order.createdAt.substring(0, 10) : ""
                      }}
                    </td>
                    <td>
                      <!-- {{ order.order_status }} -->
                      <p
                        class="transaction-status"
                        :style="{
                          color: setOrderStatusColor(order.order_status).color,
                          backgroundColor: setOrderStatusColor(
                            order.order_status
                          ).backgroundColor,
                          border: setOrderStatusColor(order.order_status)
                            .border,
                        }"
                      >
                        {{ order.order_status }}
                      </p>
                    </td>
                    <td class="">
                      <!-- {{ order.order_status }} -->
                      <p
                        class="transaction-status"
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
                      <button
                        v-if="order.order_status === 'pending'"
                        class="btn btn-sm btn-danger"
                        @click="getOrderToCancell(order.id)"
                      >
                        <i class="fa fa-times-circle me-1"></i> Cancell
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="deleteModal"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
    ref="cancellModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Confirm</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center">
          <p class="alert alert-danger">
            Are you sure you want cancell this order
          </p>
          <!-- <p class="fw-bold">
            {{ "adminToDelete.first_name + ' ' + adminToDelete.last_name" }}
          </p> -->
          <button class="btn btn-primary me-3" @click="closeCancellModal">
            Close
          </button>
          <button class="btn btn-danger" @click="cancellOrder">Cancell</button>
          <pre>{{ orderToCancell }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import DashboardBanner from "../../components/client/DashboardBanner.vue";
import ClientCard from "../../components/client/ClientCard.vue";
import ApiServices from "../../services/ApiServices";
import { Modal } from "bootstrap";
import Notification from "../../components/public/Notification.vue";
export default {
  components: {
    DashboardBanner,
    ClientCard,
    Notification,
  },
  name: "ClientDashboard",
  data() {
    return {
      allOrders: [],
      orderToCancell: {},
      modalInstance: null,
      isLoadingOrder: true,
    };
  },
  methods: {
    getClientOrders() {
      this.isLoadingOrder = true;
      ApiServices.getClientOrders(this.userId)
        .then((response) => {
          this.allOrders = response.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.isLoadingOrder = false;
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

    cancellOrder() {
      const cleanData = {
        ...this.orderToCancell,
        order_status: "cancelled",
        payment_status: "unpaid",
      };
      ApiServices.updateOrderStatus(this.orderToCancell.id, cleanData)
        .then((response) => {
          this.closeCancellModal();
          this.getClientOrders();

          this.$refs.notify.showMessage(
            "Success",
            "Order successfully cancelled",
            "success"
          );
        })
        .catch((error) => console.log(error));
    },
    getOrderToCancell(id) {
      this.orderToCancell = this.allOrders.find((order) => order.id === id);
      if (id) {
        this.openCancellModal();
      }
    },
    openCancellModal() {
      if (!this.modalInstance) {
        this.modalInstance = new Modal(this.$refs.cancellModal);
      }
      this.modalInstance.show();
    },
    closeCancellModal() {
      if (!this.modalInstance) {
        this.modalInstance = new Modal(this.$refs.cancellModal);
      }
      this.modalInstance.hide();
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
  padding: 3px;
  border-radius: 10px;
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
  /* width: 100% !important; */
  /* margin: 0 auto; */
}
</style>