export default {
  methods: {
    setGraphData(current, period, step) {
      if (
        this.current === 'Views' &&
        this.period === 'Active' &&
        this.step === 0
      ) {
        return this.data.views.active.today
      }
      if (
        this.current === 'Views' &&
        this.period === 'Active' &&
        this.step === 1
      ) {
        return this.data.views.active.week
      }
      if (
        this.current === 'Views' &&
        this.period === 'Active' &&
        this.step === 2
      ) {
        return this.data.views.active.month
      }
    },
  },
}
