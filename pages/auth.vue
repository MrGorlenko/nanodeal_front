<template>
  <entry-app>
    <template slot="right">
      <h3 :class="$style.header">Войдите в аккаунт</h3>

      <form @submit.prevent="auth(email, password)">
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

        <button :class="$style.entry">Войти</button>

        <a :class="$style.forget" href="#">Забыли пароль?</a>
      </form>

      <p :class="$style.or">или</p>

      <NuxtLink to="/reg">
        <button :class="$style.reg">Регистрация в компании</button>
      </NuxtLink>
    </template>
  </entry-app>
</template>

<script>
import EntryApp from '~/components/templates/EntryApp.vue'

export default {
  components: { EntryApp },
  data() {
    return {
      email: '',
      password: '',
      access_token: '',
    }
  },

  computed: {
    errorStatus() {
      return this.$store.getters['auth/error_status']
    },
  },

  methods: {
    auth(email, password) {
      this.$store.dispatch('auth/auth', { email, password })
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

$rightWidth: 356px;

.header,
.or {
  color: $baseBlack;
}

.header {
  @include header;
  margin-bottom: 60px;
  margin-top: 106px;
}

.input,
.entry,
.forget,
.or,
.reg {
  width: $rightWidth;
}

.forget,
.or,
.entry,
.reg {
  text-align: center;
  font-weight: 600;
}

.input {
  @include auth-input;
  width: 356px;
  display: block;
  margin-bottom: 16px;
  border: none;
}

.entry,
.reg {
  margin-top: 40px;
  height: 50px;
}

.entry {
  @include button-next-active;
  &:disabled {
    @include button-next-disabled;
  }
}

.reg {
  @include button-next;
  background: linear-gradient(261.09deg, #ff13d9 -63.87%, #ffb74b 109.86%);
  position: relative;
  &:before {
    content: 'Регистрация в компании';
    @include button-next;
    @include center-flex;
    font-weight: 600;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ff7683;
    opacity: 0;
    transition: 0.7s;
  }

  &:hover:before {
    opacity: 1;
  }
}

.forget {
  color: $baseOrange;
  display: block;
  margin-top: 30px;

  &:hover {
    color: $baseOrange;
  }
}

.or {
  margin-top: 40px;
}

@media (max-width: 992px) {
  .header {
    text-align: center;
  }

  .input,
  .entry,
  .forget,
  .or,
  .reg {
    width: 100%;
  }
}
</style>
