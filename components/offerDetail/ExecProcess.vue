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
      v-if="active === 'Ожидающие'"
      :headers="['Имя', 'Дата выполнения', 'Результат', 'Действие']"
      :lines="tables.waiters"
    />
    <offer-table
      v-if="active === 'Исполнители'"
      :headers="['Имя', 'Статус', 'Предложение принято']"
      :lines="tables.executors"
    />
    <offer-table
      v-if="active === 'Выполнили'"
      :headers="['Имя', 'Завершил задание', 'Статус']"
      :lines="tables.executed"
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
  components: {
    OfferTable,
  },
  data() {
    return {
      categories: ['Ожидающие', 'Исполнители', 'Выполнили', 'Отклоненные'],
      active: 'Исполнители',
      tables: {
        executors: [
          {
            name: 'Майкл Джексон',
            avatar: '',
            status: ' ',
            insta: 'michaelJaxon',
            time: '28 апреля 2021, 14:22',
            message: true,
          },
          {
            name: 'Джеймс Бонд',
            avatar: '',
            status: ' ',
            insta: 'Bondddd',
            time: '30 марта 2021, 4:20',
            message: true,
          },
          {
            name: 'Карабас Барабас',
            avatar: '',
            status: ' ',
            insta: 'KaraBarabas',
            time: '3 июня 2021, 10:02',
            message: true,
          },
          {
            name: 'Пинокио',
            avatar: '',
            status: ' ',
            insta: 'Pinokio',
            time: '30 марта 2021, 09:45',
            message: true,
          },
        ],
        waiters: [
          {
            name: 'Майкл Джексон',
            avatar: '',
            status: '',
            insta: 'michaelJaxon',
            time: '28 апреля 2021, 14:22',
            result: 'watch',
            accept: true,
          },
          {
            name: 'Джеймс Бонд',
            avatar: '',
            status: '',
            insta: 'Bondddd',
            time: '30 марта 2021, 4:20',
            result: 'change',
            accept: true,
          },
          {
            name: 'Карабас Барабас',
            avatar: '',
            status: '',
            insta: 'KaraBarabas',
            time: '3 июня 2021, 10:02',
            result: 'watch',
            accept: true,
          },
          {
            name: 'Пинокио',
            avatar: '',
            status: '',
            insta: 'Pinokio',
            time: '30 марта 2021, 09:45',
            result: 'change',
            accept: true,
          },
        ],
        executed: [
          {
            name: 'Майкл Джексон',
            avatar: '',
            // status: ' ',
            insta: 'michaelJaxon',
            time: '28 апреля 2021, 14:22',
            exec: true,
          },
          {
            name: 'Джеймс Бонд',
            avatar: '',
            // status: ' ',
            insta: 'Bondddd',
            time: '30 марта 2021, 4:20',
            exec: false,
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
