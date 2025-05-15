<template>
    <span class="status-badge" :class="status">
      {{ status }}
    </span>
  </template>
  
  <script>
  export default {
    props: {
      status: {
        type: String,
        required: true,
        validator: value => ['pending', 'delivered', 'cancelled'].includes(value)
      }
    }
  }
  </script>
  
  <style scoped>
  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    
    &.pending {
      background: #fffbeb;
      color: #d97706;
    }
    &.delivered {
      background: #ecfdf5;
      color: #059669;
    }
    &.cancelled {
      background: #fef2f2;
      color: #dc2626;
    }
  }
  </style>