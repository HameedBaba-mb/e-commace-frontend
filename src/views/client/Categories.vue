<template>
  <div class="page-wrapper">
    <dashboard-banner>
      <template #banner-body>
        <div class="container-lg text-centers mt-2">
          <h1 class="display-1">Categories</h1>
        </div>
      </template>
    </dashboard-banner>

    <div class="row"></div>

    <!-- <div class="container-lg">
      <div class="card">
        <div class="card-body client-border">
          <div class="row">
            <div v-if="isLoading">
              <i class="fa fa-spinner fa-spin fa-2x"></i>
            </div>
            <div
            v-if="!isLoading && allCategiries.length === 0"
              class="col-lg-3 col-md-4 col-sm-6"
              v-for="(category, index) in allCategiries"
              :key="index"
            >
              <CategoryCard
                :description="category.description"
                :title="category.title"
                :img="category.imageUrl"
                :prodId="category.id"
              >
                <template #card-content>
                  <router-link
                    class="btn btn-primary py-2 fw-semibold"
                    style="border-radius: 5px"
                    :to="{
                      name: 'client.categories.products',
                      params: { id: category.id },
                    }"
                  >
                    View Product
                  </router-link>
                </template>
              </CategoryCard>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="container-lg">
      <div class="card">
        <div class="card-body client-border">
          <div class="row">
            <!-- Loading Spinner -->
            <div v-if="isLoading" class="text-center">
              <i class="fa fa-spinner fa-spin fa-2x"></i>
            </div>

            <!-- No Categories Found -->
            <div v-else-if="allCategiries.length === 0" class="text-center">
              <p>No categories available.</p>
            </div>

            <!-- Category Cards -->
            <div
              v-else
              class="col-lg-3 col-md-4 col-sm-6"
              v-for="(category, index) in allCategiries"
              :key="index"
            >
              <CategoryCard
                :description="category.description"
                :title="category.title"
                :img="category.imageUrl"
                :prodId="category.id"
              >
                <template #card-content>
                  <router-link
                    class="btn btn-primary py-2 fw-semibold"
                    style="border-radius: 5px"
                    :to="{
                      name: 'client.categories.products',
                      params: { id: category.id },
                    }"
                  >
                    View Product
                  </router-link>
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
import CompLoader from "../../components/ui/CompLoader.vue";
export default {
  components: {
    DashboardBanner,
    ClientCard,
    CategoryCard,
    CompLoader,
  },
  name: "ClientDashboard",
  data() {
    return {
      allCategiries: [],
      imagePreview: "",
      isLoading: false,
    };
  },
  methods: {
    // getAllCategory() {
    //   ApiServices.getAllCategory()
    //     .then((response) => {
    //       this.allCategiries = response.data.data;
    //     })
    //     .catch((error) => console.log(error));
    // },
    getAllCategory() {
      this.isLoading = true;
      ApiServices.getAllCategory()
        .then(async (response) => {
          const categories = response.data.data;

          // Loop through each category to fetch image
          const categoriesWithImages = await Promise.all(
            categories.map(async (category) => {
              try {
                const imageResponse = await ApiServices.getCatetoryImage(
                  category.category_image
                );
                const blob = new Blob([imageResponse.data], {
                  type: imageResponse.headers["content-type"],
                });
                category.imageUrl = URL.createObjectURL(blob); // attach image blob url
              } catch (err) {
                // console.error("Image fetch failed for:", category.title);
                category.imageUrl = null;
              }
              return category;
            })
          );

          this.allCategiries = categoriesWithImages;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.isLoading = false;
        });
    },

    loadImage(event) {
      document.getElementById("category_image").click();
    },

    updatePreview(e) {
      const files = e.target.files;
      if (!files.length) return;

      this.allCategories.category_image = files[0]; // Important: this is the actual File object

      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    getCatetoryImage(image_name) {
      ApiServices.getCatetoryImage(image_name, {
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
  },
  mounted() {
    this.getAllCategory();
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