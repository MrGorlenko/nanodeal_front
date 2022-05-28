<template>
  <Base>
    <Header :header="'Dashboard'" />
    <Top :class="$style.top" :data="summary" />
    <Banner ref="banner" :banner="banner" />
    <Offers :active-tasks="active_tasks" />
    <OffersMobile :active-tasks="active_tasks" />
    <div :class="$style.bottom">
      <Statistics />
      <Tariff />
      <News />
    </div>
  </Base>
</template>

<script>
import Header from '~/components/widgets/PageHeader'
import Base from '~/components/Base.vue'
import Top from '~/components/dashboard/Top'
import Banner from '~/components/dashboard/Banner'
import Offers from '~/components/dashboard/Offers'
import OffersMobile from '~/components/dashboard/OffersMobile'
import Statistics from '~/components/dashboard/Statistics'
import Tariff from '~/components/dashboard/Tariff'
import News from '~/components/dashboard/News'
// import Reviews from '~/components/dashboard/Reviews'
export default {
  components: {
    Header,
    Base,
    Top,
    Banner,
    Offers,
    OffersMobile,
    Statistics,
    Tariff,
    News,
    // Reviews,
  },
  data() {
    return {
      summary: {
        profile: {
          first_name: '',
          last_name: '',
          avatar: '',
          email: '',
          position: '',
          tariff: [
            {
              id: null,
              title: '',
              price_month: 0,
              price_year: 0,
              count_propositions: 0,
              count_cities: 0,
            },
          ],
        },
        clients: 0,
        newBid: 0,
        onCheck: 0,
        close: 0,
      },
      active_tasks: [],
      banner: {},
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },
  beforeCreate() {},
  created() {
    this.$axios
      .get('http://31.172.64.228:8000/api/v1/dashboard/summary/', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        this.summary = res.data
      })
    this.$axios
      .get('http://31.172.64.228:8000/api/v1/dashboard/active_tasks/', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        this.active_tasks = res.data.task
      })
    this.$axios
      .get('http://31.172.64.228:8000/api/v1/dashboard/banner/', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        this.banner = res.data[0]
      })
      .then(() => {
        this.$refs.banner.loadData()
      })
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.top {
  margin-top: 20px;
}

.bottom {
  display: grid;
  min-height: 800px;
  gap: 20px 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'Statistics Statistics Tariff'
    'News News Tariff'
    'News News Reviews';
}

@media (max-width: $mobile) {
  .bottom {
    display: flex;
    flex-direction: column;
  }
}
</style>
