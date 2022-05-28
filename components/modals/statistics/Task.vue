<template>
  <modal classes="task_modal" :width="416" :height="550" name="task-modal">
    <button :class="$style.close" @click="hide">
      <img src="images/reg/close.svg" alt="" />
    </button>
    <h3 :class="$style.header">
      Выберите <br />
      предложение
    </h3>

    <div :class="$style.offer">
      <CustomRadio v-model="selected_offer" :val="'Все предложения'" /> Все
      предложения
    </div>

    <div v-for="offer in offers" :key="offer.uid" :class="$style.offer">
      <CustomRadio v-model="selected_offer" :val="offer.uid" />
      {{ offer.title }}
    </div>

    <div class="absolute-button-block">
      <button :class="$style.button" @click="selectOffer">Показать</button>
    </div>
  </modal>
</template>

<script>
import '~/assets/scss/modals.scss'
import CustomRadio from '~/components/widgets/CustomRadio'

export default {
  name: 'Social',
  components: {
    CustomRadio,
  },

  data() {
    return {
      selected_offer: 'Все предложения',
      selected_offer_title: '',
    }
  },

  computed: {
    offers() {
      return this.$store.getters['offer/receivedOffers'].filter((offer) => {
        return offer.status === 'Активные'
      })
    },
  },

  methods: {
    show() {
      this.$modal.show('task-modal')
    },
    hide() {
      this.$modal.hide('task-modal')
    },
    setOffer(offer) {
      this.offers.forEach((offer) => {
        if (offer.uid === this.selected_offer) {
          this.selected_offer_title = offer.title
        }
      })
    },
    selectOffer() {
      this.setOffer()
      this.$emit('selectOffer', {
        uid: this.selected_offer,
        title: this.selected_offer_title,
      })
      this.hide()
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

.header {
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: $baseBlack;
  margin-top: 30px;
  margin-bottom: 20px;
}

.offer {
  display: flex;
  height: 70px;
  width: 95%;
  margin: auto;
  border-top: 0.5px solid $secondGray;
  border-bottom: 0.5px solid $secondGray;
  align-items: center;
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }
}

.button {
  @include button-next-active;
  height: 50px;

  width: 335px;
  margin: auto;
  margin-top: 80px;
}
</style>
