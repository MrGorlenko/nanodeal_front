<template>
  <div :class="$style.banner">
    <template v-if="loaded">
      <img :src="banner.img" alt="" />

      <div :class="$style.right">
        <img :src="banner.img_title" alt="" />

        <p>{{ banner.description }}</p>

        <button>Подробнее</button>
      </div>
    </template>

    <Loader v-else />
  </div>
</template>

<script>
import Loader from '~/components/widgets/Loader'
export default {
  components: {
    Loader,
  },
  props: {
    banner: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loaded: false,
    }
  },
  methods: {
    loadData() {
      this.loaded = true
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.banner {
  background-color: #fff;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 66px;
  img {
    width: 234px;
    height: 70px;
    object-fit: contain;
  }
  p {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: $baseBlack;
    width: 432px;
  }

  button {
    width: 200px;
    height: 44px;
    @include button-next;
    background: linear-gradient(261.09deg, #ff13d9 -63.87%, #ffb74b 109.86%);
  }
}

@media (max-width: $mobile) {
  .banner {
    flex-direction: column;
    padding-bottom: 33px;
  }

  .right {
    padding-left: 0;
    align-items: center;
    img {
      margin-top: 20px;
      margin-bottom: 16px;
    }
    p {
      font-size: 16px;
      width: 80%;
    }
  }
}
</style>
