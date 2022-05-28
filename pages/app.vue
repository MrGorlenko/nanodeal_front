<template>
  <div>
    <Base>
      <h1>Hello there!</h1>

      <p>Your name is {{ name }}</p>
    </Base>
  </div>
</template>

<script>
import Base from '~/components/Base.vue'
export default {
  components: { Base },
  data() {
    return {
      data: null,
      name: '',
    }
  },
  computed: {},
  created() {
    const userInfo = this.$store.getters.user_info
    setTimeout(this.setName(userInfo), 1000)
  },
  methods: {
    setName(object) {
      this.name = object
    },
  },
}
</script>

<style></style>
