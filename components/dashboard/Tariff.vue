<template>
  <div :class="$style.tariff">
    <h2 :class="$style.header">Тариф</h2>
    <div :class="$style['tariff-window']">
      <img :class="$style.logo" src="~/static/images/logo.svg" alt="" />
      <p :class="$style.current">{{ title }}</p>
      <div :class="$style.balance">
        <p :class="$style.top">Баланс:</p>
        <p :class="$style.bottom">850 000 руб</p>
      </div>
    </div>

    <div :class="$style.offers">
      <p :class="$style['gray-label']">Мои предложения</p>
      <div :class="[$style.cell, $style['cell-1']]">
        <span>2</span>
        <p>Осталось предложений</p>
      </div>
      <div :class="[$style.cell, $style['cell-2']]">
        <span>17</span>
        <p>Уже размещено</p>
      </div>
    </div>

    <CustomInput
      :class="$style.input"
      :label="'Город'"
      :value="'Москва'"
      :read-only="true"
    />
    <CustomInput
      :class="$style.input"
      :label="'Пакет'"
      :value="type"
      :read-only="true"
    />
    <CustomInput
      :class="$style.input"
      :label="'Дней осталось'"
      :value="daysRemain"
      :read-only="true"
    />
    <CustomInput
      :class="$style.input"
      :label="'Следующее списание'"
      :value="nextPayment"
      :read-only="true"
    />

    <button :class="$style['button-balance']">Пополнить баланс</button>
    <button :class="$style['button-change']">Изменить тариф</button>
  </div>
</template>

<script>
import CustomInput from '~/components/widgets/CustomInput'
export default {
  components: {
    CustomInput,
  },
  props: {
    title: {
      type: String,
      default: 'Scale',
    },
    type: {
      type: String,
      default: 'Пробный',
    },
    daysRemain: {
      type: String,
      default: '0',
    },
    nextPayment: {
      type: String,
      default: '',
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.tariff {
  grid-area: Tariff;
  background: #fff;
  border-radius: 16px;
  padding: 25px 20px;
  height: fit-content;
}

.header {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}

.tariff-window {
  background: url('~/static/images/dashboard/tarif-template-bg.svg');
  height: 170px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 16px;
  position: relative;
  margin-top: 20px;
}

.logo {
  top: 20px;
  right: 20px;
  width: 88px;
  height: 27px;
}

.current,
.balance,
.logo {
  position: absolute;
}

.current {
  left: 20px;
  bottom: 20px;
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;
  margin-bottom: 0;
  margin-top: 0;
  color: #fff;
}

.input {
  width: 100%;
  border: none;
  border-bottom: 0.5px solid $secondGray;
  margin-top: 14px;
  &:last-child {
    border-bottom: none;
  }
  img {
    display: none;
  }
}

.balance {
  right: 20px;
  bottom: 20px;
  p {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 600;
    color: #fff;
  }
}

.top {
  font-size: 13px;
  line-height: 15px;
}
.bottom {
  font-size: 18px;
  line-height: 21px;
}

.offers {
  display: grid;
  grid-template-areas: 'label label' 'cell1 cell2';
  grid-template-rows: 0.2fr 1.3fr;
  grid-template-columns: 1fr 1fr;
  gap: 17px;
  margin-top: 30px;
  padding-bottom: 15px;
  border-bottom: 0.5px solid $secondGray;
}

.cell-1 {
  grid-area: cell1;
  background: rgba($color: $baseOrange, $alpha: 0.17);
  span {
    color: $baseOrange;
  }
}

.cell-2 {
  grid-area: cell2;
  background: rgba($color: $baseGreen, $alpha: 0.17);
  span {
    color: $baseGreen;
  }
}

.cell {
  padding-top: 18px;
  padding-left: 20px;
  padding-bottom: 15px;
  border-radius: 16px;
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

.gray-label {
  grid-area: label;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: $baseGray;
  margin-bottom: 0;
}

.button-balance,
.button-change {
  width: 100%;
  height: 44px;
  font-size: 15px;
  font-weight: 600;
  line-height: 15px;
  text-align: center;
}

.button-balance {
  @include button-green-filled;
}

.button-change {
  @include button-gray;
}
</style>
