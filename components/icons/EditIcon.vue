<template>
  <Icon :class="$style.icon" :icon="'/images/icons/pen.svg'" @click="onClick" />
</template>

<script>
import Icon from '~/components/icons/Icon'
export default {
  components: {
    Icon,
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
  background: rgba(194, 202, 223, 0.1);
  &:hover {
    background: rgba(194, 202, 223, 0.4);
  }
}
</style>
