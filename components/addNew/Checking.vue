<template>
  <div :class="$style.checking">
    <div :class="$style.step">
      <h3 class="offer_header">Описание предложения</h3>
      <div :class="$style.cell">
        <p :class="$style.label">Название предложения</p>
        <p :class="$style.value">
          {{ all_data.title }}
        </p>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Описание вознаграждения</p>
        <p :class="$style.value">
          {{ all_data.reward_description }}
        </p>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Обложка предложения</p>
        <img
          :class="$style.image"
          :src="all_data.show_file ? all_data.show_file : all_data.cover"
          alt=""
        />
      </div>
    </div>

    <div :class="$style.step">
      <h3 class="offer_header">Условия предложения</h3>
      <div
        v-for="(condition, index) in all_data.conditions"
        :key="index"
        :class="$style.cell"
      >
        <p :class="$style.label">Условие {{ index + 1 }}</p>
        <p :class="$style.value">{{ condition }}</p>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Комментарий (опционально)</p>
        <p v-if="all_data.comment !== ''" :class="$style.value">
          {{ all_data.comment }}
        </p>
        <p v-else :class="$style.value">Отсутствует</p>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Тип вознаграждения</p>
        <p :class="$style.value">Скидка / Промокод /</p>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Количество доступных выполнений</p>
        <p :class="$style.value">{{ all_data.complete_count }}</p>
      </div>
    </div>

    <div :class="$style.step">
      <h3 class="offer_header">Требование к исполнителям</h3>
      <div :class="$style.cell">
        <p :class="$style.label">Пол</p>
        <template v-if="all_data.gender">
          <p v-if="all_data.gender == 'FEMALE'" :class="$style.value">
            Женщина
          </p>
          <p v-if="all_data.gender == 'MALE'" :class="$style.value">Мужчина</p>
          <p v-if="all_data.gender == 'BOTH'" :class="$style.value">
            Мужчина и Женщина
          </p>
        </template>
        <template v-else> <p :class="$style.value">Неважно</p> </template>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Возраст</p>
        <p :class="$style.value">
          {{ all_data.age_from }}-{{ all_data.age_to }}
        </p>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Минимальное количество подписчиков</p>
        <p :class="$style.value">{{ all_data.followers_count }}</p>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Подтверждать заявки участников вручную</p>
        <p v-if="all_data.is_manual_moderate" :class="$style.value">Да</p>
        <p v-else :class="$style.value">Нет</p>
      </div>
    </div>

    <div :class="$style.step">
      <h3 class="offer_header">Сроки выполнения предложения</h3>
      <div :class="$style.cell">
        <p :class="$style.label">Время начала и завершения</p>
        <p :class="$style.value">
          {{
            setDateLabel(
              new Date(all_data.start_date).getFullYear() +
                '-' +
                setFormat(new Date(all_data.start_date).getMonth() + 1) +
                '-' +
                setFormat(new Date(all_data.start_date).getDate())
            )
          }}
          —
          {{
            setDateLabel(
              new Date(all_data.end_date).getFullYear() +
                '-' +
                setFormat(new Date(all_data.end_date).getMonth() + 1) +
                '-' +
                setFormat(new Date(all_data.end_date).getDate())
            )
          }}
        </p>
      </div>
      <div :class="$style.cell">
        <p :class="$style.label">Адрес предложения</p>
        <template v-if="!all_data.is_online">
          <span
            v-for="(place, index) in all_data.places"
            :key="place.id"
            :class="$style.value"
          >
            {{ place.address }}
            <span v-if="index < all_data.places.length - 1">/</span>
          </span></template
        >
        <template v-else>
          <span :class="$style.value">Онлайн предложение</span>
        </template>
      </div>
    </div>

    <Smartphone
      :company-name="companyInfo.company.name"
      :logo="companyInfo.company.logo"
      :description="all_data.title"
      :reward="all_data.reward_description"
      :image="all_data.show_file ? all_data.show_file : all_data.cover"
      :from-date="all_data.start_date"
      :to-date="all_data.end_date"
      :conditions="all_data.conditions"
      :places="all_data.places"
      :comment="all_data.comment"
      :class="$style.smartphone"
    />

    <NextOffer
      :delete-available="false"
      :last="true"
      @draftData="draftData"
      @resData="postData"
    />

    <div :class="$style.warning">
      <img src="~/static/images/newOffer/warning.svg" alt="" />
      <p>
        Обращаем ваше внимание, что после публикации у вас будет только 15 минут
        на возможность редактирования.
      </p>
    </div>

    <NewOfferModal />
  </div>
</template>

<script>
import NextOffer from '~/components/widgets/NextOffer.vue'
import Smartphone from '~/components/templates/CheckingSmartphone.vue'
import NewOfferModal from '~/components/modals/newOffer/newOffer'
import setDateLabel from '~/mixins/setDateLabel'
export default {
  components: {
    NextOffer,
    Smartphone,
    NewOfferModal,
  },
  mixins: [setDateLabel],
  data() {
    return {
      company_logo: '',
      company_name: '',
    }
  },

  computed: {
    all_data() {
      return this.$store.getters['offer/data']
    },
    companyInfo() {
      return this.$store.getters['user_data/data']
    },
  },
  methods: {
    postData() {
      const data = { status: 'Предпросмотр' }
      this.$emit('createOffer', data)
      this.$modal.show('new-offer-modal')
    },

    draftData() {
      const data = { status: 'Черновик' }
      this.$emit('draftData', data)
    },

    goToOffers() {
      this.$store.dispatch('offer/clearData')
      this.$router.push('/offers')
    },
    setFormat(value) {
      if (!String(value)[1]) return `0${value}`
      return value
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.checking {
  position: relative;
}

.step {
  border: 0.5px solid $stepGray;
  box-sizing: border-box;
  border-radius: 16px;
  padding-left: 20px;
  padding-right: 20px;
  width: 710px;
  margin-bottom: 20px;
}

.cell {
  border-bottom: 1px solid $stepGray;
  margin-bottom: 15px;
  &:last-child {
    border-bottom: none;
  }
}

.label {
  margin-top: 0;
  margin-bottom: 0;
  color: $baseGray;
}

.value {
  margin-top: 0;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: $baseBlack;
}

.smartphone {
  position: absolute;
  right: 0;
  top: 0;
}

.image {
  object-fit: contain;
  border-radius: 3.3345px 16.6725px 16.6725px 16.6725px;
  margin-top: 10px;
  width: 320px;
  height: 160px;
}

.warning {
  display: flex;
  align-items: center;
  margin-top: 24px;
  p {
    margin-bottom: 0;
    margin-top: 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    margin-left: 13px;
  }
}
</style>
