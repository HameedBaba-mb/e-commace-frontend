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
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">SN</th>
                    <th scope="col">Client</th>
                    <!-- <th scope="col">Description</th> -->
                    <th scope="col">Quentity</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in allOrders" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ order.User.first_name + " " + order.User.last_name }}</td>
                    <td>{{ order.item_quentity }}</td>
                    <td>{{ order.total_amount }}</td>
                    <td>{{ order.order_status }}</td>
                    <td>{{ order.payment_status }}</td>
                    <!-- <td class="text-capitalize">{{ order.user_status }}</td> -->
                    <!-- <td>
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
                            <router-link
                              class="dropdown-item"
                              :to="{
                                name: 'update.order',
                                params: { id: order.id },
                              }"
                              >Update</router-link
                            >
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              @click="getorderToDelete(order.id)"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td> -->
                  </tr>
                </tbody>
              </table>
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
      ref="deleteModal"
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
              Are you sure you want delete this order
            </p>
            <p class="fw-bold">
              {{ orderToDelete.title }}
            </p>
            <button class="btn btn-primary me-3" @click="closeDeleteModal">
              Close
            </button>
            <button
              class="btn btn-danger"
              @click="deleteorderById(this.orderToDelete.id)"
            >
              Delete
            </button>
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
  export default {
    components: {
      sidebar,
      headerbar,
    },
    data() {
      return {
        allOrders: [],
        deleteModalInstance: null,
        orderToDelete: {},
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
      deleteorderById(id) {
        ApiServices.deleteorderById(id)
          .then((response) => {
            this.closeDeleteModal();
            this.getAllOrders();
          })
          .catch((error) => console.log(error));
      },
      openDeleteModal() {
        if (!this.deleteModalInstance) {
          this.deleteModalInstance = new Modal(this.$refs.deleteModal);
        }
        this.deleteModalInstance.show();
      },
      closeDeleteModal() {
        if (!this.deleteModalInstance) {
          this.deleteModalInstance = new Modal(this.$refs.deleteModal);
        }
        this.deleteModalInstance.hide();
      },
  
      getorderToDelete(id) {
        this.orderToDelete = this.allOrders.find((admin) => admin.id === id);
        if (id) {
          this.openDeleteModal();
        }
      },
    },
    mounted() {
      this.getAllOrders();
    },
  };
  </script>
      
      <style lang="scss" scoped>
  </style>