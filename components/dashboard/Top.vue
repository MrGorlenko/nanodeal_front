<template>
  <div :class="$style.top">
    <h2 :class="$style.header">Добрый день, {{ data.profile.first_name }}!</h2>
    <p :class="$style.date">
      Сегодня {{ today_day }} {{ monthes[today_month - 1] }}
    </p>
    <div :class="$style.wrapper">
      <div :class="$style.cell">
        <span>{{ data.clients }}</span>
        <p>Клиентов</p>
      </div>
      <div :class="$style.cell">
        <span>{{ data.newBid }}</span>
        <p>Новых предложений</p>
      </div>
      <div :class="$style.cell">
        <span>{{ data.onCheck }}</span>
        <p>Предложений на проверке</p>
      </div>
      <div :class="$style.cell">
        <span>{{ data.close }}</span>
        <p>Закрытых предложений</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      today_day: new Date().getDate(),
      today_month: new Date().getMonth(),
      monthes: [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
      ],
    }
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.top {
  width: 100%;
  padding: 25px;
  background: #fff;
  border-radius: 16px;
  margin-bottom: 20px;
}

.header {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: $baseBlack;
}

.date {
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
}

.wrapper {
  display: flex;
}

.cell {
  width: 13%;

  padding-top: 18px;
  padding-left: 20px;
  padding-bottom: 15px;
  border-radius: 16px;
  margin-right: 33px;
  &:first-child {
    background: rgba($color: $baseBlue, $alpha: 0.17);
    span {
      color: $baseBlue;
    }
  }
  &:nth-child(2) {
    background: rgba($color: $baseOrange, $alpha: 0.17);
    span {
      color: $baseOrange;
    }
  }
  &:nth-child(3) {
    background: rgba($color: $baseRed, $alpha: 0.17);
    span {
      color: $baseRed;
    }
  }
  &:nth-child(4) {
    background: rgba($color: $baseGreen, $alpha: 0.17);
    span {
      color: $baseGreen;
    }
  }
  span {
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
  }
  p {
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
    margin-top: 0;
    margin-bottom: 0;
  }
}

@media (max-width: $mobile) {
  .wrapper {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .cell {
    width: 48%;
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
