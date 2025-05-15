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
                :to="{ name: 'register.category' }"
                >New Category</router-link
              >
              <h5 class="card-title fw-semibold mb-4">Category Records</h5>
            </div>
            <div class="table-responsive">
              <table class="table text-nowrap align-middle mb-0">
                <thead>
                  <tr class="border-2 border-bottom border-primary border-0">
                    <th scope="col">SN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoadingCategory" class="text-center">
                    <td colspan="4">
                      <div
                        class="spinner-border text-primary"
                        role="status"
                      ></div>
                    </td>
                  </tr>
                  <tr v-if="!isLoadingCategory && allCategiries.length === 0">
                    <td colspan="4" class="text-center">No category found.</td>
                  </tr>
                  <tr v-for="(category, index) in allCategiries" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ category.title }}</td>
                    <td>{{ category.description }}</td>
                    <td>{{ category.category_image }}</td>
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
                                name: 'update.category',
                                params: { id: category.id },
                              }"
                              >Update</router-link
                            >
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              @click="getCategoryToDelete(category.id)"
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
            Are you sure you want delete this category
          </p>
          <p class="fw-bold">
            {{ categoryToDelete.title }}
          </p>
          <button class="btn btn-primary me-3" @click="closeDeleteModal">
            Close
          </button>
          <button
            class="btn btn-danger"
            @click="deleteCategory(this.categoryToDelete.id)"
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
      allCategiries: [],
      deleteModalInstance: null,
      categoryToDelete: {},
      isLoadingCategory: false,
    };
  },
  methods: {
    getAllCategory() {
      this.isLoadingCategory = true;
      ApiServices.getAllCategory()
        .then((response) => {
          this.allCategiries = response.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.isLoadingCategory = false;
        });
    },
    deleteCategory(id) {
      ApiServices.deleteCategoryById(id)
        .then((response) => {
          this.closeDeleteModal();
          this.getAllCategory();
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

    getCategoryToDelete(id) {
      this.categoryToDelete = this.allCategiries.find(
        (category) => category.id === id
      );
      if (id) {
        this.openDeleteModal();
      }
    },
  },
  mounted() {
    this.getAllCategory();
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: #f7fafc; // Light background for the page
  padding-top: 4rem; // Space out the top
}

.card {
  border: 1px solid #e5e7eb; // Light border around the card
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.table {
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #3c4b64;
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #f3f4f6; // Light background for headers
  color: #6b7280; // Text color for headers
}

.table tbody tr:hover {
  background-color: #f9fafb; // Highlight row on hover
  cursor: pointer;
}

.table .btn {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-top: 0.5rem;
}

.btn-primary {
  background-color: #1f2937;
  border-color: #1f2937;
}

.btn-primary:hover {
  background-color: #374151;
  border-color: #374151;
}

.dropdown-menu {
  min-width: 180px;
}

.modal-content {
  border-radius: 8px;
  padding: 1.5rem;
}

.modal-header {
  border-bottom: 1px solid #e5e7eb;
}

.modal-body {
  padding: 1rem;
  text-align: center;
}

.modal-footer button {
  border-radius: 6px;
}

.alert-danger {
  color: #dc2626;
  background-color: #fee2e2;
  border-color: #fca5a5;
}

.dropdown-item {
  font-size: 0.9rem;
}

</style>