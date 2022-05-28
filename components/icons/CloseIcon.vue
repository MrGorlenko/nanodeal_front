<template>
  <div :class="$style.close" @click="onClick">
    <img src="images/reg/close.svg" alt="" />
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.close {
  background-color: $secondGray;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  border: none;
  &:hover {
    background-color: darken($color: $secondGray, $amount: 30);
  }
}
</style>
