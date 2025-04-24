<template>
  <div class="page-wrapper">
    <dashboard-banner>
      <template #banner-body>
        <div class="container-lg text-centers mt-2">
          <h1 class="display-1">Categories</h1>
        </div>
      </template>
    </dashboard-banner>

    <div class="container-lg">
      <div class="card">
        <div class="card-body client-border">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <CategoryCard />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-6">
              <CategoryCard />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <CategoryCard />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <CategoryCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import DashboardBanner from "../../components/client/DashboardBanner.vue";
import ClientCard from "../../components/client/ClientCard.vue";
import CategoryCard from "../../components/client/CategoryCard.vue";

export default {
  components: {
    DashboardBanner,
    ClientCard,
    CategoryCard,
  },
  name: "ClientDashboard",
};
</script>
  
  <style lang="css" scoped>
@import url("../../assets/css/client-style.css");
.display-1 {
  /* font-size: 2.5rem; */
  font-weight: 700;
  color: #fff;
}
</style>