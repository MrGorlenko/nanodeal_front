<template>
  <div :class="$style.header">
    <h2 :class="$style['header-label']">
      {{ header }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      default: '',
      type: String,
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.header {
  border-bottom: 0.5px solid $orderGray;
  padding-bottom: 34px;
}

.header-label {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: $baseBlack;
  margin-bottom: 0;
}
</style>
