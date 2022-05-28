<template>
  <div>
    <div class="row">
      <div :class="$style.cell" class="col-lg-4 col-12">
        <div :class="$style.about">
          <EditIcon
            v-if="userStatus !== 'Сотрудник'"
            :class="$style.edit"
            @click="editInfo"
          />
          <img v-if="!edit_info" :class="$style.logo" :src="logo" alt="" />
          <div v-else :class="[$style.upload, $style.logo]" class="upload">
            <img :class="$style.logo" :src="logotype" alt="" />
            <input
              ref="file"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              @change="handleFileUpload()"
            />
          </div>
          <p v-if="!edit_info" :class="$style.company_name">
            {{ name }}
          </p>
          <CustomInput
            v-else
            v-model="current_name"
            :class="$style.input"
            :label="'Название компании'"
          />
          <hr />
          <p :class="$style.label">О компании</p>
          <p v-if="!edit_info" :class="$style.paragraph">
            {{ description }}
          </p>
          <textarea
            v-else
            v-model="current_description"
            :class="[$style.input, $style.textarea]"
            type="text"
            placeholder="Описание компании"
          />
          <button v-if="edit_info" :class="$style.button" @click="reqNewInfo">
            Изменить
          </button>
        </div>
      </div>
      <div :class="$style.cell" class="col-lg-4 col-12">
        <div :class="$style.cats">
          <EditIcon
            v-if="userStatus !== 'Сотрудник'"
            :class="$style.edit"
            @click="changeCategories"
          />
          <p :class="$style.label">Категории</p>
          <div :class="$style.categories">
            <div
              v-for="cat in categories"
              :key="cat.title"
              :class="[$style.category, cat_bg(cat.title)]"
            >
              <img :src="cat.icon" alt="" />
              {{ cat.title }}
            </div>
          </div>
        </div>
      </div>
      <div :class="$style.cell" class="col-lg-4 col-12">
        <div :class="$style['socials_wrapper']">
          <template v-if="userStatus !== 'Сотрудник'">
            <EditIcon
              v-if="!edit_socials"
              :class="$style.edit"
              @click="editSocials"
            />
            <CloseIcon v-else :class="$style.edit" @click="editSocials" />
          </template>

          <p :class="$style.label">Социальные сети</p>
          <ul :class="$style.socials">
            <li
              v-for="social in socials"
              :key="social.title"
              :class="
                !social.link && user_status === 'Сотрудник' ? 'd-none' : ''
              "
            >
              <!--  -->
              <img
                :class="$style['socials_logo']"
                :src="'images/profile/social/' + social.title + '.svg'"
                alt=""
              />
              {{ social.title }}

              <template v-if="!edit_socials">
                <button
                  v-if="!social.link"
                  :class="$style.add"
                  @click="addSocial(social.title)"
                >
                  <img src="images/profile/add_social.svg" alt="" />
                </button>
                <div v-else :class="$style.add">
                  <img src="images/profile/active_social.svg" alt="" />
                </div>
              </template>
              <template v-else>
                <template v-if="!social.link">
                  <button
                    v-if="!social.link"
                    :class="$style.add"
                    @click="addSocial(social.title)"
                  >
                    <img src="images/profile/axe.svg" alt="" />
                  </button>
                </template>
                <template v-else
                  ><EditIcon
                    :class="$style['edit_social']"
                    @click="changeSocial(social.title)"
                  />
                  <DeleteIcon
                    :class="$style['delete_social']"
                    @click="deleteSocial(social.title)"
                  />
                </template>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Categories ref="cats_modal" :cats="categories" @updated="updated" />
    <EditSocial
      :title="social_modal_name"
      :action-label="social_modal_action_label"
      :name="selected_social_name"
      @updated="updated"
    />
  </div>
</template>

<script>
import CustomInput from '~/components/widgets/CustomInput.vue'
import setCatColor from '~/mixins/setCatColor'
import setBase64 from '~/mixins/setBase64'
import EditSocial from '~/components/modals/profile/EditSocial.vue'
import '~/assets/scss/categories.scss'
import EditIcon from '~/components/icons/EditIcon.vue'
import DeleteIcon from '~/components/icons/DeleteIcon.vue'
import CloseIcon from '~/components/icons/CloseIcon.vue'
import Categories from '~/components/modals/profile/Categories.vue'

export default {
  components: {
    CustomInput,
    EditIcon,
    DeleteIcon,
    CloseIcon,
    EditSocial,
    Categories,
  },
  mixins: [setCatColor, setBase64],
  props: {
    name: {
      default: '',
      type: String,
    },
    description: {
      default: '',
      type: String,
    },
    logo: {
      default: '',
      type: String,
    },
    categories: {
      default: () => [],
      type: Array,
    },
    avatar: {
      default: '',
      type: String,
    },
    socials: {
      default: () => [],
      type: Array,
    },
    userStatus: {
      default: '',
      type: String,
    },
  },

  data() {
    return {
      edit_info: false,
      current_name: '',
      current_description: '',

      logotype: 'images/upload.svg',
      current_logo: '',

      edit_socials: false,
      selected_social_name: '',
      social_modal_name: '',
      social_modal_action_label: '',
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
    user_status() {
      return this.$store.getters['user_data/user_status']
    },
  },

  methods: {
    clickUpload() {
      if (!this.edit_info) return false
      this.$refs.upload.reset()
      this.$refs.upload.append()
    },

    editInfo() {
      this.edit_info = !this.edit_info
      this.current_logo = this.logo
      this.current_name = this.name
      this.current_description = this.description
    },

    async reqNewInfo() {
      const formData = await new FormData()
      formData.append('name', this.current_name)
      formData.append('description', this.current_description)
      if (this.logotype !== 'images/upload.svg') {
        formData.append('logo', this.current_logo)
      }
      this.$axios
        .$patch('/api/v1/business/company/', formData, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then(() => {
          this.edit_info = false
          this.logotype = 'images/upload.svg'
          this.$emit('updated')
        })
    },
    async handleFileUpload() {
      this.current_logo = await this.$refs.file.files[0]
      this.logotype = await this.setBase64(this.current_logo)
    },
    addSocial(name) {
      this.selected_social_name = name
      this.social_modal_name = 'Добавление социальной сети'
      this.social_modal_action_label = 'Добавить'
      this.$modal.show('edit-modal')
    },
    changeSocial(name) {
      this.selected_social_name = name
      this.social_modal_name = 'Измнение социальной сети'
      this.social_modal_action_label = 'Изменить'
      this.$modal.show('edit-modal')
    },
    changeCategories() {
      this.$refs.cats_modal.setSelected()
      this.$modal.show('categories-modal')
    },
    cat_bg(cat) {
      return this.setCatColor(cat)
    },
    updated() {
      this.$emit('updated')
    },
    editSocials() {
      this.edit_socials = !this.edit_socials
    },
    deleteSocial(name) {
      this.$store.dispatch('user_data/updateSocial', {
        title: name,
        link: null,
      })
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

p {
  color: $baseBlack;
}

.input {
  width: 100%;
}

.textarea {
  @include auth-input;
  border: 1px solid $orderGray;
}

.button {
  @include button-next-active;
  height: 50px;
  width: 100%;
  margin-top: 20px;
}

.about,
.cats,
.socials_wrapper {
  border-radius: 16px;
  background: #fff;
  padding: 20px;
  position: relative;
}

.about {
  .logo {
    object-fit: contain;
  }
  .logo,
  .change_logo {
    width: 80px;
    height: 80px;
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}

.cats {
  padding-bottom: 5px;
}

.label {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
}

.company_name {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
}

.paragraph {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
}

.categories {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.category {
  width: 48%;
  height: 90px;
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.socials_wrapper .socials {
  padding-left: 0;
  list-style-type: none;
  padding-bottom: 0;
  margin-bottom: 0;
  margin-top: 36px;

  li {
    display: flex;
    align-items: center;

    position: relative;

    padding-bottom: 13px;
    border-bottom: 0.5px solid $orderGray;
    margin-right: 0;
    margin-bottom: 13px;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }
}

.socials_logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.edit_social {
  position: absolute;
  right: 34px;
}

.delete_social,
.add {
  position: absolute;
  right: 0;
}

.add {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit {
  position: absolute;
  top: 13px;
  right: 13px;
}

@media (max-width: $mobile) {
  .cell {
    margin-bottom: 20px;
  }
}
</style>
