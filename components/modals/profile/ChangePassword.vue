<template>
  <modal
    classes="category_modal"
    :width="416"
    :height="500"
    name="password-modal"
  >
    <button :class="$style.close" @click="hide">
      <img src="images/reg/close.svg" alt="" />
    </button>

    <h3 :class="$style.header">Сменить пароль</h3>
    <form action="" @submit.prevent="changePassword">
      <CustomInput
        v-model="old_password"
        :class="$style.input"
        :type="'password'"
        :label="'Введите старый пароль'"
      />

      <CustomInput
        v-model="new_password"
        :class="$style.input"
        :type="'password'"
        :label="'Введите новый пароль'"
      />

      <CustomInput
        v-model="new_password_repeat"
        :class="$style.input"
        :type="'password'"
        :label="'Повторите новый пароль'"
      />

      <button
        :class="$style.button"
        :disabled="isSameNewPasswords && isValidPassword ? false : true"
      >
        Изменить пароль
      </button>

      <button :class="$style.forget">Забыли пароль?</button>
    </form>
  </modal>
</template>

<script>
import '~/assets/scss/modals.scss'
import isPassword from '~/mixins/checker/isPassword'
import CustomInput from '~/components/widgets/CustomInput.vue'
export default {
  components: { CustomInput },
  mixins: [isPassword],
  data() {
    return {
      old_password: '',
      new_password: '',
      new_password_repeat: '',
    }
  },

  computed: {
    isSameNewPasswords() {
      return this.new_password === this.new_password_repeat
    },
    isValidPassword() {
      return this.isPassword(this.new_password)
    },
  },

  methods: {
    hide() {
      this.$modal.hide('password-modal')
    },

    async changePassword() {
      const formData = await new FormData()
      await formData.append('old_password', this.old_password)
      await formData.append('new_password', this.new_password)
      this.$store.dispatch('auth/changePassword', formData).then(() => {
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
  margin-bottom: 35px;
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
  margin-bottom: 16px;
}

.button {
  @include button-next-active;
  height: 50px;
  margin-top: 98px;
  &:disabled {
    @include button-next-disabled;
  }
}

.forget {
  border: none;
  background: none;
  color: $baseOrange;
  font-weight: 600;
  margin: auto;
  display: block;
  margin-top: 30px;
}
</style>
