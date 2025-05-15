
<template>
<<<<<<< HEAD
  <div class="login-page">
    <div class="background-overlay"></div>
    <div class="login-container">
      <div class="card">
        <div class="card-body">
          <notification ref="notify" />
          <h1 class="app-title">Campus <span>Store</span></h1>
          <p class="subtitle">Login to your account</p>
          
          <vee-form @submit="login" :validation-schema="formValidation">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <vee-field
                v-model="formData.email"
                type="email"
                class="form-control"
                placeholder="Email"
                id="email"
                name="email"
              />
              <vee-error-message name="email" class="error-message" />
=======
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
                <p
                  class="text-center m mb-3 fs-6 fw-bold text-dark mb-0 d-none d-sm-block"
                >
                  Campus Store
                </p>
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

                  <button
                    v-html="checkingBtn"
                    :disabled="isLoging"
                    class="btn btn-primary w-100 py-8 fs-4 mb-4"
                  ></button>
                </vee-form>
                <div
                  v-if="errorMessage"
                  class="alert alert-danger text-center mb-4"
                  role="alert"
                >
                  <b class=""> {{ errorMessage }}</b>
                </div>

                <div class="d-flex align-items-center justify-content-center">
                  <p class="fs-4 mb-0 fw-bold">New to account?</p>

                  <router-link
                    class="text-primary fw-bold ms-2"
                    :to="{ name: 'new.account' }"
                    >Create an account</router-link
                  >
                </div>
              </div>
>>>>>>> 8f917aa942e9c6325b0439af4722a06a69d65f12
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <vee-field
                v-model="formData.password"
                type="password"
                class="form-control"
                placeholder="Password"
                id="password"
                name="password"
              />
              <vee-error-message name="password" class="error-message" />
            </div>

            <button class="btn btn-primary">
              Sign In
            </button>
          </vee-form>

          <div class="signup-link">
            <p>New to account? <router-link :to="{ name: 'new.account' }">Create an account</router-link></p>
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
      isLoging: false,
      formData: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    login() {
      this.isLoging = true;
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
          if (error.response) {
            this.errorMessage = error.response.data.message;
            setTimeout(() => {
              this.errorMessage = "";
            }, 3000);
          }
        })
        .finally(() => {
          this.isLoging = false;
        });
    },
<<<<<<< HEAD
  }
=======
  },
  mounted() {},
  computed: {
    checkingBtn() {
      return this.isLoging
        ? "<i class='spinner-border text-primary' role='status'></i> Signing in... "
        : "Sign In";
    },
  },
>>>>>>> 8f917aa942e9c6325b0439af4722a06a69d65f12
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
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $light-bg;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 0;
  filter: grayscale(50%) brightness(1.1);
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
}

/* ========== CARD STYLES ========== */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  max-width: 450px;
  margin: 0 auto;
  overflow: hidden;
  border: none;
}

.card-body {
  padding: 2.5rem;
}

/* ========== TYPOGRAPHY ========== */
.app-title {
  font-family: 'DM Serif Display', serif;
  color: $primary-color;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: 600;
  
  span {
    color: $accent-color;
  }
}

.subtitle {
  color: $secondary-color;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
}

/* ========== FORM STYLES ========== */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  color: $text-color;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
  font-size: 0.9rem;
}

.form-control {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  width: 100%;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  color: $text-color;
  
  &:focus {
    border-color: $accent-color;
    outline: none;
    box-shadow: 0 0 0 3px rgba($accent-color, 0.1);
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
}

/* ========== BUTTON STYLES ========== */
.btn-primary {
  background: $primary-color;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  width: 100%;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: darken($primary-color, 5%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
}

/* ========== LINK STYLES ========== */
.signup-link {
  color: $secondary-color;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  
  a {
    color: $accent-color !important;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

/* ========== ERROR MESSAGES ========== */
.error-message {
  color: #EF4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

/* ========== RESPONSIVE ADJUSTMENTS ========== */
@media (max-width: 768px) {
  .card-body {
    padding: 2rem;
  }
  
  .app-title {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .card-body {
    padding: 1.5rem;
  }
  
  .login-container {
    padding: 1rem;
  }
}
</style>