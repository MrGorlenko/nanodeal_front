<template>
  <div :class="$style.wrapper">
    <div :class="$style.wrapper" class="offer_input">
      <label
        :class="[
          $style.label,
          toggled === true || items.length > 0
            ? $style['label_top']
            : $style['label_middle'],
        ]"
        for=""
        >{{ label }}</label
      >

      <input
        v-model="items"
        :class="$style.input"
        :readonly="true"
        type="text"
        @click="toggleList"
        @focus="
          toggleOn()
          onFocus()
        "
        @blur="
          toggleOff()
          onBlur()
        "
      />
      <div :class="$style.items">
        <p v-for="(item, index) in items" :key="index">
          {{ item[keyValue] }}
          <!-- {{ item }} -->
          <span @click="removeItem(index)">x</span>
        </p>
      </div>
    </div>

    <div v-if="show_list" :class="$style['list_wrapper']">
      <ul :class="$style.list">
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="
            pickItem(option)
            resData()
          "
        >
          {{ option[keyValue] }}
          <!-- {{ option }} -->
        </li>
        <li v-if="modalOption" :class="$style.add" @click="callModal">
          {{ optionText }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      default: () => [],
      type: Array,
    },
    label: {
      default: '',
      type: String,
    },
    modalOption: {
      default: false,
      type: Boolean,
    },
    optionText: {
      default: '',
      type: String,
    },
    keyValue: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      toggled: false,
      show_list: false,
      items: [],
    }
  },

  methods: {
    resData() {
      this.$emit('resData', this.items)
    },

    callList() {
      this.show_list = true
    },
    removeList() {
      this.show_list = false
    },
    toggleList() {
      this.show_list = !this.show_list
    },
    pickItem(item) {
      // console.log(item)
      return !this.items.includes(item) ? this.items.push(item) : this.items
    },
    // pushItem(value) {
    //   this.$emit('pushItem', value)
    //   // this.items.
    // },

    removeItem(index) {
      this.items.splice(index, 1)
    },
    callModal() {
      this.$emit('callModal')
    },
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
.select {
  width: 100%;
}

.list_wrapper {
  width: 600px;
  z-index: 2;
  position: absolute;
  // min-height: 100px;
  border-radius: 13px;
  background-color: #fff;
}

.list {
  padding-left: 25px;
  list-style-type: none;
  box-shadow: 0px 16px 50px #e9d8cf;
  border-radius: 13px;
  margin-bottom: 0;

  li {
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 0.412848px solid $orderGray;
    border-top: 0.412848px solid $orderGray;
    &:first-child {
      border-top: none;
    }
    &:last-child {
      border-bottom: none;
    }
  }
}

.add {
  color: $baseOrange;
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
  color: transparent;
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

.picked {
  color: red;
}

.items {
  display: flex;
  position: absolute;
  top: 15px;
  left: 15px;
  p {
    min-width: 30px;
    border: 1px solid black;
    margin-right: 10px;
  }
}
</style>
