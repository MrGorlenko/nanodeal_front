<template>
  <div :class="$style.wrapper">
    <input
      :id="id"
      v-model="model"
      type="radio"
      :name="name"
      :class="$style.radio"
      :value="val"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: '',
      type: String,
    },
    val: {
      default: '',
      type: String,
    },
    id: {
      default: '',
      type: String,
    },
    name: {
      default: '',
      type: String,
    },
    label: {
      default: '',
      type: String,
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
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.wrapper {
  position: relative;
}

.radio {
  width: 22px;
  height: 22px;
  margin-right: 11px;
  position: relative;
  left: 3px;
  border-radius: 50%;
  &:before {
    position: absolute;
    width: 22.5px;
    height: 22.5px;
    content: '';
    display: block;
    border-radius: 50%;
    top: 0px;
    left: 0px;
    border: none;
  }
  &:checked {
    &:before {
      position: absolute;
      width: 22.5px;
      height: 22.5px;
      content: '';
      display: block;
      top: 0px;
      left: 0px;
      background-image: url('~/static/images/checkbox_checked.svg');
      background-repeat: no-repeat;
    }
  }
}
</style>
