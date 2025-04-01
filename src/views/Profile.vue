<template>
  <div class="profile">
    <div class="container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <img :src="userAvatar" :alt="currentUser?.username">
          </div>
          <div class="profile-info">
            <h1>{{ currentUser?.username }}</h1>
            <p class="email">{{ currentUser?.email }}</p>
          </div>
          <AvatarUpload />
        </div>

        <div class="profile-content">
          <div class="profile-section">
            <h2>Настройки профиля</h2>
            <form @submit.prevent="updateProfile" class="profile-form">
              <div class="form-group">
                <label for="username">Имя пользователя</label>
                <input 
                  id="username"
                  v-model="form.username"
                  type="text"
                  placeholder="Введите новое имя пользователя"
                >
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Введите новый email"
                >
              </div>

              <div class="form-group">
                <label for="newPassword">Новый пароль</label>
                <input 
                  id="newPassword"
                  v-model="form.newPassword"
                  type="password"
                  placeholder="Введите новый пароль"
                >
              </div>

              <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Сохранение...' : 'Сохранить изменения' }}
              </button>
            </form>
          </div>

          <div class="profile-section">
            <h2>Настройки темы</h2>
            <div class="theme-settings">
              <label class="theme-switch">
                <span>Темная тема</span>
                <input 
                  type="checkbox"
                  :checked="isDarkTheme"
                  @change="toggleTheme"
                >
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="profile-section danger-zone">
            <h2>Опасная зона</h2>
            <button class="btn btn-danger" @click="confirmDeleteAccount">
              Удалить аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import AvatarUpload from '@/components/AvatarUpload.vue'

export default {
  name: 'ProfileView',
  components: {
    AvatarUpload
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        newPassword: ''
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isDarkTheme']),
    ...mapState(['userAvatar'])
  },
  methods: {
    ...mapMutations(['toggleTheme']),
    async updateProfile() {
      this.loading = true
      try {
        // Обновляем данные пользователя в store
        const updatedUser = {
          username: this.form.username,
          email: this.form.email
        }
        this.$store.commit('setUser', updatedUser)
        
        // Если есть новый пароль, обновляем его
        if (this.form.newPassword) {
          // Здесь должна быть логика обновления пароля
          this.form.newPassword = '' // Очищаем поле пароля после обновления
        }
        
        alert('Профиль успешно обновлен!')
      } catch (error) {
        alert('Произошла ошибка при обновлении профиля')
      } finally {
        this.loading = false
      }
    },
    confirmDeleteAccount() {
      if (confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.')) {
        // Здесь будет логика удаления аккаунта
        alert('Функция удаления аккаунта находится в разработке')
      }
    }
  },
  created() {
    // Заполняем форму текущими данными пользователя
    if (this.currentUser) {
      this.form.username = this.currentUser.username
      this.form.email = this.currentUser.email
    }
  }
}
</script>

<style scoped>
.profile {
  padding: 2rem 0;
  min-height: 100vh;
  background: var(--bg-secondary);
}

.profile-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px var(--shadow-color);
  margin-top: 60px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--primary-color);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info h1 {
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.profile-info .email {
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
}

.profile-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.profile-section h2 {
  color: var(--text-color);
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-color);
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-light);
}

.theme-settings {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-switch {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.theme-switch input {
  display: none;
}

.slider {
  position: relative;
  width: 50px;
  height: 26px;
  background: var(--bg-secondary);
  border-radius: 13px;
  transition: all 0.3s ease;
}

.slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  left: 3px;
  top: 3px;
  background: var(--primary-color);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.theme-switch input:checked + .slider {
  background: var(--primary-color-light);
}

.theme-switch input:checked + .slider::before {
  transform: translateX(24px);
}

.danger-zone {
  border-color: #ff4757;
}

.btn-danger {
  background: #ff4757;
  color: white;
  border: none;
}

.btn-danger:hover {
  background: #ff6b81;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
  }

  .profile-section {
    padding: 1rem;
  }
}
</style> 