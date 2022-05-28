<template>
  <modal
    classes="category_modal"
    :width="416"
    :height="770"
    name="add-member-modal"
  >
    <div :class="$style.wrapper">
      <button :class="$style.close" @click="hide">
        <img src="images/reg/close.svg" alt="" />
      </button>

      <h3 :class="$style.header">
        Добавление <br />
        нового пользователя
      </h3>

      <p :class="$style.label">Персональная информация</p>

      <CustomInput v-model="name" :class="$style.input" :label="'Имя'" />

      <CustomInput
        v-model="last_name"
        :class="$style.input"
        :label="'Фамилия'"
      />

      <CustomInput
        v-model="position"
        :class="$style.input"
        :label="'Должность'"
      />

      <CustomInput
        v-model="email"
        :class="$style.input"
        :label="'Электронная почта'"
      />

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

      <button :class="$style.button" @click="create">Пригласить</button>
    </div>
  </modal>
</template>

<script>
import '~/assets/scss/modals.scss'
import CustomInput from '~/components/widgets/CustomInput.vue'
import CustomRadio from '~/components/widgets/CustomRadio.vue'
export default {
  name: 'Social',
  components: {
    CustomInput,
    CustomRadio,
  },

  data() {
    return {
      name: '',
      last_name: '',
      email: '',
      position: '',
      status: '',
    }
  },

  computed: {
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },

  methods: {
    hide() {
      this.$modal.hide('add-member-modal')
    },
    async create() {
      const formData = await new FormData()
      await formData.append('first_name', this.name)
      await formData.append('last_name', this.last_name)
      await formData.append('position', this.position)
      await formData.append('email', this.email)
      await formData.append('status', this.status)
      this.$axios
        .post('/api/v1/business/create_employee/', formData, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then(() => {
          alert('Приглашен!')
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

.uploadImages {
  display: none;
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
  width: 240px;
  margin: auto;
  margin-top: 30px;
}

.name {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin-top: 16px;
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

.description {
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  color: $baseGray;
  margin-left: 42px;
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
  background: rgba(0, 198, 103, 0.08);
  border-radius: 8px;
  width: 120px;
  height: 30px;

  p {
    color: #00c667;
    text-align: center;
  }
}

.label {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: $baseBlack;
  margin-top: 26px;
  margin-bottom: 20px;
}

.status {
  h3 {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: $baseBlack;
    margin-bottom: 24px;
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
  margin-top: 40px;
}
</style>
