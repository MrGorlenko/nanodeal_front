<template>
  <div>
    <h3 class="offer_header">Условия получения награды</h3>
    <div
      v-for="(condition, index) in conditions"
      :key="index"
      :class="$style['condition_wrapper']"
    >
      <CustomInput v-model="condition.text" :label="'Условие' + (index + 1)" />
      <img
        v-if="conditions.length > 1"
        :class="$style.bin"
        src="~/static/images/icons/bin.svg"
        alt=""
        @click="removeCond(index)"
      />
    </div>
    <p :class="$style['plus_wrapper']">
      <span :class="$style.plus" @click="addCond">+</span>
      <input
        type="button"
        class="offer_input"
        value="Добавить условие"
        :class="$style.add"
        @click="addCond"
      />
    </p>
    <h3 class="offer_header">Комментарий к задаче (опционально)</h3>

    <CustomInput v-model="comment" :label="'Комментарий к предложению'" />

    <div class="row">
      <div class="col-6">
        <h3 class="offer_header">Тип вознаграждения</h3>
        <div class="d-flex">
          <div :class="$style['check_wrapper_p']" class="check_wrapper">
            <input type="checkbox" />
            Скидка
          </div>
          <div
            :class="[$style['checked_wrapper'], $style['check_wrapper_p']]"
            class="check_wrapper"
          >
            <input type="checkbox" />
            Подарок
          </div>
        </div>
      </div>
      <div class="col-6">
        <h3 class="offer_header">Формат вознаграждения</h3>
        <div class="d-flex flex-wrap">
          <div :class="$style['check_wrapper_p']" class="check_wrapper">
            <input type="checkbox" />
            QR код
          </div>
          <div
            :class="[$style['checked_wrapper'], $style['check_wrapper_p']]"
            class="check_wrapper"
          >
            <input type="checkbox" />
            Купон
          </div>
          <div
            :class="[$style.promocode, $style['check_wrapper_p']]"
            class="check_wrapper"
          >
            <input type="checkbox" />
            Промокод
            <input
              :class="$style.entry"
              type="text"
              placeholder="Введите промокод"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h3 class="offer_header">Срок действия награды после выполнения</h3>
        <div class="d-flex">
          <div :class="$style['check_wrapper_p']" class="check_wrapper">
            <input type="checkbox" />
            Неделя
          </div>
          <div
            :class="[$style['checked_wrapper'], $style['check_wrapper_p']]"
            class="check_wrapper"
          >
            <input type="checkbox" />
            Месяц
          </div>
        </div>
      </div>
      <div class="col-6">
        <h3 class="offer_header">Формат вознаграждения</h3>
        <div class="d-flex flex-wrap">
          <div
            :class="[$style.period, $style['check_wrapper_p']]"
            class="check_wrapper"
          >
            <input type="checkbox" />
            Выберите период
            <input :class="$style.data" type="data" placeholder="Период" />
          </div>
        </div>
      </div>
    </div>

    <h3 class="offer_header">Количество выполнений</h3>

    <CustomInput
      v-model="complete_count"
      :class="$style.complete_count"
      :label="'Количество выполнений'"
      :type="'number'"
    />

    <NextOffer
      :next="next"
      @resData="resData"
      @draftData="draftData"
      @deleteAll="deleteAll"
    />
  </div>
</template>

<script>
import CustomInput from '~/components/widgets/CustomInput'
import NextOffer from '~/components/widgets/NextOffer'
export default {
  components: {
    NextOffer,
    CustomInput,
  },
  props: {
    propId: {
      default: '',
      type: String,
    },
    propConditions: {
      default: () => [{ text: '' }],
      type: Array,
    },
    propComment: {
      default: null,
      type: String,
    },
    propCompleteCount: {
      default: null,
      type: Number,
    },
  },
  data() {
    return {
      conditions: [{ text: '' }],
      comment: '',
      complete_count: '',
    }
  },

  computed: {
    next() {
      return this.conditions[0].text !== '' && this.complete_count !== ''
    },
  },
  created() {
    this.setConditions()
    this.setComment()
    this.setCompleteCount()
    if (this.propId === '' && this.saveMode === false) this.deleteAll()
  },
  methods: {
    setConditions() {
      const cond = []
      if (this.propConditions && this.propConditions[0].text !== '') {
        for (let i = 0; i < this.propConditions.length; i++) {
          cond.push({ text: this.propConditions[i] })
        }
      }
      cond.length >= 1
        ? (this.conditions = cond)
        : (this.conditions = [{ text: '' }])
    },

    setComment() {
      if (this.propComment !== null) this.comment = this.propComment
    },

    setCompleteCount() {
      if (this.propCompleteCount) this.complete_count = this.propCompleteCount
    },

    addCond() {
      this.conditions.push({ text: '' })
    },

    removeCond(index) {
      this.conditions.splice(index, 1)
    },

    setData() {
      const data = {}
      if (this.propId) data.uid = this.propId
      data.step = 2
      data.conditions = this.conditions
      data.comment = this.comment
      data.complete_count = this.complete_count
      return data
    },

    async resData() {
      this.conditions = await this.cleanConditions()
      const data = await this.setData()
      this.$emit('resData', data)
    },
    cleanConditions() {
      return this.conditions.map(function (elem) {
        return elem.text
      })
    },

    async draftData() {
      this.conditions = await this.cleanConditions()
      const data = await this.setData()
      this.$emit('draftData', data)
    },

    deleteAll() {
      this.conditions = [{ text: '' }]
      this.comment = ''
      this.complete_count = ''
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.add {
  background-color: #fff;
  text-align: left;
  color: $baseGray;
  padding-left: 45px;
}

.condition_wrapper {
  position: relative;

  .bin {
    position: absolute;
    top: 15px;
    left: 570px;
    z-index: 2;
  }
}

.plus_wrapper {
  position: relative;
  cursor: pointer;
  .plus {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border-color: $baseGray;
    border-width: 2px;
    border-style: solid;
    content: '+';
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: $baseGray;
    top: 15px;
    left: 15px;
    padding-bottom: 4px;
  }
}

.checked_wrapper {
  margin-left: 20px;
}

.check_wrapper_p {
  padding: 14px;
}

.period,
.promocode,
.complete_count {
  width: 320px;
}

.promocode {
  margin-top: 20px;
}

.data,
.entry {
  border: none;
  float: right;
}

.data {
  width: 90px;
}

.entry {
  width: 145px;
}
</style>
