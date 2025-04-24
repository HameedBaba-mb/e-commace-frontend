<template>
  <div class="loader" :style="{ width: loderWidth }"></div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    loderWidth: {
      type: String,
      default: "50px",
    },
  },
};
</script>

<style lang="css" scoped>
.loader {
  /* width: 50px; */
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  /* border-color: #000 #0000; */
  border-color: #2142cc #0000;
  animation: l1 1s infinite;
}
@keyframes l1 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>