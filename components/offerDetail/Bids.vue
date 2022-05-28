<template>
  <div :class="$style['exec-process']">
    <h3 :class="$style.header">Процесс выполнения</h3>
    <div :class="$style.buttons">
      <button
        v-for="category in categories"
        :key="category"
        :class="[
          $style.button,
          category === active
            ? $style['button-active']
            : $style['button-passive'],
        ]"
        @click="setActive(category)"
      >
        {{ category }}
      </button>
    </div>
    <offer-table
      v-if="active === 'Все заявки'"
      :headers="[
        'Имя',
        'Подписчики',
        'Статус',
        'Категория',
        'Время на подтверждение',
        'Действие',
      ]"
      :lines="tables.all"
    />
    <offer-table
      v-if="active === 'Отклоненные'"
      :headers="['Имя', 'Статус', 'Причина отклонения']"
      :lines="tables.refused"
    />
  </div>
</template>

<script>
import OfferTable from '~/components/widgets/OfferTable.vue'
export default {
  components: { OfferTable },
  data() {
    return {
      categories: ['Все заявки', 'Отклоненные'],
      active: 'Все заявки',
      tables: {
        all: [
          {
            name: 'Майкл Джексон',
            avatar: '',
            insta: 'michaelJaxon',
            subscribers: '12894',
            status: 'status',
            categories: 'cats',
            timeToConfirm: '3 дня',
            accept: true,
          },
          {
            name: 'Бред Джексон',
            avatar: '',
            insta: 'michaelJaxon',
            subscribers: '2834',
            status: ' ',
            categories: ' ',
            timeToConfirm: '2 дня',
            accept: true,
          },
          {
            name: 'Майкл Бенсон',
            avatar: '',
            insta: 'michaelJaxon',
            subscribers: '44523',
            status: ' ',
            categories: ' ',
            timeToConfirm: '12 часов',
            accept: true,
          },
        ],
        refused: [
          {
            name: 'Майкл Джексон',
            avatar: '',
            status: ' ',
            insta: 'michaelJaxon',
            refuseReason: 'Давай по новой Миша всё хуйня',
            message: true,
          },
          {
            name: 'Джеймс Бонд',
            avatar: '',
            status: ' ',
            insta: 'Bondddd',
            refuseReason: ' ',
            message: true,
          },
        ],
      },
    }
  },
  methods: {
    setActive(cat) {
      this.active = cat
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.exec-process {
  background-color: #fff;
  box-shadow: 0px 0.989583px 2.96875px rgba(233, 216, 207, 0.3);
  border-radius: 16px;
  width: 100%;
  min-height: 65vh;
  padding: 30px;
}

.header {
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
}

.buttons {
  display: flex;
  width: 120px;
}

.button {
  padding: 11px 12px;
  background: none;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
}

.button-active {
  color: #000;
  border-bottom: 3px solid $baseOrange;
}

.button-passive {
  color: $baseGray;
}
</style>
