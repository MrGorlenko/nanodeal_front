<template>
  <div :class="$style.about">
    <div :class="$style.process">
      <h3 :class="$style.heading">Процесс выполнения</h3>
      <div :class="$style.cells">
        <div :class="[$style.cell, $style.executors]">
          <span>Исполнители</span>
          <p>2500</p>
        </div>
        <div :class="[$style.cell, $style.waiters]">
          <span>Ожидающие</span>
          <p>25</p>
        </div>
        <div :class="[$style.cell, $style.compliters]">
          <span>Выполнили</span>
          <p>250</p>
        </div>
        <div :class="[$style.cell, $style.refused]">
          <span>Отклоненные</span>
          <p>0</p>
        </div>
      </div>

      <hr />

      <div>
        <h4 :class="$style.subheading">Всего выполнено</h4>
        <div :class="$style['line-wrapper']">
          <span>{{ process.done }}/{{ process.overall }}</span>
          <div :class="$style.line">
            <div :class="$style.done" :style="'width: ' + doneWidth"></div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.bids">
      <h3 :class="$style.heading">Заявки</h3>
      <div :class="$style.cells">
        <div :class="[$style.cell, $style['new-request']]">
          <span>Новые заявки</span>
          <p>55</p>
        </div>
        <div :class="[$style.cell, $style.refused]">
          <span>Всего</span>
          <p>5 250</p>
        </div>
      </div>
    </div>
    <div :class="$style.messages">
      <h3 :class="$style.heading">Сообщения</h3>
      <div :class="$style.cells">
        <div :class="[$style.cell, $style.waiters]">
          <span>Новые</span>
          <p>0</p>
        </div>
        <div :class="[$style.cell, $style.refused]">
          <span>Всего</span>
          <p>5 250</p>
        </div>
      </div>
    </div>
    <div :class="$style.info">
      <h3 :class="$style.heading">Информация о предложении</h3>
      <ul :class="$style['info-list']">
        <li>
          <span>Статус предложения</span>
          <p>Активное</p>
        </li>
        <li>
          <span>До завершения</span>
          <p>1:12:14</p>
        </li>
      </ul>
    </div>
    <Smartphone
      :company-name="companyInfo.company.name"
      :logo="companyInfo.company.logo"
      :description="all_data.title"
      :reward="all_data.reward_description"
      :image="all_data.show_file ? all_data.show_file : all_data.cover"
      :from-date="all_data.start_date"
      :to-date="all_data.end_date"
      :conditions="all_data.conditions"
      :places="all_data.places"
      :comment="all_data.comment"
      :class="$style.smartphone"
    />

    <!-- {{ all_data }} -->
  </div>
</template>

<script>
import Smartphone from '~/components/templates/CheckingSmartphone.vue'
export default {
  components: {
    Smartphone,
  },
  data() {
    return {
      process: {
        done: 70,
        overall: 200,
      },
    }
  },
  computed: {
    all_data() {
      return this.$store.getters['offer/data']
    },
    companyInfo() {
      return this.$store.getters['user_data/data']
    },
    doneWidth() {
      return `${(this.process.done / this.process.overall) * 100}%`
    },
    // offer() {
    //   return this.$store.getters['offer/data']
    // },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.about {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 0.5fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    'process process smartphone'
    'bids messages smartphone'
    'info . smartphone';
}

.process {
  grid-area: process;
}

.bids {
  grid-area: bids;
}

.messages {
  grid-area: messages;
}

.info {
  grid-area: info;
}

.smartphone {
  grid-area: smartphone;
}

.process,
.bids,
.messages,
.info {
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0.989583px 2.96875px rgba(233, 216, 207, 0.3);
  padding: 24px 20px;
  height: fit-content;
}

.heading {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
}

.subheading {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
}

.cells {
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
}

.executors {
  background-color: rgba($color: $baseBlue, $alpha: 0.12);
  p {
    background-color: $baseBlue;
  }
}

.waiters {
  background-color: rgba($color: $baseRed, $alpha: 0.12);
  p {
    background-color: $baseRed;
  }
}

.compliters {
  background-color: rgba($color: $baseGreen, $alpha: 0.12);
  p {
    background-color: $baseGreen;
  }
}

.refused {
  background-color: rgba($color: $baseGray, $alpha: 0.12);
  p {
    background-color: $baseGray;
  }
}

.new-request {
  background-color: rgba($color: $baseOrange, $alpha: 0.12);
  p {
    background-color: $baseOrange;
  }
}

.cell {
  padding: 13px;

  border-radius: 16px;
  min-width: 150px;
  span {
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
  }
  p {
    margin-top: 15px;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    max-width: 60px;
    margin-bottom: 0;
  }
}

.line-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba($color: $baseGreen, $alpha: 0.08);
  padding: 13px 20px;
  border-radius: 8px;
  margin-top: 12px;
}

.line {
  margin-left: 12px;
  flex-grow: 1;
  height: 6px;
  background-color: rgba($color: $baseGreen, $alpha: 0.2);
  border-radius: 50px;
}

.done {
  background-color: $baseGreen;
  height: 6px;
  border-radius: 50px;
}

.info-list {
  list-style-type: none;
  padding-left: 0;
  margin-top: 39px;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 17px;
    padding-bottom: 17px;
    border-bottom: 0.5px solid $baseGray;
    &:first-child {
      p {
        color: $baseGreen;
        background-color: rgba($color: $baseGreen, $alpha: 0.08);
      }
    }
    &:last-child {
      border-bottom: none;
      p {
        color: $baseOrange;
        background-color: rgba($color: $baseOrange, $alpha: 0.08);
      }
    }
  }
  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
  }
  p {
    padding: 8px 15px;
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 8px;
  }
}
</style>
