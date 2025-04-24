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
        <div class="col-md-12 col-lg-8 col-xxl-5 col-sm-8 col-xxs-6">
          <div class="card mb-0">
            <div class="card-body">
              <a
                href="./index.html"
                class="text-nowrap logo-img text-center d-block py-3 w-100"
              >
              </a>
              <p class="text-center fw-bold card-title mt-5">
                Update new client
              </p>
              <vee-form
                @submit="updateUser"
                :validation-schema="formValidation"
              >
                <div class="mb-3">
                  <label for="first_name" class="form-label">First Name</label>
                  <vee-field
                    type="text"
                    class="form-control"
                    id="first_name"
                    aria-describedby="textHelp"
                    placeholder="First Name"
                    name="first_name"
                    v-model="allAdmins.first_name"
                  />
                  <vee-error-message name="first_name" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="last_name" class="form-label">Last Name</label>
                  <vee-field
                    type="email"
                    class="form-control"
                    id="last_name"
                    name="last_name"
                    aria-describedby="emailHelp"
                    placeholder="Last Name"
                    v-model="allAdmins.last_name"
                  />
                  <vee-error-message name="last_name" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="phone_no" class="form-label">Phone Number</label>
                  <vee-field
                    type="text"
                    class="form-control"
                    id="phone_no"
                    name="phone_no"
                    aria-describedby="emailHelp"
                    placeholder="Phone Number"
                    v-model="allAdmins.phone_no"
                  />
                  <vee-error-message name="phone_no" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="email_address" class="form-label"
                    >Email Address</label
                  >
                  <vee-field
                    type="email"
                    class="form-control"
                    id="email_address"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
                    v-model="allAdmins.email"
                  />
                  <vee-error-message name="email" class="text-danger" />
                </div>
                <div class="row">
                  <div class="col col-lg-6 col-md-6 col-xxl-6">
                    <div class="mb-4">
                      <label for="password" class="form-label">Password</label>
                      <vee-field
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        v-model="allAdmins.password"
                      />
                      <vee-error-message name="password" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-xxl-6">
                    <div class="mb-4">
                      <label for="confirm_password" class="form-label"
                        >Confirm Password</label
                      >
                      <vee-field
                        type="password"
                        class="form-control"
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        v-model="allAdmins.confirm_password"
                      />
                      <vee-error-message
                        name="confirm_password"
                        class="text-danger"
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
import headerbar from "../../../../components/public/headerbar.vue";
import Notification from "../../../../components/public/Notification.vue";
import sidebar from "../../../../components/public/sidebar.vue";
import ApiServices from "../../../../services/ApiServices";
import * as yup from "yup";
export default {
  components: {
    sidebar,
    headerbar,
    Notification,
  },
  data() {
    const formValidation = yup.object().shape({
      first_name: yup.string().required("First is required"),
      last_name: yup.string().required("Last is required"),
      phone_no: yup
        .string()
        .required("Phone number is required")
        .matches(this.mobileNumberRegEx(), "Phone Number is not valid"),
      email: yup
        .string()
        .required("Email address is required")
        .matches(this.emailRegEx(), "Email Address is not valid"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirm_password: yup
        .string()
        .required("Confirm password is required")
        .min(8, "Password must be at least 8 characters")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    });

    return {
      formData: {
        first_name: "",
        last_name: "",
        phone_no: "",
        email: "",
        password: "",
        confirm_password: "",
        user_status: "client",
      },
      allAdmins: {},
      formValidation,
    };
  },
  methods: {
    updateUser() {
      ApiServices.updateUser(this.userId, this.allAdmins)
        .then((response) => {
          this.$refs.notify.showMessage(
            "Registration Successful",
            "Client  updated successfully.",
            "success"
          );
          setTimeout(() => {
            this.$router.push({ name: "client.records" });
          }, 4000);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.allAdmins);
    },
    getUserById() {
      ApiServices.getUserById(this.userId)
        .then((response) => {
          this.allAdmins = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.allAdmins);
    },
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getUserById();
  },
};
</script>
  
  <style lang="scss" scoped>
</style>