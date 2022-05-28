<template>
  <Base>
    <h2 class="app_header">Поддержка</h2>
    <b-tabs
      :active-nav-item-class="$style.active_switcher"
      :class="$style.nav"
      content-class="mt-3 "
      lazy
    >
      <b-tab title="FAQ" :title-link-class="linkClass(1)" active>
        <template #title>
          <img src="~/static/images/profile/comand.svg" alt="" />
          <span :class="$style.label">FAQ</span>
        </template>
        <FAQ />
      </b-tab>
      <b-tab title="Чат с поддержкой" :title-link-class="linkClass(2)">
        <template #title>
          <img src="~/static/images/profile/places.svg" alt="" />
          <span :class="$style.label">Чат с поддержкой</span>
        </template>
        <Chat />
      </b-tab>
    </b-tabs>
  </Base>
</template>

<script>
import Base from '~/components/Base.vue'
import FAQ from '~/components/support/FAQ'
import Chat from '~/components/support/Chat'
export default {
  components: {
    Base,
    FAQ,
    Chat,
  },
  methods: {
    linkClass() {
      return [this.$style.switcher]
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
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
</style>
