<template>
  <modal
    classes="category_modal"
    :width="416"
    :height="'85%'"
    name="categories-modal"
  >
    <button :class="$style.close" @click="hide">
      <img src="images/reg/close.svg" alt="" />
    </button>
    <h3 :class="$style.header">
      Добавление <br />
      категорий
    </h3>
    <div :class="$style.cats">
      <div
        v-for="(cat, index) in cats"
        :key="index"
        :class="[
          $style.cat,
          cat.checked ? $style.checked : '',
          !cat.checked && number_selected ? $style.disabled : '',
        ]"
        @click="choseCat(cat)"
      >
        <img :src="cat.icon" alt="" />
        <p>{{ cat.title }}</p>
      </div>
    </div>

    <button
      :disabled="number_selected ? false : true"
      :class="$style.button"
      @click="select"
    >
      Выбрать
    </button>
  </modal>
</template>

<script>
import '~/assets/scss/modals.scss'
export default {
  name: 'Categories',
  data() {
    return {
      cats: [],
      selected: [],
      selected_indexes: [],
      number_selected: 0,
    }
  },

  created() {
    this.fetchCats()
  },

  methods: {
    async fetchCats() {
      const reqCats = await this.$axios.$get('/api/v1/business/category/')
      this.cats = reqCats
    },
    choseCat(cat) {
      if (!cat.checked) this.number_selected++
      if (cat.checked) this.number_selected--
      cat.checked = !cat.checked
    },
    show() {
      this.$modal.show('categories-modal')
    },
    hide() {
      this.$modal.hide('categories-modal')
    },
    select() {
      this.selected = []

      this.cats.forEach((cat) => {
        return cat.checked ? this.selected.push(cat) : this.selected
      })

      this.cats.forEach((cat) => {
        return cat.checked
          ? this.selected_indexes.push(cat.id)
          : this.selected_indexes
      })

      this.$emit('resData', {
        elements: this.selected,
        indexes: this.selected_indexes,
      })
      this.hide()
    },
  },
  mount() {
    this.show()
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
@import '~/assets/scss/modals.scss';

.close {
  @include close;
}

.header {
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: $baseBlack;
  margin-top: 30px;
  margin-bottom: 20px;
}

.cats {
  display: flex;
  flex-wrap: wrap;

  justify-content: space-around;
}

.cats,
.button {
  width: 85%;
  margin: auto;
}

.cat {
  width: 31%;
  height: 90px;
  border: 1px solid #d4d8e3;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 17px 25px 11px 25px;
  margin-bottom: 10px;
  transition: opacity 0.3s ease;
  cursor: pointer;
  &_disabled {
    opacity: 0.4;
  }
  img {
    margin-bottom: 11px;
  }
  p {
    color: $baseBlack;
    font-weight: 600;
    font-size: 12px;
    line-height: 90%;
    text-align: center;
  }
  &:hover {
    opacity: 0.8;
  }
}

.checked {
  border: 1px solid green;
  position: relative;
  &::after {
    position: absolute;
    top: -3px;
    right: -3px;
    content: '';
    display: block;
    background: url('~/static/images/reg/done.svg');
    width: 24px;
    height: 24px;
  }
}

.disabled {
  img,
  p {
    opacity: 0.4;
  }
}

.button {
  @include button-next-active;
  height: 50px;
  margin-top: 30px;
  &:disabled {
    @include button-next-disabled;
  }
}
</style>
