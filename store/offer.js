export const state = () => ({
  data: {
    // uid: null,
    // step: null,
    // title: '',
    // reward_description: '',
    // show_file: '',
    // cover: '',
    // conditions: [],
    // comment: '',
    // complete_count: '',
    // gender: '',
    // age_from: '',
    // age_to: '',
    // followers_count: '',
    // is_online: false,
    // start_date: '',
    // end_date: '',
    // places_id: null,
    // places: null,
    // is_manual_moderate: false,
    // status: '',
  },
  selectedOffer: {
    uid: '',
    title: '',
  },
  receivedOffers: [],
  saveMode: true,
})

export const getters = {
  data: (state) => {
    return state.data
  },
  receivedOffers: (state) => {
    return state.receivedOffers
  },
  saveMode: (state) => {
    return state.saveMode
  },
  selectedOfferTitle: (state) => {
    return state.selectedOffer.title
  },
  selectedOfferUid: (state) => {
    return state.selectedOffer.uid
  },
}

export const mutations = {
  SET_DATA(state, payload) {
    // state.data.uid = payload.uid
    if (payload.uid) state.data.uid = payload.uid
    state.data.step = payload.step
    state.data.title = payload.title
    state.data.reward_description = payload.reward_description
    state.data.show_file = payload.show_file
    state.data.cover = payload.cover
    state.data.conditions = payload.conditions
    state.data.comment = payload.comment
    state.data.complete_count = payload.complete_count
    state.data.gender = payload.gender
    state.data.age_from = payload.age_from
    state.data.age_to = payload.age_to
    state.data.is_online = payload.is_online
    state.data.followers_count = payload.followers_count
    state.data.is_manual_moderate = payload.is_manual_moderate
    state.data.start_date = payload.start_date
    state.data.end_date = payload.end_date
    state.data.places = payload.places
    state.data.places_id = payload.places_id
  },
  CLEAR_DATA(state) {
    state.data = {}
  },
  SET_DECRIPTION(state, payload) {
    if (payload.uid) state.data.uid = payload.uid
    state.data.step = payload.step
    state.data.title = payload.title
    state.data.reward_description = payload.reward_description
    // state.data.show_file = payload.show_file
    state.data.cover = payload.cover
  },
  SET_CONDITIONS(state, payload) {
    state.data.step = payload.step
    state.data.conditions = payload.conditions
    state.data.comment = payload.comment
    state.data.complete_count = payload.complete_count
  },
  SET_REQUIREMENTS(state, payload) {
    state.data.step = payload.step
    state.data.gender = payload.gender
    state.data.age_from = payload.age_from
    state.data.age_to = payload.age_to
    state.data.followers_count = payload.followers_count
    state.data.is_manual_moderate = payload.is_manual_moderate
  },
  SET_TIMING_AND_ADDRESS(state, payload) {
    state.data.step = payload.step
    state.data.start_date = payload.start_date
    state.data.end_date = payload.end_date
    state.data.places = payload.places
    state.data.is_online = payload.is_online
    state.data.places_id = payload.places_id
  },
  RECEIVE_OFFERS(state, payload) {
    state.receivedOffers = payload
  },
  RECEIVE_OFFER(state, payload) {
    state.data = payload
  },
  SET_STEP(state, payload) {
    state.data.step = payload
  },
  SET_STATUS(state, payload) {
    state.data.status = payload
  },
  SET_SAVE_MODE(state, payload) {
    state.saveMode = payload
  },
  SET_SELECTED_OFFER(state, payload) {
    state.selectedOffer.title = payload
  },
  SET_SELECTED_OFFER_UID(state, payload) {
    state.selectedOffer.uid = payload
  },
}

export const actions = {
  setSelectedOffer({ commit }, payload) {
    commit('SET_SELECTED_OFFER', payload)
  },

  setSelectedOfferUid({ commit }, payload) {
    commit('SET_SELECTED_OFFER_UID', payload)
  },

  clearData({ commit }) {
    commit('CLEAR_DATA')
  },

  setData({ commit }, payload) {
    commit('SET_DATA', payload)
  },

  draftOfferPostNext({ rootGetters, dispatch }, payload) {
    this.$axios
      .post('/api/v1/tasks/task/', payload, {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/access_token']}`,
        },
      })
      .then((res) => {
        dispatch('setData', res.data)
      })
  },

  draftOfferPatchNext({ rootGetters, dispatch }, payload) {
    this.$axios
      .patch('/api/v1/tasks/task/' + payload.uid + '/', payload.data, {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/access_token']}`,
        },
      })
      .then((res) => {
        dispatch('setData', res.data)
      })
  },

  draftOfferPost({ rootGetters, dispatch }, payload) {
    this.$axios
      .post('/api/v1/tasks/task/', payload, {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/access_token']}`,
        },
      })
      .then(() => {
        dispatch('receiveOffers')
      })
      .then(() => {
        this.app.router.push('/offers')
      })
  },

  draftOfferPatch({ rootGetters, dispatch }, payload) {
    this.$axios
      .patch('/api/v1/tasks/task/' + payload.uid + '/', payload.data, {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/access_token']}`,
        },
      })
      .then(() => {
        dispatch('receiveOffers')
      })
      .then(() => {
        this.app.router.push('/offers')
      })
  },

  /* Receive all the offer */
  async receiveOffers({ commit, rootGetters }) {
    this.$axios
      .$get('/api/v1/tasks/task/', {
        headers: {
          Authorization: `Bearer ${await rootGetters['auth/access_token']}`,
        },
      })
      .then((res) => {
        commit('RECEIVE_OFFERS', res)
      })
  },

  /* Receive one offer by id */
  async receiveOffer({ commit, rootGetters }, payload) {
    this.$axios
      .$get(`/api/v1/tasks/task/${payload}/`, {
        headers: {
          Authorization: `Bearer ${await rootGetters['auth/access_token']}`,
        },
      })
      .then((res) => {
        commit('RECEIVE_OFFER', res)
      })
  },

  postOffer({ rootGetters, dispatch }, payload) {
    this.$axios
      .post('/api/v1/tasks/task/', payload, {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/access_token']}`,
        },
      })
      .then(() => {
        dispatch('receiveOffers')
      })
  },

  editOffer({ dispatch, rootGetters }, payload) {
    this.$axios
      .patch('/api/v1/tasks/task/' + payload.uid + '/', payload, {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/access_token']}`,
        },
      })
      .then(() => {
        dispatch('receiveOffers')
      })
  },

  deleteOffer({ dispatch, rootGetters }, payload) {
    this.$axios
      .delete('/api/v1/tasks/task/' + payload.uid + '/', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/access_token']}`,
        },
      })
      .then(() => {
        dispatch('receiveOffers')
      })
  },

  async selectOffer({ commit }, payload) {
    await commit('SET_DATA', payload)
    this.app.router.push('/addNew')
  },

  setDescription({ commit }, payload) {
    commit('SET_DECRIPTION', payload)
  },

  setConditions({ commit }, payload) {
    commit('SET_CONDITIONS', payload)
  },

  setRequirements({ commit }, payload) {
    commit('SET_REQUIREMENTS', payload)
  },

  setTimingAndAddress({ commit }, payload) {
    commit('SET_TIMING_AND_ADDRESS', payload)
  },

  setStatus({ commit }, payload) {
    commit('SET_STATUS', payload)
  },

  setStep({ commit }, payload) {
    commit('SET_STEP', payload)
  },

  setSaveMode({ commit }, payload) {
    commit('SET_SAVE_MODE', payload)
  },
}
