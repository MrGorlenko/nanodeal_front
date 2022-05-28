export const state = () => ({
  access_token: '',
  data: {
    user: {
      first_name: '',
      last_name: '',
      avatar: '',
      email: '',
      position: '',
      status: '123',
    },
    company: {
      name: '',
      description: '',
      logo: '',
      categories: [],
      social_links: [],
      places: [],
    },
    tariff: null,
    tariff_date_start: null,
    tariff_date_end: null,
  },
  error_status: '',
})

export const getters = {
  data: (state) => {
    return state.data
  },
  access_token: (state) => {
    return state.access_token
  },
  error_status: (state) => {
    return state.error_status
  },
}

export const mutations = {
  CLEAN_ACCESS_TOKEN(state) {
    state.access_token = ''
  },
  SET_ACCESS_TOKEN(state, payload) {
    state.access_token = payload
  },
  SET_ERROR_STATUS(state, payload) {
    state.error_status = payload
  },
  SET_INFO(state, payload) {
    state.data = payload
  },
}

export const actions = {
  auth({ commit }, payload) {
    commit('CLEAN_ACCESS_TOKEN')
    this.$axios
      .$post('/api/v1/token/', {
        username: payload.email,
        password: payload.password,
      })
      .then((response) => {
        commit('SET_ACCESS_TOKEN', response.access)
        this.app.router.push('/profile')
      })
      .catch((err) => {
        commit('SET_ERROR_STATUS', err.response.status)
      })
  },

  setAccessToken({ commit }, payload) {
    commit('SET_ACCESS_TOKEN', payload)
  },

  getInfo({ commit, getters }) {
    this.$axios
      .post(
        '/api/v1/business/get_current/',
        {},
        {
          headers: {
            Authorization: `Bearer ${getters.access_token}`,
          },
        }
      )
      .then((response) => {
        commit('SET_INFO', response)
      })
      .catch(() => {
        this.app.router.push('/auth')
      })
  },

  changePassword({ commit, getters }, payload) {
    this.$axios
      .post('/api/v1/business/change_password/', payload, {
        headers: {
          Authorization: `Bearer ${getters.access_token}`,
        },
      })
      .then((res) => {
        alert('Пароль изменен!')
      })
      .catch((err) => {
        commit('SET_ERROR_STATUS', err)
      })
  },
}
