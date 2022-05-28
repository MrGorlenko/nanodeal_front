<template>
  <div :class="$style.wrapper">
    <div :class="$style.window">
      <h3 :class="$style.header">Профиль</h3>
      <UploadImages
        ref="upload"
        :class="$style.uploadImages"
        :max="1"
        @changed="handleImages"
      />

      <div :class="$style.photo">
        <div v-if="!show_avatar" :class="$style.avatar_disabled">
          <p>{{ initials }}</p>
        </div>
        <img v-else :class="$style.avatar" :src="file" alt="" />

        <div class="upload">
          <img src="/images/reg/camera.svg" alt="" @click="clickUpload" />
        </div>
      </div>

      <form :class="$style.form" action="">
        <h3 :class="$style.header">Персональная информация</h3>
        <div class="row p-0">
          <div class="col-6">
            <CustomInput v-model="name" :label="'Имя'" :class="$style.input" />
            <CustomInput
              v-model="second_name"
              :label="'Фамилия'"
              :class="$style.input"
            />
          </div>
          <div class="col-6">
            <CustomInput
              v-model="position"
              :label="'Должность'"
              :class="$style.input"
              :read-only="true"
            />
            <CustomInput
              v-model="email"
              :label="'Электронная почта'"
              :class="$style.input"
              :read-only="true"
            />
          </div>
        </div>

        <h3 :class="$style.header">Создание пароля</h3>

        <div class="row p-0">
          <div class="col-6">
            <CustomInput
              v-model="password"
              :type="'password'"
              :label="'Пароль'"
              :class="$style.input"
            />
          </div>
          <div class="col-6">
            <CustomInput
              v-model="repeat_password"
              :type="'password'"
              :label="'Повторите пароль'"
              :class="$style.input"
            />
          </div>
        </div>
      </form>

      <h3 :class="$style.header">Статус пользователя</h3>
      <div :class="$style['status-wrapper']">
        <img src="~/static/images/icons/lock.svg" alt="" />
        <div :class="[$style.status, roleClass(status)]">
          <p>{{ status }}</p>
        </div>
        <p v-if="status === 'Администратор'" :class="$style.decription">
          Может назначать сотрудников и что-то делать еще.
        </p>
        <p v-if="status === 'Сотрудник'" :class="$style.decription">
          Назначается владельцем или администратором. Принимает решения по
          заявкам и выполненным заданиям.
        </p>
      </div>

      <button
        :class="$style.reg"
        :disabled="isNext ? false : true"
        @click="patch"
      >
        Зарегестрироваться
      </button>
    </div>
  </div>
</template>

<script>
import UploadImages from 'vue-upload-drop-images'
import CustomInput from '~/components/widgets/CustomInput.vue'
import isPassword from '~/mixins/checker/isPassword'
import '~/assets/scss/status.scss'
import setStatusStyle from '~/mixins/setStatusStyle'
export default {
  components: {
    UploadImages,
    CustomInput,
  },
  mixins: [isPassword, setStatusStyle],
  data() {
    return {
      file: '/images/reg/user_photo.png',
      show_avatar: false,
      name: '',
      second_name: '',
      avatar: '',
      position: '',
      email: '',
      password: '',
      repeat_password: '',
      status: '',
    }
  },
  computed: {
    initials() {
      return this.name.length > 0 && this.second_name.length > 0
        ? this.name[0] + this.second_name[0]
        : 'ИФ'
    },
    isNext() {
      let next = false
      this.password !== '' &&
      this.checkPassword() &&
      this.checkSamePasswords() &&
      this.checkData()
        ? (next = true)
        : (next = false)
      return next
    },
  },
  created() {
    this.fetch()
  },

  methods: {
    /* Проверка пароля */
    checkPassword() {
      if (!this.isPassword(this.password)) return false
      return true
    },
    /* Проверка одинаковости пароля */
    checkSamePasswords() {
      if (this.password !== this.repeat_password) return false
      return true
    },
    /* Проверка имени и фамилии */
    checkData() {
      if (this.name === '' || this.second_name === '') return false
      return true
    },
    /* Отслеживание события загрузки фото */
    handleImages(files) {
      this.$refs.upload.readAsDataURL(files[0]).then((value) => {
        this.file = value
        this.show_avatar = true
        this.avatar = value
          .substring(value.indexOf('base64,'))
          .substring(7, value.length)
      })
    },
    /* Вызов события загрузки фото по нажатию на иконку */
    clickUpload() {
      this.$refs.upload.reset()
      this.$refs.upload.append()
    },
    /* Стягивание данных по url */
    fetch() {
      this.$axios
        .post('api/v1/business/get_info_by_uid/', {
          uid: this.$route.query.key,
        })
        .then((res) => {
          this.name = res.data.data.first_name
          this.second_name = res.data.data.last_name
          this.position = res.data.data.position
          this.status = res.data.data.status
          this.email = res.data.data.email
        })
    },
    /* Patch юзера */
    patch() {
      const data = {}
      data.uid = this.$route.query.key
      data.first_name = this.name
      data.last_name = this.second_name
      data.position = this.position
      data.password = this.password
      if (this.avatar !== '') data.avatar = this.avatar

      this.$axios
        .patch('/api/v1/business/join_employee/', data)
        .then((res) => {
          this.$store.dispatch('auth/setAccessToken', res.data.access)
        })
        .then(() => {
          this.$router.push('/profile')
        })
    },
    /* Задание стиля для статуса */
    roleClass(status) {
      return this.setStatusStyle(status)
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.wrapper {
  height: 100vh;
  background: url('~/static/images/reg/regBG.svg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.window {
  width: 760px;
  height: 710px;
  background: #fff;
  border-radius: 20px;
  padding: 30px;
}

.header {
  @include header;
  text-align: center;
}

.uploadImages {
  display: none;
}

.photo,
.avatar_disabled {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.avatar_disabled {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #69dfd8;
  margin-right: 20px;

  p {
    color: #fff;
    font-weight: bold;
    font-size: 30px;
    margin-top: 0;
    margin-bottom: 0;
  }
}

.avatar {
  width: 100px;
  height: 100px;
  margin-right: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.form {
  margin-top: 40px;
  .header {
    font-size: 18px;
    text-align: left;
  }
}

.input {
  width: 100%;
}

.status-wrapper {
  display: flex;
  align-items: center;

  // p {

  // }
}

.decription {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  color: $baseGray;
  margin-top: 0;
  margin-bottom: 0;
}

.status {
  padding: 8px 13px;
  margin-left: 23px;
  margin-right: 20px;
  border: none;
  border-radius: 8px;
}

.reg {
  @include button-next-active;
  width: 335px;
  height: 50px;
  margin: auto;
  margin-top: 40px;
  &:disabled {
    @include button-next-disabled;
  }
}
</style>
