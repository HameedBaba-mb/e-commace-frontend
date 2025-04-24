<template>
  <div class="card_wrap">
    <div class="card">
      <div class="info">
        <i v-if="icon" :class="`${icon}`"></i>
        <img v-if="image" :src="image" alt="Logo" />
        <!-- <div class="rank">20%</div> -->
      </div>
      <div class="details">
        <span>{{ title }}</span>
        <br />
        <comp-loader v-if="isLoading" />
        <h2 v-if="!isLoading">
          {{ isAmount ? "₦" : "" }}
          {{ value }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import CompLoader from "../ui/CompLoader.vue";

export default {
  name: "DashboardBanner",
  components: {
    CompLoader,
  },
  props: {
    title: {
      type: String,
      default: "Title",
    },
    image: {
      type: String,
      //   default: "Dashboard",
    },
    icon: {
      type: String,
      //   default: "icon",
    },
    value: {
      type: String,
      default: "0",
    },
    isAmount: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Add any data properties you need here
    };
  },
  methods: {
    // Add any methods you need here
  },
};
</script>

<style lang="css" scoped>
@import url("../../assets/css/client-style.css");
</style>