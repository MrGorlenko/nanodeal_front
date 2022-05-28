<template>
  <modal :width="898" classes="geo_modal" name="geo-modal">
    <h2 class="header">Добавление нового места</h2>

    <label :class="$style.label" for="">Название места</label>
    <CustomInput
      v-model="placeName"
      :class="$style.input"
      :label="'Название места'"
    />

    <div class="row">
      <div class="col-6">
        <label :class="$style.label" for=""
          >Выберите категорию предложения</label
        >
        <!-- <CustomSelect /> -->
        <CustomInput v-model="addedInfo" :class="$style.input" :label="'Тип'" />
      </div>
      <div class="col-6">
        <label :class="$style.label" for="">Комментарий к адресу</label>
        <CustomInput
          v-model="addedInfo"
          :class="$style.input"
          :label="'Дополнительная информация'"
        />
      </div>
    </div>

    <label :class="$style.label" for="">Выберите адрес предложения</label>

    <div :class="$style['map_wrapper']">
      <div :class="$style['map_input']">
        <GmapAutocomplete
          ref="mapInput"
          :options="{ fields: ['geometry'] }"
          @place_changed="setPlace"
        />
      </div>
      <GmapMap
        ref="map"
        :center="center"
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
        style="width: 100%; height: 300px"
      >
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :icon="{ url: require('~/static/images/geo-icon.svg') }"
          @click="center = m.position"
        />
      </GmapMap>
    </div>

    <button :class="$style.button" @click="resData">Добавить</button>
  </modal>
</template>

<script>
import '~/assets/scss/modals.scss'
import CustomInput from '~/components/widgets/CustomInput'
// import CustomSelect from '~/components/widgets/CustomSelect'
export default {
  components: {
    CustomInput,
    // CustomSelect,
  },
  data() {
    return {
      placeName: '',
      addedInfo: '',
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
    }
  },
  mounted() {
    this.geolocate()
  },
  methods: {
    resData() {
      this.$emit('resData', {
        title: this.placeName,
        added: this.addedInfo,
        address: this.$refs.mapInput.$el.value,
        latitude: this.center.lat,
        longitude: this.center.lng,
      })
      this.$modal.hide('geo-modal')
    },
    setPlace(place) {
      this.currentPlace = place
      this.center.lat = this.currentPlace.geometry.location.lat()
      this.center.lng = this.currentPlace.geometry.location.lng()
      this.addMarker()
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
@import '~/assets/scss/modals.scss';

.map_wrapper {
  position: relative;
}
.map_input {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  padding: 10px;

  input {
    width: 100%;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 13px;
    height: 50px;
    border: none;
    padding-left: 16px;
  }
}

.button {
  @include button-next-active;
  width: 240px;
  height: 44px;
  margin: auto;
  margin-top: 30px;
}
.label {
  color: $baseBlack;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
}
.input {
  width: 100%;
}
</style>
