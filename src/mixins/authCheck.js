import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    checkAuth() {
      if (!this.isAuthenticated) {
        this.$notify({
          title: 'Требуется авторизация',
          message: 'Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить',
          type: 'warning',
          duration: 3000
        })
        return false
      }
      return true
    }
  }
} 