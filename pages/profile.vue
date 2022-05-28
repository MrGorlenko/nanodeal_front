<template>
  <Base>
    <h2 class="app_header" :class="$style.header">Профиль</h2>
    <b-tabs
      :active-nav-item-class="$style.active_switcher"
      :class="$style.nav"
      content-class="mt-3"
    >
      <b-tab title="Команда" :title-link-class="linkClass(1)" active>
        <template #title>
          <img src="~/static/images/profile/comand.svg" alt="" />
          <span :class="$style.label">Команда</span>
        </template>
        <Comand
          :prop-first-name="data.user.first_name"
          :prop-last-name="data.user.last_name"
          :prop-position="data.user.position"
          :prop-email="data.user.email"
          :prop-avatar="data.user.avatar"
          :prop-status="data.user.status"
          :prop-employees="data.company.employees"
        />
      </b-tab>
      <b-tab title="Места" :title-link-class="linkClass(2)">
        <template #title>
          <img src="~/static/images/profile/places.svg" alt="" />
          <span :class="$style.label">Места</span>
        </template>
        <Places
          :places="data.company.places"
          :user-status="data.user.status"
          @updated="getCurrent"
        />
      </b-tab>
      <b-tab title="Компания" :title-link-class="linkClass(3)">
        <template #title>
          <img src="~/static/images/profile/company.svg" alt="" />
          <span :class="$style.label">Компания</span>
        </template>
        <Company
          :name="data.company.name"
          :description="data.company.description"
          :categories="data.company.categories"
          :socials="data.company.social_links"
          :logo="data.company.logo"
          :user-status="data.user.status"
          @updated="getCurrent"
        />
      </b-tab>
    </b-tabs>
  </Base>
</template>

<script>
import Base from '~/components/Base.vue'
import Places from '~/components/profile/Places'
import Comand from '~/components/profile/Comand'
import Company from '~/components/profile/Company'
export default {
  components: {
    Base,
    Places,
    Comand,
    Company,
  },
  data() {
    return {}
  },
  computed: {
    data() {
      return this.$store.getters['user_data/data']
    },
  },
  created() {
    this.$store.dispatch('user_data/setData')
  },
  methods: {
    linkClass() {
      return [this.$style.switcher]
    },
    async getCurrent() {
      await this.$store.dispatch('user_data/setData')
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.header {
  margin-bottom: 20px;
}

.active_switcher {
  border-radius: 10px !important;
  border: none !important;
}

.switcher {
  background: none;
  padding: 12px 20px;
  color: $baseBlack;
  font-weight: 600;
  font-size: 14px;
}

.nav {
  ul {
    padding-bottom: 20px;
  }
  li {
    margin-right: 20px;
  }
}

@media (max-width: $mobile) {
  .nav {
    padding-top: 90px;
    > div:first-child {
      position: absolute;
      width: 90%;
      top: 90px;
      ul {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
        li a {
          display: flex;
          img {
            margin-right: 6px;
          }
        }
      }
    }
  }
}
</style>
