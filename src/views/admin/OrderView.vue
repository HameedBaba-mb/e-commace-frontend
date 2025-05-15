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
/* ===== Base Layout ===== */
.page-wrapper {
  background-color: #f8fafc;
  min-height: 100vh;
}

.body-wrapper {
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.container-fluid {
  padding: 0;
}

/* ===== Card Styling ===== */
.card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

/* ===== Table Styling ===== */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;

  thead {
    background-color: #f1f5f9;

    th {
      padding: 0.75rem 1rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  tbody {
    tr {
      transition: background-color 0.15s ease;

      &:hover {
        background-color: #f8fafc;
      }

      td {
        padding: 0.75rem 1rem;
        color: #334155;
        border-bottom: 1px solid #e2e8f0;
      }

      &:last-child td {
        border-bottom: none;
      }
    }
  }
}

/* ===== Status Badges ===== */
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;

  &.pending {
    background-color: #fef3c7;
    color: #92400e;
  }

  &.completed {
    background-color: #d1fae5;
    color: #065f46;
  }

  &.cancelled {
    background-color: #fee2e2;
    color: #991b1b;
  }
}

/* ===== Modal Styling ===== */
.modal-content {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;

  .modal-title {
    font-weight: 600;
    color: #1e293b;
    font-size: 1.125rem;
  }
}

.modal-body {
  padding: 1.5rem;

  .alert-danger {
    background-color: #fee2e2;
    color: #b91c1c;
    border: none;
    border-radius: 0.375rem;
    padding: 0.75rem;
    font-weight: 500;
  }

  .fw-bold {
    margin: 1rem 0;
    color: #1e293b;
  }
}

.modal-footer {
  border-top: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
}

.btn {
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.15s ease;

  &-primary {
    background-color: #3b82f6;
    border-color: #3b82f6;

    &:hover {
      background-color: #2563eb;
      border-color: #2563eb;
    }
  }

  &-danger {
    background-color: #ef4444;
    border-color: #ef4444;

    &:hover {
      background-color: #dc2626;
      border-color: #dc2626;
    }
  }
}

/* ===== Responsive Adjustments ===== */
@media (max-width: 768px) {
  .body-wrapper {
    padding: 1rem;
  }

  .table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 2px;
    }
  }
}

@media (max-width: 576px) {
  .card-body {
    padding: 1rem;
  }

  .modal-body {
    padding: 1rem;
  }
}
</style>
     