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
                Register new product
              </p>
              <vee-form
                @submit="registerProduct"
                :validation-schema="formValidation"
              >
                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <vee-field
                    as="select"
                    class="custom-select form-control"
                    id="category"
                    aria-describedby="textHelp"
                    name="categoryId"
                    v-model="formData.categoryId"
                  >
                    <option value="" selected disabled>Select Category</option>
                    <option
                      v-for="(category, index) in allCategiries"
                      :key="index"
                      :value="category.id"
                    >
                      {{ category.title }}
                    </option>
                  </vee-field>
                  <vee-error-message name="categoryId" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <vee-field
                    type="text"
                    class="form-control"
                    id="title"
                    aria-describedby="textHelp"
                    placeholder="Title"
                    name="title"
                    v-model="formData.title"
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
                    v-model="formData.description"
                  />
                  <vee-error-message name="description" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="price" class="form-label">Price</label>
                  <vee-field
                    type="text"
                    class="form-control"
                    id="price"
                    name="price"
                    aria-describedby="emailHelp"
                    placeholder="Price"
                    v-model="formData.price"
                  />
                  <vee-error-message name="price" class="text-danger" />
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
                    v-model="formData.slug"
                  />
                  <vee-error-message name="slug" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="product_image" class="form-label"
                    >Category Image</label
                  >
                  <vee-field
                    type="file"
                    accept="image/*"
                    class="form-control"
                    name="product_image"
                    aria-describedby="emailHelp"
                    placeholder="Category image"
                    v-model="formData.product_image"
                    @change="updatePreview"
                    id="product_image"
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
                  Register
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
      product_image: yup.string().required("Category image is required"),
      price: yup.string().required("Price image is required"),
      categoryId: yup.string().required("Category is required"),
    });

    return {
      formData: {
        title: "",
        description: "",
        slug: "",
        categoryId: "",
        product_image: "",
        is_active: true,
        price: "",
      },
      imagePreview: "",
      allCategiries: [],
      formValidation,
    };
  },
  methods: {
    getAllCategory() {
      ApiServices.getAllCategory()
        .then((response) => {
          this.allCategiries = response.data.data;
        })
        .catch((error) => console.log(error));
    },

    registerProduct() {
      ApiServices.registerProduct(this.formData)
        .then((response) => {
          this.$refs.notify.showMessage(
            "Registration Successful",
            "Product have successfully registered.",
            "success"
          );
          setTimeout(() => {
            this.$router.push({ name: "product.records" });
          }, 4000);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadImage(event) {
      document.getElementById("product_image").click();
    },
    // updatePreview(e) {
    //   const files = e.target.files;
    //   if (!files.length) return;

    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     this.imagePreview = event.target.result;
    //   };
    //   reader.readAsDataURL(files[0]);
    // },

    updatePreview(e) {
      const files = e.target.files;
      if (!files.length) return;

      this.formData.product_image = files[0]; // Important: this is the actual File object

      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
  },
  mounted() {
    this.getAllCategory();
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