<template>
  <div :class="$style.table">
    <div :class="$style.table_heading">
      <div :class="[$style.left, $style.heading]">
        <p>Выберите тариф</p>
        <img src="/images/reg/adv.svg" alt="" />
        <span>Первое списание 06.07.2021</span>
      </div>
      <div :class="$style.left">
        <span :class="$style.gray">Стоимость в месяц</span>
      </div>
      <div :class="$style.left">
        <span :class="$style.gray">Стоимость за год</span>
      </div>
      <div :class="$style.left">
        <span :class="$style.gray">Количество предложений</span>
      </div>
      <div :class="$style.left">
        <span :class="$style.gray">Количество городов</span>
      </div>
      <div :class="$style.left">
        <span :class="$style.gray">Бесплатный период 14 дней</span>
      </div>
      <div :class="$style.left"></div>
    </div>
    <div :class="$style.column">
      <div :class="[$style.heading, $style.header_cols]">
        <p>Start</p>
        <span :class="$style.gray">Подойдет для небольшого бизнеса</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.orange">2 900 руб</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style['no-more']">34 800</span>
        <span :class="$style['present-price']">29 000 руб</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.regular">5</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.regular">1</span>
      </div>
      <div :class="$style.cell">
        <img src="/images/reg/confirm.svg" alt="" />
      </div>
      <div :class="$style.cell">
        <button :class="$style.buy" @click="resData(1)">Выбрать</button>
      </div>
    </div>
    <div :class="$style.column">
      <div :class="[$style.heading, $style.header_cols]">
        <p>Scale</p>
        <span :class="$style.gray">Увереность в каждом предложении</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.orange">4 900 руб</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style['no-more']">58 800</span>
        <span :class="$style['present-price']">49 000 руб</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.regular">10</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.regular">1</span>
      </div>
      <div :class="$style.cell">
        <img src="/images/reg/confirm.svg" alt="" />
      </div>
      <div :class="$style.cell">
        <button :class="$style.buy" @click="resData(2)">Выбрать</button>
      </div>
    </div>
    <div :class="$style.column">
      <div :class="[$style.heading, $style.header_cols]">
        <p>Pro</p>
        <span :class="$style.gray">Есть где размахнуться</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.orange">9 900 руб</span>
      </div>

      <div :class="$style.cell">
        <span :class="$style['no-more']">118 800</span>
        <span :class="$style['present-price']">99 000 руб</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.regular">100</span>
      </div>
      <div :class="$style.cell">
        <span :class="$style.regular">Неограничено</span>
      </div>
      <div :class="$style.cell">
        <img src="/images/reg/confirm.svg" alt="" />
      </div>
      <div :class="$style.cell">
        <button :class="$style.buy" @click="resData(3)">Выбрать</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TarifTable',
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

.table {
  margin-top: 46px;
  display: flex;
  width: 957px;
  height: 540px;
  background-color: #fff;
  border-radius: 30px;
  justify-content: space-between;
  padding: 30px 40px;
}

.table_heading {
  width: 34%;
}

.column {
  width: 22%;
  box-sizing: border-box;
  transition: 0.3 ease;
  position: relative;
  z-index: 3;

  &::after {
    opacity: 0;
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    content: '';
    border-radius: 16px;
    top: 0;
    left: 0;
    border: 1.5px solid $baseOrange;
    transition: opacity 0.3s ease;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
}

.cell,
.left {
  width: 100%;
  height: 56px;
  border-bottom: 0.5px solid #eaecf1;
  &:last-child {
    border-bottom: none;
  }
}

.left {
  padding: 20px 0;
  .gray {
    color: $baseGray;
    display: block;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
  }
}

.header_cols {
  p,
  span {
    text-align: center;
  }
}

.no-more {
  position: relative;
  color: $baseGray;
  &:before {
    content: '';
    border-bottom: 1px solid $baseGray;
    position: absolute;
    left: 65px;
    width: 35%;
    height: 60%;
    transform: rotate(-12deg);
  }
}

.present-price {
  font-weight: 800;
  font-size: 20px;
  line-height: 23px;
  color: $baseGreen;
}

.regular {
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  padding-top: 19px;
}

.cell {
  box-sizing: border-box;
  span {
    display: block;
  }

  img {
    display: block;
    margin: auto;
    padding-top: 16px;
  }
  p,
  span {
    text-align: center;
  }

  .orange {
    display: block;
    color: $baseOrange;
    font-weight: 800;
    font-size: 20px;
    padding-top: 11px;
  }
}

.heading {
  height: 110px;
  padding-top: 20px;
  border-bottom: 0.5px solid #eaecf1;
  p {
    color: $baseBlack;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
  }

  img {
    margin-top: 8px;
  }

  span {
    display: block;
    color: $baseGray;
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 13px;
  }
  .gray {
    margin-top: 12px;
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
  }
}

.buy {
  @include button-next-outline;

  width: 180px;
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
