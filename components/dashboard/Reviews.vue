<template>
  <div :class="$style.reviews">
    <h2 :class="$style.header">Будем рады вашему отзыву</h2>
    <textarea
      :class="$style.textarea"
      cols="30"
      rows="10"
      placeholder="Введите сообщение"
    ></textarea>
    <button :class="$style.button">Отправить</button>
  </div>
</template>

<script>
export default {}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.reviews {
  grid-area: Reviews;
  background: #fff;
  border-radius: 16px;
  padding: 25px;
  height: fit-content;
}

.header {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 24px;
}

.textarea {
  width: 100%;
  border-radius: 13px;
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  padding: 16px 13px;
  border: none;
  color: $baseGray;
  background: rgba(247, 247, 250, 0.8);
}

.button {
  width: 100%;
  height: 44px;
  margin-top: 14px;
  @include button-send;
}
</style>
