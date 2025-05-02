<template>
  <div class="page-wrapper">
    <notification ref="notify" />
    <dashboard-banner>
      <template #banner-body>
        <div class="container-lg text-centers mt-2">
          <h1 class="display-1">My Carts</h1>
        </div>
      </template>
    </dashboard-banner>

    <div class="container-lg mt-4">
      <div class="row">
        <div class="col-12">
          <div class="card card-body client-border">
            <h1 class="fs-7">Recent Carts</h1>
            <!-- <hr /> -->
            <div class="table-responsive">
              <table class="table text-nowrap align-middle mb-0">
                <thead>
                  <tr class="border-2 border-bottom border-primary border-0">
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="4">
                      <div v-if="isLoadingImg" class="text-center">
                        <i
                          class="spinner-border text-primary"
                          role="status"
                        ></i>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!isLoadingCart && allCarts.length === 0">
                    <td colspan="4" class="text-center">
                      No recent carts found.
                    </td>
                  </tr>

                  <tr v-for="(cart, index) in allCarts" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ cart.Product.title }}</td>
                    <td>
                      {{ cart.Product.price ? cart.Product.price.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            })
                          : "" }}
                    </td>
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
                            <button
                              class="dropdown-item"
                              @click="findProductToDelete(cart.productId)"
                            >
                              Remove
                            </button>
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              @click="findSelectedProduct(cart.productId)"
                            >
                              Make Order
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
          <h5 class="modal-title">Modal title</h5>
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
            <div class="">
              <p class="fw-bold p-title mb-0">Product Name</p>
              <p class="p-value">{{ selectedProduct?.Product?.title }}</p>
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
                <p class="p-value">{{ amount }}</p>
              </div>
            </div>

            <div class="form-group">
              <label for="" class="fw-bold text-dark">Quentity</label>
              <input
                type="text"
                class="form-control client-border"
                placeholder="Quentity"
                name=""
                id=""
                v-model.number="quantity"
              />
            </div>
            <p
              class="text-center text-danger fs-4 fw-bold mt-3"
              v-if="quentyError"
            >
              {{ quentyError }}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="registerOrder">
            Generate Order
          </button>
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
    ref="removeModal"
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
            {{ productToDelete?.Product?.title }}
            <!-- <pre>{{ productToDelete.id }}</pre> -->
          </p>
          <button class="btn btn-primary me-3" @click="closeRemoveModal">
            Close
          </button>
          <button
            class="btn btn-danger"
            @click="deleteCart(this.productToDelete.id)"
          >
            Delete
          </button>
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
      price: 100,
      quantity: 0,
      allCarts: [],
      userId: JSON.parse(localStorage.getItem("e_commace_active_user")).userId,
      selectedProduct: {},
      modalInstance: null,
      quentyError: "",
      productToDelete: {},
      isLoadingCart: false,
    };
  },
  methods: {
    getClientCart() {
      this.isLoadingCart = true;
      ApiServices.getClientCart(this.userId)
        .then((response) => {
          this.allCarts = response.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.isLoadingCart = false;
        });
    },
    deleteCart() {
      ApiServices.deleteCart(this.productToDelete.id)
        .then((response) => {
          this.closeRemoveModal();
          this.$refs.notify.showMessage(
            "Delete Successful",
            "Product have successfully deleted.",
            "success"
          );
          this.getClientCart();
          // this.allCarts = response.data.data;
        })
        .catch((error) => console.log(error));
    },

    registerOrder() {
      if (this.quantity <= 0) {
        this.quentyError = "Please enter a valid quantity.";
        setTimeout(() => {
          this.quentyError = "";
        }, 4000);
        return;
      }

      const formData = {
        userId: this.userId,
        productId: this.selectedProduct.productId,
        item_quentity: Number(this.quantity),
        total_amount: Number(this.amount?.replace(/[^0-9.]/g, "")) || 0,
        payment_status: "unpaid",
        order_status: "pending",
      };

      ApiServices.registerOrder(formData)
        .then((response) => {
          this.closeModal();
          this.$refs.notify.showMessage(
            "Registration Successful",
            "Order have successfully registered.",
            "success"
          );
          // setTimeout(() => {
          // this.$router.push({ name: "orders.records" });
          // }, 4000);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    findSelectedProduct(productId) {
      this.allCarts.forEach((cart) => {
        if (cart.Product.id === productId) {
          this.selectedProduct = cart;
          this.quantity = 0;
          this.openModal();
        }
      });
    },
    findProductToDelete(productId) {
      this.allCarts.forEach((cart) => {
        if (cart.Product.id === productId) {
          this.productToDelete = cart;
          this.openRemoveModal();
        }
      });
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

    openRemoveModal() {
      if (!this.modalInstance) {
        this.modalInstance = new Modal(this.$refs.removeModal);
      }
      this.modalInstance.show();
    },
    closeRemoveModal() {
      if (!this.modalInstance) {
        this.modalInstance = new Modal(this.$refs.removeModal);
      }
      this.modalInstance.hide();
    },
  },

  computed: {
    amount() {
      const price = Number(this.selectedProduct?.Product?.price) || 0;
      const qty = Number(this.quantity) || 0;

      return (price * qty).toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
      });
    },
    basePrice() {
      const price = Number(this.selectedProduct?.Product?.price) || 0;

      return price.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
      });
      // return this.selectedProduct?.Product?.price;
    },
  },
  mounted() {
    this.getClientCart();
  },
  watch: {
    quantity(newVal) {
      this.quantity = String(newVal).replace(/[^0-9]/g, "");
    },
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
.p-title {
  font-size: 30px;
  color: #000;
}
.p-value {
  font-size: 20px;
  color: #000;
}
</style>