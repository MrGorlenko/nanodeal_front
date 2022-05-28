<template>
  <modal classes="task_modal" :width="416" :height="510" name="calendar-modal">
    <div :class="$style.wrapper">
      <button :class="$style.close" @click="hide">
        <img src="images/reg/close.svg" alt="" />
      </button>
      <DatePicker
        :inline="true"
        :language="'ru'"
        :available-dates="availableTo"
        :date-input="{ inputClass: 'abc' }"
        @select-date="applyTime"
      />
    </div>
    <div class="absolute-button-block">
      <button :class="$style.button" @click="pick">Выбрать</button>
    </div>
  </modal>
</template>

<script>
import '~/assets/scss/daterange.scss'
import DatePicker from 'vue-time-date-range-picker/dist/vdprDatePicker'
export default {
  components: {
    DatePicker,
  },
  props: {
    availableTo: {
      type: Object,
      default() {
        return {
          to: this.today,
        }
      },
    },
  },
  data() {
    return {
      today: new Date(),
      start: '',
      end: '',
      picked: false,
    }
  },
  methods: {
    show() {
      this.$modal.show('calendar-modal')
    },
    hide() {
      this.$modal.hide('calendar-modal')
    },

    setFormat(value) {
      if (!String(value)[1]) return `0${value}`
      return value
    },

    applyTime(end, start) {
      this.start =
        new Date(start).getFullYear() +
        '-' +
        this.setFormat(new Date(start).getMonth() + 1) +
        '-' +
        this.setFormat(new Date(start).getDate())
      this.end =
        new Date(end).getFullYear() +
        '-' +
        this.setFormat(new Date(end).getMonth() + 1) +
        '-' +
        this.setFormat(new Date(end).getDate())
    },
    pick() {
      if (this.start === this.end) return false
      const from = this.start
      const to = this.end
      this.$emit('setTime', `${to}_${from}`)
      this.hide()
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
@import '~/assets/scss/modals.scss';

.close {
  @include close;
}

.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.button {
  @include button-next-active;
  height: 50px;
  width: 335px;
  z-index: 3;
}
</style>
