<script>
import { Bar } from 'vue-chartjs'
export default Bar.extend({
  name: 'barChart',
  props: ['labels', 'data'],
  mounted() {
    this.renderChart(
      {
        labels: [...this.labels],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: 'rgba(254, 136, 98, 0.2)',
            hoverBackgroundColor: 'rgba(254, 136, 98, 1)',
            data: [...this.data],
            barThickness: 52,
          },
        ],
      },
      {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      }
    )
  },
  methods: {
    rerender() {
      this.$emit('rerender')
      this.renderChart(
        {
          labels: [...this.labels],
          datasets: [
            {
              label: 'GitHub Commits',
              backgroundColor: 'rgba(254, 136, 98, 0.2)',
              hoverBackgroundColor: 'rgba(254, 136, 98, 1)',
              data: [...this.data],
              barThickness: 52,
            },
          ],
        },
        {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
            yAxes: [
              {
                stacked: true,
              },
            ],
          },
        }
      )
    },
  },
})
</script>
