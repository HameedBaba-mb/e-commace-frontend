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
          <div class="col-md-12 col-lg-8 col-xxl-5 col-sm-12 col-xxs-6">
            <div class="card mb-0">
              <div class="card-body">
                <p
                  class="text-center m mb-3 fw-bold text-dark mb-0 d-none d-sm-block"
                >
                  Campus <span>Store</span>
                </p>
                <p class="text-center">Register new account</p>
                <vee-form
                  @submit="registerClient"
                  :validation-schema="formValidation"
                >
                  <div class="mb-3">
                    <label for="first_name" class="form-label"
                      >First Name</label
                    >
                    <vee-field
                      type="text"
                      class="form-control"
                      id="first_name"
                      aria-describedby="textHelp"
                      placeholder="First Name"
                      name="first_name"
                      v-model="formData.first_name"
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
                      v-model="formData.last_name"
                    />
                    <vee-error-message name="last_name" class="text-danger" />
                  </div>
                  <div class="mb-3">
                    <label for="phone_no" class="form-label"
                      >Phone Number</label
                    >
                    <vee-field
                      type="text"
                      class="form-control"
                      id="phone_no"
                      name="phone_no"
                      aria-describedby="emailHelp"
                      placeholder="Phone Number"
                      v-model="formData.phone_no"
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
                      v-model="formData.email"
                    />
                    <vee-error-message name="email" class="text-danger" />
                  </div>
                  <div class="row">
                    <div class="col col-lg-6 col-md-6 col-xxl-6">
                      <div class="mb-4">
                        <label for="password" class="form-label"
                          >Password</label
                        >
                        <vee-field
                          type="password"
                          class="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                          v-model="formData.password"
                        />
                        <vee-error-message
                          name="password"
                          class="text-danger"
                        />
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
                          v-model="formData.confirm_password"
                        />
                        <vee-error-message
                          name="confirm_password"
                          class="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-primary w-100 py-8 fs-4 mb-4">
                    Sign Up
                  </button>
                </vee-form>
                <div class="d-flex align-items-center justify-content-center">
                  <p class="fs-4 mb-0 fw-bold">Already have an Account?</p>

                  <router-link
                    class="text-primary fw-bold ms-2"
                    :to="{ name: 'login' }"
                    >Sign In</router-link
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
import * as yup from "yup";
import ApiServices from "../services/ApiServices";
import Notification from "../components/public/Notification.vue";

export default {
  name: "NewAccount",
  components: {
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
      formValidation,
    };
  },
  methods: {
    registerClient() {
      ApiServices.registerClient(this.formData)
        .then((response) => {
          this.$refs.notify.showMessage(
            "Registration Successful",
            "You have successfully registered.",
            "success"
          );
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 4000);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
/* ========== IMPORT FONTS ========== */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Poppins:wght@400;500;600&display=swap');

/* ========== COLOR PALETTE ========== */
$primary-color: #374151;       // Dark gray-blue
$secondary-color: #6B7280;     // Medium gray
$accent-color: #4F46E5;        // Vibrant purple
$light-bg: #F9FAFB;            // Light background
$text-color: #111827;          // Dark text
$light-text: #6B7280;          // Light text

/* ========== BASE STYLES ========== */
.page-wrapper {
  position: relative;
  min-height: 100vh;
  background-color: $light-bg;
  font-family: 'Poppins', sans-serif;
}

// .position-relative {
//   position: relative;
// }

.radial-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  // opacity: 0.15;
  z-index: 0;
  filter: grayscale(50%) brightness(1.1);
}


.card {
  background: white; 
  border: 1px solid #e5e7eb; /* Solid border instead */
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  animation: fadeIn 0.6s ease-out forwards;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ========== CARD CONTENT ========== */
.card-body {
  padding: 2.5rem;
}

.text-center.m {
  font-family: 'DM Serif Display', serif;
  font-size: 2rem;
  color: $primary-color;
  margin-bottom: 0.5rem;
  font-weight: 600;

  span {
    color: $accent-color;
  }
}

.text-center {
  color: $secondary-color;
  margin-bottom: 2rem;
  font-size: 1rem;
}

/* ========== FORM ELEMENTS ========== */
.form-label {
  color: $text-color;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-control {
  background: white; /* Changed from semi-transparent to solid */
  border: 1px solid #e5e7eb;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: $accent-color;
    box-shadow: 0 0 0 3px rgba($accent-color, 0.1);
    background: white;
  }
}

/* ========== BUTTON STYLES ========== */
.btn-primary {
  background: $primary-color;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: 500;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: darken($primary-color, 5%);
    transform: translateY(-2px);
  }
}

/* ========== LINK STYLES ========== */
.d-flex.align-items-center {
  color: $secondary-color;
  font-size: 0.9rem;

  .text-primary {
    color: $accent-color !important;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    margin-left: 0.25rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

/* ========== ERROR MESSAGES ========== */
.text-danger {
  color: #EF4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

/* ========== RESPONSIVE ADJUSTMENTS ========== */
@media (max-width: 768px) {
  .card-body {
    padding: 2rem;
  }
  
  .text-center.m {
    font-size: 1.75rem;
  }
}

@media (max-width: 576px) {
  .card-body {
    padding: 1.5rem;
  }
  
  .col-lg-6, .col-md-6, .col-xxl-6 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>