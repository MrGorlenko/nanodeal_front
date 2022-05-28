<template>
  <div>
    <h3 class="offer_header">Требование к исполнителям</h3>
    <p class="offer_label">Выберите пол</p>
    <div class="row">
      <div class="col-12 d-flex">
        <label
          for=""
          :class="[
            $style['radio_wrapper'],
            gender.male ? $style['radio_checked'] : '',
          ]"
          class="check_wrapper"
        >
          <CustomCheckbox v-model="gender.male" />
          Мужчина</label
        >

        <label
          for=""
          :class="[
            $style['check_wrapper'],
            $style['radio_wrapper'],
            gender.female ? $style['radio_checked'] : '',
          ]"
          class="check_wrapper"
        >
          <CustomCheckbox v-model="gender.female" />
          Женщина</label
        >
      </div>
    </div>
    <p class="offer_label">Возвраст:</p>
    <div class="row">
      <div class="col-12 d-flex">
        <CustomInput
          v-model="from"
          class="check_wrapper"
          :label="'От'"
          :type="'number'"
        />

        <CustomInput
          v-model="to"
          :class="$style['check_wrapper']"
          class="check_wrapper"
          :label="'До'"
          :type="'number'"
        />
      </div>
    </div>
    <p class="offer_label">Минимальное количество подписчиков</p>

    <CustomInput
      v-model="followers_count"
      :class="$style.input"
      :label="'Количество подписчиков'"
      :type="'number'"
    />

    <div class="d-flex">
      <CustomCheckbox v-model="is_manual_moderate" />
      <p>Подтверждать заявки участников вручную</p>
    </div>

    <NextOffer
      :next="next"
      @resData="resData"
      @draftData="draftData"
      @deleteAll="deleteAll"
    />
  </div>
</template>

<script>
import NextOffer from '~/components/widgets/NextOffer'
import CustomInput from '~/components/widgets/CustomInput'
import CustomCheckbox from '~/components/widgets/CustomCheckbox'
export default {
  components: {
    NextOffer,
    CustomInput,
    CustomCheckbox,
  },
  props: {
    propId: {
      default: '',
      type: String,
    },
    propGender: {
      default: '',
      type: String,
    },
    propAgeFrom: {
      default: null,
      type: Number,
    },
    propAgeTo: {
      default: null,
      type: Number,
    },
    propFollowersCount: {
      default: null,
      type: Number,
    },
    propIsManual: {
      default: null,
      type: Boolean,
    },
  },
  data() {
    return {
      is_manual_moderate: false,
      gender: { male: false, female: false },
      from: '',
      to: '',
      followers_count: '',
    }
  },
  computed: {
    next() {
      return (
        (this.gender.male || this.gender.female) &&
        this.from !== '' &&
        this.to !== '' &&
        this.followers_count !== ''
      )
    },
    changedGender() {
      return this.propGender !== this.setGender()
    },
    changedFrom() {
      return Number(this.propAgeFrom) !== this.from
    },
    changedTo() {
      return Number(this.propAgeTo) !== this.to
    },
    changedManual() {
      return this.propIsManual !== this.is_manual_moderate
    },
    changedFollowers() {
      return Number(this.propFollowersCount) !== this.followers_count
    },
    saveMode() {
      return this.$store.getters['offer/setSaveMode']
    },
  },
  created() {
    this.setPropGenger()
    this.setPropAgeFrom()
    this.setPropAgeTo()
    this.setPropFollowers()
    this.setPropManual()
    if (this.propId === '' && this.saveMode === false) this.deleteAll()
  },
  methods: {
    setPropGenger() {
      if (this.propGender === 'MALE') this.gender.male = true
      if (this.propGender === 'FEMALE') this.gender.female = true
      if (this.propGender === 'BOTH') {
        this.gender.male = true
        this.gender.female = true
      }
    },

    setPropAgeFrom() {
      if (this.propAgeFrom !== null) this.from = this.propAgeFrom
    },

    setPropAgeTo() {
      if (this.propAgeTo !== null) this.to = this.propAgeTo
    },

    setPropFollowers() {
      if (this.propFollowersCount !== null)
        this.followers_count = this.propFollowersCount
    },

    setPropManual() {
      if (this.propIsManual === true) this.is_manual_moderate = true
      if (this.propIsManual === false) this.is_manual_moderate = false
    },

    setGender() {
      if (this.gender.male && this.gender.female) {
        return 'BOTH'
      } else if (this.gender.male) {
        return 'MALE'
      } else if (this.gender.female) {
        return 'FEMALE'
      }
    },

    resData() {
      this.$emit('resData', {
        gender: this.setGender(),
        age_from: this.from,
        age_to: this.to,
        followers_count: this.followers_count,
        is_manual_moderate: this.is_manual_moderate,
      })
    },

    draftData() {
      this.$emit('draftData', {
        gender: this.setGender(),
        age_from: this.from,
        age_to: this.to,
        followers_count: this.followers_count,
        is_manual_moderate: this.is_manual_moderate,
      })
    },

    deleteAll() {
      this.is_manual_moderate = false
      this.gender = { male: false, female: false }
      this.from = ''
      this.to = ''
      this.followers_count = ''
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.check_wrapper {
  margin-left: 20px;
}

.input {
  width: 320px;
}

.radio_wrapper {
  padding: 14px;
  display: flex;
  align-items: center;
  position: relative;
}

.radio_checked {
  border: 1px solid $baseOrange;
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-right: 11px;
  left: 2px;
  &:before {
    position: absolute;
    width: 22.5px;
    height: 22.5px;
    content: '';
    display: block;
    top: 12px;
    left: 12px;
    background-image: url('~/static/images/checkbox_unchecked.svg');
  }
  &:checked {
    &:before {
      position: absolute;
      width: 22.5px;
      height: 22.5px;
      content: '';
      display: block;
      top: 12px;
      left: 12px;
      background-image: url('~/static/images/checkbox_checked.svg');
    }
  }
}
</style>
