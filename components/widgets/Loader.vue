<template>
  <div :class="$style.loader">
    <img src="~/static/images/animated-loader.svg" alt="" />
  </div>
</template>

<script>
export default { name: 'Loader' }
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';

.loader {
  width: 100%;
  height: 100%;
  @include center-flex;
}
</style>
