<template>
  <Icon :class="$style.icon" :icon="'/images/icons/bin.svg'" @click="onClick" />
</template>

<script>
import Icon from '~/components/icons/Icon'
export default {
  components: { Icon },
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
  background-color: rgba(249, 60, 71, 0.1);
  &:hover {
    background-color: rgba(249, 60, 71, 0.4);
  }
}
</style>
