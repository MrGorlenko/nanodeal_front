<template>
  <modal
    classes="category_modal"
    :width="416"
    :height="750"
    name="member-modal"
  >
    <div :class="$style.wrapper">
      <button :class="$style.close" @click="hide">
        <img src="images/reg/close.svg" alt="" />
      </button>

      <h3 v-if="my" :class="$style.header">Мой профиль</h3>
      <h3 v-else :class="$style.header">Профиль</h3>

      <img v-if="avatar" :class="$style.avatar" :src="avatar" alt="" />
      <avatar-plug
        v-else
        :class="$style['avatar-plug']"
        :first-name="firstName"
        :second-name="secondName"
      />

      <p :class="$style.name">{{ firstName }} {{ secondName }}</p>

      <div :class="[$style.role, roleClass(status)]">
        <p>{{ status }}</p>
      </div>

      <p :class="$style.about">
        Имеет полные права на редактирование и удаление аккаунта. Может
        назначать и удалять сотрудников/администраторов
      </p>

      <hr />

      <div :class="$style.cell">
        <span>Должность</span>
        <p>{{ position }}</p>
      </div>

      <hr />

      <div :class="$style.cell">
        <span>электронная почта</span>
        <p>{{ email }}</p>
      </div>

      <hr />

      <div v-if="my" :class="$style.cell">
        <span>Пароль</span>
        <button @click="changePasswrod">Изменить пароль</button>
      </div>
    </div>
    <div class="absolute-button-block">
      <button
        v-if="
          my ||
          (authStatus === 'Владелец' &&
            (status === 'Администратор' || status === 'Сотрудник')) ||
          (authStatus === 'Администратор' && status === 'Сотрудник')
        "
        :class="$style.button"
        @click="editUser"
      >
        Редактировать
      </button>
    </div>
  </modal>
</template>

<script>
import '~/assets/scss/modals.scss'
import isUrl from '~/mixins/checker/isUrl'
import setStatusStyle from '~/mixins/setStatusStyle'
import '~/assets/scss/status.scss'
import AvatarPlug from '~/components/widgets/AvatarPlug.vue'
export default {
  name: 'Social',
  components: {
    AvatarPlug,
  },
  mixins: [isUrl, setStatusStyle],

  props: {
    my: {
      default: false,
      type: Boolean,
    },
    avatar: {
      default: '',
      type: String,
    },
    firstName: {
      default: '',
      type: String,
    },
    secondName: {
      default: '',
      type: String,
    },
    position: {
      default: '',
      type: String,
    },
    email: {
      default: '',
      type: String,
    },
    status: {
      default: '',
      type: String,
    },
    authStatus: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      link: '',
      show_error: false,
    }
  },

  computed: {},

  methods: {
    hide() {
      this.$modal.hide('member-modal')
    },
    changePasswrod() {
      this.$emit('changePassword')
      this.hide()
    },
    editUser() {
      this.$emit('editUser')
      this.hide()
    },
    roleClass(status) {
      return this.setStatusStyle(status)
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

.wrapper {
  padding: 0 30px;
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

.avatar-plug,
.avatar {
  margin: auto;
  margin-top: 25px;
  width: 120px;
  height: 120px;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.name {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin-top: 16px;
}

.about {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: $baseGray;
  width: 336px;
  margin: auto;
  margin-top: 13px;
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

.role {
  margin-top: 17px;
  border-radius: 8px;
  // max-width: 135px;

  // max-height: 35px;
  padding: 8px 14px;
  margin: auto;

  p {
    text-align: center;
    margin-bottom: 0;
  }
}

.cell {
  span,
  p {
    font-weight: 600;
    line-height: 14px;
  }
  span {
    font-size: 12px;

    color: $baseGray;
  }
  p {
    font-size: 15px;
    color: $baseBlack;
  }
  button {
    background: none;
    border: none;
    color: $baseOrange;
    display: block;
    padding: 0;
  }
}

.input {
  @include auth-input;
  border: 1px dashed #eaecf1;
}

.button {
  @include button-edit;
  height: 50px;
  // margin-top: 98px;
}
</style>
