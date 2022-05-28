<template>
  <div :class="$style.avatar">
    <p>{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'AvatarPlug',

  props: {
    firstName: {
      type: String,
      default: 'Имя',
    },
    secondName: {
      type: String,
      default: 'Фамилия',
    },
  },

  computed: {
    label() {
      return this.firstName[0] + this.secondName[0]
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.avatar {
  background: $baseAqua;
  // width: 77px;
  // height: 77px;
  padding: 1em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-weight: bold;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
