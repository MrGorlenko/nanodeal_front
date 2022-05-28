<template>
  <Smartphone>
    <div :class="$style.company">
      <img :class="$style.logo" :src="logo" alt="" />
      <span :class="$style['logo_name']">
        {{ companyName }}
      </span>
    </div>
    <img :class="$style.img" :src="image" alt="" />
    <p :class="$style.label">
      {{ description }}
    </p>

    <div :class="$style.todo">
      <div class="d-flex">
        <img src="~/static/images/smartphone/gift.svg" alt="" />
        <p :class="$style.pink">
          {{ reward }}
        </p>
      </div>
    </div>

    <p :class="$style.label">Сроки проведения предложения</p>

    <div :class="$style.todo">
      <div class="d-flex">
        <img src="~/static/images/smartphone/clock.svg" alt="" />
        <p>c {{ from_date }} до {{ to_date }}</p>
      </div>
    </div>

    <p :class="$style.label">Условия получения награды</p>

    <div :class="$style.todo">
      <ul :class="$style.list">
        <li v-for="(condition, index) in conditions" :key="index">
          <span>{{ condition }}</span>
        </li>
      </ul>
    </div>

    <p :class="$style.label">Адрес предложения</p>

    <ul :class="[$style.todo, $style.places]">
      <li v-for="(place, index) in places" :key="index" class="d-flex">
        <img src="~/static/images/smartphone/gps.svg" alt="" />
        <p>
          {{ place.address }}
        </p>
      </li>

      <p :class="$style.link">Показать на карте</p>
    </ul>

    <p :class="$style.label">Комментарий к задаче</p>

    <div :class="$style.todo">
      <ul :class="$style.activity">
        <li v-if="comment !== ''">
          {{ comment }}
        </li>
        <li v-else>Отсутствует</li>
      </ul>
    </div>
  </Smartphone>
</template>

<script>
import Smartphone from '~/components/widgets/Smartphone.vue'
import setDateLabel from '~/mixins/setDateLabel'
export default {
  components: {
    Smartphone,
  },
  mixins: [setDateLabel],
  props: {
    companyName: {
      default: '',
      type: String,
    },
    logo: {
      default: '',
      type: String,
    },
    description: {
      default: '',
      type: String,
    },
    reward: {
      default: '',
      type: String,
    },
    image: {
      default: '',
      type: String,
    },
    fromDate: {
      default: '',
      type: String,
    },
    toDate: {
      default: '',
      type: String,
    },
    conditions: {
      default: () => [],
      type: Array,
    },
    places: {
      default: () => [],
      type: Array,
    },
    comment: {
      default: '',
      type: String,
    },
  },
  computed: {
    from_date() {
      return this.setDateLabel(
        new Date(this.fromDate).getFullYear() +
          '-' +
          this.setFormat(new Date(this.fromDate).getMonth() + 1) +
          '-' +
          this.setFormat(new Date(this.fromDate).getDate())
      )
    },
    to_date() {
      return this.setDateLabel(
        new Date(this.toDate).getFullYear() +
          '-' +
          this.setFormat(new Date(this.toDate).getMonth() + 1) +
          '-' +
          this.setFormat(new Date(this.toDate).getDate())
      )
    },
  },
  methods: {
    setFormat(value) {
      if (!String(value)[1]) return `0${value}`
      return value
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.logo_name {
  font-weight: bold;
  font-size: 11.5597px;
  line-height: 14px;
  color: $baseBlack;
}

.logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.company {
  height: 30px;
}

.img {
  width: 100%;
  border-radius: 16px;
}

.label {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: $baseBlack;
  margin-top: 16.5px;
}

.todo {
  display: flex;
  padding-bottom: 16px;
  border-bottom: 0.412848px solid $orderGray;
  flex-wrap: wrap;

  &:last-child {
    border-bottom: none;
  }
  img {
    margin-right: 9px;
  }

  p {
    font-size: 11.5597px;
    line-height: 14px;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
  }

  span {
    text-align: justify;
  }

  .pink {
    color: $basePink;
  }
}

.places {
  padding-left: 0;
  list-style-type: none;
  li {
    margin-bottom: 5px;
  }
}

.list {
  color: $basePink;
  padding-left: 0;
  padding-left: 20px;
  line-height: 14px;
  span {
    color: $baseBlack;
    font-weight: 600;
    font-weight: bold;
    font-size: 11.5597px;
  }
}

.link {
  color: $basePink;
  font-size: 11.5597px;
  line-height: 14px;
  margin-top: 0;
  margin-bottom: 0;
  font-weight: bold;
  text-decoration: none;
  display: block;
  width: 100%;
  margin-top: 11px;
  padding-left: 25px;
  &:hover {
    text-decoration: none;
  }
}

.activity {
  font-weight: 600;
  font-size: 11.5597px;
  line-height: 14px;
  color: $baseBlack;
  list-style-type: none;
  padding-left: 15px;

  li {
    position: relative;

    &:before {
      position: absolute;
      content: '–';
      top: 0;
      left: -10px;
    }
  }
}
</style>
