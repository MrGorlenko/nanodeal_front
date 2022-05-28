<template>
  <div>
    <Messanger
      ref="messanger"
      v-model="message"
      :support="true"
      :messages="messages"
      :new-messages="new_messages"
      @sendMessage="sendMessage"
      @upload-file="uploadFile"
    />
  </div>
</template>

<script>
import Messanger from '~/components/templates/Messanger'
export default {
  components: {
    Messanger,
  },
  data() {
    return {
      contacts: [],
      messages: [],
      new_messages: [],
      message: '',
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },
  created() {
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
      .then(() => {
        this.$refs.messanger.loaded()
      })

    this.socket = new WebSocket(
      `ws://13.53.66.70:8000/ws/business_chat/5327c703-6bb9-4499-a2bf-50d63b12c27a/?Authorization=Bearer ${this.accessToken}`
    )
  },

  mounted() {
    const self = this
    this.socket.onmessage = async function (event) {
      await self.new_messages.push(JSON.parse(event.data))
      self.$refs.messanger.loaded()
    }
  },

  methods: {
    async sendMessage() {
      await this.socket.send(
        JSON.stringify({
          command: 'new_message',
          text: `${this.message}`,
        })
      )
    },
    async uploadFile(file) {
      const formData = await new FormData()

      await formData.append('file', file)
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
    },
  },
}
</script>

<style></style>
