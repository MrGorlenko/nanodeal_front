<script>
import { Line } from 'vue-chartjs'
export default Line.extend({
  name: 'lineGraph',
  props: ['data', 'options', 'labels'],
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, '#F038D2')
    this.gradient.addColorStop(1, '#FFB74B')
    this.renderChart(
      {
        labels: [...this.labels],
        datasets: [
          {
            backgroundColor: false,
            borderColor: this.gradient,
            fill: false,
            data: [...this.data],
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
              gridLines: {
                display: true,
                zeroLineColor: '#fff',
                borderDash: [10, 10],
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                // drawBorder: false,
                zeroLineColor: '#fff',
                ticks: {
                  beginAtZero: true,
                },
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
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
              backgroundColor: false,
              borderColor: this.gradient,
              fill: false,
              data: [...this.data],
            },
          ],
        },
        {
          // layout: {
          //   padding: 20,
          // },

          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  zeroLineColor: '#fff',
                  borderDash: [10, 10],
                  ticks: {
                    beginAtZero: true,
                  },
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  zeroLineColor: '#fff',
                  // ticks: {
                  //   beginAtZero: true,
                  // },
                },
              },
            ],
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      )
    },
  },
})
</script>

<style></style>
