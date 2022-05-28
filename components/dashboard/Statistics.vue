<template>
  <div :class="$style.statistics">
    <p>
      <select
        v-model="current"
        :class="[$style.select, $style['select-black']]"
        @change="changeOption"
      >
        <option value="views">Просмотры</option>
        <option value="requests">Заявки</option>
        <option value="age">Возраст</option>
      </select>
    </p>
    <p>
      <select
        v-model="task"
        :class="[$style.select, $style['select-orange']]"
        @change="changeOption"
      >
        <option value="all">Все активные предложения</option>
        <option v-for="offer in offers" :key="offer.uid" :value="offer.uid">
          {{ offer.title }}
        </option>
      </select>
    </p>

    <div :class="$style.switcher">
      <button :class="$style.minus" @click="setStep('-')">
        <img src="~/static/images/dashboard/left.svg" alt="" />
      </button>
      <div>{{ Period }}</div>
      <button :class="$style.plue" @click="setStep('+')">
        <img src="~/static/images/dashboard/right.svg" alt="" />
      </button>
    </div>

    <LineGraph v-if="loaded" ref="line" :data="data" :labels="labels" />
    <Loader v-else />
  </div>
</template>

<script>
import LineGraph from '~/components/widgets/LineGraph.vue'
import Loader from '~/components/widgets/Loader.vue'
export default {
  components: {
    LineGraph,
    Loader,
  },
  data() {
    return {
      current: 'views',
      task: 'all',
      step: 0,
      time: '',
      data: [],
      labels: [],
      loaded: false,
    }
  },

  computed: {
    offers() {
      return this.$store.getters['offer/receivedOffers'].filter((offer) => {
        return offer.status === 'Активные'
      })
    },
    last24hours() {
      const ourDate = new Date()
      const pastDate = ourDate.getDate() - 1
      ourDate.setDate(pastDate)
      return ourDate.toISOString().split('T')[0]
    },
    weekPeriod() {
      const ourDate = new Date()
      const pastDate = ourDate.getDate() - 7
      ourDate.setDate(pastDate)
      const today = new Date().toISOString().split('T')[0]
      return today + '_' + ourDate.toISOString().split('T')[0] + '_'
    },
    monthPeriod() {
      const ourDate = new Date()
      const pastDate = ourDate.getDate() - 30
      ourDate.setDate(pastDate)
      const today = new Date().toISOString().split('T')[0]
      return today + '_' + ourDate.toISOString().split('T')[0]
    },
    accessToken() {
      return this.$store.getters['auth/access_token']
    },

    Period() {
      switch (this.step) {
        case 1: {
          return 'За эту неделю'
        }
        case 2: {
          return 'За этот месяц'
        }
        default: {
          return '24 часа'
        }
      }
    },
  },
  created() {
    this.requestStat('views', this.last24hours)
    this.time = this.last24hours
  },
  methods: {
    setStep(dir) {
      if (dir === '+' && this.step === 3) this.step = 0
      if (dir === '-' && this.step === 0) this.step = 3
      if (dir === '+') this.step++
      if (dir === '-') this.step--

      switch (this.Period) {
        case 'За эту неделю': {
          this.time = this.weekPeriod
          break
        }
        case 'За этот месяц': {
          this.time = this.monthPeriod
          break
        }
        case '24 часа': {
          this.time = this.last24hours
          break
        }
      }
      this.changeOption()
    },
    requestStat(type, time, task) {
      this.loaded = false
      let path
      this.task === 'all'
        ? (path = `http://31.172.64.228:8000/api/v1/statistic/${type}/${time}/`)
        : (path = `http://31.172.64.228:8000/api/v1/statistic/${type}/${time}/task/${task}`)
      this.$axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.data = this.graphicData(res.data).data
          this.labels = this.graphicData(res.data).labels
        })
        .then(() => {
          this.loaded = true
          this.$refs.line.rerender()
        })
    },
    graphicData(obj) {
      const innerLabels = []
      const innerData = []
      for (const [key, val] of Object.entries(obj)) {
        innerLabels.push(key)
        innerData.push(val)
      }
      return { labels: innerLabels, data: innerData }
    },
    changeOption() {
      this.requestStat(this.current, this.time, this.task)
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.statistics {
  grid-area: Statistics;
  background: #fff;
  border-radius: 16px;
  padding: 20px 25px;
  position: relative;
}

.select {
  border: none;
  font-weight: bold;
}

.select-black {
  font-size: 18px;
  line-height: 21px;
  color: $baseBlack;
}

.select-orange {
  font-size: 14px;
  line-height: 16px;
  color: $baseOrange;
}

.switcher {
  border: 1px solid $baseGray;
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 6px;
  width: 21%;
  div {
    flex-grow: 1;
    text-align: center;
  }
  button {
    border: none;
    background: none;
    width: 30px;
    &:first-child {
      border-right: 1px solid $baseGray;
    }
    &:last-child {
      border-left: 1px solid $baseGray;
    }
  }
}
</style>
