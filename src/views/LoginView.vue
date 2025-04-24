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
    <div
      class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center"
    >
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
                <a
                  href="./index.html"
                  class="text-nowrap logo-img text-center d-block py-3 w-100"
                >
                  <img src="../assets/images/logos/logo-light.svg" alt="" />
                </a>
                <p class="text-center">Login to your account</p>
                <vee-form @submit="login" :validation-schema="formValidation">
                  <div class="mb-4">
                    <label for="email" class="form-label">Email</label>
                    <vee-field
                      v-model="formData.email"
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      id="email"
                      name="email"
                    />
                    <vee-error-message name="email" class="text-danger" />
                  </div>

                  <div class="mb-4">
                    <label for="password" class="form-label">Password</label>
                    <vee-field
                      v-model="formData.password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      id="password"
                      name="password"
                    />
                    <vee-error-message name="password" class="text-danger" />
                  </div>

                  <button class="btn btn-primary w-100 py-8 fs-4 mb-4">
                    Sign In
                  </button>
                </vee-form>

                <div class="d-flex align-items-center justify-content-center">
                  <p class="fs-4 mb-0 fw-bold">New to account?</p>

                  <router-link
                    class="text-primary fw-bold ms-2"
                    :to="{ name: 'new.account' }"
                    >Create an account</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "../components/public/Notification.vue";
import * as yup from "yup";
import ApiServices from "../services/ApiServices";

export default {
  name: "LoginView",
  components: {
    Notification,
  },
  data() {
    const formValidation = yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .matches(this.emailRegEx(), "Email Address is not valid"),
      password: yup.string().required("Password is required"),
    });
    return {
      formValidation,
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      ApiServices.login(this.formData)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem(
              "e_commace_active_user",
              JSON.stringify(response.data.data)
            );
            this.$refs.notify.showMessage(
              "Success",
              "You have successfully logged in.",
              "success"
            );
            setTimeout(() => {
              if (response.data.data.user_status === "admin") {
                this.$router.push({ name: "admin.dashboard" });
              } else {
                this.$router.push({ name: "client.dashboard" });
              }
            }, 4000);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.formData);
    },
  },
  mounted() {},
  computed: {},
};
</script>

<style lang="css" scoped>
input::placeholder {
  font-size: 10px;
  color: var(--primary);
}
</style>