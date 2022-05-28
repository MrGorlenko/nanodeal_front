export default {
  methods: {
    setDateLabel(string) {
      const monthes = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
      ]

      const year = string.slice(0, 4)

      const monthNumber = string.slice(5, 7)
      let index
      monthNumber[0] === '0' ? (index = monthNumber[1]) : (index = monthNumber)

      let day
      const dayNumber = string.slice(8, 12)
      dayNumber[0] === '0' ? (day = dayNumber[1]) : (day = dayNumber)

      return day + ' ' + monthes[parseInt(index) - 1] + ' ' + year
      // return string
    },
  },
}
