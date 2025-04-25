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
    <notification ref="notify" />
    <sidebar />
    <div class="body-wrapper">
      <headerbar />
      <div class="row justify-content-center">
        <div class="col-md-12 col-lg-8 col-xxl-5 col-sm-8col-xxs-6">
          <div class="card mb-0">
            <div class="card-body">
              <a
                href="./index.html"
                class="text-nowrap logo-img text-center d-block py-3 w-100"
              >
                <!-- <img src="../assets/images/logos/logo-light.svg" alt="" /> -->
              </a>
              <p class="text-center fw-bold card-title mt-5">
                Update new category
              </p>
              <vee-form
                @submit="updateCategoryById"
                :validation-schema="formValidation"
              >
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <vee-field
                    type="text"
                    class="form-control"
                    id="title"
                    aria-describedby="textHelp"
                    placeholder="Title"
                    name="title"
                    v-model="allCategories.title"
                  />
                  <vee-error-message name="title" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label"
                    >Description</label
                  >
                  <vee-field
                    type="email"
                    class="form-control"
                    id="description"
                    name="description"
                    aria-describedby="emailHelp"
                    placeholder="Description"
                    v-model="allCategories.description"
                  />
                  <vee-error-message name="description" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="slug" class="form-label">Slug</label>
                  <vee-field
                    type="email"
                    class="form-control"
                    id="slug"
                    name="slug"
                    aria-describedby="emailHelp"
                    placeholder="SLug"
                    v-model="allCategories.slug"
                  />
                  <vee-error-message name="slug" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="category_image" class="form-label"
                    >Category Image</label
                  >
                  <vee-field
                    type="file"
                    accept="image/*"
                    class="form-control"
                    name="category_image"
                    aria-describedby="emailHelp"
                    placeholder="Category image"
                    v-model="allCategories.category_image"
                    @change="updatePreview"
                    id="category_image"
                  />
                  <vee-error-message name="phone_no" class="text-danger" />
                  <div class="row justify-content-center mt-3">
                    <div class="cat-img-wrapper" v-if="imagePreview">
                      <img
                        id="benImage"
                        alt="Preview"
                        :src="imagePreview"
                        v-if="imagePreview"
                        class="img-fluid mt-3 cat-img"
                      />
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary w-100 py-8 fs-4 mb-4">
                  Update
                </button>
              </vee-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import headerbar from "../../../components/public/headerbar.vue";
import Notification from "../../../components/public/Notification.vue";
import sidebar from "../../../components/public/sidebar.vue";
import ApiServices from "../../../services/ApiServices";
import * as yup from "yup";
export default {
  components: {
    sidebar,
    headerbar,
    Notification,
  },
  data() {
    const formValidation = yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      category_image: yup.string().required("Category image is required"),
    });

    return {
      // allCategories: {
      //   title: "",
      //   description: "",
      //   category_image: "",
      //   slug: "",
      // },
      allCategories: {},
      imagePreview: "",
      formValidation,
    };
  },
  methods: {
    // updateCategoryById() {
    //   ApiServices.updateCategoryById(this.categoryId, this.allCategories)
    //     .then((response) => {
    //       this.$refs.notify.showMessage(
    //         "Registration Successful",
    //         "Category updated have successfully registered.",
    //         "success"
    //       );
    //       setTimeout(() => {
    //         this.$router.push({ name: "category.records" });
    //       }, 4000);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    updateCategoryById() {
      const formData = new FormData();
      formData.append("title", this.allCategories.title);
      formData.append("description", this.allCategories.description);
      formData.append("slug", this.allCategories.slug);

      // only append category_image if it's a File (new image selected)
      if (this.allCategories.category_image instanceof File) {
        formData.append("category_image", this.allCategories.category_image);
      }

      ApiServices.updateCategoryById(this.categoryId, formData)
        .then((response) => {
          this.$refs.notify.showMessage(
            "Update Successful",
            "Category updated successfully.",
            "success"
          );
          setTimeout(() => {
            this.$router.push({ name: "category.records" });
          }, 4000);
        })
        .catch((error) => {
          console.error(error);
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

    getCatetoryImage() {
      ApiServices.getCatetoryImage(this.allCategories.category_image, {
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
    getCategoryById() {
      ApiServices.getCategoryById(this.categoryId)
        .then((response) => {
          this.allCategories = response.data.data;
          this.getCatetoryImage();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    categoryId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getCategoryById();
  },
};
</script>
  
  <style lang="css" scoped>
.cat-img-wrapper {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: -0px;
  background: transparent;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.cat-img {
  width: 100% !important;
}
</style>