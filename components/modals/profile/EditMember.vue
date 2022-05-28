<template>
  <modal
    classes="category_modal"
    :width="416"
    :height="740"
    name="edit-member-modal"
  >
    <div :class="$style.wrapper">
      <button :class="$style.close" @click="hide">
        <img src="images/reg/close.svg" alt="" />
      </button>

      <h3 :class="$style.header">Редактирование</h3>
      <div :class="$style['avatar-wrapper']">
        <img v-if="avatar" :class="$style.avatar" :src="avatar" alt="" />
        <avatar-plug
          v-else
          :class="$style['avatar-plug']"
          :first-name="name"
          :second-name="last_name"
        />
        <div v-if="my" :class="$style.upload" class="upload">
          <img src="/images/reg/camera.svg" alt="" />
          <input
            ref="file"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            @change="handleFileUpload()"
          />
        </div>
      </div>

      <CustomInput
        v-model="name"
        :class="$style.input"
        :label="'Имя'"
        :read-only="my ? false : true"
      />

      <CustomInput
        v-model="last_name"
        :class="$style.input"
        :label="'Фамилия'"
        :read-only="my ? false : true"
      />

      <CustomInput
        v-model="position"
        :class="$style.input"
        :label="'Должность'"
        :read-only="
          (authStatus === 'Сотрудник' &&
            (status === 'Администратор' || status === 'Сотрудник')) ||
          (authStatus === 'Сотрудник' && status === 'Администратор')
        "
      />

      <CustomInput
        v-model="email"
        :class="$style.input"
        :label="'Электронная почта'"
        :read-only="my ? false : true"
      />

      <template v-if="authStatus === 'Владелец' && !myProp">
        <div :class="$style.status">
          <h3>Выберите статус пользователя</h3>
          <CustomRadio
            :id="'admin'"
            v-model="status"
            :class="$style.radio"
            :val="'Администратор'"
            :name="'status'"
            :label="'Администратор'"
          />
          <p :class="$style.description">
            Может назначать сотрудников и что-то делать еще.
          </p>
          <CustomRadio
            :id="'employee'"
            v-model="status"
            :class="$style.radio"
            :val="'Сотрудник'"
            :name="'status'"
            :label="'Сотрудник'"
          />
          <p :class="$style.description">
            Назначается владельцем или администратором. Принимает решения по
            заявкам и выполненным заданиям.
          </p>
        </div>
      </template>
      <template v-else>
        <div :class="$style.status">
          <h3>Статус пользователя</h3>
          <img
            :class="$style.lock"
            src="~/static/images/icons/lock.svg"
            alt=""
          />
          <div :class="[$style.role, roleClass(statusProp)]">
            <p>{{ statusProp }}</p>
          </div>

          <p v-if="statusProp === 'Владелец'" :class="$style.about">
            Имеет полные права на редактирование и удаление аккаунта. Может
            назначать и удалять сотрудников/администраторов
          </p>

          <p v-if="statusProp === 'Администратор'" :class="$style.about">
            Может назначать сотрудников и что-то делать еще.
          </p>

          <p v-if="statusProp === 'Сотрудник'" :class="$style.about">
            Назначается владельцем или администратором. Принимает решения по
            заявкам и выполненным заданиям.
          </p>
        </div>
      </template>
    </div>
    <div
      :class="
        (authStatus === 'Владелец' &&
          (status === 'Администратор' || status === 'Сотрудник')) ||
        (authStatus === 'Администратор' && status === 'Сотрудник') ||
        (status === 'Сотрудник' && my)
          ? 'relative-button-block'
          : 'absolute-button-block'
      "
    >
      <button v-if="my" :class="$style.button" @click="editMember">
        Сохранить
      </button>
      <button v-else :class="$style.button" @click="editEmployee">
        Сохранить
      </button>
    </div>
  </modal>
</template>

<script>
import '~/assets/scss/modals.scss'
import '~/assets/scss/status.scss'

import CustomInput from '~/components/widgets/CustomInput.vue'
import CustomRadio from '~/components/widgets/CustomRadio.vue'
import AvatarPlug from '~/components/widgets/AvatarPlug.vue'

import isUrl from '~/mixins/checker/isUrl'
import setBase64 from '~/mixins/setBase64.js'
import setStatusStyle from '~/mixins/setStatusStyle'

export default {
  name: 'Social',

  components: {
    CustomInput,
    CustomRadio,
    AvatarPlug,
  },

  mixins: [isUrl, setStatusStyle, setBase64],

  props: {
    avatarProp: {
      default: '',
      type: String,
    },
    nameProp: {
      default: '',
      type: String,
    },
    lastNameProp: {
      default: '',
      type: String,
    },
    positionProp: {
      default: '',
      type: String,
    },
    emailProp: {
      default: '',
      type: String,
    },
    statusProp: {
      default: '',
      type: String,
    },
    authStatus: {
      default: '',
      type: String,
    },
    myProp: {
      default: false,
      type: Boolean,
    },
    uidProp: {
      default: '',
      type: String,
    },
  },

  data() {
    return {
      avatar: '',
      file: '',
      name: '',
      last_name: '',
      email: '',
      position: '',
      my: false,
      status: '',
      uid: '',
    }
  },

  methods: {
    hide() {
      this.$emit('close')
      this.$modal.hide('edit-member-modal')
    },

    setInfo() {
      this.uid = this.uidProp
      this.avatar = this.avatarProp
      this.name = this.nameProp
      this.last_name = this.lastNameProp
      this.email = this.emailProp
      this.position = this.positionProp
      this.my = this.myProp
      this.status = this.statusProp
    },

    clickUpload() {
      this.$refs.upload.reset()
      this.$refs.upload.append()
    },

    async editMember() {
      const formData = await new FormData()
      await formData.append('first_name', this.name)
      await formData.append('last_name', this.last_name)
      await formData.append('email', this.email)
      await formData.append('position', this.position)
      if (this.avatar !== this.avatarProp)
        await formData.append('avatar', this.post_avatar)
      this.$store.dispatch('user_data/editMemberInfo', formData).then(() => {
        this.hide()
      })
    },

    async editEmployee() {
      const formData = await new FormData()
      await formData.append('uid', this.uid)
      await formData.append('position', this.position)
      await formData.append('status', this.status)
      this.$store.dispatch('user_data/editEmployeeInfo', formData).then(() => {
        this.hide()
      })
    },

    roleClass(status) {
      return this.setStatusStyle(status)
    },

    async handleFileUpload() {
      this.file = await this.$refs.file.files[0]
      this.avatar = await this.setBase64(this.file)
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

.uploadImages {
  display: none;
}

.wrapper {
  padding: 0 30px;
  position: relative;
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
  width: 120px;
  height: 120px;
  position: relative;
  left: 20px;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin-top: 16px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 20px;
}

.upload {
  position: relative;
  left: 40px;
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
  width: 120px;
  padding: 8px 14px;
  // height: 30px;

  p {
    // color: #00c667;
    text-align: center;
  }
}

.status {
  position: relative;
  .lock {
    position: absolute;
    top: 45px;
  }
  h3 {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: $baseBlack;
  }
  .role,
  .about {
    margin-left: 27px;
  }
  .about {
    margin-top: 10px;
    text-align: start;
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
    color: $baseGray;
  }
}

.input {
  margin-bottom: 16px;
}

.button {
  @include button-next-active;
  height: 50px;
  // margin-top: 45px;
}

.radio {
  &:nth-child(2) {
    label {
      background: rgba($color: $secondBlue, $alpha: 0.2);
      color: $secondBlue;
    }
  }
  &:nth-child(4) {
    label {
      background: rgba($color: $baseOrange, $alpha: 0.2);
      color: $baseOrange;
    }
  }
  label {
    border-radius: 8px;
    padding: 8px 14px;
  }
}
</style>
