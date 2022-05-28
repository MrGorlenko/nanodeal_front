<template>
  <div
    :class="[
      $style.messanger,
      support ? $style['messanger-support'] : $style['messanger-non-support'],
    ]"
  >
    <div v-if="!support" :class="$style['contacts-wrapper']">
      <h2 :class="$style.header">Сообщения</h2>
      <input
        v-model="search"
        :class="$style.search"
        placeholder="Поиск"
        type="text"
      />
      <div :class="$style.contacts">
        <div
          v-for="(contact, index) in contacts"
          :key="index"
          :class="[
            $style.contact,
            currentIndex === index ? $style['active-contact'] : '',
            new RegExp(search).test(
              contact.client.first_name + ' ' + contact.client.last_name
            )
              ? ''
              : 'd-none',
          ]"
          @click="
            setActiveIndex(index)
            setDialog(contact.uid),
              setActive(
                contact.client.first_name,
                contact.client.last_name,
                contact.client.avatar
              )
          "
        >
          <img
            v-if="contact.client.avatar"
            :class="[$style.avatar, $style['yes-avatar']]"
            :src="contact.client.avatar"
            alt=""
          />
          <div v-else :class="[$style.avatar, $style['no-avatar']]">
            {{ String(contact.client.first_name)[0]
            }}{{ String(contact.client.last_name)[0] }}
          </div>
          <h5 v-if="contact.client" :class="$style.name">
            {{ contact.client.first_name }} {{ contact.client.last_name }}
          </h5>
          <span v-if="contact.last_message" :class="$style.time">{{
            String(contact.last_message.created_at).slice(11, 16)
          }}</span>
          <p v-if="contact.last_message" :class="$style['last-message']">
            <template v-if="contact.last_message.text">
              {{ contact.last_message.text }}
            </template>
            <template v-else>
              <template v-if="contact.last_message.is_image">
                Картинка
              </template>
              <template v-else> Документ </template>
            </template>
          </p>
        </div>
      </div>
    </div>
    <div v-if="messages !== []" :class="$style.dialog">
      <div :class="$style.user">
        <template v-if="support"> Поддержка </template>
        <template v-else>
          <img
            v-if="activeContact.avatar"
            :src="activeContact.avatar"
            :class="[$style.avatar, $style['yes-avatar']]"
            alt=""
          />
          <div v-else :class="[$style.avatar, $style['no-avatar']]">
            {{ String(activeContact.first_name)[0] }}
            {{ String(activeContact.last_name)[0] }}
          </div>
          <p :class="$style['user-name']">
            {{ activeContact.first_name }} {{ activeContact.last_name }}
          </p>
          <span :class="$style.status">online</span>
        </template>
      </div>

      <div ref="messages" :class="$style.messages">
        <div
          v-if="showNextButton === true"
          ref="next"
          :class="$style['next-messages-button']"
        >
          <button v-if="messages && messages.length > 20" @click="loadNextPage">
            Загрузить предыдущие
          </button>
        </div>
        <div ref="old-messages" :class="$style['old-messages']">
          <div
            v-for="message in messages"
            :key="message.uid"
            :class="[
              $style.message,
              message.from_client ? $style.sender : $style.receiver,
            ]"
          >
            <template v-if="!message.file">
              <p>{{ message.text }}</p>
            </template>
            <template v-else>
              <img v-if="message.is_image" :src="message.file" alt="" />
              <a v-else :href="message.file" download>Скачать файл</a>
            </template>
            <span :class="$style.time">{{
              String(message.created_at).slice(11, 16)
            }}</span>
            <div v-if="!message.from_client" :class="$style['is-read']">
              <img
                v-if="!message.is_read"
                src="~/static/images/icons/sended.svg"
                alt=""
              />
              <img v-else src="~/static/images/icons/readed.svg" alt="" />
            </div>
          </div>
        </div>

        <div ref="new-messages" :class="$style['new-messages']">
          <div
            v-for="(message, index) in newMessages"
            :key="index"
            :class="[
              $style.message,
              message.message.from_client ? $style.sender : $style.receiver,
            ]"
          >
            <template v-if="!message.message.file">
              <p>{{ message.message.text }}</p>
              <span :class="$style.time">{{
                String(message.message.created_at).slice(11, 16)
              }}</span></template
            >
            <template v-else>
              <img
                v-if="message.message.is_image"
                :src="message.message.file"
                alt=""
              />
              <a v-else :href="message.message.file" download>Скачать файл</a>
            </template>
            <div v-if="!message.from_client" :class="$style['is-read']">
              <img
                v-if="!message.is_read"
                src="~/static/images/icons/sended.svg"
                alt=""
              />
              <img v-else src="~/static/images/icons/readed.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div :class="$style['message-wrapper']">
        <div>
          <input
            ref="file"
            :class="$style['upload-file']"
            type="file"
            @change="handleFileUpload()"
          />
          <img src="~/static/images/append.svg" alt="" />
        </div>
        <input
          v-model="model"
          :class="$style.input"
          type="text"
          placeholder="Введите сообщение"
          @keyup.enter="sendMessage"
        />
        <img src="~/static/images/Send.svg" alt="" @click="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    support: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
      default: () => [],
    },
    newMessages: {
      type: Array,
      default: () => [],
    },
    value: {
      default: '',
      type: [Number, String],
    },
    contacts: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      currentIndex: 0,
      showNextButton: false,
      activeContact: {
        first_name: '',
        last_name: '',
        avatar: '',
      },
      search: '',
      textMessage: '',
      file: '',
      top: 0,
      firstLoad: true,
    }
  },

  computed: {
    userData() {
      return this.$store.getters['user_data/data']
    },
    current() {
      return Object.keys(this.messages)[this.currentIndex]
    },
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },
  methods: {
    setActiveIndex(index) {
      this.currentIndex = index
    },
    setDialog(uid) {
      this.$emit('setActive', uid)
    },
    sendMessage() {
      if (this.model) this.$emit('sendMessage')
      this.model = ''
    },
    scrollTo(top) {
      this.$refs.messages.scrollTo(0, top)
    },
    goto(refName1, refName2) {
      return new Promise((resolve, reject) => {
        const element1 = this.$refs[refName1]
        const top1 = element1.offsetHeight
        const element2 = this.$refs[refName2]
        const top2 = element2.offsetHeight
        const top = top1 + top2

        if (this.firstLoad) {
          this.top = top
          this.scrollTo(this.top)
          this.firstLoad = false
        } else {
          this.scrollTo(this.top)
        }
        resolve()
      })
    },
    loaded() {
      this.goto('old-messages', 'new-messages').then(() => {
        this.showNextButton = true
      })
    },
    setActive(firstName, secondName, avatar) {
      this.activeContact.first_name = firstName
      this.activeContact.last_name = secondName
      avatar
        ? (this.activeContact.avatar = avatar)
        : (this.activeContact.avatar = null)
    },
    async handleFileUpload() {
      this.file = await this.$refs.file.files[0]
      this.$emit('upload-file', this.file)
    },
    loadNextPage() {
      this.$emit('loadNextPage')
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.messanger {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr;
  grid-column-gap: 16px;
  border-radius: 20px;
  background-color: #fff;
  height: 70vh;
  padding: 16px;
}

.messanger-non-support {
  grid-template-areas: 'contacts-wrapper dialog dialog';
}

.messanger-support {
  grid-template-areas: 'dialog dialog dialog';
}

.header {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}
.contacts {
  overflow-y: scroll;
  height: 45vh;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}

.contacts-wrapper {
  grid-area: contacts-wrapper;
  height: 100%;
}

.dialog {
  grid-area: dialog;
  background-color: $baseBg;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 65vh;
}

.search {
  padding: 9px 15px;
  background-color: rgba($color: $orderGray, $alpha: 0.8);
  border: none;
  height: 36px;
  border-radius: 13px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}

.messages img {
  width: 100%;
}

.contact {
  display: grid;
  grid-template-areas: 'avatar name name time' 'avatar last-message last-message last-message';
  grid-template-rows: 27px 27px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 14px 10px;
  transition: 0.2s;
  &:hover {
    background-color: $baseBg;
  }
}

.active-contact {
  background-color: $baseBg;
}

.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  grid-area: avatar;
}

.name {
  grid-area: name;
  font-size: 14px;
}

.user-name {
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  position: absolute;
  top: 15px;
  left: 67px;
}

.status {
  color: $baseGreen;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  position: absolute;
  bottom: 14px;
  left: 67px;
}

.time {
  grid-area: time;
}

.last-message {
  grid-area: last-message;
  margin-bottom: 0;
}

.message-wrapper {
  padding: 12px 13px;
}

.input {
  border-radius: 18px;
  background-color: $orderGray;
  border: none;
  height: 100%;
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
}

.yes-avatar {
  object-fit: cover;
}

.no-avatar {
  background-color: rgba($color: $baseBlue, $alpha: 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
}

.user {
  border-radius: 16px;
  background-color: #fff;
  padding: 9.5px;
  position: relative;
}

.message-wrapper {
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
}

.messages {
  padding-bottom: 20px;
  overflow-y: scroll;
  flex-grow: 1;
}

.old-messages {
  display: flex;
  flex-direction: column-reverse;
  min-height: 98%;
}

.new-messages {
  display: flex;
  flex-direction: column;
}

.message {
  padding-top: 19px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 36px;
  max-width: 55%;
  min-width: 90px;
  margin-top: 10px;
  position: relative;
  .time {
    position: absolute;
    bottom: 10px;
    right: 43px;
    font-weight: 600;
    font-size: 11px;
    line-height: 13px;
    color: $baseGray;
  }
  .is-read {
    position: absolute;
    width: 15px;
    height: 8px;
    bottom: 14px;
    right: 23px;
    img {
      position: absolute;
      top: 0;
    }
  }
  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 0;
  }
}

.sender {
  background: #fff;
  align-self: start;
  border-radius: 2px 10px 10px 10px;
}

.receiver {
  background: $disabledOrange;
  align-self: end;
  border-radius: 10px 10px 2px 10px;
}

.upload-file {
  position: absolute;
  width: 36px;
  height: 36px;
  opacity: 0;
}

.next-messages-button {
  @include center-flex;
}
</style>
