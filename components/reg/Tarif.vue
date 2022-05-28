<template>
  <div :class="$style.tarif">
    <TarifTable v-if="$screen.width > 992" @resData="selectTarif" />
    <TarifTableMobile v-else @resData="selectTarif" />
  </div>
</template>

<script>
import TarifTable from '~/components/widgets/TarifTable'
import TarifTableMobile from '~/components/widgets/TarifTableMobile'
export default {
  components: {
    TarifTable,
    TarifTableMobile,
  },
  data() {
    return {
      tarif: 0,
    }
  },

  methods: {
    selectTarif(index) {
      this.$emit('selectTarif', index)
    },

    finishReg(obj) {
      this.$emit('finishReg', obj)
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
</style>
