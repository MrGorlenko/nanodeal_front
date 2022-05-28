<template>
  <Base>
    <h2 class="app_header">Новое предложение</h2>
    <hr :class="$style.line" />
    <div :class="$style.offer">
      <b-tabs
        v-model="step"
        :active-nav-item-class="$style.active_switcher"
        :class="$style.nav"
        content-class="mt-3"
      >
        <b-tab
          :title-link-class="linkClass(0)"
          title="Описание"
          active
          @click="setStep(0)"
        >
          <template #title>
            <div>
              <span v-if="step < 1">1.</span>
              <img
                v-else
                src="~/static/images/passed.svg"
                alt=""
                :class="$style['passed_icon']"
              />
              <span> Описание</span>
            </div>
          </template>
          <Description
            v-if="step == 0"
            :prop-id="all_data.uid ? all_data.uid : ''"
            :prop-title="all_data.title"
            :prop-reward-description="all_data.reward_description"
            :prop-show-file="all_data.cover"
            @resData="resDescription"
            @draftData="draftDescription"
            @deleteAll="deleteAll"
          />
        </b-tab>
        <b-tab
          :disabled="check_step < 1 ? true : false"
          :title-link-class="linkClass(1)"
          title="Условие"
          @click="setStep(1)"
        >
          <template #title>
            <div>
              <span v-if="step < 2">2.</span>
              <img
                v-else
                src="~/static/images/passed.svg"
                alt=""
                :class="$style['passed_icon']"
              />
              <span>Условие</span>
            </div>
          </template>
          <Conditions
            v-if="step == 1"
            :prop-id="all_data.uid ? all_data.uid : ''"
            :prop-conditions="all_data.conditions"
            :prop-comment="all_data.comment"
            :prop-complete-count="
              all_data.complete_count ? Number(all_data.complete_count) : null
            "
            @resData="resConditions"
            @draftData="draftConditions"
          />
        </b-tab>
        <b-tab
          :disabled="check_step < 2 ? true : false"
          :title-link-class="linkClass(2)"
          title="Требования"
          @click="setStep(2)"
        >
          <template #title>
            <div>
              <span v-if="step < 3">3.</span>
              <img
                v-else
                src="~/static/images/passed.svg"
                alt=""
                :class="$style['passed_icon']"
              />
              <span>Требования</span>
            </div>
          </template>
          <Requirements
            v-if="step == 2"
            :prop-id="all_data.uid ? all_data.uid : ''"
            :prop-gender="all_data.gender"
            :prop-age-from="
              all_data.age_from ? Number(all_data.age_from) : null
            "
            :prop-age-to="all_data.age_to ? Number(all_data.age_to) : null"
            :prop-followers-count="
              all_data.followers_count ? Number(all_data.followers_count) : null
            "
            :prop-is-manual="all_data.is_manual_moderate"
            @resData="resRequirements"
            @draftData="draftRequirements"
          />
        </b-tab>
        <b-tab
          :disabled="check_step < 3 ? true : false"
          :title-link-class="linkClass(3)"
          title="Сроки и адрес"
          @click="setStep(3)"
        >
          <template #title>
            <div>
              <span v-if="step < 4">4.</span>
              <img
                v-else
                src="~/static/images/passed.svg"
                alt=""
                :class="$style['passed_icon']"
              />
              <span>Сроки и адрес</span>
            </div>
          </template>
          <TimingAddress
            v-if="step == 3"
            :prop-id="all_data.uid ? all_data.uid : ''"
            :prop-places="all_data.places"
            :prop-start-date="all_data.start_date"
            :prop-end-date="all_data.end_date"
            :prop-is-online="all_data.is_online"
            @resData="resTiming"
            @draftData="draftTiming"
          />
        </b-tab>
        <b-tab
          :disabled="check_step < 4 ? true : false"
          :title-link-class="linkClass(4)"
          title="Проверка"
          @click="setStep(4)"
        >
          <template #title>
            <div>
              <span v-if="step < 5">5.</span>
              <span v-else class="circle"></span>
              <span>Проверка</span>
            </div>
          </template>
          <Checking @createOffer="createOffer" @draftData="draftChecking" />
        </b-tab>
      </b-tabs>
    </div>
  </Base>
</template>

<script>
import Base from '~/components/Base.vue'
import Description from '~/components/addNew/Description.vue'
import Conditions from '~/components/addNew/Conditions.vue'
import Requirements from '~/components/addNew/Requirements.vue'
import TimingAddress from '~/components/addNew/TimingAddress.vue'
import Checking from '~/components/addNew/Checking.vue'
export default {
  components: {
    Base,
    Description,
    Conditions,
    Requirements,
    TimingAddress,
    Checking,
  },
  data() {
    return {
      step: 0,
      check_step: 0,
      newOffer: new FormData(),
      data_offer: {
        title: '',
        reward_description: '',
        cover: '',
      },
    }
  },
  computed: {
    all_data() {
      return this.$store.getters['offer/data']
    },
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },
  created() {
    if (!this.all_data.uid) this.$store.dispatch('offer/clearData')
    this.$store.dispatch('offer/setSaveMode', false)
  },
  mounted() {
    if (this.all_data.step) this.setStep(this.all_data.step - 1)
  },
  methods: {
    linkClass(idx) {
      if (this.step === idx) {
        return [this.$style.active]
      }
      if (idx < this.step) {
        return [this.$style.passed]
      }
    },

    setCheckedStep(step) {
      this.check_step = step
    },

    async setStep(step) {
      await this.setCheckedStep(step)
      this.step = step
    },

    nextCheckStep() {
      this.check_step++
    },

    async next() {
      await this.nextCheckStep()
      this.step++
    },

    createOffer(value) {
      this.newOffer.set('status', value.status)
      this.$store.dispatch('offer/draftOfferPatchNext', {
        uid: this.all_data.uid,
        data: this.newOffer,
      })
    },

    async resDescription(value) {
      if (!this.all_data.uid) this.newOffer = new FormData()
      this.newOffer.append('step', 2)
      this.newOffer.append('title', value.title)
      this.newOffer.append('reward_description', value.reward_description)
      if (value.cover) this.newOffer.append('cover', value.cover)
      this.all_data.uid
        ? await this.$store.dispatch('offer/draftOfferPatchNext', {
            uid: this.all_data.uid,
            data: this.newOffer,
          })
        : await this.$store.dispatch('offer/draftOfferPostNext', this.newOffer)

      this.next()
    },

    async draftDescription(value) {
      if (!this.all_data.uid) this.newOffer = new FormData()
      this.newOffer.append('step', 1)
      this.newOffer.append('title', value.title)
      this.newOffer.append('reward_description', value.reward_description)
      if (value.cover) this.newOffer.append('cover', value.cover)

      this.all_data.uid
        ? await this.$store.dispatch('offer/draftOfferPatch', {
            uid: this.all_data.uid,
            data: this.newOffer,
          })
        : await this.$store.dispatch('offer/draftOfferPost', this.newOffer)
    },

    async resConditions(value) {
      this.newOffer.set('step', 3)
      this.newOffer.append('conditions', JSON.stringify(value.conditions))
      this.newOffer.append('comment', value.comment)
      this.newOffer.append('complete_count', value.complete_count)

      await this.$store.dispatch('offer/draftOfferPatchNext', {
        uid: this.all_data.uid,
        data: this.newOffer,
      })

      this.next()
    },

    async draftConditions(value) {
      this.newOffer.set('step', 2)
      this.newOffer.append('conditions', JSON.stringify(value.conditions))
      this.newOffer.append('comment', value.comment)
      this.newOffer.append('complete_count', value.complete_count)
      await this.$store.dispatch('offer/draftOfferPatch', {
        uid: this.all_data.uid,
        data: this.newOffer,
      })
    },

    async resRequirements(value) {
      this.newOffer.set('step', 4)
      this.newOffer.append('gender', value.gender)
      this.newOffer.append('age_from', value.age_from)
      this.newOffer.append('age_to', value.age_to)
      this.newOffer.append('followers_count', value.followers_count)
      this.newOffer.append('is_manual_moderate', value.is_manual_moderate)
      await this.$store.dispatch('offer/draftOfferPatchNext', {
        uid: this.all_data.uid,
        data: this.newOffer,
      })
      this.next()
    },

    async draftRequirements(value) {
      this.newOffer.set('step', 3)
      this.newOffer.append('gender', value.gender)
      this.newOffer.append('age_from', value.age_from)
      this.newOffer.append('age_to', value.age_to)
      this.newOffer.append('followers_count', value.followers_count)
      this.newOffer.append('is_manual_moderate', value.is_manual_moderate)
      await this.$store.dispatch('offer/draftOfferPatch', {
        uid: this.all_data.uid,
        data: this.newOffer,
      })
    },

    async resTiming(value) {
      this.newOffer.set('step', 5)
      this.newOffer.append('start_date', value.start_date)
      this.newOffer.append('end_date', value.end_date)
      this.newOffer.append('is_online', value.is_online)
      this.newOffer.append('places', JSON.stringify(value.places_id))
      await this.$store.dispatch('offer/draftOfferPatchNext', {
        uid: this.all_data.uid,
        data: this.newOffer,
      })
      this.next()
    },

    async draftTiming(value) {
      this.newOffer.set('step', 4)
      this.newOffer.append('start_date', value.start_date)
      this.newOffer.append('end_date', value.end_date)
      this.newOffer.append('is_online', value.is_online)
      this.newOffer.append('places', JSON.stringify(value.places_id))
      await this.$store.dispatch('offer/draftOfferPatch', {
        uid: this.all_data.uid,
        data: this.newOffer,
      })
    },

    async draftChecking(value) {
      this.newOffer.set('step', 5)
      this.newOffer.append('status', value.status)
      await this.$store.dispatch('offer/draftOfferPatch', {
        uid: this.all_data.uid,
        data: this.newOffer,
      })
    },

    deleteAll() {
      this.$store.dispatch('offer/clearData')
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.line {
  border-top-width: 0.5px;
  margin-bottom: 30px;
  margin-top: 35px;
  background: $secondGray;
}
.offer {
  width: 100%;
  height: calc(100% - 95.5px);
  background: #fff;
  box-shadow: 0px 0.989583px 2.96875px rgba(233, 216, 207, 0.3);
  border-radius: 16px;
  padding: 40px 30px 96px 30px;
}

.passed_icon {
  position: absolute;
  left: 0;
  top: 10px;
}

.nav {
  ul {
    border-bottom: none;
  }
  ul a {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    color: rgba(197, 202, 213, 0.5) !important;
    border-bottom: 2px solid rgba(197, 202, 213, 0.5) !important;
    font-size: 12px;
    line-height: 14px;
  }

  ul li {
    margin-right: 20px;
    position: relative;
  }

  ul .active,
  ul .passed {
    border-bottom: 2px solid $baseOrange !important;
  }

  ul .active {
    color: $baseOrange !important;
  }

  ul .passed {
    color: $baseBlack !important;
  }
}
</style>
