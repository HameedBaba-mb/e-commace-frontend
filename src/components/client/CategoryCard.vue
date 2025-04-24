<template>
  <div class="card overflow-hidden hover-img border">
    <div class="position-relative">
        <img
          src="../../assets/images/blog/blog-img3.jpg"
          class="card-img-top"
          alt="matdash-img"
        />
    </div>
    <div class="card-body p-3">
      <span class="badge text-bg-light  lh-sm mt-3 ">{{ title }}</span>
      <span class="d-block my-4 fs-5 text-dark fw-semibold"
        >{{ description }}</span
      >
      <button class="btn btn-primary  py-2 fw-semibold" style="border-radius: 5px;">
        View Product
      </button>
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
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>