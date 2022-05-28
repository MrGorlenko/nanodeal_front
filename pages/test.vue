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
      `ws://13.53.66.70:8000/ws/business_chat/5327c703-6bb9-4499-a2bf-50d63b12c27a/?Authorization=Bearer ${this.accessToken}`
    )

    this.$axios
      .get('/api/v1/chat/', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        this.contacts = res.data
      })

    this.$axios
      .get(
        '/api/v1/chat/message/5327c703-6bb9-4499-a2bf-50d63b12c27a/?page=1',
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
        '/api/v1/chat/message/5327c703-6bb9-4499-a2bf-50d63b12c27a/',
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
