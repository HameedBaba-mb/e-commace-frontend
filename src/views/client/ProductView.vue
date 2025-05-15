<template>
  <div class="page-wrapper">
    <notification ref="notify" />
    <dashboard-banner>
      <template #banner-body>
        <div class="container-lg text-centers mt-2">
          <h1 class="display-1">Product</h1>
        </div>
      </template>
    </dashboard-banner>

    <div class="container-lg">
      <div class="card">
        <div class="card-body client-border">
          <div class="row">
            <div
              class="col-lg-3 col-md-4 col-sm-6"
              v-for="(product, index) in allProdcuts"
              :key="index"
            >
              <CategoryCard
                :description="product.description"
                :title="product.title"
                :img="product.imageUrl"
              >
                <template #card-content>
                  <button
                    @click="addToCart(this.userId, product.id)"
                    class="btn btn-sm btn-dark py-2 fw-semibold"
                  >
                    Add to Cart
                  </button>
                </template>
              </CategoryCard>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-lg">
      <div class="card">
        <div class="card-body client-border">
          <div class="row">
            <!-- Loading Spinner -->
            <div v-if="isLoading" class="text-center">
              <i class="fa fa-spinner fa-spin fa-2x"></i>
            </div>

            <!-- No Products Found -->
            <div v-else-if="allProdcuts.length === 0" class="text-center">
              <p>No products available.</p>
            </div>

            <!-- Product Cards -->
            <div
              v-else
              class="col-lg-3 col-md-4 col-sm-6"
              v-for="(product, index) in allProdcuts"
              :key="index"
            >
              <CategoryCard
                :description="product.description"
                :title="product.title"
                :img="product.imageUrl"
              >
                <template #card-content>
                  <button
                    @click="addToCart(userId, product.id)"
                    class="btn btn-sm btn-dark py-2 fw-semibold"
                  >
                    Add to Cart
                  </button>
                </template>
              </CategoryCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import DashboardBanner from "../../components/client/DashboardBanner.vue";
import ClientCard from "../../components/client/ClientCard.vue";
import CategoryCard from "../../components/client/CategoryCard.vue";
import ApiServices from "../../services/ApiServices";
import Notification from "../../components/public/Notification.vue";
export default {
  components: {
    DashboardBanner,
    ClientCard,
    CategoryCard,
    Notification,
  },
  name: "ProductView",
  data() {
    return {
      allProdcuts: [],
      imagePreview: "",
      userId: "",
      isLoading: false,
    };
  },
  methods: {
    getProductByCategoryId() {
      this.isLoading = true;
      ApiServices.getProductByCategoryId(this.categoryId)
        .then(async (response) => {
          const categories = response.data.data;

          // Loop through each product to fetch image
          const categoriesWithImages = await Promise.all(
            categories.map(async (product) => {
              try {
                const imageResponse = await ApiServices.getProductImage(
                  product.product_image
                );
                const blob = new Blob([imageResponse.data], {
                  type: imageResponse.headers["content-type"],
                });
                product.imageUrl = URL.createObjectURL(blob); // attach image blob url
              } catch (err) {
                // console.error("Image fetch failed for:", product.title);
                product.imageUrl = null;
              }
              return product;
            })
          );

          this.allProdcuts = categoriesWithImages;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.isLoading = false;
        });
    },

    loadImage(event) {
      document.getElementById("product_image").click();
    },

    updatePreview(e) {
      const files = e.target.files;
      if (!files.length) return;

      this.allCategories.product_image = files[0]; // Important: this is the actual File object

      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    getProductImage(image_name) {
      ApiServices.getProductImage(image_name, {
        responseType: "blob",
      })
        .then((response) => {
          // this.imagePreview = response.data;
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          this.imagePreview = URL.createObjectURL(blob);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addToCart(userId, productId) {
      ApiServices.addToCart({ userId, productId })
        .then((response) => {
          this.$refs.notify.showMessage(
            "Registration Successful",
            "Product have successfully added to cart.",
            "success"
          );
          //   setTimeout(() => {
          //     this.$router.push({ name: "category.records" });
          //   }, 4000);
        })
        .catch((error) => {
          console.error(error);

          if (error.response.status === 500 || error.response.status === 400) {
            this.$refs.notify.showMessage(
              "Registration Failed",
              error.response.data.message,
              "error"
            );
          }
          if (error.response.status === 404) {
            this.$refs.notify.showMessage(
              "Registration Failed",
              "Product not found.",
              "error"
            );
          }
        });
    },
  },
  computed: {
    categoryId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getProductByCategoryId();
    this.userId = JSON.parse(
      localStorage.getItem("e_commace_active_user")
    ).userId;
  },
};
</script>
    
    <!-- <style lang="css" scoped>
@import url("../../assets/css/client-style.css");
.display-1 {
  /* font-size: 2.5rem; */
  font-weight: 700;
  color: #fff;
}
</style> -->

<style lang="css" scoped>
/* ===== Main Layout ===== */
.page-wrapper {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.container-lg {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
}

/* ===== Banner ===== */
.text-centers {
  text-align: center;
}

.display-1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 0;
}

/* ===== Card Container ===== */
.client-border {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background: #fff;
  padding: 1.5rem;
}

/* ===== Product Grid ===== */
.row {
  display: flex;
  flex-wrap: wrap;
  margin: -0.75rem; /* Negative margin to counteract column padding */
}

.col-lg-3,
.col-md-4,
.col-sm-6 {
  padding: 0.75rem; /* Consistent gutter spacing */
  transition: transform 0.2s ease;
}

/* ===== Loading State ===== */
.text-center {
  width: 100%;
  padding: 2rem;
}

.fa-spinner {
  color: #4e73df;
}

/* ===== Empty State ===== */
.text-center p {
  color: #6c757d;
  font-size: 1.1rem;
  margin-top: 1rem;
}

/* ===== Add to Cart Button ===== */
.btn-dark {
  background-color: #343a40;
  border: none;
  width: 100%;
  transition: all 0.3s ease;
  border-radius: 5px;
}

.btn-dark:hover {
  background-color: #23272b;
  transform: translateY(-2px);
}

.btn-dark:active {
  transform: translateY(0);
}

/* ===== Responsive Adjustments ===== */
@media (max-width: 992px) {
  .col-lg-3 {
    flex: 0 0 33.333%;
    max-width: 33.333%;
  }
}

@media (max-width: 768px) {
  .display-1 {
    font-size: 2rem;
  }

  .col-md-4 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 576px) {
  .col-sm-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .client-border {
    padding: 1rem;
  }
}

/* ===== Animation for Loading ===== */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.row > * {
  animation: fadeIn 0.3s ease forwards;
}

/* ===== Hover Effects for Product Cards ===== */
.col-lg-3:hover,
.col-md-4:hover,
.col-sm-6:hover {
  transform: translateY(-5px);
}
</style>
