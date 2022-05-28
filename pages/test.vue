<template>
  <div :class="$style.jojo">
    <div :class="$style.loader">
      <img src="~/static/images/animated-loader.svg" alt="" />
    </div>
    {{ file }}

    {{ new_messages }}

    <div :class="$style.wrapper">
      <input id="file" ref="file" type="file" @change="handleFileUpload()" />

      <button @click="submitFile()">Submit</button>

      <input v-model="message" type="text" placeholder="ur ass" />

      <button @click="sendMessage">test</button>
    </div>
  </div>
</template>

<script>
import '~/assets/scss/daterange.scss'

export default {
  components: {
    // WebSocket,
  },
  data() {
    return {
      connection: null,
      socket: '',
      message: '',
      messages: [],
      new_messages: [],
      lol: '123',
      contacts: [],

      file: '',
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },
  created() {
    this.socket = new WebSocket(
      `ws://31.172.64.228:8000/ws/business_chat/5327c703-6bb9-4499-a2bf-50d63b12c27a/?Authorization=Bearer ${this.accessToken}`
    )

    this.$axios
      .get('http://31.172.64.228:8000/api/v1/chat/', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        this.contacts = res.data
      })

    this.$axios
      .get(
        'http://31.172.64.228:8000/api/v1/chat/message/5327c703-6bb9-4499-a2bf-50d63b12c27a/?page=1',
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      )
      .then((res) => {
        this.messages = res.data.results
      })
  },
  mounted() {
    const self = this
    this.socket.onmessage = function (event) {
      // console.log(event)
      self.new_messages.push(JSON.parse(event.data))
    }
    // this.socket.onmessage = this.newMsg(event)
  },
  methods: {
    sendMessage() {
      this.socket.send(
        JSON.stringify({
          command: 'new_message',
          text: `${this.message}`,
        })
      )
    },
    getMessageAlt() {
      this.socket.emit('getMessage', { id: 'abc123' }, (resp) => {
        this.messageRxd = resp
      })
    },
    newMsg(msg) {
      this.lol = msg
    },

    async submitFile() {
      const formData = await new FormData()

      await formData.append('file', this.file)
      this.$axios.post(
        'http://31.172.64.228:8000/api/v1/chat/message/5327c703-6bb9-4499-a2bf-50d63b12c27a/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      // .then((res) => {
      //   // console.log(res)
      // })
      // .then((err) => {
      //   // console.log(err)
      // })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },

    draftData(value) {
      if (!value.uid) {
        if (value.step === 1) {
          this.$store.dispatch('offer/draftOfferPost', value).then(() => {
            this.$router.push('/offers')
            // this.$store.dispatch('offer/deleteOffer')
          })
        }
        if (value.step === 2) {
          this.$store.dispatch('offer/setConditions', value)
          this.$store
            .dispatch('offer/draftOfferPost', {
              step: this.all_data.step,
              title: this.all_data.title,
              reward_description: this.all_data.reward_description,
              cover: this.all_data.cover,
              conditions: this.all_data.conditions
                ? this.all_data.conditions
                : null,
              comment: this.all_data.comment ? this.all_data.comment : null,
              complete_count: this.all_data.complete_count
                ? this.all_data.complete_count
                : null,
            })
            .then(() => {
              this.$router.push('/offers')
              // this.$store.dispatch('offer/deleteOffer')
            })
        }
        if (value.step === 3) {
          this.$store.dispatch('offer/setRequirements', value)
          this.$store
            .dispatch('offer/draftOfferPost', {
              step: this.all_data.step,
              title: this.all_data.title,
              reward_description: this.all_data.reward_description,
              cover: this.all_data.cover,
              conditions: this.all_data.conditions,
              comment: this.all_data.comment,
              complete_count: this.all_data.complete_count,
              gender: this.all_data.gender ? this.all_data.gender : null,
              age_from: this.all_data.age_from ? this.all_data.age_from : null,
              age_to: this.all_data.age_to ? this.all_data.age_to : null,
              followers_count: this.all_data.followers_count
                ? this.all_data.followers_count
                : null,
              is_manual_moderate: this.all_data.is_manual_moderate,
            })
            .then(() => {
              this.$router.push('/offers')
              // this.$store.dispatch('offer/deleteOffer')
            })
        }
        if (value.step === 4) {
          this.$store.dispatch('offer/setTimingAndAddress', value)
          this.$store
            .dispatch('offer/draftOfferPost', {
              step: this.all_data.step,
              title: this.all_data.title,
              reward_description: this.all_data.reward_description,
              cover: this.all_data.cover,
              conditions: this.all_data.conditions,
              comment: this.all_data.comment,
              complete_count: this.all_data.complete_count,
              gender: this.all_data.gender,
              age_from: this.all_data.age_from,
              age_to: this.all_data.age_to,
              followers_count: this.all_data.followers_count,
              is_manual_moderate: this.all_data.is_manual_moderate,
              is_online: this.all_data.is_online,
              places: this.all_data.places ? this.all_data.places : null,
              start_date: this.all_data.start_date
                ? this.all_data.start_date
                : null,
              end_date: this.all_data.end_date ? this.all_data.end_date : null,
            })
            .then(() => {
              this.$router.push('/offers')
              // this.$store.dispatch('offer/deleteOffer')
            })
        }
        if (value.step === 5) {
          this.$store.dispatch('offer/setStep', 5)
          this.$store
            .dispatch('offer/draftOfferPost', this.all_data)
            .then(() => {
              this.$router.push('/offers')
              // this.$store.dispatch('offer/deleteOffer')
            })
        }
      } else {
        const data = {}
        if (value.step === 1) {
          data.uid = this.all_data.uid
          data.title = value.title
          data.reward_description = value.reward_description
          if (value.cover) data.cover = value.cover
        }

        if (value.step === 2) {
          data.step = value.step
          data.uid = this.all_data.uid
          data.title = this.title
          data.reward_description = this.reward_description
          if (!this.all_data.show_file.includes('http://')) {
            data.cover = this.all_data.cover
          }
          data.conditions = value.conditions
          data.comment = value.comment
          data.complete_count = value.complete_count
        }

        if (value.step === 3) {
          data.step = value.step
          data.uid = this.all_data.uid
          data.title = this.title
          data.reward_description = this.reward_description
          if (!this.all_data.cover.includes('http://')) {
            data.cover = this.all_data.cover
          }
          data.conditions = this.all_data.conditions
          data.comment = this.all_data.comment
          data.complete_count = this.all_data.complete_count
          data.gender = value.gender
          data.age_from = value.age_from
          data.age_to = value.age_to
          data.followers_count = value.followers_count
          data.is_manual_moderate = value.is_manual_moderate
        }

        if (value.step === 4) {
          data.step = value.step
          data.uid = this.all_data.uid
          data.title = this.title
          data.reward_description = this.reward_description
          if (!this.all_data.cover.includes('http://')) {
            data.cover = this.all_data.cover
          }
          data.conditions = this.all_data.conditions
          data.comment = this.all_data.comment
          data.complete_count = this.all_data.complete_count
          data.gender = this.all_data.gender
          data.age_from = this.all_data.age_from
          data.age_to = this.all_data.age_to
          data.followers_count = this.all_data.followers_count
          data.is_manual_moderate = this.all_data.is_manual_moderate

          data.is_online = value.is_online
          data.places = value.places
          data.start_date = value.start_date
          data.end_date = value.end_date
        }
        if (value.step === 5) {
          data.step = value.step
          data.uid = this.all_data.uid
          data.title = this.title
          data.reward_description = this.reward_description
          if (!this.all_data.cover.includes('http://')) {
            data.cover = this.all_data.cover
          }
          data.conditions = this.all_data.conditions
          data.comment = this.all_data.comment
          data.complete_count = this.all_data.complete_count
          data.gender = this.all_data.gender
          data.age_from = this.all_data.age_from
          data.age_to = this.all_data.age_to
          data.followers_count = this.all_data.followers_count
          data.is_manual_moderate = this.all_data.is_manual_moderate

          data.is_online = this.all_data.is_online
          data.places = this.all_data.places
          data.start_date = this.all_data.start_date
          data.end_date = this.all_data.end_date
        }
        this.$store.dispatch('offer/draftOfferPatch', data).then(() => {
          this.$router.push('/offers')
        })
      }
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
@import '~/assets/scss/anime.scss';
.jojo {
  height: 100vh;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 500px;
  height: 500px;
  @include center-flex;
}
</style>
