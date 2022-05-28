<template>
  <div>
    <h3 :class="$style.header">Настройка профиля</h3>

    <div :class="$style.photo">
      <div v-if="!show_avatar" :class="$style.avatar_disabled">
        <p>{{ initials }}</p>
      </div>
      <img v-else :class="$style.avatar" :src="file" alt="" />

      <div class="upload">
        <img src="/images/reg/camera.svg" alt="" />
        <input
          ref="file"
          :class="$style['upload-file']"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          @change="handleFileUpload()"
        />
      </div>
    </div>

    <input
      v-model="name"
      :class="$style.input"
      type="text"
      placeholder="Ваше имя"
      @input="checkNext"
    />

    <input
      v-model="surname"
      :class="$style.input"
      type="text"
      placeholder="Фамилия"
      @input="checkNext"
    />

    <input
      v-model="position"
      :class="$style.input"
      type="text"
      placeholder="Должность"
      @input="checkNext"
    />

    <button
      :class="$style.button"
      :disabled="next ? false : true"
      @click="
        goNext()
        resData()
      "
    >
      Далее
    </button>
  </div>
</template>

<script>
import '~/assets/scss/reg-widgets.scss'
import setBase64 from '~/mixins/setBase64.js'
export default {
  mixins: [setBase64],
  data() {
    return {
      file: '/images/reg/user_photo.png',
      emitFile: '',
      show_avatar: false,
      name: '',
      surname: '',
      avatar: '',
      position: '',
      next: false,
    }
  },

  computed: {
    initials() {
      return this.name.length > 0 && this.surname.length > 0
        ? this.name[0] + this.surname[0]
        : 'ИФ'
    },
  },

  methods: {
    async handleFileUpload() {
      this.emitFile = await this.$refs.file.files[0]
      this.file = await this.setBase64(this.emitFile)
      this.show_avatar = true
    },

    checkName() {
      if (this.name.length < 2) return false
      return true
    },

    checkSurname() {
      if (this.surname.length < 2) return false
      return true
    },

    checkPosition() {
      if (this.position.lenght < 2) return false
      return true
    },

    checkNext() {
      this.checkName() && this.checkSurname()
        ? (this.next = true)
        : (this.next = false)
    },

    goNext() {
      this.$emit('goNext')
    },

    resData() {
      const data = {}
      data.name = this.name
      data.surname = this.surname
      data.position = this.position
      this.emitFile ? (data.avatar = this.emitFile) : (this.avatar = '')
      this.$emit('resData', data)
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

.uploadImages {
  display: none;
}

.input,
.policy,
.button,
.photo {
  width: $rightWidth;
  @media screen and (max-width: 992px) {
    width: 100%;
  }
}

.photo {
  margin-bottom: 40px;
}

.photo,
.avatar_disabled {
  display: flex;
  align-items: center;
  justify-content: center;
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

.input {
  @include auth-input;
  display: block;
  margin-bottom: 16px;
}
.button {
  @include button-next-active;
  height: 50px;
  margin-top: 100px;
  &:disabled {
    @include button-next-disabled;
  }
}
</style>
