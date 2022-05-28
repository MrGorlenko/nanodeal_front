<template>
  <div>
    <!-- <p>{{ i }}</p> -->

    <!-- <p>Начальное время {{ startTime }}</p>

    <p>Конечное время {{ endTime }}</p>

    <p>distance {{ distance }}</p>

    <p>{{ time }}</p> -->

    <p>{{ now }}</p>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    propStartTime: {
      default: 0,
      type: Number,
    },
    propEndTime: {
      default: 0,
      type: Number,
    },
    // propBarrier: {}
  },
  data() {
    return {
      now: Math.floor(new Date().getTime() / 1000),
      timer_work: true,
      stable_now: 0,
      counter: 0,
    }
  },

  computed: {
    time() {
      const minutes =
        this.distance / 60 < 10
          ? '0' + String(Math.floor(this.distance / 60))
          : Math.floor(this.distance / 60)
      const seconds =
        this.distance % 60 < 10
          ? '0' + String(Math.floor(this.distance % 60))
          : Math.floor(this.distance % 60)
      return `${minutes} : ${seconds}`
    },

    // now() {
    //   return Math.floor(new Date().getTime() / 1000)
    // },

    distance() {
      return this.now - this.startTime // вот тут баг
    },

    startTime() {
      return Math.floor(new Date(this.propStartTime).getTime() / 1000)
    },

    endTime() {
      return Math.floor(new Date(this.propEndTime).getTime() / 1000)
    },
  },

  created() {
    // if (this.now > this.endTime) this.now = this.startTime
    this.setCurrentTime()
  },

  mounted() {
    // if (this.distance < 0) this.now = Math.floor(new Date().getTime() / 1000)
    this.setCurrentTime()
  },

  methods: {
    setCurrentTime() {
      // let interval
      // console.log('Это проп конец времени' + this.propEndTime)
      // console.log('Время создания компоненты и сета now ' + this.now)
      // console.log('Время которое сеттится как endTime ' + this.endTime)
      // console.log('distance ' + this.distance)
      // if (this.now > this.endTime) this.now = this.startTime
      // if (this.now < this.endTime || this.distance < 0) {
      //   interval = setInterval(() => {
      //     this.now = Math.floor(new Date().getTime() / 1000)
      //     if (this.now >= this.endTime) {
      //       clearInterval(interval)
      //       this.now = this.endTime
      //       this.$emit('timeOver')
      //     }
      //   }, 1000)
      // }
      // if (this.now >= this.endTime && flag) {
      //   flag = false
      // }
    },
  },
}
</script>

<style></style>
