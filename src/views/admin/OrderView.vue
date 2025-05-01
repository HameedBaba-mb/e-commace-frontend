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
    <sidebar />
    <div class="body-wrapper">
      <headerbar />
      <notification ref="notify" />

      <div class="container-fluid">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <!-- <router-link
                  class="btn btn-primary mb-1"
                  :to="{ name: 'register.order' }"
                  >New order</router-link
                > -->
              <h5 class="card-title fw-semibold mb-4">Order Records</h5>
            </div>
            <div class="table-responsive">
              <table class="table text-nowrap align-middle mb-0">
                <thead>
                  <tr class="border-2 border-bottom border-primary border-0">
                    <th scope="col">SN</th>
                    <th scope="col">Client</th>
                    <!-- <th scope="col">Description</th> -->
                    <th scope="col">Quentity</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in allOrders" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                      {{ order.User.first_name + " " + order.User.last_name }}
                    </td>
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
                    <!-- <td>{{ order.order_status }}</td> -->
                    <!-- <td>{{ order.payment_status }}</td> -->
                    <td>
                      <!-- {{ order.order_status }} -->
                      <p
                        class="transaction-status w-50"
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
                    <!-- <td class="text-capitalize">{{ order.user_status }}</td> -->
                    <td>
                      <!-- <div class="ms-auto">
                      <button
                        class="btn btn-sm btn-primary border"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style="border-radius: 5px"
                        @click="getorderToComplete(order.id)"
                      >
                        <i class="fa fa-ellipsis-h"></i>
                      </button>
                    
                    </div> -->
                      <div class="dropdown ms-auto">
                        <button
                          class="btn btn-sm btn-primary dropdown-toggles border"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style="border-radius: 5px"
                        >
                          <i class="fa fa-ellipsis-h"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <button
                              @click="getOrderToCancell(order.id)"
                              class="dropdown-item"
                            >
                              Cancel Order
                            </button>
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              @click="getorderToComplete(order.id)"
                            >
                              Complete Order
                            </button>
                          </li>
                        </ul>
                      </div>
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
    id="orderModal"
    aria-hidden="true"
    tabindex="-1"
    ref="orderModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Complete Order</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-4">
          <!-- <p>Modal body text goes here.</p> -->
          <div class="container-sm">
            <!-- <div class="">
              <p class="fw-bold p-title mb-0">Product Name</p>
              <p class="p-value">{{ " selectedProduct?.Product?.title" }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <p class="fw-bold p-title mb-0">Price</p>
                <p class="p-value">
                  {{ basePrice }}
                </p>
              </div>
              <div>
                <p class="fw-bold p-title mb-0">Amount</p>
                <p class="p-value">{{ "amount" }}</p>
              </div>
            </div> -->

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="" class="fw-bold text-dark">Order Status</label>
                  <!-- <input
                    type="text"
                    class="form-control client-border"
                    placeholder="Quentity"
                    name=""
                    id=""
                  /> -->
                  <select
                    class="form-control client-border"
                    name=""
                    id=""
                    v-model="formData.order_status"
                  >
                    <option value="" selected disabled>
                      Select Order Status
                    </option>
                    <option
                      v-for="([key, value], index) in Object.entries(
                        orderStatus
                      )"
                      :key="index"
                      :value="key"
                    >
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="" class="fw-bold text-dark">Payment Status</label>
                  <select
                    class="form-control client-border"
                    placeholder="Quentity"
                    name=""
                    id=""
                    v-model="formData.payment_status"
                  >
                    <option value="" selected disabled>
                      Select Payment Status
                    </option>
                    <option
                      v-for="([key, value], index) in Object.entries(
                        paymentStatus
                      )"
                      :key="index"
                      :value="key"
                    >
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <!-- <pre>{{ orderToComplete }}</pre> -->
            <!-- <p class="text-center text-danger fs-4 fw-bold mt-3">
              {{ "quentyError" }}
            </p> -->
          </div>

          <div class="container">
            <div class="d-flex justify-content-center mb-4 mt-4">
              <button
                type="button"
                class="btn btn-dark me-3 w-50"
                @click="closeModal"
              >
                Close
              </button>
              <button @click="completeOrder" class="btn btn-primary w-50">
                Complete Order
              </button>
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
            Are you sure you want cancell this order for
          </p>
          <p class="fw-bold">
            {{
              orderToCancell.User?.first_name +
              " " +
              orderToCancell.User?.last_name
            }}
          </p>

          <button class="btn btn-primary me-3" @click="closeCancellModal">
            Close
          </button>
          <button class="btn btn-danger" @click="cancellOrder">Cancell</button>
        </div>
      </div>
    </div>
  </div>
</template>

      
<script>
import headerbar from "../../components/public/headerbar.vue";
import sidebar from "../../components/public/sidebar.vue";
import ApiServices from "../../services/ApiServices";
import { Modal } from "bootstrap";
import Notification from "../../components/public/Notification.vue";
export default {
  components: {
    sidebar,
    headerbar,
    Notification,
  },
  data() {
    return {
      allOrders: [],
      orderToComplete: {},
      orderToCancell: {},
      modalInstance: null,
      modalInstance2: null,
      orderStatus: {
        cancelled: "cancelled",
        delivered: "delivered",
        pending: "pending",
      },
      paymentStatus: {
        unpaid: "unpaid",
        paid: "paid",
        partial_payment: "partial payment",
      },
      formData: {
        order_status: "",
        payment_status: "",
      },
    };
  },
  methods: {
    getAllOrders() {
      ApiServices.getAllOrders()
        .then((response) => {
          this.allOrders = response.data.data;
        })
        .catch((error) => console.log(error));
    },
    completeOrder() {
      const cleanData = {
        ...this.orderToComplete,
        ...this.formData,
      };
      ApiServices.updateOrderStatus(this.orderToComplete.id, cleanData)
        .then((response) => {
          this.closeModal();
          this.getAllOrders();

          this.$refs.notify.showMessage(
            "Success",
            "Order completed successfully",
            "success"
          );
        })
        .catch((error) => console.log(error));
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
          this.getAllOrders();

          this.$refs.notify.showMessage(
            "Success",
            "Order successfully cancelled",
            "success"
          );
        })
        .catch((error) => console.log(error));
    },

    getorderToComplete(id) {
      this.orderToComplete = this.allOrders.find((order) => order.id === id);
      if (id) {
        (this.formData = {
          order_status: "",
          payment_status: "",
        }),
          this.openModal();
      }
    },

    getOrderToCancell(id) {
      this.orderToCancell = this.allOrders.find((order) => order.id === id);
      if (id) {
        this.openCancellModal();
      }
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
    openModal() {
      if (!this.modalInstance) {
        this.modalInstance = new Modal(this.$refs.orderModal);
      }
      this.modalInstance.show();
    },
    closeModal() {
      if (!this.modalInstance) {
        this.modalInstance = new Modal(this.$refs.orderModal);
      }
      this.modalInstance.hide();
    },
    openCancellModal() {
      if (!this.modalInstance2) {
        this.modalInstance2 = new Modal(this.$refs.cancellModal);
      }
      this.modalInstance2.show();
    },
    closeCancellModal() {
      if (!this.modalInstance2) {
        this.modalInstance2 = new Modal(this.$refs.cancellModal);
      }
      this.modalInstance2.hide();
    },
  },
  mounted() {
    this.getAllOrders();
  },
};
</script>
      
      <style lang="css" scoped>
.transaction-status {
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
  text-wrap: nowrap;
  width: 100% !important;
  margin: 0 auto;
}
.form-control {
  text-transform: capitalize;
}
</style>