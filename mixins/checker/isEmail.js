export default {
  methods: {
    isEmail(s) {
      /* eslint-disable-next-line */
      const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return EMAIL_REGEX.test(s)
    },
  },
}
