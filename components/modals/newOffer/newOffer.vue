<template>
  <modal
    classes="new_offer_modal"
    :width="395"
    :height="500"
    name="new-offer-modal"
  >
    <div :class="$style.modal">
      <h2 :class="$style.header">Успех</h2>

      <img
        :class="$style.img"
        src="~/static/images/newOffer/success.svg"
        alt=""
      />

      <p :class="$style.thx">Спасибо!</p>

      <p :class="$style.label">Ваше предложение отправлено на модерацию!</p>

      <p :class="$style.label">
        У вас есть только 15 минут, чтобы внести изменения.
      </p>

      <button :class="$style.button" @click="redirect">
        Перейти к предложениям
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  methods: {
    hide() {
      this.$modal.hide('new-offer-modal')
    },
    redirect() {
      this.$router.push('/offers')
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 32px 40px 32px;

  p {
    text-align: center;
    color: $baseBlack;
  }

  .label {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  }

  .thx {
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
  }
}

.header {
  margin-bottom: 73px;
}

.img {
  margin-bottom: 30px;
}

.button {
  margin-top: 25px;
  @include button-next-active;
  padding: 16px 65px;
}
</style>
