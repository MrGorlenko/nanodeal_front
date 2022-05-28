<template>
  <div :class="$style.offers">
    <h4 :class="$style.header">
      Активные предложения ({{ activeTasks.length }})
    </h4>
    <!-- <carousel-3d
      :unagile="show_slider ? false : true"
      :display="1"
      :controls-visible="false"
      :start-index="0"
      @before-slide-change="onSlide"
    >
      <slide
        v-for="(activeTask, index) in activeTasks"
        :key="index"
        :index="index + 1"
      >
        <div :class="$style.top">
          <img :class="$style.icon" :src="activeTask.cover" alt="" />
          <p>{{ activeTask.title }} {{ index }}</p>
        </div>

        <hr />
        <div :class="$style['cells-wrapper']">
          <div :class="$style.cell">
            <span>Сообщений</span>
            <p>2</p>
          </div>

          <div :class="$style.cell">
            <span>Заявок</span>
            <p>250</p>
          </div>

          <div :class="$style.cell">
            <span>Исполнители</span>
            <p>5</p>
          </div>

          <div :class="$style.cell">
            <span>Ожидают</span>
            <p>15</p>
          </div>

          <div :class="$style.cell">
            <span>Выполнено</span>
            <p>25 / 1000</p>
          </div>
        </div>
        <hr />
      </slide>
    </carousel-3d> -->

    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="0"
      :class="$style.slider"
      :controls="false"
      indicators
      background="#fff"
      img-width="1024"
      img-height="480"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="(activeTask, index) in activeTasks"
        :key="index"
        :class="$style.item"
      >
        <!-- <p>{{ index }} : {{ activeTask.title }}</p> -->
        <div :class="$style.top">
          <img :class="$style.icon" :src="activeTask.cover" alt="" />
          <p>{{ activeTask.title }} {{ index }}</p>
        </div>

        <hr />
        <div :class="$style['cells-wrapper']">
          <div :class="$style.cell">
            <span>Сообщений</span>
            <p>2</p>
          </div>

          <div :class="$style.cell">
            <span>Заявок</span>
            <p>250</p>
          </div>

          <div :class="$style.cell">
            <span>Исполнители</span>
            <p>5</p>
          </div>

          <div :class="$style.cell">
            <span>Ожидают</span>
            <p>15</p>
          </div>

          <div :class="$style.cell">
            <span>Выполнено</span>
            <p>25 / 1000</p>
          </div>
        </div>
        <hr />
      </b-carousel-slide>
    </b-carousel>

    <button :class="$style.button">Перейти</button>

    <!-- <div :class="$style.pagination">
      <div
        v-for="i in 6"
        :key="i"
        :class="[$style.pag, i === slides + 1 ? $style['pag-active'] : '']"
      ></div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    activeTasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return { slide: 0, sliding: null, show_slider: false }
  },

  computed: {},

  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.offers {
  display: none;
}

@media (max-width: $mobile) {
  .offers {
    display: block;
    width: 100%;
    padding: 20px 16px;
    background: #fff;
    border-radius: 16px;
    margin-bottom: 20px;
  }

  .header,
  .top p {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: $baseBlack;
  }

  .top {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 24px;
  }

  .cells-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .cell {
    width: 33%;
    span {
      font-weight: 600;
      font-size: 12px;
      line-height: 14px;
      color: $baseGray;
    }
    p {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      margin-top: 0;
      margin-bottom: 0;
      color: $baseBlack;
    }
  }

  .button {
    @include button-green;
    width: 100%;
    height: 44px;
    margin-bottom: 16px;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }

  .slider {
    height: 300px;
    p {
      color: $baseBlack;
    }
    & > div {
      height: 100%;
    }
    ol {
      bottom: -85px;
      height: 6px;
      li {
        background: $baseGray;
        width: 6px;
        height: 6px !important;
        border-top: 0px solid transparent;
        border-bottom: 0px solid transparent;
        border-radius: 50%;
      }
    }
  }

  .item {
    height: 100%;
    & > div {
      left: 0;
      right: 0;
    }
  }

  .pag {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(196, 196, 196, 0.5);
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }

  .pag-active {
    background: #c4c4c4;
  }
}
</style>
