<template>
  <modal
    classes="category_modal"
    :width="416"
    :height="500"
    name="social-modal"
  >
    <button :class="$style.close" @click="hide">
      <img src="images/reg/close.svg" alt="" />
    </button>
    <h3 :class="$style.header">
      Добавление <br />
      социальной сети
    </h3>

    <img :class="$style.icon" :src="src" alt="" />

    <input
      v-model="link"
      :class="$style.input"
      type="text"
      placeholder="Ссылка"
      @input="checkLink"
    />
    <span v-if="show_error" :class="$style.error">{{ error }}</span>

    <button
      :disabled="addLink ? false : true"
      :class="$style.button"
      @click="enterSocial(name, link)"
    >
      Выбрать
    </button>
  </modal>
</template>

<script>
import '~/assets/scss/modals.scss'
import isUrl from '~/mixins/checker/isUrl'
export default {
  name: 'Social',
  mixins: [isUrl],
  props: {
    name: {
      type: String,
      default: '',
    },
    linkExample: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      link: '',
      addLink: false,
      show_error: false,
    }
  },

  computed: {
    error() {
      return `Ваша ссылка неверна. Ссылка должна содержать ${this.linkExample}`
    },
  },

  methods: {
    checkLink() {
      if (this.isUrl(this.link) && this.link.includes(this.linkExample)) {
        this.addLink = true
        this.show_error = false
      } else {
        this.addLink = false
        this.show_error = true
      }
    },
    show() {
      this.$modal.show('social-modal')
    },
    hide() {
      this.$modal.hide('social-modal')
    },
    enterSocial(title, link) {
      this.$emit('resData', { title, link })
      this.link = ''
      this.hide()
    },
  },
  mount() {
    this.show()
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
@import '~/assets/scss/modals.scss';

.close {
  @include close;
}

.header {
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: $baseBlack;
  margin-top: 30px;
  margin-bottom: 20px;
}

.icon {
  display: block;
  margin: auto;
  width: 70px;
  height: 70px;
  margin-top: 70px;
  margin-bottom: 40px;
}

.button,
.input {
  width: $rightWidth;
  margin: auto;
  display: block;
}

.error {
  width: 100%;
  color: red;
  position: absolute;
  text-align: center;
  font-size: 10px;
}

.input {
  @include auth-input;
  border: 1px dashed #eaecf1;
}

.button {
  @include button-next-active;
  height: 50px;
  margin-top: 98px;
  &:disabled {
    @include button-next-disabled;
  }
}
</style>
