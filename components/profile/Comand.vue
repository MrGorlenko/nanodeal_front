<template>
  <div :class="$style.company">
    <div :class="$style.members_wrapper">
      <div
        v-if="propStatus !== 'Сотрудник'"
        :class="[$style.cell, $style.add_new]"
        @click="callAddModal"
      >
        <img src="~/static/images/profile/add.svg" alt="" />
        <p :class="$style.label">
          Добавить <br />
          нового
        </p>
      </div>
      <div
        :class="[$style.cell, $style.user]"
        @click="
          callMemberModal(
            propFirstName,
            propLastName,
            propPosition,
            propAvatar,
            propEmail,
            propStatus,
            true,
            null
          )
        "
      >
        <img
          v-if="propAvatar"
          :src="propAvatar"
          :class="$style.avatar"
          alt=""
        />
        <avatar-plug
          v-else
          :class="$style['avatar-plug']"
          :first-name="propFirstName"
          :second-name="propLastName"
        />
        <p :class="[$style.label, $style.black]">
          {{ propFirstName }}
          {{ propLastName }}
        </p>
        <p :class="[$style.label, $style.gray]">
          {{ propPosition }}
        </p>
        <div :class="[$style.role, roleClass(propStatus)]">
          <p>{{ propStatus }} (Вы)</p>
        </div>
      </div>

      <div
        v-for="employee in empls"
        :key="employee.uid"
        :class="[$style.cell, $style.user]"
        @click="
          callMemberModal(
            employee.first_name,
            employee.last_name,
            employee.position,
            employee.avatar,
            employee.email,
            employee.status,
            false,
            employee.uid
          )
        "
      >
        <img
          v-if="employee.avatar"
          :src="employee.avatar"
          :class="$style.avatar"
          alt=""
        />
        <avatar-plug
          v-else
          :class="$style['avatar-plug']"
          :first-name="employee.first_name"
          :second-name="employee.last_name"
        />
        <p :class="[$style.label, $style.black]">
          {{ employee.first_name }}
          {{ employee.last_name }}
        </p>
        <p :class="[$style.label, $style.gray]">
          {{ employee.position }}
        </p>
        <div :class="[$style.role, roleClass(employee.status)]">
          <p>{{ employee.status }}</p>
        </div>
      </div>
    </div>

    <Member
      :first-name="first_name"
      :second-name="second_name"
      :position="position"
      :avatar="avatar"
      :email="email"
      :status="status"
      :my="my"
      :auth-status="propStatus"
      @changePassword="callChangePassword"
      @editUser="callEditModal"
    />

    <ChangePassword />

    <EditMember
      ref="editModal"
      :avatar-prop="avatar"
      :name-prop="first_name"
      :last-name-prop="second_name"
      :position-prop="position"
      :email-prop="email"
      :status-prop="status"
      :auth-status="propStatus"
      :my-prop="my"
      :uid-prop="uid"
    />

    <AddMember />
  </div>
</template>

<script>
import ChangePassword from '~/components/modals/profile/ChangePassword'
import Member from '~/components/modals/profile/Member'
import EditMember from '~/components/modals/profile/EditMember.vue'
import AddMember from '~/components/modals/profile/addMember.vue'
import '~/assets/scss/status.scss'
import setStatusStyle from '~/mixins/setStatusStyle'
import AvatarPlug from '~/components/widgets/AvatarPlug.vue'
export default {
  components: {
    Member,
    ChangePassword,
    EditMember,
    AddMember,
    AvatarPlug,
  },
  mixins: [setStatusStyle],
  props: {
    propFirstName: {
      default: '',
      type: String,
    },
    propLastName: {
      default: '',
      type: String,
    },
    propPosition: {
      default: '',
      type: String,
    },
    propAvatar: {
      default: '',
      type: String,
    },
    propEmail: {
      default: '',
      type: String,
    },
    propStatus: {
      default: '',
      type: String,
    },
    propEmployees: {
      default: () => [],
      type: [Array, Object],
    },
  },

  data() {
    return {
      first_name: '',
      second_name: '',
      position: '',
      avatar: '',
      email: '',
      status: '',
      my: null,
      uid: null,
    }
  },

  computed: {
    empls() {
      return this.propEmployees.filter((empl) => {
        return empl.email !== this.propEmail
      })
    },
    accessToken() {
      return this.$store.getters['auth/access_token']
    },
  },

  methods: {
    callMemberModal(
      firstName,
      secondName,
      position,
      avatar,
      email,
      status,
      my,
      uid
    ) {
      this.first_name = firstName
      this.second_name = secondName
      this.position = position
      this.avatar = avatar
      this.email = email
      this.status = status
      this.my = my
      this.uid = uid
      this.$modal.show('member-modal')
    },
    callChangePassword() {
      this.$modal.show('password-modal')
    },
    callEditModal() {
      this.$refs.editModal.setInfo()
      this.$modal.show('edit-member-modal')
    },
    callAddModal() {
      this.$modal.show('add-member-modal')
    },

    roleClass(status) {
      return this.setStatusStyle(status)
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.members_wrapper {
  display: flex;
  flex-wrap: wrap;
}

.cell {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 16px;
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;
  padding-top: 18px;
}

.add_new {
  background: rgba(254, 136, 98, 0.1);
  justify-content: center;

  img {
    margin-bottom: 14px;
  }
}

.user {
  background: #fff;
  box-shadow: 0px 0.989583px 2.96875px rgba(233, 216, 207, 0.3);
  img {
    width: 77px;
    height: 77px;
    object-fit: cover;
  }
}

.label {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
}

.black {
  color: $baseBlack;
}

.gray {
  color: $baseGray;
}

.role {
  margin-top: 17px;
  border-radius: 8px;
  padding: 8px 14px;
  position: absolute;
  bottom: 20px;

  p {
    text-align: center;
    margin-bottom: 0;
  }
}

.role {
  &-owner {
    background: rgba(0, 198, 103, 0.08);
    p {
      color: #00c667;
    }
  }
  &-admin {
    background: rgba(105, 163, 251, 0.08);
    p {
      color: #69a3fb;
    }
  }
  &-employee {
    background: rgba(254, 136, 98, 0.08);
    p {
      color: #fe8862;
    }
  }
}

.avatar {
  border-radius: 50%;
}

.avatar-plug {
  width: 77px;
  height: 77px;
}

@media (max-width: $mobile) {
  .add_new {
    height: 90px;
    flex-direction: row;
    padding-top: 0;
    img {
      margin-bottom: 0;
      margin-right: 16px;
    }
    p br {
      display: none;
    }
  }

  .cell {
    width: 100%;
    margin-right: 0;
  }
}
</style>
