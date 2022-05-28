<template>
  <div>
    <hr :class="$style.line" />
    <div :class="$style.buttons">
      <button
        v-if="!last"
        :disabled="next ? false : true"
        :class="
          next ? $style['button-next-active'] : $style['button-next-disabled']
        "
        @click="nextStep(), resData()"
      >
        Далее
      </button>
      <button v-else :class="$style['button-next-active']" @click="resData()">
        Опубликовать
      </button>
      <button :class="$style['button-save']" @click="draftData">
        Сохранить как черновик
      </button>
      <div></div>
      <button
        v-if="deleteAvailable"
        :class="$style['button-delete']"
        @click="deleteAll"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    next: {
      default: false,
      type: Boolean,
    },
    last: {
      default: false,
      type: Boolean,
    },
    deleteAvailable: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    deleteAll() {
      this.$emit('deleteAll')
    },
    nextStep() {
      this.$emit('nextStep')
    },
    draftData() {
      this.$emit('draftData')
    },
    resData() {
      this.$emit('resData')
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.line {
  border-top: 0.5px solid $orderGray;
}

.buttons {
  display: flex;
  justify-content: space-between;
  div {
    flex-grow: 1;
  }
}

.button-next-disabled,
.button-next-active,
.button-save,
.button-delete {
  width: 200px;
  height: 50px;
}

.button-next-active {
  @include button-next-active;
}

.button-next-disabled {
  @include button-next-disabled;
}

.button-save {
  @include button-save;
  margin-left: 20px;
}

.button-delete {
  @include button-delete;
  float: right;
}
</style>
