<template>
  <Base>
    <h3 class="app_header">Статистика</h3>
    <div :class="$style['offer-switcher']" @click="taskModal">
      <span>Отображать:</span>
      <p>
        {{
          selected_offer_uid === 'Все предложения'
            ? selected_offer_uid
            : selected_offer_title
        }}
      </p>
    </div>
    <hr />

    <div :class="$style.buttons">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        :class="[
          $style.button,
          button === active ? $style['button_active'] : '',
        ]"
        @click="switchButton(button)"
      >
        {{ button }}
      </button>
    </div>
    <div :class="$style.wrapper">
      <div :class="$style.views">
        <h3 :class="$style['graph-title']">Просмотры предложения</h3>
        <lineGraph
          v-if="loaded.views"
          ref="line"
          :data="statistics.views.data"
          :labels="statistics.views.labels"
        />
        <Loader v-else />
      </div>
      <div :class="$style.requests">
        <h3 :class="$style['graph-title']">Заявки на исполнение</h3>
        <div :class="$style.char">
          <!-- v-if="loaded.request" -->
          <barChart
            v-if="loaded.requests"
            ref="requests"
            :data="statistics.requests.data"
            :labels="statistics.requests.labels"
            :height="200"
          />
          <Loader v-else />
        </div>
      </div>

      <div :class="$style.pies">
        <div :class="$style.gender">
          <h3 :class="$style['pie-header']">Пол</h3>
          <template v-if="loaded.gender">
            <pieChart
              ref="gender"
              :data="statistics.gender.data"
              :labels="statistics.gender.labels"
              :colors="gender_colors"
            />
            <div :class="$style.legend">
              <div
                v-for="(label, index) in statistics.gender.labels"
                :key="label"
              >
                <div
                  :style="{ backgroundColor: gender_colors[index] }"
                  :class="$style['legend-color']"
                ></div>
                <p>
                  {{ label === 'male' ? 'Мужчины' : 'Женщины' }}
                  {{ String(statistics.gender.data[index]).slice(0, 4) }} %
                </p>
              </div>
            </div>
          </template>
          <Loader v-else />
        </div>
        <div :class="$style.age">
          <h3 :class="$style['pie-header']">Возраст</h3>
          <template v-if="loaded.age">
            <pieChart
              ref="age"
              :data="statistics.age.data"
              :labels="statistics.age.labels"
              :colors="ages_colors"
            />
            <div :class="$style.legend">
              <div v-for="(label, index) in statistics.age.labels" :key="label">
                <div
                  :style="{ backgroundColor: ages_colors[index] }"
                  :class="$style['legend-color']"
                ></div>
                <p>
                  {{ label }}
                  {{ String(statistics.age.data[index]).slice(0, 4) }} %
                </p>
              </div>
            </div>
          </template>
          <Loader v-else />
        </div>
      </div>

      <div :class="$style.time">
        <h3>
          Среднее время изучения <br />
          предложения
        </h3>
        <div class="d-flex">
          <img src="~/static/images/icons/clock.svg" alt="" />
          <p>4:16</p>
        </div>
      </div>
      <div :class="$style.categories">
        <h3>
          Категория вовлеченных <br />
          исполнителей
        </h3>
        <div
          v-for="category in categories.slice(0, slice_categories)"
          :key="category.id"
          :class="$style.category"
        >
          <img :class="$style['category-icon']" :src="category.img" alt="" />
          <p :class="$style['category-label']">{{ category.title }}</p>
          <span>{{ category.value }}%</span>
        </div>
        <button
          v-if="show_slice"
          :class="$style['button-categories']"
          @click="showAllCategories"
        >
          Показать еще
        </button>
        <button
          v-else
          :class="$style['button-categories']"
          @click="showAllCategories"
        >
          Свернуть
        </button>
      </div>
    </div>
    <Task @selectOffer="selectOffer" />
    <Calendar @setTime="setTime" />
  </Base>
</template>

<script>
import Base from '~/components/Base.vue'
import Task from '~/components/modals/statistics/Task'
import Calendar from '~/components/modals/statistics/Calendar'
import lineGraph from '~/components/widgets/LineGraph'
import pieChart from '~/components/widgets/PieChart'
import barChart from '~/components/widgets/BarChart'
import Loader from '~/components/widgets/Loader'
export default {
  components: {
    Base,
    Task,
    lineGraph,
    pieChart,
    barChart,
    Calendar,
    Loader,
  },
  data() {
    return {
      statistics: {
        views: { labels: [], data: [] },
        requests: { labels: [], data: [] },
        age: { labels: [], data: [] },
        gender: { labels: [], data: [] },
      },
      views_labels: [],
      views_data: [],
      request_labels: [],
      request_data: [],
      ages_data: [],
      ages_labels: [],
      ages_colors: ['#FC5A8B', '#FFD66B', '#1FD1EA', '#FE8862', '#845AFC'],
      gender_data: [],
      gender_labels: ['Мужчины', 'Женщины'],
      gender_colors: ['#FC5A8B', '#FFD66B'],
      test: { labels: [], data: [] },
      views: [{ x: [], y: [], type: '' }],
      selected_offer_title: 'Все предложения',
      selected_offer_uid: '',
      buttons: ['24 часа', 'Неделя', 'Месяц', 'Выберите период'],
      active: '24 часа',
      categories: [],
      show_slice: true,
      slice_categories: 10,
      current_time: this.last24hours,
      loaded: {
        requests: false,
        views: false,
        age: false,
        gender: false,
      },
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/access_token']
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
    period() {
      return this.last24hours
    },
  },
  created() {
    this.updateStatistics(this.last24hours)
  },
  mounted() {
    // CATEGORIES
    this.$axios
      .get('/api/v1/statistic/clients_categories/', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        this.categories = res.data
      })
    // CATEGORIES
  },
  methods: {
    setTime(value) {
      this.current_time = value
      this.updateStatistics(value)
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
    switchButton(button) {
      this.active = button
      if (button === '24 часа') {
        this.current_time = this.last24hours
        this.updateStatistics(this.last24hours)
      }
      if (button === 'Неделя') {
        this.current_time = this.weekPeriod
        this.updateStatistics(this.weekPeriod)
      }
      if (button === 'Месяц') {
        this.current_time = this.monthPeriod
        this.updateStatistics(this.monthPeriod)
      }
      if (button === 'Выберите период') this.calendarModal()
    },
    requestStat(type, time) {
      const path = `http://31.172.64.228:8000/api/v1/statistic/${type}/${time}`
      this.loaded[type] = false
      this.$axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.statistics[type].labels = this.graphicData(res.data).labels
          this.statistics[type].data = this.graphicData(res.data).data
          // if (type === 'views') {
          //   this.views_labels = this.graphicData(res.data).labels
          //   this.views_data = this.graphicData(res.data).data
          // }
          // if (type === 'age') {
          //   this.ages_labels = this.graphicData(res.data).labels
          //   this.ages_data = this.graphicData(res.data).data
          // }
          // if (type === 'gender') {
          //   this.gender_labels = this.graphicData(res.data).labels
          //   this.gender_data = this.graphicData(res.data).data
          // }
          // if (type === 'active_tasks') {
          //   this.request_labels = this.graphicData(res.data).labels
          //   this.request_data = this.graphicData(res.data).data
          // }
        })
        .then(() => {
          this.loaded[type] = true
          this.$refs[type].rerender()
          // this.loaded[type] = true
          // if (type === 'views') this.$refs.line.rerender()
          // if (type === 'age') this.$refs.ages.rerender()
          // if (type === 'gender') this.$refs.gender.rerender()
          // if (type === 'active_tasks') this.$refs.requests.rerender()
        })
      // .then(() => {
      //   this.loaded[type] = true
      // })
    },
    requestTaskStat(type, time, task) {
      const path = `http://31.172.64.228:8000/api/v1/statistic/${type}/${time}/task/${task}`
      this.$axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.statistics[type].labels = this.graphicData(res.data).labels
          this.statistics[type].data = this.graphicData(res.data).data
          // if (type === 'views') {
          //   this.views_labels = this.graphicData(res.data).labels
          //   this.views_data = this.graphicData(res.data).data
          // }
          // if (type === 'age') {
          //   this.ages_labels = this.graphicData(res.data).labels
          //   this.ages_data = this.graphicData(res.data).data
          // }
          // if (type === 'gender') {
          //   this.gender_labels = this.graphicData(res.data).labels
          //   this.gender_data = this.graphicData(res.data).data
          // }
          // if (type === 'active_tasks') {
          //   this.request_labels = this.graphicData(res.data).labels
          //   this.request_data = this.graphicData(res.data).data
          // }
        })
        .then(() => {
          this.$refs[type].rerender()
          // if (type === 'views') this.$refs.line.rerender()
          // if (type === 'age') this.$refs.ages.rerender()
          // if (type === 'gender') this.$refs.gender.rerender()
          // if (type === 'active_tasks') this.$refs.requests.rerender()
        })
    },
    taskModal() {
      this.$modal.show('task-modal')
    },
    calendarModal() {
      this.$modal.show('calendar-modal')
    },
    selectOffer(offer) {
      this.selected_offer_title = offer.title
      this.selected_offer_uid = offer.uid
      if (this.selected_offer_uid === 'Все предложения') {
        // this.updateStatistics(this.current_time)
        this.active === '24 часа'
          ? this.updateStatistics(this.last24hours)
          : this.updateStatistics(this.current_time)
      } else {
        this.active === '24 часа'
          ? this.updateTaskStatistics(this.last24hours, this.selected_offer_uid)
          : this.updateTaskStatistics(
              this.current_time,
              this.selected_offer_uid
            )
      }
    },

    async updateStatistics(period) {
      // this.loaded.request = false
      // this.loaded.views = await false
      await this.requestStat('views', period)
      // this.loaded.views = true
      await this.requestStat('age', period)
      await this.requestStat('requests', period)
      await this.requestStat('gender', period)
      // this.loaded.request = true
    },

    updateTaskStatistics(period, task) {
      this.requestTaskStat('views', period, task)
      this.requestTaskStat('age', period, task)
      this.requestTaskStat('requests', period, task)
      this.requestTaskStat('gender', period, task)
    },

    showAllCategories() {
      if (this.show_slice) {
        this.slice_categories = 19
        this.show_slice = false
      } else {
        this.slice_categories = 10
        this.show_slice = true
      }
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.offer-switcher {
  border: 1px solid $baseOrange;
  width: 250px;
  border-radius: 16px;
  padding: 8px 15px;
  background-color: #fff;
  margin-top: 20px;
  span {
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
  }
  p {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: $baseOrange;
  }
}

.wrapper {
  position: relative;
}
.requests,
.views,
.gender,
.ages {
  height: 300px;
  border-radius: 16px;
  overflow: auto;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  margin-left: 18px;
  margin-top: 25px;
  & > div {
    display: flex;
    align-items: center;
    margin-right: 18px;
    p {
      margin-bottom: 0;
      margin-top: 0;
      color: $baseBlack;
      font-weight: 600;
    }
  }
}

.legend-color {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.pies {
  width: 66%;
  display: flex;
  justify-content: space-between;
  .gender,
  .age {
    background-color: #fff;
    height: auto;
    width: 49%;
    padding-top: 46px;
    padding-left: 20px;
    padding-bottom: 35px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    canvas {
      width: 180px !important;
      height: 180px !important;
    }
    .pie-header {
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;
      color: $baseBlack;
      position: absolute;
      left: 20px;
      top: 25px;
    }
  }
}

.requests {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .char {
    width: 100%;
    canvas {
      aspect-ratio: 467 / 924;
    }
  }
}

.views,
.requests {
  background-color: #fff;
  height: auto;
  width: 66%;
  padding-top: 25px;
  padding-left: 20px;
  margin-bottom: 20px;
}

.graph-title {
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: $baseBlack;
}
.time,
.categories {
  padding: 20px;
  border-radius: 16px;
  height: fit-content;
  h3 {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 30px;
  }
}
.time {
  width: 32%;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #fff;
  p {
    font-size: 36px;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 13px;
  }
}
.categories {
  background-color: #fff;
  width: 32%;
  position: absolute;
  right: 0;
  top: 185px;
}
.buttons {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}

.button {
  background: #fff;
  padding: 8px 10px;
  &:first-child {
    border-radius: 6px 0px 0px 6px;
  }
  &:last-child {
    border-radius: 0px 6px 6px 0px;
  }
  &_active {
    background-color: $baseOrange;
    color: #fff;
  }
}

.category {
  display: flex;
  position: relative;
  align-items: center;

  height: 38px;
  margin-bottom: 7px;
  p {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 18px;
  }
  p,
  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
  }
  span {
    position: absolute;
    right: 0;
  }
}

.button-categories {
  @include button-send;
  padding: 9.5px 65.5px;
  margin: auto;
}

.category-icon {
  width: 38px;
  height: 38px;
  object-fit: contain;
}
</style>
