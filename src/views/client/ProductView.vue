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
    
    <style lang="css" scoped>
@import url("../../assets/css/client-style.css");
.display-1 {
  /* font-size: 2.5rem; */
  font-weight: 700;
  color: #fff;
}
</style>