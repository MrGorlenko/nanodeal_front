<template>
  <Base>
    <h2 class="app_header">Поддержка</h2>

    <hr />

    {{ data }}

    <div :class="$style.wrapper">
      <div :class="$style.base">
        <h2 :class="$style.header">Заголовок</h2>
        <p>
          План этого рабочего места установлен на 50 долларов в месяц и будет
          обновлен 17 апреля 2020 года. С учетом баланса вашего аккаунта с вас
          будет взиматься плата в размере 0 долларов США.
        </p>
        <table :class="$style.table">
          <thead>
            <tr>
              <th>Позиция 1</th>
              <th>Позиция 2</th>
              <th>Позиция 3</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Что-то</td>
              <td>Что-то</td>
              <td>Что-то</td>
              <td>Что-то</td>
            </tr>
            <tr>
              <td>Что-то</td>
              <td>Что-то</td>
              <td>Что-то</td>
              <td>Что-то</td>
            </tr>
            <tr>
              <td>Что-то</td>
              <td>Что-то</td>
              <td>Что-то</td>
              <td>Что-то</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Tariff
        :title="tariff.title"
        :type="type"
        :days-remain="tariff.days_remain"
        :next-payment="tariff.next_payment"
        :class="$style.tariff"
      />
    </div>
  </Base>
</template>

<script>
import Tariff from '~/components/dashboard/Tariff.vue'
import Base from '~/components/Base.vue'
export default {
  components: {
    Base,
    Tariff,
  },
  data() {
    return {
      data: {},
      tariff: { title: '', type: '', days_remain: '', next_payment: '' },
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },

  created() {
    this.$axios
      .get('http://31.172.64.228:8000/api/v1/business/billing/', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        this.data = res.data[0]
        this.tariff.title = res.data[0].tariff.title
        this.tariff.type = res.data[0].type
        this.tariff.days_remain = res.data[0].days_remain
        this.tariff.next_payment = res.data[0].next_payment
      })
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.base {
  width: 65%;
  background: #ffffff;
  box-shadow: 0px 0.989583px 2.96875px rgba(233, 216, 207, 0.3);
  border-radius: 16px;
  padding: 30px;
  height: fit-content;
}

.tariff {
  width: 32%;
}

.table {
  width: 100%;
  th {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: $baseGray;
    padding-bottom: 20px;
    padding-top: 30px;
  }
  tr {
    border-bottom: 0.5px solid #eaecf1;
    td {
      padding-top: 8px;
      padding-bottom: 8px;
      color: $baseBlack;
      font-weight: 600;
      &:last-child {
        text-align: right;
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
