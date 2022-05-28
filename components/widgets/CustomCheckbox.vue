<template>
  <div :class="$style.wrapper">
    <input
      v-model="model"
      type="checkbox"
      :class="$style.checkbox"
      @click="onClick"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
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

.wrapper {
  position: relative;
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-right: 11px;
  // position: relative;
  left: 3px;
  &:before {
    position: absolute;
    width: 22.5px;
    height: 22.5px;
    content: '';
    display: block;
    top: -1px;
    left: -2px;
    background-image: url('~/static/images/checkbox_unchecked.svg');
  }
  &:checked {
    &:before {
      position: absolute;
      width: 22.5px;
      height: 22.5px;
      content: '';
      display: block;
      top: -1px;
      left: -2px;
      background-image: url('~/static/images/checkbox_checked.svg');
      background-repeat: no-repeat;
    }
  }
}
</style>
