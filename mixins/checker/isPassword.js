export default {
  methods: {
    isPassword(s) {
      const PASSWORD_REGEX =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ /* eslint-disable-line */
      return PASSWORD_REGEX.test(s)
    },
  },
}
