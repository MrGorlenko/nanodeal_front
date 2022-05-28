<template>
  <div>
    <div ref="smartphone" :class="$style.smartphone">
      <img
        :class="$style.bg"
        src="~/static/images/smartphone/smartphone_bg.svg"
        alt=""
      />

      <div :class="$style['logo_wrapper']">
        <img
          :class="$style.logo"
          src="~/static/images/smartphone/smartphone_logo.svg"
          alt=""
        />
      </div>

      <div :class="$style.base">
        <div :class="$style.info">
          <slot> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.smartphone {
  width: 310px;
  height: auto;
  border: 10px solid rgba(38, 49, 56, 0.8);
  border-radius: 24.7709px;
  position: relative;
}

.bg {
  margin-left: -1%;
  height: 100%;
  z-index: 0;
  width: calc(100% + 2px);
  margin-left: -1px;
  margin-top: 0px;
  border-radius: 16px;
  position: absolute;
}

.logo_wrapper {
  width: 100%;
  top: 25px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.base {
  width: calc(100% + 1px);
  margin-top: 66px;
  position: relative;
  height: auto;
  background-color: $baseBg;
  border-radius: 16px;
  padding: 29px 11px 12px 11px;
  z-index: 1;
  margin-left: -1px;
}

.info {
  width: 100%;
  height: auto;
  background: #fff;
  border-radius: 16px;
  padding: 11.5px;
}
</style>
