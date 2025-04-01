<template>
  <div class="mobile-menu" :class="{ 'active': isOpen }">
    <div class="mobile-menu__overlay" @click="$emit('close')"></div>
    <div class="mobile-menu__content">
      <div class="mobile-menu__header">
        <button class="mobile-menu__close" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="mobile-menu__body">
        <nav class="mobile-menu__nav">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="mobile-menu__link"
            @click="$emit('close')"
          >
            {{ link.name }}
          </router-link>
        </nav>

        <div class="mobile-menu__actions">
          <template v-if="isAuthenticated">
            <router-link 
              to="/profile" 
              class="mobile-menu__link"
              @click="$emit('close')"
            >
              <i class="fas fa-user"></i>
              {{ currentUser.username }}
            </router-link>
            <button 
              @click="handleLogout" 
              class="mobile-menu__btn mobile-menu__btn--logout"
            >
              <i class="fas fa-sign-out-alt"></i>
              Выйти
            </button>
          </template>
          <template v-else>
            <button 
              @click="showAuthModal('login')" 
              class="mobile-menu__btn mobile-menu__btn--login"
            >
              Войти
            </button>
            <button 
              @click="showAuthModal('register')" 
              class="mobile-menu__btn mobile-menu__btn--register"
            >
              Регистрация
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MobileMenu',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      navLinks: [
        { name: 'Главная', path: '/' },
        { name: 'Портфолио', path: '/portfolio' },
        { name: 'Услуги', path: '/services' },
        { name: 'Контакты', path: '/contact' }
      ]
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      currentUser: state => state.currentUser
    })
  },
  methods: {
    ...mapActions(['logout']),
    showAuthModal(mode) {
      this.$emit('show-auth-modal', mode)
      this.$emit('close')
    },
    async handleLogout() {
      try {
        await this.logout()
        this.$router.push('/')
        this.$emit('close')
      } catch (error) {
        console.error('Error during logout:', error)
      }
    }
  }
}
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s ease, opacity 0.3s ease;
}

.mobile-menu.active {
  visibility: visible;
  opacity: 1;
}

.mobile-menu__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.mobile-menu__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background: var(--bg-color);
  padding: 1rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.active .mobile-menu__content {
  transform: translateX(0);
}

.mobile-menu__header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.mobile-menu__close {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.mobile-menu__close:hover {
  color: var(--primary-color);
}

.mobile-menu__nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.mobile-menu__link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.mobile-menu__link:hover,
.mobile-menu__link.router-link-active {
  color: var(--primary-color);
}

.mobile-menu__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-menu__btn {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.mobile-menu__btn--login {
  background: transparent;
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.mobile-menu__btn--register {
  background: var(--primary-color);
  color: var(--bg-color);
}

.mobile-menu__btn--logout {
  background: #ff4444;
  color: white;
}

.mobile-menu__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow-color);
}

@media (min-width: 769px) {
  .mobile-menu {
    display: none;
  }
}
</style> 