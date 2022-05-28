<template>
  <div :class="$style.tarif_mobile">
    <h3 :class="$style.header">Выберите тариф</h3>
    <img :class="$style.promise" src="/images/reg/14days.svg" alt="" />
    <p :class="$style.gray">Первое списание 06.06.2004</p>
    <carousel-3d
      :disable3d="true"
      :perspective="180"
      :space="300"
      :inverse-scaling="500"
      :start-index="1"
      display="3"
      height="525"
      width="290"
    >
      <slide :index="0">
        <div :class="$style.column">
          <div :class="[$style.cell, $style.heading]">
            <p :class="$style.title">Start</p>
            <span :class="[$style.orange, $style.subtitle]"
              >Подойдет для небольшого бизнеса</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в месяц</p>
            <span :class="[$style.orange, $style.bold]">2 900 руб</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в год</p>
            <span :class="$style['no-more']">34 800</span>
            <span :class="[$style['present-price'], $style.bold]"
              >29 000 руб</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество предложений</p>
            <span :class="$style.regular">5</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество городов</p>
            <span :class="$style.regular">1</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Бесплатный период 14 дней</p>
            <img src="/images/reg/confirm.svg" alt="" />
          </div>
          <div :class="$style.cell">
            <button :class="$style.buy" @click="resData(1)">Выбрать</button>
          </div>
        </div>
      </slide>
      <slide :index="1">
        <div :class="$style.column">
          <div :class="[$style.cell, $style.heading]">
            <p :class="$style.title">Scale</p>
            <span :class="[$style.orange, $style.subtitle]"
              >Увереность в каждом предложении</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в месяц</p>
            <span :class="[$style.orange, $style.bold]">4 900 руб</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в год</p>
            <span :class="$style['no-more']">58 800</span>
            <span :class="[$style['present-price'], $style.bold]"
              >49 000 руб</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество предложений</p>
            <span :class="$style.regular">10</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество городов</p>
            <span :class="$style.regular">1</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Бесплатный период 14 дней</p>
            <img src="/images/reg/confirm.svg" alt="" />
          </div>
          <div :class="$style.cell">
            <button :class="$style.buy" @click="resData(2)">Выбрать</button>
          </div>
        </div>
      </slide>
      <slide :index="2">
        <div :class="$style.column">
          <div :class="[$style.cell, $style.heading]">
            <p :class="$style.title">Pro</p>
            <span :class="[$style.orange, $style.subtitle]"
              >Есть где размахнуться</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в месяц</p>
            <span :class="[$style.orange, $style.bold]">9 900 руб</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в год</p>
            <span :class="$style['no-more']">118 800</span>
            <span :class="[$style['present-price'], $style.bold]"
              >99 000 руб</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество предложений</p>
            <span :class="$style.regular">100</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество городов</p>
            <span :class="$style.regular">Неограничено</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Бесплатный период 14 дней</p>
            <img src="/images/reg/confirm.svg" alt="" />
          </div>
          <div :class="$style.cell">
            <button :class="$style.buy" @click="resData(3)">Выбрать</button>
          </div>
        </div>
      </slide>
      <slide :index="3">
        <div :class="$style.column">
          <div :class="[$style.cell, $style.heading]">
            <p :class="$style.title">Start</p>
            <span :class="[$style.orange, $style.subtitle]"
              >Подойдет для небольшого бизнеса</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в месяц</p>
            <span :class="[$style.orange, $style.bold]">2 900 руб</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в год</p>
            <span :class="$style['no-more']">34 800</span>
            <span :class="[$style['present-price'], $style.bold]"
              >29 000 руб</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество предложений</p>
            <span :class="$style.regular">5</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество городов</p>
            <span :class="$style.regular">1</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Бесплатный период 14 дней</p>
            <img src="/images/reg/confirm.svg" alt="" />
          </div>
          <div :class="$style.cell">
            <button :class="$style.buy" @click="resData(1)">Выбрать</button>
          </div>
        </div>
      </slide>
      <slide :index="4">
        <div :class="$style.column">
          <div :class="[$style.cell, $style.heading]">
            <p :class="$style.title">Scale</p>
            <span :class="[$style.orange, $style.subtitle]"
              >Увереность в каждом предложении</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в месяц</p>
            <span :class="[$style.orange, $style.bold]">4 900 руб</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в год</p>
            <span :class="$style['no-more']">58 800</span>
            <span :class="[$style['present-price'], $style.bold]"
              >49 000 руб</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество предложений</p>
            <span :class="$style.regular">10</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество городов</p>
            <span :class="$style.regular">1</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Бесплатный период 14 дней</p>
            <img src="/images/reg/confirm.svg" alt="" />
          </div>
          <div :class="$style.cell">
            <button :class="$style.buy" @click="resData(2)">Выбрать</button>
          </div>
        </div>
      </slide>
      <slide :index="5">
        <div :class="$style.column">
          <div :class="[$style.cell, $style.heading]">
            <p :class="$style.title">Pro</p>
            <span :class="[$style.orange, $style.subtitle]"
              >Есть где размахнуться</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в месяц</p>
            <span :class="[$style.orange, $style.bold]">9 900 руб</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Стоимость в год</p>
            <span :class="$style['no-more']">118 800</span>
            <span :class="[$style['present-price'], $style.bold]"
              >99 000 руб</span
            >
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество предложений</p>
            <span :class="$style.regular">100</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Количество городов</p>
            <span :class="$style.regular">Неограничено</span>
          </div>
          <div :class="$style.cell">
            <p :class="$style.gray">Бесплатный период 14 дней</p>
            <img src="/images/reg/confirm.svg" alt="" />
          </div>
          <div :class="$style.cell">
            <button :class="$style.buy" @click="resData(3)">Выбрать</button>
          </div>
        </div>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import '~/assets/scss/reg-widgets.scss'
export default {
  methods: {
    resData(index) {
      this.$emit('resData', index)
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.slider {
  width: 300px !important;
  padding-left: 15px;
  padding-right: 15px;
}

.tarif_mobile {
  width: 100%;
  background: #fff;
  height: 690px;
  border-radius: 30px;
  padding-top: 30px;
}
.header,
.gray {
  text-align: center;
}
.header {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: $baseBlack;
}
.promise {
  display: block;
  margin: auto;
  margin-top: 8px;
}
.gray {
  color: $baseGray;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  margin-bottom: 0;
}

.slider {
  padding: 0 17px;
}

.column {
  border: 1.5px solid $baseOrange;
  box-sizing: border-box;
  border-radius: 16px;
  height: 520px;
}

.heading {
  height: 90px;
}

.cell {
  text-align: center;
  padding: 10px 0 12px 0;
  border-bottom: 0.5px solid #eaecf1;
  width: 92%;
  margin: auto;
  &:last-child {
    border-bottom: none;
  }
}

.orange {
  color: $baseOrange;
}

.bold {
  font-weight: 800;
}

.title {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 10px;
}

.subtitle {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  width: 180px;
  display: block;
  margin: auto;
}

.no-more {
  position: relative;
  color: $baseGray;
  &:before {
    content: '';
    border-bottom: 1px solid $baseGray;
    position: absolute;
    left: 105px;
    width: 20%;
    height: 60%;
    transform: rotate(-12deg);
  }
}

.no-more,
.present-price {
  display: block;
}

.present-price {
  color: $baseGreen;
}

.buy {
  @include button-next-outline;

  width: 100%;
  height: 50px;
  margin: auto;
  margin-top: 20px;
  position: relative;
  &:hover {
    &::after {
      opacity: 1;
    }
  }
  &::after {
    position: absolute;
    transition: ease 0.2s;
    opacity: 0;
    width: 100%;
    height: 100%;
    background: $baseOrange;
    color: #fff;
    content: '0 руб первые 14 дней';
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    top: 0;
    left: 0;
  }
}
</style>
