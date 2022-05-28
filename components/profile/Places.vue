<template>
  <div :class="$style.places">
    <div
      v-for="place in places"
      :key="place.id"
      :class="[$style.cell, $style.place]"
    >
      <button :class="$style.delete" @click="deletePlace(place.id)">x</button>
      <p :class="$style.title">{{ place.title }}</p>
      <GmapMap
        ref="map"
        :center="{
          lat: Number(place.latitude),
          lng: Number(place.longitude),
        }"
        :zoom="12"
        :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false,
        }"
        map-type-id="terrain"
        style="width: 100%; height: 150px"
      >
      </GmapMap>
      <div :class="$style['address_wrapper']" class="d-flex">
        <img src="~/static/images/smartphone/gps.svg" alt="" />
        <p :class="$style.address">{{ place.address }}</p>
      </div>

      <hr :class="$style.line" />

      <span :class="$style.gray"> Тип заведения </span>
      <p :class="$style.type">Бар</p>

      <hr :class="$style.line" />

      <p :class="$style.type">Прикрепленное предложение:</p>
    </div>

    <div
      v-if="userStatus !== 'Сотрудник'"
      :class="[$style.add, $style.cell]"
      @click="callModal"
    >
      <img src="~/static/images/profile/add.svg" alt="" />
      <p :class="$style.label">
        Добавить <br />
        новое
      </p>
    </div>

    <Geo @resData="addPlace" />
  </div>
</template>

<script>
import Geo from '~/components/modals/Geo.vue'
export default {
  components: {
    Geo,
  },
  props: {
    places: {
      default: () => [],
      type: Array,
    },
    userStatus: {
      default: '',
      type: String,
    },
  },
  data() {
    return {}
  },

  methods: {
    updated() {
      this.$emit('updated')
    },

    callModal() {
      this.$modal.show('geo-modal')
    },

    async addPlace(value) {
      await this.$store.dispatch('user_data/addPlace', value)
      this.$emit('updated')
    },
    async deletePlace(index) {
      await this.$store.dispatch('user_data/deletePlace', index)
      this.$emit('updated')
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.places {
  display: flex;
  flex-wrap: wrap;
}

.place {
  background: #fff;
  margin-right: 26px;
  padding: 30px 20px;
  position: relative;
}

.cell {
  width: 343px;
  min-height: 395px;
  border-radius: 16px;
  margin-bottom: 15px;
}

.add {
  background: rgba(254, 136, 98, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: darken($color: rgba(254, 136, 98, 0.1), $amount: 20);
  }
}

.label {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  color: $baseBlack;
  text-align: center;
  margin-top: 14px;
}

.title {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: $baseBlack;
}

.address_wrapper {
  margin-top: 17px;
  align-items: center;
}

.address {
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: $baseBlack;
  margin-left: 13px;
  margin-bottom: 0;
}

.gray {
  color: $baseGray;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
}

.line {
  margin-bottom: 0;
  margin-top: 16px;
}

.type {
  margin-top: 0;
  margin-bottom: 0;
  color: $baseBlack;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
}

.delete {
  position: absolute;
  right: 15px;
  top: 15px;
}

@media (max-width: $mobile) {
  .places {
    flex-direction: column-reverse;
  }
  .cell {
    margin-right: 0;
    width: 100%;
  }
  .add {
    height: 90px;
    min-height: 90px;
    flex-direction: row;
    padding-top: 0;
    img {
      margin-bottom: 0;
      margin-right: 16px;
    }
    p br {
      display: none;
    }
  }
}
</style>
