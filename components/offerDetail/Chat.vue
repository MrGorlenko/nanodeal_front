<template>
  <Messanger
    ref="messanger"
    v-model="message"
    :contacts="contacts"
    :messages="messages"
    :new-messages="new_messages"
    @sendMessage="sendMessage"
    @setActive="
      initialChatUID = $event
      loadMessages()
      connectSocket()
    "
    @upload-file="uploadFile"
    @loadNextPage="loadNextPage"
  />
</template>

<script>
import Messanger from '~/components/templates/Messanger.vue'
export default {
  components: {
    Messanger,
  },
  props: {
    chatUid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      contacts: [],
      initialChatUID: '',
      messages: [],
      new_messages: [],
      message: '',
      page: 1,
      test_curr: [],
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },
  created() {
    this.$axios
      .get(`http://31.172.64.228:8000/api/v1/chat/?task=${this.chatUid}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        this.contacts = res.data
        this.initialChatUID = res.data[0].uid
        this.loadedContacts = true
      })
      .then(() => {
        this.$refs.messanger.setActive(
          this.contacts[0].client.first_name,
          this.contacts[0].client.last_name,
          this.contacts[0].client.avatar,
          this.contacts[0].uid
        )
        this.connectSocket()
        this.loadMessages()
      })
  },
  methods: {
    loadMessages() {
      this.$axios
        .get(
          `http://31.172.64.228:8000/api/v1/chat/message/${this.initialChatUID}/?page=${this.page}`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        )
        .then((res) => {
          this.messages.push(...res.data.results)
        })
        .then(() => {
          this.$refs.messanger.loaded()
        })
    },
    connectDialog() {},
    connectSocket() {
      this.new_messages = []
      this.socket = new WebSocket(
        `ws://31.172.64.228:8000/ws/business_chat/${this.initialChatUID}/?Authorization=Bearer ${this.accessToken}`
      )
      const self = this
      this.socket.onmessage = async function (event) {
        const data = JSON.parse(event.data)
        await self.new_messages.push(data)
        self.$refs.messanger.loaded()
        self.updateDialog(data.message)
        self.readAllMessages(self.messages)
      }
    },
    async sendMessage() {
      await this.socket.send(
        JSON.stringify({
          command: 'new_message',
          text: `${this.message}`,
        })
      )
    },
    updateDialog(data) {
      let i
      let first
      this.contacts.forEach((contact, index) => {
        if (contact.uid === this.initialChatUID) {
          if (!data.file) {
            contact.last_message.text = data.text
          } else {
            contact.last_message.text = 'Документ'
            contact.last_message.file = '1'
            if (data.is_image) {
              contact.last_message.text = 'Картинка'
              contact.last_message.is_image = true
            }
          }

          contact.last_message.created_at = data.created_at
          i = index
          first = contact
        }
      })
      this.contacts.splice(i, 1)
      this.contacts.unshift(first)
      this.$refs.messanger.setActiveIndex(0)
    },
    async uploadFile(file) {
      const formData = await new FormData()
      if (/image/.test(file.type)) {
        this.updateDialog('Картинка')
      } else {
        this.updateDialog('Документ')
      }
      await formData.append('file', file)
      this.$axios
        .post(
          `http://31.172.64.228:8000/api/v1/chat/message/${this.initialChatUID}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(() => {
          this.$refs.messanger.loaded()
        })
    },
    loadNextPage() {
      this.page++
      this.loadMessages()
    },
    async readAllMessages(messages) {
      await messages.map((message) => {
        if (message.from_client) {
          return this.socket.send(
            JSON.stringify({
              command: 'message_read',
              message_uid: message.uid,
            })
          )
        }
        return message
      })
    },
  },
}
</script>

<style></style>
