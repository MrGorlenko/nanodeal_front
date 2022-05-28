export default {
  methods: {
    setStatusStyle(status) {
      if (status === 'Владелец') {
        return 'role-owner'
      }
      if (status === 'Администратор') {
        return 'role-admin'
      }
      if (status === 'Сотрудник') {
        return 'role-employee'
      }
    },
  },
}
