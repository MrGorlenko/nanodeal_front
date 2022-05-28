<template>
  <p :class="$style.wrapper" class="offer_input">
    <label
      :class="[
        $style.label,
        toggled || model !== '' ? $style['label_top'] : $style['label_middle'],
      ]"
      for=""
      >{{ label }}</label
    >
    <input
      v-model="model"
      :class="$style.input"
      :type="type"
      :readonly="readOnly"
      @click="onClick"
      @focus="
        toggleOn()
        onFocus()
      "
      @blur="
        toggleOff()
        onBlur()
      "
    />
    <img
      v-if="readOnly"
      :class="$style.lock"
      src="~/static/images/icons/lock.svg"
      alt=""
    />
  </p>
</template>

<script>
export default {
  props: {
    label: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: [Number, String],
    },
    type: {
      default: 'text',
      type: String,
    },
    readOnly: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      toggled: false,
    }
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
    toggleOn() {
      this.toggled = true
    },
    toggleOff() {
      this.toggled = false
    },
    onFocus() {
      this.$emit('onFocus')
    },
    onBlur() {
      this.$emit('onBlur')
    },
    onClick() {
      this.$emit('onClick')
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

.input {
  width: 100%;
  border: none;
  height: 100%;
  border-radius: 13px;
  padding-left: 15px;
  padding-right: 10px;
  color: $baseBlack;
  font-size: 15px;
  font-weight: 600;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input[type='number'] {
  -moz-appearance: textfield;
}

.label {
  position: absolute;
  pointer-events: none;
  left: 15px;
  right: 15px;

  white-space: nowrap;
  overflow: hidden;
  transition: 0.3s;
  color: $baseGray;
  width: calc(100% - 15px);
}

.label_top {
  top: -1px;
  font-size: 12px;
}

.label_middle {
  top: 11px;
  font-size: 15px;
  background: #fff;
}

.lock {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
