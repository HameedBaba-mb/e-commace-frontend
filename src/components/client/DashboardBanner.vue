<template>
  <div class="lighter-banner">
    <client-navbar />
    <div class="container-lg">
      <div class="banner-content">
        <div class="welcome-text">
          <!-- <h3>Welcome back</h3> -->
          <!-- <h5>{{ userName.first_name + " " + userName.last_name }}</h5> -->
        </div>
        <!-- <router-link
          :to="{ name: 'client.my-order' }"
          class="orders-btn"
        >
          My Orders
        </router-link> -->
      </div>

      <slot name="banner-body"></slot>
    </div>
  </div>
</template>

<script>
import ClientNavbar from "./ClientNavbar.vue";
export default {
  components: {
    ClientNavbar,
  },
  name: "DashboardBanner",
  data() {
    return {
      userName: "",
    };
  },
  mounted() {
    this.userName = JSON.parse(localStorage.getItem("e_commace_active_user"));
  },
};
</script>

<style lang="scss" scoped>
.lighter-banner {
  background-color: #2d3748; /* Lighter dark shade (was #1f2937) */
  padding: 1rem 0 2rem;
  border-bottom: 1px solid #4a5568; /* Lighter border */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .banner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  0.5rem;
  }

  .welcome-text {
    h3 {
      color: #f9fafb; /* Kept light text */
      font-weight: 600;
      font-size: 1.75rem;
      padding-top: 2rem;
      margin-bottom: 0.5rem;
    }
    
    h5 {
      color: #e2e8f0; /* Lighter secondary text */
      font-weight: 500;
      font-size: 1.25rem;
    }
  }

  .orders-btn {
    background: rgba(204, 85, 0, 0.1); /* Semi-transparent orange */
    color: #ff8c42; /* Softer burnt orange */
    border: 1px solid #cc5500;
    border-radius: 6px;
    padding: 0.6rem 1.75rem;
    font-weight: 500;
    transition: all 0.3s ease;
    text-decoration: none;
    
    &:hover {
      background: rgba(204, 85, 0, 0.2);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(204, 85, 0, 0.2);
    }
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .lighter-banner {
    padding: 1rem 0;
    
    .banner-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .welcome-text h3 {
      font-size: 1.5rem;
    }
  }
}
</style>