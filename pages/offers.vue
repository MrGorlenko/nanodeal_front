<template>
  <Base>
    <template v-if="!nested">
      <div :class="$style['top-wrapper']">
        <h2 class="app_header">Предложения</h2>
        <div>
          <input
            v-model="search_title"
            type="text"
            placeholder="поиск"
            :class="$style.search"
          />
          <img
            v-if="companyInfo.user.avatar"
            :class="$style.avatar"
            :src="companyInfo.user.avatar"
            alt=""
          />
          <avatar-plug
            v-else
            :class="$style['avatar-slug']"
            :first-name="companyInfo.user.first_name"
            :second-name="companyInfo.user.second_name"
          />
        </div>
      </div>

      <div :class="$style.switcher">
        <button
          :class="current === 'Активные' ? $style['button-active'] : ''"
          @click="switchCurrent('Активные')"
        >
          <img src="~/static/images/offers/active.svg" alt="" />
          Активные
        </button>
        <button
          :class="current === 'На модерации' ? $style['button-active'] : ''"
          @click="switchCurrent('На модерации')"
        >
          <img src="~/static/images/offers/moderate.svg" alt="" />
          На модерации
        </button>
        <button
          :class="current === 'Черновик' ? $style['button-active'] : ''"
          @click="switchCurrent('Черновик')"
        >
          <img src="~/static/images/offers/drafts.svg" alt="" />
          Черновик
        </button>
        <button
          :class="current === 'Отклонено' ? $style['button-active'] : ''"
          @click="switchCurrent('Отклонено')"
        >
          <img src="~/static/images/offers/canceled.svg" alt="" />
          Отклонено
        </button>
        <button
          :class="current === 'Архив' ? $style['button-active'] : ''"
          @click="switchCurrent('Архив')"
        >
          <img src="~/static/images/offers/archieve.svg" alt="" />
          Архив
        </button>
      </div>
      <div v-if="receivedOffers.length > 0" :class="$style.offers">
        <div
          v-for="(offer, index) in receivedOffers"
          :key="index"
          :class="$style.offer"
        >
          <div>
            <img :src="companyInfo.company.logo" :class="$style.logo" alt="" />
            <span :class="$style['company_name']">{{
              companyInfo.company.name
            }}</span>

            <span
              v-if="
                offer.status === 'На модерации' ||
                offer.status === 'Предпросмотр'
              "
              :class="[$style.status, $style.moderate]"
            >
              На модерации
            </span>
            <span
              v-else
              :class="[
                $style.status,
                offer.status === 'Черновик' ? $style.draft : '',
                offer.status === 'Отклонено' ? $style.canceled : '',
              ]"
              >{{ offer.status }}</span
            >
          </div>

          <img
            v-if="offer.cover"
            :src="offer.cover"
            :class="$style.cover"
            alt=""
          />
          <div v-else :class="$style.cover">NO IMAGE</div>
          <p :class="$style.title">{{ offer.title }}</p>

          <div :class="$style['reward_description']">
            <img src="~/static/images/smartphone/gift.svg" alt="" />
            <p>{{ offer.reward_description }}</p>
          </div>

          <ul
            v-if="offer.status === 'Отклонено'"
            :class="$style['cancel-status']"
          >
            <li>
              <h3>Заявка была отклонена</h3>
              Ваше предложение не прошло модерацию по причине:
              {{ offer.cancel_reason }}
            </li>
          </ul>

          <ul v-if="offer.status === 'Активные'" :class="$style.list">
            <li>Новые сообщения</li>
            <li>Новые заявки</li>
            <li>До завершения</li>
            <li>Выполнено</li>
          </ul>
          <ul
            v-if="
              offer.status === 'Предпросмотр' || offer.status === 'На модерации'
            "
            :class="$style.list"
          >
            <li :class="$style['timer-cell']">
              завершение модерации
              <vac
                v-if="offer.status_changed_at"
                :class="$style.countdown"
                :start-time="new Date(offer.status_changed_at).getTime()"
                :end-time="
                  new Date(offer.status_changed_at).getTime() +
                  moderate_time_remain
                "
                @finish="updateStatus"
              >
                <span
                  slot="process"
                  slot-scope="{ timeObj }"
                  :class="$style.timer"
                  >{{ `${timeObj.m}:${timeObj.s}` }}</span
                >
                <span slot="finish">Done!</span>
              </vac>
            </li>
          </ul>

          <vac
            v-if="
              offer.status_changed_at &&
              (offer.status === 'Предпросмотр' ||
                offer.status === 'На модерации')
            "
            :start-time="new Date(offer.status_changed_at).getTime()"
            :end-time="
              new Date(offer.status_changed_at).getTime() + edit_time_remain
            "
          >
            <button
              slot="process"
              slot-scope="{ timeObj }"
              :class="[$style.button, $style['button_more']]"
              @click="editOffer(offer)"
            >
              {{ `${timeObj.m}:${timeObj.s}` }} | Редактировать
            </button>
            <button
              slot="finish"
              :class="[$style.button, $style['button_disabled']]"
              disabled
            >
              Редактировать
            </button>
          </vac>

          <button
            v-if="offer.status == 'Активные'"
            :class="[$style.button, $style['button_more']]"
            @click="offerDetail(offer.title, offer.uid)"
          >
            Подробнее
          </button>
          <button
            v-if="offer.status == 'Черновик'"
            :class="[$style.button, $style['button_edit']]"
            @click="editOffer(offer)"
          >
            Редактировать
          </button>
          <button
            v-if="offer.status == 'Отклонено'"
            :class="[$style.button, $style['button_edit']]"
            @click="editOffer(offer)"
          >
            Исправить
          </button>
        </div>
      </div>
      <div v-else :class="$style.absence">
        <p v-if="current === 'На модерации'">Предложений о модерации нет</p>
        <p v-if="current === 'Черновик'">Черновиков нет</p>
        <p v-if="current === 'Архив'">Архив пустой</p>
        <p v-if="current === 'Отклонено'">Отклоненных предложений нет</p>
        <p v-if="current === 'Активные'">Активных предложений нет</p>
      </div>
    </template>

    <nuxt-child v-else />
  </Base>
</template>

<script>
import Base from '~/components/Base.vue'
import AvatarPlug from '~/components/widgets/AvatarPlug.vue'
export default {
  components: {
    Base,
    AvatarPlug,
  },
  data() {
    return {
      moderate_time_remain: 60000 * 4,
      edit_time_remain: 60000 * 2,
      auto_start: false,
      current: 'На модерации',
      show_offers: true,
      finished_offers_count: 0,
      search_title: '',
    }
  },
  computed: {
    nested() {
      if (this.$route.name === 'offers-offerDetail') return true
      if (this.$route.name === 'offers') return false
      return false
    },
    receivedOffers() {
      return this.$store.getters['offer/receivedOffers'].filter(
        (offer) =>
          offer.title.includes(this.search_title) &&
          (offer.status === this.current ||
            ((offer.status === 'Предпросмотр' ||
              offer.status === 'На модерации') &&
              this.current === 'На модерации'))
      )
    },
    selectCategory() {
      return 1
    },
    companyInfo() {
      return this.$store.getters['user_data/data']
    },
    search() {
      return this.receivedOffers.filter((offer) =>
        offer.title.includes(this.search_title)
      )
    },
  },
  created() {
    this.$store.dispatch('offer/receiveOffers')
  },
  methods: {
    editOffer(offer) {
      this.$store.dispatch('offer/selectOffer', offer)
    },
    async deleteOffer(offerId) {
      await this.$store.dispatch('offer/deleteOffer', offerId)
    },
    setTime(time) {
      const date = new Date(time).getTime()
      return time ? date : new Date()
    },
    switchCurrent(current) {
      this.current = current
    },
    updateStatus(value) {
      const distance = new Date().getTime() - value.actualEndTime

      if (distance < 5000) {
        setTimeout(() => {
          this.$store.dispatch('offer/receiveOffers').then(() => {
            this.current = 'Активные'
          })
        }, 200)
      }
    },
    offerDetail(name, uid) {
      // this.current_name = name
      this.$store.dispatch('offer/setSelectedOffer', name)
      this.$store.dispatch('offer/setSelectedOfferUid', uid)
      this.$router.push('offers/offerDetail')
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.offers {
  display: flex;
  flex-wrap: wrap;
}

.top-wrapper {
  display: flex;
  justify-content: space-between;
}

.search {
  border-radius: 13px;
  border: none;
  padding: 10px;
  line-height: 16px;
}

.avatar,
.avatar-slug {
  width: 36px;
  height: 36px;
  margin-left: 20px;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
}

.avatar-slug {
  display: inline-flex;
  padding: 0;
  p {
    font-size: 10px;
    line-height: initial;
  }
}

.switcher {
  padding-bottom: 25px;
  padding-top: 30px;
  border-bottom: 0.5px solid $stepGray;
  margin-bottom: 30px;
  display: flex;
  button {
    border: none;
    background: none;
    padding: 12px;
    border-radius: 10px;

    img {
      margin-right: 8px;
    }
  }
  .button-active {
    background: #fff;
  }
}

.logo {
  width: 36px;
  height: 36px;
}

.company_name {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: $baseBlack;
}

.status {
  border-radius: 8px;
  padding: 8px 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: 30px;
  float: right;
}

.canceled {
  background: rgba(249, 60, 71, 0.08);
  color: #f93c47;
}

.absence {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
}

.cancel-status {
  background: #f5f5f6;
  border-radius: 18px;
  // padding: 18px 46px;
  padding-top: 18px;
  padding-left: 46px;
  padding-bottom: 14px;
  list-style-type: none;
  li {
    position: relative;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    h3 {
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
    }
  }
  li:before {
    content: url('~static/images/request_canceled.svg');
    position: absolute;
    left: -30px;
  }
}

.countdown {
  padding: 8px 15px;
  background: rgba($color: $secondBlue, $alpha: 0.08);
  color: $baseBlue;
  border-radius: 8px;
}

.timer-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.draft {
  background: rgba(254, 136, 98, 0.08);
  color: $baseOrange;
}

.moderate {
  background: rgba($color: $secondBlue, $alpha: 0.08);
  color: $baseBlue;
}

.offer {
  width: 29%;
  margin-right: 43px;
  padding: 14px;
  border-radius: 4px 20px 20px 20px;
  background: #fff;
  margin-bottom: 2%;
}

.title {
  font-size: 16px;
  line-height: 19px;
  color: $baseBlack;
  font-weight: bold;
}

.reward_description {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 14px;
  p {
    color: $basePink;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 0;
    margin-top: 0;
    margin-left: 11px;
  }
}

.cover {
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-top: 14px;
  margin-bottom: 20px;
}

.list {
  padding-left: 0;
  list-style-type: none;
  li {
    border-top: 0.5px solid $orderGray;
    color: $baseBlack;
    padding: 10px 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    &:last-child {
      border-bottom: 0.5px solid $orderGray;
    }
  }
}

.button {
  width: 100%;
  height: 50px;
  &_edit {
    @include button-edit-outline;
  }
  &_more {
    @include button-next-outline;
  }
  &_disabled {
    @include button-disabled-outline;
  }
}
</style>
