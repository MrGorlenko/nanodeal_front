<template>
  <div>
    <h3 class="offer_header">Сроки проведения предложения</h3>
    <!-- {{ propStartDate }} -->
    <!-- {{ time_start_model }} -->
    <div class="row">
      <div class="col-12 d-flex">
        <CustomInput
          v-model="modal_date_range"
          :class="$style['input_long']"
          :label="'Даты проведения'"
          :type="'text'"
          @onFocus="callCalendarModal"
        />

        <CustomInput
          v-model="time_start_model"
          :class="$style['input_short']"
          :label="'Время начала'"
          :type="'time'"
        />

        <CustomInput
          v-model="time_end_model"
          :class="$style['input_short']"
          :label="'Завершение'"
          :type="'time'"
        />
        <!-- <p>
          <CustomInput
            v-model="date_start_model"
            :class="$style['input_long']"
            :label="'Дата начала'"
            :type="'date'"
          />

          <CustomInput
            v-model="date_end_model"
            :class="$style['input_long']"
            :label="'Дата конца'"
            :type="'date'"
          />
        </p>

        <p>
          <CustomInput
            v-model="time_start_model"
            :class="$style['input_short']"
            :label="'Время начала'"
            :type="'time'"
          />

          <CustomInput
            v-model="time_end_model"
            :class="$style['input_short']"
            :label="'Завершение'"
            :type="'time'"
          />
        </p> -->
      </div>
    </div>

    <div :class="$style.online" class="d-flex">
      <CustomCheckbox v-model="is_online" />
      <p>Онлайн предложение</p>
    </div>

    <template v-if="!is_online">
      <h3 class="offer_header">Адрес проживания</h3>

      <div :class="$style.places">
        <div
          v-for="(place, index) in companyPlaces"
          :key="place.uid"
          :class="[place.checked ? $style.selected : '', $style.place]"
        >
          <div :class="$style.top" class="d-flex">
            <CustomCheckbox
              v-model="place.checked"
              @click="selectPlaces(index)"
            />
            <p>{{ place.title }}</p>
          </div>

          <hr />
          <div :class="$style.bottom" class="d-flex">
            <img src="~/static/images/smartphone/gps.svg" alt="" />
            <p>{{ place.address }}</p>
          </div>
        </div>

        <div :class="[$style.cell, $style.add_new]" @click="callGeoModal">
          <img src="~/static/images/profile/add.svg" alt="" />
          <p :class="$style.label">
            Добавить <br />
            нового
          </p>
        </div>
      </div>
    </template>

    <Geo @resData="resModalData" />

    <Calendar :available-to="{}" @setTime="setDateModal" />

    <NextOffer
      :class="$style.offer"
      :next="next"
      @nextStep="nextStep"
      @resData="resData"
      @draftData="draftData"
    />
  </div>
</template>

<script>
import NextOffer from '~/components/widgets/NextOffer.vue'
import CustomInput from '~/components/widgets/CustomInput'
import CustomCheckbox from '~/components/widgets/CustomCheckbox'
import Geo from '~/components/modals/Geo'
import Calendar from '~/components/modals/statistics/Calendar'

import setDateLabel from '~/mixins/setDateLabel'
export default {
  components: {
    NextOffer,
    CustomInput,
    CustomCheckbox,
    Geo,
    Calendar,
  },
  mixins: [setDateLabel],
  props: {
    propId: {
      default: '',
      type: String,
    },
    propPlacesId: {
      default: () => [],
      type: Array,
    },
    propPlaces: {
      default: () => [],
      type: Array,
    },
    propStartDate: {
      default: '',
      type: String,
    },
    propEndDate: {
      default: '',
      type: String,
    },
    propIsOnline: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      date_start_model: '',
      date_end_model: '',
      time_start_model: '00:00',
      time_end_model: '23:59',
      start_date: '',
      end_date: '',
      is_online: false,
      markers: [],
      places: [],
      places_id: [],

      modal_date_range: '',
    }
  },
  computed: {
    next() {
      return (
        this.place_address !== '' &&
        this.start_date_model !== '' &&
        this.end_date_model !== ''
      )
    },
    companyPlaces() {
      return [...this.$store.getters['user_data/places']]
    },
  },
  created() {
    this.setPropStartDate()
    this.setPropEndDate()
    this.setPropDatesLabels()
    this.setPropPlaces()
    this.setIsOnline()
    this.setDate()
  },
  methods: {
    setPropStartDate() {
      let dateTime = ''
      if (this.propStartDate) dateTime = this.propStartDate
      const date = dateTime.slice(0, 10)
      const time = dateTime.slice(11, 16)
      this.date_start_model = date
      if (time) this.time_start_model = time
    },
    setPropEndDate() {
      let dateTime = ''
      if (this.propEndDate) dateTime = this.propEndDate
      const date = dateTime.slice(0, 10)
      const time = dateTime.slice(11, 16)
      this.date_end_model = date
      if (time) this.time_end_model = time
    },
    setPropDatesLabels() {
      if (this.propStartDate)
        this.modal_date_range =
          this.setDateLabel(this.date_start_model) +
          '—' +
          this.setDateLabel(this.date_end_model)
    },
    setPropPlaces() {
      this.dropPlaces()
      this.companyPlaces.forEach((place, i) => {
        this.propPlaces.forEach((propPlace) => {
          let index = null
          if (place.id === propPlace.id) index = i
          if (index !== null) this.selectPlaces(index)
        })
      })
    },
    setIsOnline() {
      this.is_online = this.propIsOnline
    },
    selectPlaces(index) {
      this.$store.dispatch('user_data/checkPlace', index)
    },
    nextStep() {
      this.$emit('nextStep')
    },
    dropPlaces() {
      this.$store.dispatch('user_data/dropPlaces')
    },
    setPlaces() {
      const places = []
      const placesId = []
      this.companyPlaces.forEach((place) => {
        return place.checked ? placesId.push(place.id) : placesId
      })
      this.companyPlaces.forEach((place) => {
        return place.checked ? places.push(place) : places
      })

      return { placesId, places }
    },
    // CHANGE NAME
    setDateModal(value) {
      const start = this.setDateLabel(value.slice(0, 10))
      const end = this.setDateLabel(value.slice(11, 21))
      this.date_start_model = value.slice(0, 10)
      this.date_end_model = value.slice(11, 21)
      this.modal_date_range = start + '—' + end
      // console.log(value)
    },
    // CHANGE NAME
    resData() {
      this.setDate()
      let placesId
      if (!this.is_online) {
        placesId = this.setPlaces().placesId
      } else {
        placesId = []
      }

      this.$emit('resData', {
        start_date: this.start_date,
        end_date: this.end_date,
        places_id: placesId,
        is_online: this.is_online,
      })
    },

    resModalData(value) {
      this.$store.dispatch('user_data/addPlace', value)
    },

    draftData() {
      this.setDate()
      let placesId
      if (!this.is_online) {
        placesId = this.setPlaces().placesId
      } else {
        placesId = []
      }
      this.$emit('draftData', {
        start_date: this.start_date,
        end_date: this.end_date,
        places_id: placesId,
        is_online: this.is_online,
      })
    },

    callGeoModal() {
      this.$modal.show('geo-modal')
    },

    callCalendarModal() {
      this.$modal.show('calendar-modal')
    },

    setDate() {
      this.start_date = this.date_start_model + ' ' + this.time_start_model
      this.end_date = this.date_end_model + ' ' + this.time_end_model
    },

    deleteAll() {
      this.modal_date_range = ''
      this.date_start_model = ''
      this.date_end_model = ''
      this.time_start_model = ''
      this.time_end_model = ''
      this.start_date = ''
      this.end_date = ''
      this.markers = []
      this.places = []
      this.places_id = []
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.input_long,
.input_short {
  input {
    background: #fff;
  }
}

.add_new {
  background: rgba(254, 136, 98, 0.1);
  justify-content: center;
  width: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 16px;
  padding-top: 18px;
  padding-bottom: 18px;
  img {
    margin-bottom: 14px;
  }
  p {
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
  }
}

.input_long {
  width: 345px;
}

.input_short {
  width: 150px;
  margin-left: 20px;
}

.biggest_input {
  width: 685px;
}

.offer {
  margin-top: 175px;
}

.online p,
.top p,
.bottom p {
  margin-bottom: 0;
  margin-top: 0;
  font-weight: bold;
  color: $baseBlack;
}

.places {
  display: flex;
  flex-wrap: wrap;
  // width: 100%;
  width: 1000px;
}

.place {
  border: 1px solid $baseGray;
  border-radius: 13px;
  padding: 24px 20px;
  width: 29%;
  margin-left: 1%;
  margin-bottom: 1%;
  margin-right: 1em;
  &:nth-child(3n + 1) {
    margin-left: 0;
  }
}

.selected {
  border: 1px solid $baseOrange;
}

.top {
  p {
    font-size: 16px;
    line-height: 19px;
  }
}

.bottom {
  p {
    margin-left: 13px;
    font-size: 14px;
  }
}
</style>
