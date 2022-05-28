<template>
  <div :class="$style.offers">
    <h3 :class="$style.header">Активные предложения</h3>
    <table :class="$style.table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Сообщения</th>
          <th>Заявки</th>
          <th>Исполнители</th>
          <th>Ожидают</th>
          <th>Выполнено</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in activeTasks" :key="task.title">
          <td :class="$style.first">
            <img :class="$style.icon" :src="task.cover" alt="" />
            <p>{{ task.title }}</p>
          </td>
          <td>15</td>
          <td>32</td>
          <td>3</td>
          <td>10</td>
          <td>34/100</td>
          <td><button :class="$style.button">Перейти</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    activeTasks: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.offers {
  width: 100%;
  padding: 25px;
  background: #fff;
  border-radius: 16px;
  margin-bottom: 20px;
}

.header {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
}

.table {
  width: 100%;
  thead {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: $baseGray;
  }
  tbody {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    position: relative;
    top: 10px;
    tr {
      height: 55px;
      border-bottom: 0.5px solid #eaecf1;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 2px 10px 10px 10px;
  object-fit: cover;
}

.first {
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0;
    margin-top: 0;
    width: 50%;
    margin-left: 13px;
  }
}

.button {
  @include button-green;
  padding: 9.5px 32px;
  float: right;
}

@media (max-width: $mobile) {
  .offers {
    display: none;
  }
}
</style>
