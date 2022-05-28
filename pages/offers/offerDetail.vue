<template>
  <div>
    <h2>
      <nuxt-link :class="$style.back" :to="'/offers'">
        <img src="~/static/images/newOffer/back.svg" alt="" />
      </nuxt-link>
      {{ offerTitle }}
    </h2>

    <div :class="$style.switcher">
      <button
        :class="current === 'О предложении' ? $style['button-active'] : ''"
        @click="switchCurrent('О предложении')"
      >
        <img src="~/static/images/offers/about.svg" alt="" />
        О предложении
      </button>
      <button
        :class="current === 'Заявки' ? $style['button-active'] : ''"
        @click="switchCurrent('Заявки')"
      >
        <img src="~/static/images/offers/moderate.svg" alt="" />
        Заявки
      </button>
      <button
        :class="current === 'Ход выполнения' ? $style['button-active'] : ''"
        @click="switchCurrent('Ход выполнения')"
      >
        <img src="~/static/images/offers/exec.svg" alt="" />
        Ход выполнения
      </button>
      <button
        :class="current === 'Сообщения' ? $style['button-active'] : ''"
        @click="switchCurrent('Сообщения')"
      >
        <img src="~/static/images/offers/messages.svg" alt="" />
        Сообщения
      </button>
    </div>

    <template v-if="current === 'О предложении'"> <About /> </template>
    <template v-if="current === 'Заявки'"> <Bids /> </template>
    <template v-if="current === 'Ход выполнения'"><ExecProcess /> </template>
    <template v-if="current === 'Сообщения'"
      ><Chat :chat-uid="offerUid"
    /></template>
  </div>
</template>

<script>
import About from '~/components/offerDetail/About.vue'
import ExecProcess from '~/components/offerDetail/ExecProcess.vue'
import Bids from '~/components/offerDetail/Bids.vue'
import Chat from '~/components/offerDetail/Chat.vue'
export default {
  components: {
    About,
    ExecProcess,
    Bids,
    Chat,
  },
  data() {
    return {
      current: 'О предложении',
    }
  },

  computed: {
    offerTitle() {
      return this.$store.getters['offer/selectedOfferTitle']
    },
    offerUid() {
      return this.$store.getters['offer/selectedOfferUid']
    },
  },
  created() {
    if (!this.offerTitle) this.$router.push('/offers')
  },
  methods: {
    switchCurrent(current) {
      this.current = current
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.back {
  background-color: $baseBg !important;
  margin-right: 19px;
}

.switcher {
  padding-bottom: 25px;
  padding-top: 30px;
  border-bottom: 0.5px solid $stepGray;
  margin-bottom: 30px;
  display: flex;
  button {
    border: none;
    background: none;
    padding: 12px;
    border-radius: 10px;

    img {
      margin-right: 8px;
    }
  }
  .button-active {
    background: #fff;
  }
}
</style>
