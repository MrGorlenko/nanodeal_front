<script>
import { Pie } from 'vue-chartjs'
export default Pie.extend({
  name: 'pieChart',
  props: ['labels', 'data', 'colors'],
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: 'GitHub Commits',
            data: this.data,
            backgroundColor: this.colors,
            borderAlign: 'inner',
            weight: 2,
          },
        ],
      },
      {
        legend: {
          display: false,
        },
      }
    )
  },
  methods: {
    rerender() {
      this.$emit('rerender')
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: 'GitHub Commits',
              data: this.data,
              backgroundColor: this.colors,
              borderAlign: 'inner',
              weight: 2,
            },
          ],
        },
        {
          legend: {
            display: false,
          },
        }
      )
    },
  },
})
</script>
