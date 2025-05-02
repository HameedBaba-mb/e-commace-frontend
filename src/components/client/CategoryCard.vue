<template>
  <div class="card overflow-hidden hover-img border">
    <div class="position-relative">
      <div v-if="isLoadingImg" class="text-center">
        <i class="spinner-border text-primary" role="status"></i>
      </div>
      <img
        v-if="!isLoadingImg && img"
        :src="img"
        class="card-img-top card-img"
        alt="matdash-img"
      />
      <img
        v-else
        src="../../assets/images/blog/blog-img2.jpg"
        class="card-img-top card-img"
        alt="matdash-img"
      />
    </div>
    <div class="card-body p-3">
      <span class="badge text-bg-light lh-sm mt-3">{{ title }}</span>
      <p class="d-block my-4 text-dark">
        {{ description ? description.substring(0, 100) : "" }}
      </p>
      <slot name="card-content">
        <!-- modal content  -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    title: {
      type: String,
      default: "Category Title",
      required: true,
    },
    description: {
      type: String,
      default: "lere ipsum dolor sit amet, consectetur adipiscing elit.",
      required: true,
    },
    img: {
      type: String,
      default: "",
    },
    isLoadingImg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="css" scoped>
.card-img {
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}
</style>