<template>
  <modal classes="category_modal" :width="416" :height="500" name="edit-modal">
    <button :class="$style.close" @click="hide">
      <img src="images/reg/close.svg" alt="" />
    </button>

    <h3 :class="$style.header">
      {{ title }}
    </h3>

    <img
      :class="$style.icon"
      :src="'images/profile/social/' + name + '.svg'"
      alt=""
    />

    <input
      v-model="link"
      :class="$style.input"
      type="text"
      placeholder="Ссылка"
    />

    <button
      :disabled="allow ? false : true"
      :class="$style.button"
      @click="addLink(name, link)"
    >
      {{ actionLabel }}
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
    title: {
      type: String,
      default: '',
    },
    actionLabel: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    linkExample: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      link: '',
      // addLink: false,
      show_error: false,
    }
  },

  computed: {
    error() {
      return `Ваша ссылка неверна. Ссылка должна содержать ${this.linkExample}`
    },
    allow() {
      return this.link !== ''
    },
  },

  methods: {
    // checkLink() {
    //   if (this.isUrl(this.link) && this.link.includes(this.linkExample)) {
    //     this.addLink = true
    //     this.show_error = false
    //   } else {
    //     this.addLink = false
    //     this.show_error = true
    //   }
    // },w
    hide() {
      this.$modal.hide('edit-modal')
    },
    addLink(socTitle, socLink) {
      this.$store
        .dispatch('user_data/updateSocial', {
          title: socTitle,
          link: socLink,
        })
        .then(() => {
          this.link = ''
          this.$emit('updated')
          this.hide()
        })
    },
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
  width: 185px;
  margin: auto;
  margin-top: 30px;
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
