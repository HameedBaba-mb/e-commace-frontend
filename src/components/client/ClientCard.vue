<template>
  <div class="stat-card" :class="cardClass">
    <div class="card-icon">
      <i :class="icon"></i>
    </div>
    <div class="card-content">
      <h3 class="card-value">{{ value }}</h3>
      <p class="card-title">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    cardClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .card-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    
    i {
      color: white;
    }
  }

  .card-content {
    .card-value {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.25rem;
      color: #2d3748;
    }

    .card-title {
      font-size: 0.9rem;
      color: #64748b;
      margin: 0;
      font-weight: 500;
    }
  }

  // Color variants
  &.total-orders .card-icon {
    background: linear-gradient(135deg, #0d9488, #14b8a6);
  }
  
  &.pending-orders .card-icon {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
  }
  
  &.delivered-orders .card-icon {
    background: linear-gradient(135deg, #10b981, #34d399);
  }
  
  &.cancelled-orders .card-icon {
    background: linear-gradient(135deg, #ef4444, #f87171);
  }
}
</style>