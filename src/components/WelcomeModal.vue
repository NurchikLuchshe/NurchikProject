<template>
  <div class="welcome-modal">
    <div class="welcome-modal__overlay"></div>
    <div class="welcome-modal__content">
      <div class="welcome-modal__header">
        <h2>{{ isNewUser ? 'Добро пожаловать!' : 'Вход в аккаунт' }}</h2>
        <p class="welcome-modal__subtitle">
          {{ isNewUser ? 'Пожалуйста, заполните данные для регистрации' : 'Введите данные для входа' }}
        </p>
      </div>

      <div class="welcome-modal__body">
        <!-- Форма для нового пользователя -->
        <form v-if="isNewUser" @submit.prevent="handleRegister" class="welcome-form">
          <div class="form-group">
            <label for="username">Имя пользователя</label>
            <input
              id="username"
              v-model="registerForm.username"
              type="text"
              required
              placeholder="Введите имя пользователя"
              :class="{ 'error': errors.username }"
            >
            <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="registerForm.email"
              type="email"
              required
              placeholder="Введите email"
              :class="{ 'error': errors.email }"
            >
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              id="password"
              v-model="registerForm.password"
              type="password"
              required
              placeholder="Введите пароль"
              :class="{ 'error': errors.password }"
            >
            <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
          </div>
          <div class="form-group">
            <label for="password-confirm">Подтверждение пароля</label>
            <input
              id="password-confirm"
              v-model="registerForm.passwordConfirm"
              type="password"
              required
              placeholder="Подтвердите пароль"
              :class="{ 'error': errors.confirmPassword }"
            >
            <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
          </div>
          <div class="form-group">
            <label for="avatar">Аватар (необязательно)</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              @change="handleAvatarChange"
            >
          </div>
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="isLoading"
          >
            <i v-if="isLoading" class="bx bx-loader-alt bx-spin"></i>
            <span>{{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}</span>
          </button>
        </form>

        <!-- Форма для существующего пользователя -->
        <form v-else @submit.prevent="handleLogin" class="welcome-form">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input
              id="login-email"
              v-model="loginForm.email"
              type="email"
              required
              placeholder="Введите email"
              :class="{ 'error': errors.email }"
            >
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label for="login-password">Пароль</label>
            <input
              id="login-password"
              v-model="loginForm.password"
              type="password"
              required
              placeholder="Введите пароль"
              :class="{ 'error': errors.password }"
            >
            <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
          </div>
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="isLoading"
          >
            <i v-if="isLoading" class="bx bx-loader-alt bx-spin"></i>
            <span>{{ isLoading ? 'Вход...' : 'Войти' }}</span>
          </button>
        </form>
      </div>

      <div class="welcome-modal__footer">
        <p v-if="isNewUser">
          Уже есть аккаунт? 
          <a href="#" @click.prevent="toggleMode">Войти</a>
        </p>
        <p v-else>
          Нет аккаунта? 
          <a href="#" @click.prevent="toggleMode">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validateEmailFormat, validatePassword, validatePasswordMatch } from '@/utils/validation'
import { checkEmailExists } from '@/utils/db'

export default {
  name: 'WelcomeModal',
  data() {
    return {
      isNewUser: true,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        avatar: null
      },
      isLoading: false,
      error: null,
      errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    ...mapActions(['login', 'register']),
    toggleMode() {
      this.isNewUser = !this.isNewUser
      this.errors = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    handleAvatarChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.registerForm.avatar = file
      }
    },
    async handleLogin() {
      if (this.isLoading) return

      this.error = null
      this.errors = {
        email: '',
        password: ''
      }
      this.isLoading = true

      try {
        // Проверяем формат email
        if (!validateEmailFormat(this.loginForm.email)) {
          this.errors.email = 'Введите корректный email'
          this.isLoading = false
          return
        }

        // Проверяем существование email
        const emailExists = await checkEmailExists(this.loginForm.email)
        if (!emailExists) {
          this.errors.email = 'Пользователь с таким email не найден'
          this.isLoading = false
          return
        }

        await this.login(this.loginForm)
        this.$emit('success')
      } catch (error) {
        console.error('Login error:', error)
        if (error.message.includes('пароль')) {
          this.errors.password = 'Неверный пароль'
        } else if (error.message.includes('email')) {
          this.errors.email = error.message
        } else {
          this.error = error.message
        }
      } finally {
        this.isLoading = false
      }
    },
    async handleRegister() {
      if (this.isLoading) return

      this.error = null
      this.errors = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }

      // Проверка формата email
      if (!validateEmailFormat(this.registerForm.email)) {
        this.errors.email = 'Введите корректный email'
        return
      }

      // Проверка существования email
      const emailExists = await checkEmailExists(this.registerForm.email)
      if (emailExists) {
        this.errors.email = 'Пользователь с таким email уже существует'
        return
      }

      // Проверка пароля
      const passwordValidation = validatePassword(this.registerForm.password)
      if (!passwordValidation.isValid) {
        this.errors.password = passwordValidation.errors.join(', ')
        return
      }

      // Проверка совпадения паролей
      const passwordMatch = validatePasswordMatch(this.registerForm.password, this.registerForm.passwordConfirm)
      if (!passwordMatch.isValid) {
        this.errors.confirmPassword = passwordMatch.errors[0]
        return
      }

      this.isLoading = true

      try {
        // Создаем FormData для отправки файла
        const formData = new FormData()
        formData.append('username', this.registerForm.username)
        formData.append('email', this.registerForm.email)
        formData.append('password', this.registerForm.password)
        
        if (this.registerForm.avatar) {
          formData.append('avatar', this.registerForm.avatar)
        }

        await this.register(formData)
        this.$emit('success')
      } catch (error) {
        console.error('Register error:', error)
        this.error = error.message || 'Ошибка регистрации. Попробуйте другой email.'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.welcome-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.welcome-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}

.welcome-modal__content {
  position: relative;
  width: 90%;
  max-width: 500px;
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-modal__header {
  padding: 2rem 2rem 1rem;
  text-align: center;
}

.welcome-modal__header h2 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.8rem;
  font-weight: 700;
}

.welcome-modal__subtitle {
  margin: 0.5rem 0 0;
  color: var(--text-color-light);
  font-size: 1rem;
}

.welcome-modal__body {
  padding: 1rem 2rem;
}

.welcome-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 500;
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

.form-group input.error {
  border-color: #ff4757;
}

.error-message {
  color: #ff4757;
  font-size: 0.8rem;
}

.welcome-modal__footer {
  padding: 1rem 2rem 2rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
}

.welcome-modal__footer p {
  margin: 0;
  color: var(--text-color-light);
}

.welcome-modal__footer a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.welcome-modal__footer a:hover {
  text-decoration: underline;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--gradient-orange);
  color: white;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--shadow-color);
}

@media (max-width: 480px) {
  .welcome-modal__content {
    width: 95%;
  }
  
  .welcome-modal__header,
  .welcome-modal__body,
  .welcome-modal__footer {
    padding: 1.5rem 1.5rem 1rem;
  }
}
</style> 