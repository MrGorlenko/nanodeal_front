<template>
  <div>
    <h3 class="offer_header">Описание предложения</h3>

    <CustomInput v-model="title" :label="'Название предложения'" />

    <CustomInput
      v-model="reward_description"
      :label="'Описание вознаграждения'"
    />

    <h3 class="offer_header">Обложка предложения</h3>

    <div :class="$style.upload">
      <input
        ref="file"
        type="file"
        :class="$style['upload-input']"
        accept="image/png, image/gif, image/jpeg"
        @change="handleFileUpload()"
      />
      <img
        :class="uploaded ? $style.uploaded_img : $style.img"
        :src="show_file"
        alt=""
      />
      <p :class="uploaded ? 'd-none' : $style['upload_label']">
        Прикрепить обложку/фотографию предложения
      </p>
    </div>
    <NextOffer
      :next="next"
      @resData="resData"
      @draftData="draftData"
      @deleteAll="deleteAll"
    />
  </div>
</template>

<script>
import NextOffer from '~/components/widgets/NextOffer'
import CustomInput from '~/components/widgets/CustomInput.vue'
import setBase64 from '~/mixins/setBase64'
export default {
  components: {
    NextOffer,
    CustomInput,
  },
  mixins: [setBase64],
  props: {
    propId: {
      default: null,
      type: String,
    },
    propTitle: {
      default: '',
      type: String,
    },
    propRewardDescription: {
      default: '',
      type: String,
    },
    propShowFile: {
      default: '',
      type: [String, Object, File],
    },
  },
  data() {
    return {
      cover: '',
      uploaded: false,
      show_file: 'images/upload.svg',
      title: '',
      reward_description: '',
    }
  },
  computed: {
    next() {
      const conditions = this.title !== '' && this.reward_description !== ''
      return conditions
    },
  },
  created() {
    this.setDescription()
  },
  methods: {
    async handleFileUpload() {
      this.cover = await this.$refs.file.files[0]
      this.uploaded = true
      this.show_file = await this.setBase64(this.cover)
    },

    setDescription() {
      this.title = this.propTitle
      this.reward_description = this.propRewardDescription
      if (this.propShowFile) {
        this.uploaded = true
        this.show_file = this.propShowFile
      }
    },

    deleteAll() {
      this.title = ''
      this.reward_description = ''
      this.cover = ''
      this.uploaded = false
      this.show_file = 'images/upload.svg'
      this.$emit('deleteAll')
    },

    setData() {
      const data = {}
      data.step = 1
      data.title = this.title
      data.reward_description = this.reward_description
      if (this.propId) data.uid = this.propId
      return data
    },

    async draftData() {
      const data = await this.setData()
      data.cover = this.cover
      this.$emit('draftData', data)
    },

    async resData() {
      const data = await this.setData()
      data.cover = this.cover
      this.$emit('resData', data)
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.input {
  border: 1px solid $orderGray;
  border-radius: 13px;
  width: 600px;
  height: 50px;
}

.upload {
  width: 320px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.4px dashed $orderGray;
  border-radius: 4px 20px 20px 20px;
  position: relative;
  .img {
    width: 48px;
    height: 41px;
  }
  .uploaded_img {
    width: 100%;
    height: 100%;
    border-radius: 4px 20px 20px 20px;
    object-fit: cover;
  }
}

.upload_label {
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: $baseGray;
  margin-top: 10px;
}

.upload-input {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
