<template>
    <span class="payment-badge" :class="status.replace(' ', '-')">
      {{ status }}
    </span>
  </template>
  
  <script>
  export default {
    props: {
      status: {
        type: String,
        required: true,
        validator: value => ['paid', 'unpaid', 'partial payment'].includes(value)
      }
    }
  }
  </script>
  
  <style scoped>
  .payment-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    
    &.paid {
      background: #ecfdf5;
      color: #059669;
    }
    &.unpaid {
      background: #fef2f2;
      color: #dc2626;
    }
    &.partial-payment {
      background: #fffbeb;
      color: #d97706;
    }
  }
  </style>