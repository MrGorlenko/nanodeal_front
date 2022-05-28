<template>
  <div>
    <h3 :class="$style.header">Регистрация профиля</h3>

    <form
      action=""
      @submit.prevent="
        goNext()
        resData()
      "
    >
      <input
        v-model="email"
        :class="$style.input"
        type="text"
        placeholder="Электронная почта"
      />

      <input
        v-model="password"
        :class="$style.input"
        type="password"
        placeholder="Пароль"
      />

      <input
        v-model="repeatPassword"
        :class="$style.input"
        type="password"
        placeholder="Повторите пароль"
      />

      <Agreement
        v-model="agree"
        :class="$style.policy"
        :text="'Согласние с политикой конфиденциальности и правилами регистрации'"
      />

      <button :class="$style.button" :disabled="isNext ? false : true">
        Далее
      </button>
    </form>

    <agile v-if="!hide"> </agile>
  </div>
</template>

<script>
import '~/assets/scss/reg-widgets.scss'
import isEmail from '~/mixins/checker/isEmail'
import isPassword from '~/mixins/checker/isPassword'
import Agreement from '~/components/widgets/Agreement'
export default {
  components: {
    Agreement,
  },

  mixins: [isEmail, isPassword],

  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      agree: false,
      next: false,
      hide: true,
    }
  },

  computed: {
    isNext() {
      let next = false
      this.checkEmail() &&
      this.checkPassword() &&
      this.checkPasswordSimilarity() &&
      this.checkAgreement()
        ? (next = true)
        : (next = false)
      return next
    },
  },

  methods: {
    checkEmail() {
      if (!this.isEmail(this.email)) return false
      return true
    },

    checkPassword() {
      if (!this.isPassword(this.password)) return false
      return true
    },

    checkPasswordSimilarity() {
      if (this.password !== this.repeatPassword) return false
      return true
    },

    /* Из-за особенностей обработки тут возврат true если agree был false */
    checkAgreement() {
      if (this.agree === false) return false
      return true
    },

    goNext() {
      this.$emit('goNext')
    },

    resData() {
      // const userFormData = new FormData()
      // userFormData.append('email', this.email)
      // userFormData.append('password', this.password)
      this.$emit('resData', { email: this.email, password: this.password })
      // this.$emit('resData', userFormData)
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.header {
  @include header;
  margin-bottom: 50px;
  margin-top: 50px;
}

.input,
.policy,
.button {
  width: $rightWidth;

  @media screen and (max-width: 992px) {
    width: 100%;
  }
}

.input {
  @include auth-input;
  display: block;
  margin-bottom: 16px;
}

.button {
  @include button-next-active;
  height: 50px;
  &:disabled {
    @include button-next-disabled;
  }
}
</style>
