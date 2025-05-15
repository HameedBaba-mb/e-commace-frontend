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
              <router-link
                class="btn btn-primary mb-1"
                :to="{ name: 'register.product' }"
                >New Product</router-link
              >
              <h5 class="card-title fw-semibold mb-4">Product Records</h5>
            </div>
            <div class="table-reponsive">
              <table class="table text-nowrap align-middle mb-0">
                <thead>
                  <tr class="border-2 border-bottom border-primary border-0">
                    <th scope="col">SN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoadingProduct" class="text-center">
                    <td colspan="5">
                      <div
                        class="spinner-border text-primary"
                        role="status"
                      ></div>
                    </td>
                  </tr>
                  <tr v-if="!isLoadingProduct && allProducts.length === 0">
                    <td colspan="5" class="text-center">No product found.</td>
                  </tr>
                  <tr v-for="(product, index) in allProducts" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ product.title }}</td>
                    <td>
                      {{
                        product.price
                          ? product.price.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            })
                          : ""
                      }}
                    </td>
                    <td>{{ product.Category.title }}</td>
                    <!-- <td class="text-capitalize">{{ product.user_status }}</td> -->
                    <td>
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
                                name: 'update.product',
                                params: { id: product.id },
                              }"
                              >Update</router-link
                            >
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              @click="getproductToDelete(product.id)"
                            >
                              Delete
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
            Are you sure you want delete this product
          </p>
          <p class="fw-bold">
            {{ productToDelete.title }}
          </p>
          <button class="btn btn-primary me-3" @click="closeDeleteModal">
            Close
          </button>
          <button
            class="btn btn-danger"
            @click="deleteProductById(this.productToDelete.id)"
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
      allProducts: [],
      deleteModalInstance: null,
      productToDelete: {},
      isLoadingProduct: false,
    };
  },
  methods: {
    getAllProducts() {
      this.isLoadingProduct = true;
      ApiServices.getAllProducts()
        .then((response) => {
          this.allProducts = response.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.isLoadingProduct = false;
        });
    },
    deleteProductById(id) {
      ApiServices.deleteProductById(id)
        .then((response) => {
          this.closeDeleteModal();
          this.getAllProducts();
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

    getproductToDelete(id) {
      this.productToDelete = this.allProducts.find((admin) => admin.id === id);
      if (id) {
        this.openDeleteModal();
      }
    },
  },
  mounted() {
    this.getAllProducts();
  },
};
</script>
    
    <!-- <style lang="scss" scoped>
/* ===== Base Layout ===== */
.page-wrapper {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.body-wrapper {
  padding: 20px;
  transition: all 0.3s ease;
}

.container-fluid {
  padding: 0;
}

/* ===== Card Styling ===== */
.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0;
}

/* ===== Table Styling ===== */
.table {
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: separate;
  border-spacing: 0;
  
  thead {
    background-color: #f8f9fa;
    
    th {
      font-weight: 600;
      color: #495057;
      padding: 12px 15px;
      border-bottom: 2px solid #e9ecef;
      vertical-align: middle;
    }
  }
  
  tbody {
    tr {
      transition: all 0.2s ease;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }
      
      td {
        padding: 12px 15px;
        vertical-align: middle;
        border-bottom: 1px solid #e9ecef;
        color: #495057;
      }
    }
  }
}

/* ===== Button Styling ===== */
.btn-primary {
  background-color: #4e73df;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3a5ccc;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

/* ===== Dropdown Styling ===== */
.dropdown-toggles {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  i {
    font-size: 14px;
  }
}

.dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 0.5rem;
  
  .dropdown-item {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f8f9fa;
      color: #4e73df;
    }
  }
}

/* ===== Modal Styling ===== */
.modal-content {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 1.5rem;
  
  .modal-title {
    font-weight: 600;
    color: #2c3e50;
  }
}

.modal-body {
  padding: 1.5rem;
  
  .alert-danger {
    background-color: #fee4e2;
    color: #f04438;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1rem;
  }
  
  .fw-bold {
    margin: 1rem 0;
    font-size: 1.1rem;
  }
  
  .btn {
    padding: 0.5rem 1.25rem;
    font-weight: 500;
    border-radius: 6px;
  }
  
  .btn-danger {
    background-color: #f04438;
    border: none;
    
    &:hover {
      background-color: #d92c20;
    }
  }
}

/* ===== Responsive Adjustments ===== */
@media (max-width: 992px) {
  .table-responsive {
    overflow-x: auto;
    display: block;
    width: 100%;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #d1d5db;
      border-radius: 3px;
    }
  }
  
  .card-body {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .body-wrapper {
    padding: 15px;
  }
  
  .d-flex {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start !important;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
}

/* ===== Status Badges (if you add status indicators later) ===== */
.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  
  &.active {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  &.inactive {
    background-color: #fee2e2;
    color: #b91c1c;
  }
}
</style> -->


<style lang="scss" scoped>
.page-wrapper {
  background-color: #f7fafc;
  min-height: 100vh;
  padding-top: 4rem;
}

// .body-wrapper {
//   padding: 1.5rem;
//   transition: all 0.3s ease;
// }

.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow: hidden;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.table {
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #3c4b64;
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background-color: #f3f4f6;
    color: #4b5563;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  tbody tr {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f9fafb;
    }

    &:last-child td {
      border-bottom: none;
    }
  }
}

.btn {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #1f2937;
  border: 1px solid #1f2937;
  color: white;

  &:hover {
    background-color: #374151;
    border-color: #374151;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.dropdown-toggles {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 6px;

  i {
    font-size: 14px;
  }
}

.dropdown-menu {
  min-width: 180px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;

  .dropdown-item {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: #4b5563;
    border-radius: 4px;
    margin: 0 0.25rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f3f4f6;
      color: #111827;
    }
  }
}

.modal-content {
  border-radius: 8px;
  border: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: 1px solid #e5e7eb;
  padding: 1.25rem;

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }

  .btn-close {
    font-size: 0.75rem;
  }
}

.modal-body {
  padding: 1.5rem;
  text-align: center;

  .alert-danger {
    color: #dc2626;
    background-color: #fee2e2;
    border: none;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-weight: 500;
  }

  .fw-bold {
    margin: 1.25rem 0;
    color: #111827;
    font-size: 1.1rem;
  }
}

.modal-footer {
  border-top: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;

  .btn {
    min-width: 100px;
  }

  .btn-danger {
    background-color: #dc2626;
    border-color: #dc2626;

    &:hover {
      background-color: #b91c1c;
      border-color: #b91c1c;
    }
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-wrapper {
    padding-top: 3.5rem;
  }

  .body-wrapper {
    padding: 1rem;
  }

  .card-body {
    padding: 1.25rem;
  }

  .table {
    display: block;
    overflow-x: auto;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #d1d5db;
      border-radius: 3px;
    }
  }
}

@media (max-width: 576px) {
  .modal-body {
    padding: 1.25rem;
  }
  
  .d-flex {
    flex-direction: column;
    gap: 1rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
}
</style>