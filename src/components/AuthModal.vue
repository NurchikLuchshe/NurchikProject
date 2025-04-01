<template>
  <div class="auth-modal">
    <div class="auth-modal__overlay" @click="$emit('close')"></div>
    <div class="auth-modal__content">
      <button class="auth-modal__close" @click="$emit('close')">
        <i class="bx bx-x"></i>
      </button>

      <!-- Заголовок и табы -->
      <div class="auth-modal__header">
        <h2 class="auth-modal__title">
          {{ mode === 'login' ? 'Вход' : 'Регистрация' }}
        </h2>
        <div class="auth-modal__tabs">
          <button 
            :class="['tab-btn', { active: mode === 'login' }]"
            @click="mode = 'login'"
          >
            Вход
          </button>
          <button 
            :class="['tab-btn', { active: mode === 'register' }]"
            @click="mode = 'register'"
          >
            Регистрация
          </button>
        </div>
      </div>

      <!-- Форма входа -->
      <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="auth-form">
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

      <!-- Форма регистрации -->
      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="register-username">Имя пользователя</label>
          <input
            id="register-username"
            v-model="registerForm.username"
            type="text"
            required
            placeholder="Введите имя пользователя"
            :class="{ 'error': errors.username }"
          >
          <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
        </div>
        <div class="form-group">
          <label for="register-email">Email</label>
          <input
            id="register-email"
            v-model="registerForm.email"
            type="email"
            required
            placeholder="Введите email"
            :class="{ 'error': errors.email }"
          >
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="register-password">Пароль</label>
          <input
            id="register-password"
            v-model="registerForm.password"
            type="password"
            required
            placeholder="Введите пароль"
            :class="{ 'error': errors.password }"
          >
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>
        <div class="form-group">
          <label for="register-password-confirm">Подтверждение пароля</label>
          <input
            id="register-password-confirm"
            v-model="registerForm.passwordConfirm"
            type="password"
            required
            placeholder="Подтвердите пароль"
            :class="{ 'error': errors.confirmPassword }"
          >
          <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
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

      <!-- Сообщение об ошибке -->
      <div v-if="error" class="auth-modal__error">
        {{ error }}
      </div>

      <div class="auth-modal__switch">
        <p>
          {{ mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
          <button @click="switchMode" class="switch-mode-btn">
            {{ mode === 'login' ? 'Зарегистрироваться' : 'Войти' }}
          </button>
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
  name: 'AuthModal',
  props: {
    mode: {
      type: String,
      default: 'login',
      validator: value => ['login', 'register'].includes(value)
    }
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
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
          return
        }

        // Проверяем существование email
        const emailExists = await checkEmailExists(this.loginForm.email)
        if (!emailExists) {
          this.errors.email = 'Пользователь с таким email не найден'
          return
        }

        await this.login(this.loginForm)
        this.$emit('success')
        this.$emit('close')
      } catch (error) {
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
        await this.register(this.registerForm)
        this.$emit('success')
        this.$emit('close')
      } catch (error) {
        this.error = error.message || 'Ошибка регистрации. Попробуйте другой email.'
      } finally {
        this.isLoading = false
      }
    },
    async validateForm() {
      this.errors = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
      
      let isValid = true

      // Проверка email
      if (!validateEmailFormat(this.registerForm.email)) {
        this.errors.email = 'Введите корректный email'
        isValid = false
      } else {
        // Проверка существования email
        const emailExists = await checkEmailExists(this.registerForm.email)
        if (!emailExists) {
          this.errors.email = 'Такой email не существует'
          isValid = false
        }
      }

      // Проверка пароля
      const passwordValidation = validatePassword(this.registerForm.password)
      if (!passwordValidation.isValid) {
        this.errors.password = passwordValidation.errors.join(', ')
        isValid = false
      }

      // Проверка совпадения паролей
      const passwordMatch = validatePasswordMatch(this.registerForm.password, this.registerForm.passwordConfirm)
      if (!passwordMatch.isValid) {
        this.errors.confirmPassword = passwordMatch.errors[0]
        isValid = false
      }

      return isValid
    },
    async handleSubmit() {
      this.isLoading = true
      
      try {
        const isValid = await this.validateForm()
        
        if (isValid) {
          this.$emit('submit', {
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password
          })
        }
      } catch (error) {
        console.error('Validation error:', error)
      } finally {
        this.isLoading = false
      }
    },
    switchMode() {
      this.$emit('update:mode', this.mode === 'login' ? 'register' : 'login')
      this.loginForm = {
        email: '',
        password: ''
      }
      this.registerForm = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
      this.errors = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
      this.error = null
    }
  }
}
</script>

<style>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.auth-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.auth-modal__content {
  position: relative;
  width: 100%;
  max-width: 400px;
  background: var(--bg-color);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px var(--shadow-color);
  border: 1px solid var(--border-color);
  animation: fadeIn 0.3s ease-out;
}

.auth-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.auth-modal__close:hover {
  background: var(--primary-color-light);
  color: var(--primary-color);
}

.auth-modal__header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-modal__title {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.auth-modal__tabs {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.tab-btn {
  background: none;
  border: none;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: var(--primary-color-light);
}

.tab-btn.active {
  background: var(--primary-color);
  color: white;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-color);
  font-weight: 500;
}

.form-group input {
  padding: 0.75rem;
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
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 0.9rem;
}

.auth-modal__error {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.875rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-modal__switch {
  margin-top: 2rem;
  text-align: center;
  color: var(--text-color);
}

.switch-mode-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
  padding: 0;
  transition: var(--trans-03);
}

.switch-mode-btn:hover {
  text-decoration: underline;
}
</style> 