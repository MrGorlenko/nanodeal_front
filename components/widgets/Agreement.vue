<template>
  <div :class="$style.policy">
    <!-- <input
      v-model="agree"
      class="checkbox"
      type="checkbox"
      @click="toggleAgree"
    /> -->
    <CustomCheckbox v-model="agree" @click="toggleAgree" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import CustomCheckbox from '~/components/widgets/CustomCheckbox'
export default {
  components: {
    CustomCheckbox,
  },
  props: {
    text: {
      default: '',
      type: String,
    },
    value: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      agree: false,
    }
  },
  methods: {
    emitResult() {
      this.$emit('input', this.agree)
    },
    toggleAgree() {
      this.agree = !this.agree
      this.emitResult()
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.policy {
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 160px;

  p {
    color: $baseGray;
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 0;
    line-height: 15px;
  }
}
</style>
