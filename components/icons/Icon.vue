<template>
  <div :class="$style.icon" @click="onClick">
    <img :src="icon" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      default: '',
      type: String,
    },
  },
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

.icon {
  cursor: pointer;
  border-radius: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}
</style>
