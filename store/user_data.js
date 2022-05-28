export const state = () => ({
  data: {
    user: {
      first_name: '',
      last_name: '',
      position: '',
      avatar: '',
      status: '',
    },
    company: {
      places: [],
      name: '',
      description: '',
      categories: [],
      social_links: [],
      logo: '',
    },
  },
})

export const getters = {
  data: (state) => {
    return state.data
  },
  places: (state) => {
    return state.data.company.places
  },
  user_status: (state) => {
    return state.data.user.status
  },
  user_avatar: (state) => {
    return state.data.user.avatar
  },
}

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload
  },

  ADD_PLACE(state, payload) {
    state.data.company.places.push(payload)
  },

  DELETE_PLACE(state, payload) {
    state.data.company.places = state.data.company.places.filter(
      (place) => place.id !== payload
    )
  },

  UPDATE_SOCIAL(state, payload) {
    state.data.company.social_links = payload
  },

  UPDATE_CATEGORIES(state, payload) {
    state.data.company.categories = payload
  },

  UPDATE_COMPANY_INFO(state, payload) {
    state.data.company.logo = payload.logo
    state.data.company.name = payload.name
    state.data.company.description = payload.description
  },

  CHECK_PLACE(state, payload) {
    state.data.company.places[payload].checked =
      !state.data.company.places[payload].checked
  },

  DROP_PLACES(state) {
    state.data.company.places.forEach((place) => {
      place.checked = false
    })
  },
}

export const actions = {
  /* Устанавливает данные пользователя */
  async setData({ commit, rootGetters }) {
    this.$axios
      .post(
        '/api/v1/business/get_current/',
        {},
        {
          headers: {
            Authorization: `Bearer ${await rootGetters['auth/access_token']}`,
          },
        }
      )
      .then((res) => {
        commit('SET_DATA', res.data)
      })
  },

  async editMemberInfo({ dispatch, rootGetters }, payload) {
    this.$axios
      .patch('/api/v1/business/profile/', payload, {
        headers: {
          Authorization: `Bearer ${await rootGetters['auth/access_token']}`,
        },
      })
      .then(() => {
        dispatch('setData')
      })
  },

  async editEmployeeInfo({ dispatch, rootGetters }, payload) {
    this.$axios
      .patch('/api/v1/business/edit_employee/', payload, {
        headers: {
          Authorization: `Bearer ${await rootGetters['auth/access_token']}`,
        },
      })
      .then(() => {
        dispatch('setData')
      })
  },

  async addPlace({ commit, rootGetters }, payload) {
    this.$axios
      .$post(
        '/api/v1/business/place/',
        {
          title: payload.title,
          address: payload.address,
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${await rootGetters['auth/access_token']}`,
          },
        }
      )
      .then((res) => {
        commit('ADD_PLACE', res)
      })
  },

  deletePlace({ commit, rootGetters }, payload) {
    this.$axios
      .$delete('/api/v1/business/place/' + payload + '/', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/access_token']}`,
        },
      })
      .then((res) => {
        commit('DELETE_PLACE', payload)
      })
  },

  updateSocial({ commit, rootGetters }, payload) {
    this.$axios
      .$patch(
        '/api/v1/business/company/',
        {
          social_links: [{ title: payload.title, link: payload.link }],
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters['auth/access_token']}`,
          },
        }
      )
      .then((res) => {
        commit('UPDATE_SOCIAL', res.social_links)
      })
  },

  updateCategories({ commit, rootGetters }, payload) {
    this.$axios
      .$patch(
        '/api/v1/business/company/',
        {
          categories: [...payload],
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters['auth/access_token']}`,
          },
        }
      )
      .then((res) => {
        commit('UPDATE_CATEGORIES', res.categories)
      })
  },

  checkPlace({ commit }, payload) {
    commit('CHECK_PLACE', payload)
  },

  dropPlaces({ commit }) {
    commit('DROP_PLACES')
  },
}
