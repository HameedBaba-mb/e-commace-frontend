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
                :to="{ name: 'register.client' }"
                >New Client</router-link
              >
              <h5 class="card-title fw-semibold mb-4">Client Records</h5>
            </div>
            <div class="table-responsive">
              <table class="table text-nowrap align-middle mb-0">
                <thead>
                  <tr class="border-2 border-bottom border-primary border-0">
                    <th scope="col">SN</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoadingClient" class="text-center">
                    <td colspan="8">
                      <div
                        class="spinner-border text-primary"
                        role="status"
                      ></div>
                    </td>
                  </tr>
                  <tr v-if="!isLoadingClient && allClient.length === 0">
                    <td colspan="8" class="text-center">No client found.</td>
                  </tr>
                  <tr v-for="(admins, index) in allClient" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ admins.first_name }}</td>
                    <td>{{ admins.last_name }}</td>
                    <td>{{ admins.email }}</td>
                    <td>{{ admins.phone_no }}</td>
                    <td class="text-capitalize">{{ admins.user_status }}</td>
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
                                name: 'update.client',
                                params: { id: admins.id },
                              }"
                              >Update</router-link
                            >
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              @click="getAdminToDelete(admins.id)"
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
            Are you sure you want delete this client
          </p>
          <p class="fw-bold">
            {{ adminToDelete.first_name + " " + adminToDelete.last_name }}
          </p>
          <button class="btn btn-primary me-3" @click="closeDeleteModal">
            Close
          </button>
          <button
            class="btn btn-danger"
            @click="deleteAdmin(this.adminToDelete.id)"
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
      allClient: [],
      deleteModalInstance: null,
      adminToDelete: {},
      isLoadingClient: false,
    };
  },
  methods: {
    getAllClient() {
      this.isLoadingClient = true;
      ApiServices.getAllClient()
        .then((response) => {
          this.allClient = response.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.isLoadingClient = false;
        });
    },
    deleteAdmin(id) {
      ApiServices.deleteUser(id)
        .then((response) => {
          this.closeDeleteModal();
          this.getAllClient();
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

    getAdminToDelete(id) {
      this.adminToDelete = this.allClient.find((admin) => admin.id === id);
      if (id) {
        this.openDeleteModal();
      }
    },
  },
  mounted() {
    this.getAllClient();
  },
};
</script>
  
  <style lang="scss" scoped>
</style>