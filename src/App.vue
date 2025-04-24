<script>
export default {
  name: "App",
  beforeMount() {
   

    const tokenData = localStorage.getItem("e_commace_active_user");

    if (tokenData) {
      try {
        const parsedToken = JSON.parse(tokenData);
        if (parsedToken?.token) {
          this.$store.dispatch("saveToken", parsedToken.token);
        }
      } catch (e) {
        console.error("Invalid token format in localStorage:", e);
      }
    }

  },
};
</script>



<template>
  <router-view />
</template>

<style scoped>

</style>
