<template>
  <div>
    <h3 :class="$style.header">Регистрация компании</h3>

    <div :class="$style.photo">
      <img v-if="show_avatar" :class="$style.avatar" :src="file" alt="" />
      <div v-else :class="[$style.avatar, $style['avatar-none']]">
        {{ companyName }}
      </div>
      <div class="upload">
        <img src="/images/reg/camera.svg" alt="" />
        <input
          ref="file"
          :class="$style['upload-file']"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          @change="handleFileUpload()"
        />
      </div>
    </div>

    <input
      v-model="name"
      :class="$style.input"
      type="text"
      placeholder="Название компании"
      @input="checkNext"
    />

    <textarea
      v-model="description"
      :class="[$style.input, $style.textarea]"
      type="text"
      placeholder="Описание компании"
      @input="checkNext"
    />

    <p :class="$style.category_label">Выберите категорию</p>

    <div v-if="categories.length < 3" :class="$style.categories_wrapper">
      <div
        v-for="(category, index) in categories"
        :key="index"
        :class="$style.categories"
      >
        <div :class="$style.cat_wrapper">
          <div :class="[$style.cat]">
            <button :class="$style.close" @click="removeCat(index)">
              <img src="/images/reg/close.svg" alt="" />
            </button>
            <img :class="$style.cat_img" :src="category.icon" alt="" />
            <p>{{ category.title }}</p>
          </div>
        </div>
      </div>
      <div :class="$style.categories">
        <div :class="$style.cat_wrapper">
          <div
            :class="[$style.add_cat, $style.cat]"
            @click="callModalCategories"
          >
            <img src="/images/reg/add_cat.svg" alt="" />
            <p>Добавить</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else :class="$style.agile_wrapper">
      <div
        v-for="(category, index) in categories"
        :key="index"
        :class="$style.categories"
        class="slider"
      >
        <div :class="$style.cat_wrapper">
          <div :class="[$style.cat]">
            <button :class="$style.close" @click="removeCat(index)">
              <img src="/images/reg/close.svg" alt="" />
            </button>
            <img :class="$style.cat_img" :src="category.icon" alt="" />
            <p>{{ category.title }}</p>
          </div>
        </div>
      </div>

      <div :class="$style.categories" class="slider">
        <div :class="$style.cat_wrapper">
          <div
            :class="[$style.add_cat, $style.cat]"
            @click="callModalCategories"
          >
            <img src="/images/reg/add_cat.svg" alt="" />
            <p>Добавить</p>
          </div>
        </div>
      </div>
    </div>

    <Categories @resData="resDataFromCategoryModal" />
    <Social
      :name="social_name"
      :link-example="social_link"
      :src="social_img"
      @resData="resDataFromSocialModal"
    />

    <p :class="$style.category_label">Добавить социальные сети</p>

    <div :class="$style.social_wrapper">
      <div
        v-for="social in socials"
        :key="social.name"
        :class="social.checked ? $style.social_selected : ''"
        @click="
          !social.checked
            ? callModalSocials(social.title, social.link, social.img)
            : ''
        "
      >
        <img :src="social.img" alt="" />
      </div>
    </div>

    <button
      :disabled="next ? false : true"
      :class="$style.button"
      @click="
        goNext()
        resData()
      "
    >
      Далее
    </button>
  </div>
</template>

<script>
import '~/assets/scss/reg-widgets.scss'
import Categories from '~/components/modals/reg/Categories'
import Social from '~/components/modals/reg/Socials.vue'
import setBase64 from '~/mixins/setBase64.js'

export default {
  components: {
    Categories,
    Social,
  },

  mixins: [setBase64],

  data() {
    return {
      file: '/images/reg/company_logo.png',
      loaded: false,
      next: false,
      name: '',
      description: '',
      categories: [],
      categories_indexes: [],
      socials: [
        {
          title: 'Facebook',
          link: 'facebook.com/',
          img: '/images/reg/social/fb.svg',
          checked: false,
        },
        {
          title: 'VKontakte',
          link: 'vk.com/',
          img: '/images/reg/social/vk.svg',
          checked: false,
        },
        {
          title: 'OK',
          link: 'ok.ru/',
          img: '/images/reg/social/ok.svg',
          checked: false,
        },
        {
          title: 'Instagram',
          link: 'instagram.com/',
          img: '/images/reg/social/inst.svg',
          checked: false,
        },
        {
          title: 'YouTube',
          link: 'youtube.com/channel/',
          img: '/images/reg/social/youtube.svg',
          checked: false,
        },
        {
          title: 'Twitter',
          link: 'twitter.com/',
          img: '/images/reg/social/twitter.svg',
          checked: false,
        },
      ],
      logo: '',
      selected_socials: [],
      export_socials: [],
      social_name: '',
      social_img: '',
      social_link: '',
      show_avatar: false,
    }
  },
  computed: {
    companyName() {
      if (this.name) return this.name.substring(0, 2)
      return 'AA'
    },
  },
  methods: {
    /* Отслеживание события загрузки фото */
    // handleImages(files) {
    //   this.$refs.upload.readAsDataURL(files[0]).then((value) => {
    //     this.file = value
    //     this.show_avatar = true
    //     this.logo = value
    //       .substring(value.indexOf('base64,'))
    //       .substring(7, value.length)
    //   })
    // },
    /* Вызов события загрузки фото по нажатию на иконку */
    // clickUpload() {
    //   this.$refs.upload.reset()
    //   this.$refs.upload.append()
    // },
    /* Вызов модального окна категорий */
    async handleFileUpload() {
      this.emitFile = await this.$refs.file.files[0]
      this.file = await this.setBase64(this.emitFile)
      this.show_avatar = true
    },
    callModalCategories() {
      this.$modal.show('categories-modal')
    },
    /* Вызов модального окна социальных сетей */
    callModalSocials(name, link, src) {
      this.social_name = name
      this.social_link = link
      this.social_img = src
      this.$modal.show('social-modal')
    },
    /* Получение данных из модального окна категорий */
    resDataFromCategoryModal(value) {
      this.categories = value.elements
      this.categories_indexes = value.indexes
    },
    /* Получение данных из модального окна социальных сетей */
    resDataFromSocialModal(obj) {
      const cell = { title: obj.title, link: obj.link }
      this.selected_socials.push(cell)
      /* По выбору социальной сети, меняет состояние на checked. Checked повторно нажать нельзя */
      for (const soc of this.socials) {
        for (const selSoc of this.selected_socials) {
          if (soc.title === selSoc.title) {
            soc.checked = true
          }
        }
      }
    },
    removeCat(index) {
      this.categories.splice(index, 1)
    },
    checkName() {
      if (this.name.length < 3) return false
      return true
    },
    checkNext() {
      this.checkName() ? (this.next = true) : (this.next = false)
    },
    goNext() {
      this.$emit('goNext')
    },
    resData() {
      // const formData = await new FormData()
      // await formData.append('file', this.emitFile)
      const data = {}
      this.emitFile ? (data.logo = this.emitFile) : (this.emitFile = '')
      data.description = this.description
      data.name = this.name
      this.categories_indexes.length > 0
        ? (data.categories = this.categories_indexes)
        : (this.categories_indexes = [])
      this.selected_socials.length > 0
        ? (data.social_links = this.selected_socials)
        : (this.selected_socials = [])
      this.$emit('resData', data)
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.header {
  @include header;
  margin-bottom: 40px;
  margin-top: 50px;
}

.agile_wrapper {
  width: calc($rightWidth + 50px);
  display: flex;
  flex-wrap: wrap;
}

.input,
.button,
.photo,
.categories_wrapper,
.social_wrapper {
  width: $rightWidth;
  @media screen and (max-width: 992px) {
    width: 100%;
  }
}

.categories_wrapper {
  display: flex;
}

.photo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.upload {
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;
  input {
    opacity: 0;
  }
  img,
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}

.uploadImages {
  display: none;
}

.avatar {
  @include avatar;
  border-radius: 27px;
  object-fit: cover;
}

.avatar-none {
  width: 100px;
  height: 100px;
  background: $secondBlue;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  @include auth-input;
  display: block;
  margin-bottom: 16px;
}

.textarea {
  height: 100px;
  outline: none;
}

.categories {
  display: flex;
  margin-bottom: 10px;
}

.cat_img {
  width: auto;
  height: auto;
}

.category_label,
.add_cat p,
.cat p {
  color: $baseBlack;
  font-weight: bold;
}

.add_cat p,
.cat p {
  font-size: 12px;
  margin-top: 16px;
  margin-bottom: 0;
}

.category_label {
  font-size: 18px;
  line-height: 21px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.cat_wrapper {
  margin-right: 16px;
  width: 100px;
}

.cat,
.close {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cat {
  height: 90px;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.3s ease;
  position: relative;

  p {
    margin-bottom: 0;
  }
}

.close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 9px;
  height: 14px;
  border: none;
  background: none;
}

.add_cat {
  background: rgba(254, 136, 98, 0.05);
  &:hover {
    background: darken($color: rgba(254, 136, 98, 0.05), $amount: 30);
  }
}

.social_wrapper {
  display: flex;
  justify-content: space-between;
  img {
    opacity: 0.3;
    cursor: pointer;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.5;
    }
  }
  .social_selected {
    img {
      opacity: 1;
      &:hover {
        opacity: 1;
      }
    }
    position: relative;
    &::after {
      position: absolute;
      top: -3px;
      right: -3px;
      content: '';
      display: block;
      background: url('~/static/images/reg/done.svg');
      width: 18px;
      height: 18px;
      background-size: cover;
    }
    &:hover {
      opacity: 1;
    }
  }
}

.button {
  @include button-next-active;
  height: 50px;
  margin-top: 36px;
  &:disabled {
    @include button-next-disabled;
  }
}
</style>
