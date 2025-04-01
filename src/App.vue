<script>
import AppFooter from '@/components/Footer.vue'
import SplashScreen from '@/components/SplashScreen.vue'
import ParticlesBackground from '@/components/ParticlesBackground.vue'
import CursorEffect from '@/components/CursorEffect.vue'
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
import AuthModal from '@/components/AuthModal.vue'
import authCheck from '@/mixins/authCheck'
import MobileMenu from '@/components/MobileMenu.vue'

export default {
  name: 'App',
  components: {
    AppFooter,
    SplashScreen,
    ParticlesBackground,
    CursorEffect,
    AuthModal,
    MobileMenu
  },
  mixins: [authCheck],
  data() {
    return {
      showSplash: true,
      audio: null,
      showModal: false,
      authMode: 'login',
      isUserMenuOpen: false,
      isMobileMenuOpen: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser', 'isDarkTheme']),
    ...mapState(['userAvatar'])
  },
  mounted() {
    this.audio = document.querySelector('audio')
  },
  methods: {
    ...mapMutations(['toggleTheme']),
    ...mapActions(['logout', 'login', 'register']),
    handleSplashHide() {
      this.showSplash = false
    },
    toggleMusic(isPlaying) {
      if (!this.checkAuth()) return
      if (this.audio) {
        if (isPlaying) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      }
    },
    openAuthModal(mode) {
      this.authMode = mode
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    toggleAuthMode() {
      this.authMode = this.authMode === 'login' ? 'register' : 'login'
    },
    async handleAuthSubmit(formData) {
      try {
        if (this.authMode === 'login') {
          await this.login({
            email: formData.email,
            password: formData.password
          })
        } else {
          await this.register(formData)
        }
        this.handleAuthSuccess()
      } catch (error) {
        console.error('Auth error:', error)
        this.$notify({
          title: 'Ошибка авторизации',
          message: error.message || 'Произошла ошибка при авторизации',
          type: 'error',
          duration: 3000
        })
      }
    },
    async handleAuthSuccess() {
      this.closeModal()
      this.$notify({
        title: 'Успех',
        message: this.authMode === 'login' ? 'Вы успешно вошли в систему' : 'Регистрация успешно завершена',
        type: 'success',
        duration: 3000
      })
      await this.$router.push('/')
      await this.$store.dispatch('init')
    },
    toggleUserMenu() {
      if (!this.checkAuth()) return
      this.isUserMenuOpen = !this.isUserMenuOpen
    },
    async handleLogout() {
      await this.logout()
      this.isUserMenuOpen = false
      this.$router.push('/')
      this.$notify({
        title: 'Выход',
        message: 'Вы успешно вышли из системы',
        type: 'info',
        duration: 3000
      })
    }
  },
  created() {
    this.$store.dispatch('init')
  }
}
</script>

<template>
  <div id="app" :class="{ 'dark-theme': isDarkTheme }">
    <CursorEffect />
    <ParticlesBackground />
    <SplashScreen v-if="showSplash" @hide="handleSplashHide" />
    
    <!-- Шапка сайта -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar__content">
          <!-- Логотип слева -->
          <router-link to="/" class="navbar__logo">
            {{ isAuthenticated && currentUser?.username ? currentUser.username.toUpperCase() : 'NURCHIK' }}
          </router-link>

          <!-- Меню в центре -->
          <div class="navbar__menu" :class="{ 'is-open': isMobileMenuOpen }">
            <router-link to="/" class="navbar__link" @click="isMobileMenuOpen = false">Главная</router-link>
            <router-link to="/reviews" class="navbar__link" @click="isMobileMenuOpen = false">Отзывы</router-link>
            <template v-if="isAuthenticated">
              <router-link to="/portfolio" class="navbar__link" @click="isMobileMenuOpen = false">Портфолио</router-link>
              <router-link to="/services" class="navbar__link" @click="isMobileMenuOpen = false">Услуги</router-link>
              <router-link to="/contact" class="navbar__link" @click="isMobileMenuOpen = false">Контакты</router-link>
            </template>
          </div>

          <!-- Действия справа -->
          <div class="navbar__actions">
            <div v-if="!isAuthenticated" class="auth-buttons">
              <button @click="openAuthModal('login')" class="btn btn-outline">
                Войти
              </button>
              <button @click="openAuthModal('register')" class="btn btn-primary">
                Регистрация
              </button>
            </div>

            <div v-else class="user-menu">
              <div class="user-avatar" @click="toggleUserMenu">
                <img v-if="userAvatar" :src="userAvatar" alt="User avatar" />
                <i v-else class="fas fa-user"></i>
              </div>
              <div v-show="isUserMenuOpen" class="user-dropdown">
                <router-link to="/profile" class="dropdown-item" @click="isUserMenuOpen = false">
                  <i class="fas fa-user-circle"></i>
                  Профиль
                </router-link>
                <button @click="handleLogout" class="dropdown-item">
                  <i class="fas fa-sign-out-alt"></i>
                  Выйти
                </button>
              </div>
            </div>

            <button @click="toggleTheme" class="theme-toggle">
              <i class="bx" :class="isDarkTheme ? 'bx-sun' : 'bx-moon'"></i>
            </button>

            <button class="mobile-menu-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" :class="{ 'is-open': isMobileMenuOpen }">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <MobileMenu 
      :is-open="isMobileMenuOpen"
      @close="isMobileMenuOpen = false"
      @show-auth-modal="openAuthModal"
    />

    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    <AuthModal 
      v-if="showModal"
      :mode="authMode"
      @close="closeModal"
      @toggle-mode="toggleAuthMode"
      @success="handleAuthSuccess"
    />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;700&display=swap');
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

:root {
  /* Основные цвета светлой темы */
  --primary-color: #4a90e2;
  --primary-color-rgb: 74, 144, 226;
  --primary-color-light: rgba(74, 144, 226, 0.1);
  --primary-gradient: linear-gradient(45deg, #4a90e2, #67b26f);
  --secondary-color: #67b26f;
  --secondary-color-rgb: 103, 178, 111;
  
  /* Цвета текста */
  --text-color: #2c3e50;
  --text-color-light: #7f8c8d;
  --text-color-rgb: 44, 62, 80;
  
  /* Цвета фона */
  --bg-color: #f8f9fa;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f1f3f5;
  --bg-gradient: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  
  /* Акцентные цвета */
  --accent-orange: #ff9f43;
  --accent-blue: #4a90e2;
  --accent-purple: #7367f0;
  --accent-green: #67b26f;
  
  /* Служебные цвета */
  --border-color: rgba(44, 62, 80, 0.1);
  --shadow-color: rgba(74, 144, 226, 0.15);
  --shadow-light: rgba(74, 144, 226, 0.08);
  --overlay-color: rgba(255, 255, 255, 0.8);
  
  /* Дополнительные градиенты */
  --gradient-orange: linear-gradient(45deg, #ff9f43, #ffb74d);
  --gradient-blue: linear-gradient(45deg, #4a90e2, #67b26f);
  --gradient-purple: linear-gradient(45deg, #7367f0, #ce9ffc);
  --gradient-success: linear-gradient(45deg, #67b26f, #7bc95f);
  
  /* Размеры и радиусы */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  
  /* Переходы */
  --trans-03: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --trans-05: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Стили для темной темы остаются прежними */
.dark-theme {
  --primary-color: #ff8f50;
  --primary-color-rgb: 255, 143, 80;
  --primary-color-light: rgba(255, 143, 80, 0.1);
  --primary-gradient: linear-gradient(45deg, #ff8f50, #ff6b2b);
  
  --text-color: #ffffff;
  --text-color-light: #b2bec3;
  
  --bg-color: #17181a;
  --bg-secondary: #1e2022;
  --bg-tertiary: #1e2022;
  --bg-gradient: linear-gradient(135deg, #17181a 0%, #1e2022 100%);
  
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.3);
  --shadow-light: rgba(0, 0, 0, 0.2);
  --overlay-color: rgba(23, 24, 26, 0.8);

  /* Обновляем градиенты для темной темы */
  --gradient-orange: linear-gradient(45deg, #ff8f50, #ff6b2b);
  --gradient-blue: linear-gradient(45deg, #4facfe, #00f2fe);
  --gradient-purple: linear-gradient(45deg, #7367f0, #ce9ffc);
  --gradient-success: linear-gradient(45deg, #28c76f, #48da89);
}

/* Общие стили */
body {
  font-family: 'Montserrat', sans-serif;
  color: var(--text-color);
  background: var(--bg-gradient);
  line-height: 1.6;
  overflow-x: hidden;
  cursor: none;
}

/* Исключения для элементов, где нужен стандартный курсор */
a, button, input, textarea, select, [role="button"] {
  cursor: none;
}

/* Показываем стандартный курсор для интерактивных элементов */
a:hover, button:hover, input:hover, textarea:hover, select:hover, [role="button"]:hover {
  cursor: none;
}

#app {
  min-height: 100vh;
  background: var(--bg-gradient);
  color: var(--text-color);
  transition: var(--trans-03);
  position: relative;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 0% 0%, rgba(var(--primary-color-rgb), 0.05) 0%, transparent 50%),
    radial-gradient(circle at 100% 0%, rgba(var(--secondary-color-rgb), 0.05) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(var(--primary-color-rgb), 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(var(--secondary-color-rgb), 0.05) 0%, transparent 50%);
  z-index: 0;
  pointer-events: none;
}

/* Обновленные стили навбара */
.navbar {
  background: var(--overlay-color);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: var(--trans-03);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.navbar__content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
}

.navbar__logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--gradient-orange);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  letter-spacing: 1px;
  white-space: nowrap;
}

.navbar__menu {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
}

.navbar__link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--trans-03);
  position: relative;
  padding: 0.5rem 0;
  font-size: 1rem;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}

/* Обновленные стили кнопок */
.btn {
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: var(--trans-03);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: var(--trans-03);
}

.btn:hover::before {
  transform: translateX(100%);
}

.btn-primary {
  background: var(--gradient-orange);
  color: white;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--shadow-color);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

/* Обновленные стили для темной темы */
.theme-toggle {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: var(--trans-03);
  position: relative;
  overflow: hidden;
}

.theme-toggle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-orange);
  opacity: 0;
  transition: var(--trans-03);
  border-radius: 50%;
}

.theme-toggle:hover::before {
  opacity: 0.1;
}

.theme-toggle:hover {
  color: var(--primary-color);
  transform: rotate(180deg);
}

/* Обновленные стили для аватара пользователя */
.user-menu {
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  padding: 2px;
  background: var(--gradient-orange);
  transition: var(--trans-03);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--bg-color);
  transition: var(--trans-03);
}

.user-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px var(--shadow-color);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--overlay-color);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  overflow: hidden;
  min-width: 200px;
  transform: translateY(10px);
  opacity: 0;
  visibility: hidden;
  transition: var(--trans-03);
}

.user-menu:hover .user-dropdown {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  color: var(--text-color);
  text-decoration: none;
  transition: var(--trans-03);
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-orange);
  opacity: 0;
  transition: var(--trans-03);
}

.dropdown-item:hover::before {
  opacity: 0.1;
}

.dropdown-item:hover {
  color: var(--primary-color);
  padding-left: 2rem;
}

.dropdown-item i {
  width: 20px;
  font-size: 1.2rem;
  color: var(--primary-color);
}

/* Обновленные стили для основного контента */
main {
  padding-top: 80px;
  position: relative;
  z-index: 1;
}

/* Анимации */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Медиа-запросы */
@media (max-width: 768px) {
  .navbar__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }

  .navbar__logo {
    font-size: 1.2rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .navbar__menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 85%;
    max-width: 300px;
    height: 100vh;
    background: var(--bg-secondary);
    padding: 70px 1.5rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    transition: var(--trans-03);
    z-index: 1000;
    box-shadow: -5px 0 20px var(--shadow-color);
    backdrop-filter: blur(10px);
  }

  .navbar__menu.is-open {
    right: 0;
  }

  .navbar__link {
    font-size: 1rem;
    padding: 0.4rem 0;
  }

  .auth-buttons {
    display: none;
  }

  .auth-buttons.mobile {
    display: flex;
    position: fixed;
    bottom: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
    justify-content: center;
    gap: 0.8rem;
    z-index: 1000;
  }

  .btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .user-avatar {
    width: 35px;
    height: 35px;
  }

  .user-dropdown {
    min-width: 180px;
  }

  .dropdown-item {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }

  main {
    padding-top: 60px;
  }
}

/* Дополнительные медиа-запросы для различных размеров экрана */
@media (max-width: 480px) {
  .navbar__logo {
    font-size: 1rem;
  }

  .btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .navbar__menu {
    width: 100%;
    max-width: none;
    padding: 60px 1rem 1rem;
  }

  .navbar__link {
    font-size: 0.9rem;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
  }

  .user-dropdown {
    min-width: 160px;
  }

  .dropdown-item {
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
  }

  .theme-toggle {
    font-size: 1.2rem;
  }

  .mobile-menu-toggle {
    width: 25px;
    height: 18px;
  }
}

/* Стили для планшетов */
@media (min-width: 769px) and (max-width: 1024px) {
  .navbar__menu {
    gap: 1.2rem;
  }

  .navbar__link {
    font-size: 0.85rem;
  }

  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
}
</style>
