<template>
  <table :class="$style.table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(line, index) in lines"
        :key="index"
        :class="line.exec ? $style['yes-reward-wrapper'] : ''"
      >
        <td v-if="line.name" :class="$style['name-wrapper']">
          <img :class="$style.avatar" :src="line.avatar" alt="" />
          <p :class="$style.name">{{ line.name }}</p>
          <p :class="$style.social">{{ line.insta }}</p>
        </td>
        <td v-if="line.subscribers">
          {{ line.subscribers }}
        </td>
        <td v-if="line.status">{{ line.status }}</td>
        <td v-if="line.categories">
          {{ line.categories }}
        </td>
        <td v-if="line.time" :class="$style.time">{{ line.time }}</td>
        <td v-if="line.refuseReason" :class="$style.reason">
          {{ line.refuseReason }}
        </td>
        <td v-if="line.timeToConfirm">
          {{ line.timeToConfirm }}
        </td>
        <td v-if="line.message">
          <button :class="$style['button-table']">написать</button>
        </td>
        <td v-if="line.result">
          <button
            v-if="line.result === 'watch'"
            :class="[$style['button-result'], $style['button-result-watch']]"
          >
            Посмотреть результат
          </button>
          <button
            v-if="line.result === 'change'"
            :class="[$style['button-result'], $style['button-result-changed']]"
          >
            Исправленный результат
          </button>
        </td>
        <td v-if="line.accept">
          <button :class="$style['button-accept']">Принять</button>
        </td>
        <td
          v-if="line.exec"
          :class="[
            $style.reward,
            line.exec ? $style['yes-reward'] : $style['no-reward'],
          ]"
        >
          <p v-if="line.exec === true">Получил(а) награду</p>
          <p v-if="line.exec === false">Не получил(а) награду</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'OfferTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    lines: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // header: []
    }
  },
}
</script>
<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

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
    }
    &:last-child {
      border-bottom: none;
    }
  }
}

.button-result-watch {
  @include button-next-outline;
}

.button-result-changed {
  @include button-pink-outline;
}

.button-accept {
  @include button-green-filled;
}

.button-result {
  width: 220px;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 13px;
}

.button-result,
.button-accept {
  padding: 9.5px 28px;
}

.name-wrapper {
  display: grid;
  grid-template-areas: 'avatar name' 'avatar social';
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 0.5fr 3fr;
  grid-gap: 10px;
  width: 200px;
}

.avatar {
  width: 42px;
  height: 42px;
  grid-area: avatar;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  grid-area: name;
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  margin-bottom: 0;
  margin-top: 0;
}

.social {
  grid-area: social;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  text-decoration-line: underline;
  color: $baseOrange;
  margin-bottom: 0;
  margin-top: 0;
}

.time {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  color: $baseBlack;
}

.button-table {
  @include button-green;
  padding: 9.5px 40px;
  float: right;
}

.reward {
  p {
    width: 164px;
    height: 30px;
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
}

.yes-reward {
  p {
    background: rgba($color: $baseGreen, $alpha: 0.08);
    color: $baseGreen;
  }
}

.yes-reward-wrapper {
  opacity: 0.6;
}

.no-reward {
  p {
    background: rgba($color: $baseOrange, $alpha: 0.08);
    color: $baseOrange;
  }
}

.reason {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
}
</style>
