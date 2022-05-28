<template>
  <entry-app :step="step">
    <template slot="right">
      <img
        class="d-none d-lg-block"
        :class="$style.back"
        src="~/static/images/reg/arrowBack.svg"
        alt=""
        @click="goBack"
      />
      <b-tabs
        v-model="step"
        content-class="mt-3"
        pills
        :justified="$screen.width < 992 ? true : false"
      >
        <b-tab
          :title-link-class="linkClass(0)"
          title="Регистрация"
          active
          @click="setStep(0)"
        >
          <template #title>
            <div :class="$style.circle"></div>
            <hr :class="$style.line" />
            <span :class="$style.label">Регистрация</span>
          </template>
          <Basic @goNext="goNext" @resData="getBasicData"
        /></b-tab>
        <b-tab
          :disabled="check_step >= 1 ? false : true"
          :title-link-class="linkClass(1)"
          title="Профиль"
          @click="setStep(1)"
        >
          <template #title>
            <div :class="$style.circle"></div>
            <hr :class="$style.line" />
            <span :class="$style.label">Профиль</span>
          </template>
          <Profile @goNext="goNext" @resData="getProfileData"
        /></b-tab>
        <b-tab
          :disabled="check_step >= 2 ? false : true"
          :title-link-class="linkClass(2)"
          title="Компания"
          @click="setStep(2)"
        >
          <template #title>
            <div :class="$style.circle"></div>
            <hr :class="$style.line" />
            <span :class="$style.label">Компания</span> </template
          ><Company @goNext="goNext" @resData="getCompanyData" />
        </b-tab>
        <b-tab
          :disabled="check_step == 3 ? false : true"
          :title-link-class="[linkClass(3), lastLink()]"
          title="Тариф"
          @click="setStep(3)"
        >
          <template #title>
            <div :class="$style.circle"></div>
            <hr :class="[$style.line_invisible, $style.line]" />
            <span :class="$style.label">Тариф</span>
          </template></b-tab
        >
      </b-tabs>
    </template>
    <template slot="bottom">
      <Tarif @selectTarif="selectTarif" />
    </template>
  </entry-app>
</template>

<script>
import '~/assets/scss/reg-widgets.scss'
import EntryApp from '~/components/templates/EntryApp.vue'
import Basic from '~/components/reg/Basic'
import Profile from '~/components/reg/Profile'
import Company from '~/components/reg/Company'
import Tarif from '~/components/reg/Tarif'
export default {
  components: {
    EntryApp,
    Basic,
    Profile,
    Company,
    Tarif,
  },
  data() {
    return {
      step: 0,
      check_step: 0,
      user: {
        login: '',
        password: '',
        first_name: '',
        last_name: '',
        position: '',
        avatar: '',
      },
      company: {
        name: '',
        description: '',
        categories: '',
        social_links: [],
        logo: '',
      },
      tarif_id: null,
      tarif_price: null,
      data_box: {},
      form_data: new FormData(),
    }
  },
  methods: {
    /* Стилизация кнопок по стадии заполнения */
    linkClass(idx) {
      if (this.step === idx && this.step === 0) {
        return [this.$style.first]
      } else if (this.step === idx) {
        return [this.$style.current]
      } else if (this.step >= idx) {
        return [this.$style.post]
      } else {
        return [this.$style.future]
      }
    },
    lastLink() {
      return [this.$style.last_link]
    },
    /* Устанавливает активный шаг таба */
    setStep(index) {
      this.step = index
      this.check_step = index
    },
    /* check_step проверяет, можно ли выключить disabled у таба */
    async stepCheckerPlus() {
      await this.check_step++
    },
    async stepCheckerMinus() {
      if (this.check_step === 0) return
      await this.check_step--
    },
    stepIncrease() {
      this.step++
    },
    stepDicrease() {
      if (this.step === 0) return
      this.step--
    },
    /* Сначала меняет чекер, затем переключает сам таб */
    goNext() {
      this.stepCheckerPlus().then(this.stepIncrease)
    },
    goBack() {
      this.stepCheckerMinus().then(this.stepDicrease)
    },
    /* Получение данных для входа */
    async getBasicData(value) {
      this.user = new FormData()
      // this.user.email = value.email
      // this.user.password = value.password
      // await this.user.append('email', value.email)
      // await this.user.append('password', value.password)
      await this.form_data.append('user_email', value.email)
      await this.form_data.append('user_password', value.password)
      // this.user = new FormData()
      // this.user.append('user', value)
    },
    /* Получение данных пользователя */
    getProfileData(value) {
      // this.user.first_name = value.name
      // this.user.last_name = value.surname
      // this.user.position = value.position
      // this.user.avatar = value.avatar
      this.form_data.append('user_first_name', value.name)
      this.form_data.append('user_last_name', value.surname)
      this.form_data.append('user_position', value.position)
      value.avatar
        ? this.form_data.append('user_avatar', value.avatar)
        : (value.avatar = '')

      // this.form_data.append('user', this.user)
    },
    /* Получение данных компаний  */
    getCompanyData(value) {
      // console.log(value)
      // console.log(value.social_links)
      // console.log(JSON.parse(value.social_links))
      this.company = new FormData()
      this.form_data.append('company_name', value.name)
      this.form_data.append('company_description', value.description)
      this.form_data.append(
        'company_categories',
        JSON.stringify(value.categories)
      )
      this.form_data.append(
        'company_social_links',
        JSON.stringify(value.social_links)
      )
      value.logo
        ? this.form_data.append('company_logo', value.logo)
        : (value.logo = '')
      // this.form_data.append('company', this.company)
      // this.company.name = value.name
      // this.company.description = value.description
      // this.company.categories = value.categories
      // this.company.social_links = value.social_links
      // this.company.logo = value.logo
    },
    /* Получение данных о тарифе */
    selectTarif(id) {
      // this.tarif_id = id
      // this.tarif_id = await new FormData()
      // await this.tarif_id.append('tarif_id', id)
      this.form_data.append('tariff_id', id)
      this.finishRegistration()
    },
    /* Регистрация окончена */
    finishRegistration() {
      this.postData()
    },
    postData() {
      // console.log(this.user, this.company)
      // for (const [name, value] of this.form_data) {
      //   console.log(`${name} = ${value}`)
      // }
      // for (const [name, value] of this.user) {
      //   alert(`${name} = ${value}`) // key1=value1, потом key2=value2
      // }
      // {
      //     company: this.company,
      //     tariff_id: this.tarif_id,
      //     user: this.user,
      //   }
      this.$axios
        .$post('/api/v1/business/register/', this.form_data)
        .then(() => {
          alert('Спасибо! Вы зарегестриованы!')
        })
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.back {
  width: 7.5px;
  height: 14px;
  position: absolute;
  top: 5px;
  left: -15px;
}

.tab_title {
  display: flex;
  flex-wrap: wrap;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: $baseOrange;
  position: relative;
}
.line {
  width: 70%;
  margin-top: 5px;
  margin-bottom: 0;
  &_invisible {
    visibility: hidden;
  }
}

.first {
  .line {
    background: $baseOrange;
  }
  .label {
    color: $baseOrange;
  }
}

.post {
  .line {
    background: $baseOrange;
  }
  .label {
    color: $baseBlack;
  }
  .circle {
    &::after {
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-image: url('~/static/images/reg/checked.svg');
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      background-position: right;
    }
  }
}

.current {
  .line {
    background: $disabledOrange;
  }
  .label {
    color: $baseOrange;
  }
}

.current,
.post {
  .circle {
    background: $baseOrange;
  }
}

.future {
  .circle {
    background: $disabledOrange;
  }
  .line {
    background: $disabledOrange;
  }
  .label {
    color: #c0bdbc;
  }
}

.first,
.current,
.post,
.future {
  width: 102px;
  display: flex;
  flex-wrap: wrap;
  background: none !important;
  border: none !important;
  box-sizing: border-box;
  padding-right: 0 !important;
  padding-left: 0 !important;

  @media screen and (max-width: 992px) {
    width: 100%;
  }
}

.last_link {
  @media screen and (max-width: 992px) {
    width: 40px;
  }
}

.green {
  color: green !important;
}

.label {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 6px;
}

.img {
  z-index: 2;
  position: relative;
  margin: auto;
  display: block;
}

.img-container {
  position: relative;
  height: 800px;
}

.radian {
  position: absolute;
  width: 100%;
  height: 637px;
  bottom: -70px;
  left: 0;
}

.active {
  text-decoration: underline;
}
</style>
