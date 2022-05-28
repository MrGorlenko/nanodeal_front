<template>
  <div :class="$style.entry">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-12 d-none d-lg-flex">
          <div v-if="!step || step < 3" :class="$style['img-container']">
            <img :class="$style.img" src="/images/reg/auth.png" alt="" />
            <img
              :class="$style['radian']"
              src="/images/reg/shadow.png"
              alt=""
            />
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <img
            :class="$style.logo"
            class="d-block d-lg-none"
            src="/images/logo.svg"
            alt=""
          />
          <slot name="right"></slot>
        </div>
        <div v-if="step == 3" class="col-12">
          <slot name="bottom"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntryApp',
  props: {
    step: {
      type: Number,
      default: null,
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.entry {
  @include auth;
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

.logo {
  width: 136px;
  height: 42px;
  margin: auto;
  margin-bottom: 35px;
}
</style>
