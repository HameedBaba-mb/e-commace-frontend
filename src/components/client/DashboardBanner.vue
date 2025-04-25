<template>
  <div class="banner">
    <client-navbar />
    <div class="container-lg">
      <div class="row">
        <div class="col-lg-6 mt-5">
          <div class="acc_text">
            <h3>Welcome back</h3>
            <!-- <h5>Abdulhamid Muhammad</h5> -->
            <h5>{{ userName.first_name + " " + userName.last_name }}</h5>
          </div>
        </div>
        <div class="col-lg-4 mt-auto">
          <router-link
            :to="{ name: 'client.my-order' }"
            class="btn btn-light dropdown"
            style="border-radius: 5px"
          >
            My Oders
          </router-link>
        </div>
      </div>

      <slot name="banner-body">
        <!-- modal content  -->
      </slot>
    </div>
  </div>
</template>

<script>
import ClientNavbar from "./ClientNavbar.vue";
import ClientCard from "./ClientCard.vue";
export default {
  components: {
    ClientNavbar,
    ClientCard,
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

<style lang="css" scoped>
@import url("../../assets/css/client-style.css");
</style>