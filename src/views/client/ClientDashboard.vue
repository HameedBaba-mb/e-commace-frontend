<template>
  <div class="dashboard-wrapper">
    <!-- Stats Banner -->
    <dashboard-banner>
      <template #banner-body>
        <div class="welcome-text">
          <h3>Welcome back</h3>
          <h5>{{ userName.first_name + " " + userName.last_name }}</h5>
        </div>
        <div class="stats-grid">
          <ClientCard
            icon="fa fa-shopping-cart"
            :value="orderStats.totalOrders"
            title="Total Orders"
            card-class="total-orders"
          />
          <ClientCard
            icon="fa fa-hourglass-half"
            :value="orderStats.pendingOrders"
            title="Pending Orders"
            card-class="pending-orders"
          />
          <ClientCard
            icon="fa fa-check-circle"
            :value="orderStats.deliveredOrders"
            title="Delivered Orders"
            card-class="delivered-orders"
          />
          <ClientCard
            icon="fa fa-times-circle"
            :value="orderStats.cancelledOrders"
            title="Cancelled Orders"
            card-class="cancelled-orders"
          />
        </div>
      </template>
    </dashboard-banner>

    <!-- Recent Orders Table -->
    <div class="dashboard-content">
      <div class="recent-orders-card">
        <div class="card-header">
          <h2>Recent Orders</h2>
          <div class="divider"></div>
        </div>
        <div class="table-responsive">
          <table class="orders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in recentOrders" :key="index">
                <td>{{ index + 1 }}</td>
                <td class="product-name">{{ order.Product?.title }}</td>
                <td>{{ order.item_quentity }}</td>
                <td>${{ order.total_amount }}</td>
                <td>
                  <order-status-badge :status="order.order_status" />
                </td>
                <td>
                  <payment-status-badge :status="order.payment_status" />
                </td>
                <td>{{ order.createdAt ? formatDate(order.createdAt) : '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import DashboardBanner from "../../components/client/DashboardBanner.vue";
import ClientCard from "../../components/client/ClientCard.vue";
import OrderStatusBadge from "../../components/client/OrderStatusBadge.vue";
import PaymentStatusBadge from "../../components/client/PaymentStatusBadge.vue";
import ApiServices from "../../services/ApiServices.js";

export default {
  components: {
    DashboardBanner,
    ClientCard,
    OrderStatusBadge,
    PaymentStatusBadge
  },
  data() {
    return {
      recentOrders: [],
      orderStats: {
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
      },
    };
  },
  
  methods: {
    getClientOrdersMatrix() {
      ApiServices.getClientOrdersMatrix(this.userId)
        .then((response) => {
          this.orderStats = response.data.data;
        })
        .catch(console.error);
    },
    getClientRecentOrders() {
      ApiServices.getClientRecentOrders(this.userId)
        .then((response) => {
          this.recentOrders = response.data.data;
        })
        .catch(console.error);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  },
  computed: {
    userId() {
      const user = JSON.parse(localStorage.getItem("e_commace_active_user"));
      return user?.userId;
    },
  },
  mounted() {
    this.getClientOrdersMatrix();
    this.getClientRecentOrders();
  }
};
</script> -->

<script>
import DashboardBanner from "../../components/client/DashboardBanner.vue";
import ClientCard from "../../components/client/ClientCard.vue";
import OrderStatusBadge from "../../components/client/OrderStatusBadge.vue";
import PaymentStatusBadge from "../../components/client/PaymentStatusBadge.vue";
import ApiServices from "../../services/ApiServices.js";

export default {
  components: {
    DashboardBanner,
    ClientCard,
    OrderStatusBadge,
    PaymentStatusBadge
  },
  data() {
    return {
      recentOrders: [],
      orderStats: {
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
      },
      userName: "", // Added userName to store the user data
    };
  },
  computed: {
    userId() {
      const user = JSON.parse(localStorage.getItem("e_commace_active_user"));
      return user?.userId;
    },
  },
  methods: {
    getClientOrdersMatrix() {
      ApiServices.getClientOrdersMatrix(this.userId)
        .then((response) => {
          this.orderStats = response.data.data;
        })
        .catch(console.error);
    },
    getClientRecentOrders() {
      ApiServices.getClientRecentOrders(this.userId)
        .then((response) => {
          this.recentOrders = response.data.data;
        })
        .catch(console.error);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  },
  mounted() {
    this.userName = JSON.parse(localStorage.getItem("e_commace_active_user")); // Get user data
    this.getClientOrdersMatrix();
    this.getClientRecentOrders();
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.dashboard-wrapper {
  font-family: 'Poppins', sans-serif;
  padding: 0;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.dashboard-content {
  padding: 0 1.5rem 2rem;
}

.recent-orders-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  padding: 1.5rem 1.5rem 0;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }
  
  .divider {
    height: 2px;
    background: linear-gradient(90deg, #0d9488, transparent);
    margin-top: 1rem;
  }
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem 1.5rem;
    text-align: left;
  }
  
  thead {
    background-color: #f8fafc;
    
    th {
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.5px;
    }
  }
  
  tbody tr {
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.2s ease;
    
    &:hover {
      background-color: #f8fafc;
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .product-name {
    font-weight: 500;
    color: #1e293b;
  }
}

// Status badges moved to separate components
</style>