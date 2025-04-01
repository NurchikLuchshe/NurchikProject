<template>
  <div class="mobile-menu" :class="{ 'is-open': isOpen }">
    <div class="mobile-menu__overlay" @click="$emit('close')"></div>
    <div class="mobile-menu__content">
      <div class="mobile-menu__header">
        <router-link to="/" class="mobile-menu__logo" @click="$emit('close')">
          NURCHIK
        </router-link>
        <button class="mobile-menu__close" @click="$emit('close')">
          <i class="bx bx-x"></i>
        </button>
      </div>

      <nav class="mobile-menu__nav">
        <router-link to="/" class="mobile-menu__link" @click="$emit('close')">
          Главная
        </router-link>
        <router-link to="/reviews" class="mobile-menu__link" @click="$emit('close')">
          Отзывы
        </router-link>
        <router-link to="/portfolio" class="mobile-menu__link" @click="$emit('close')">
          Портфолио
        </router-link>
        <router-link to="/services" class="mobile-menu__link" @click="$emit('close')">
          Услуги
        </router-link>
        <router-link to="/contact" class="mobile-menu__link" @click="$emit('close')">
          Контакты
        </router-link>
      </nav>

      <div class="mobile-menu__footer">
        <div class="mobile-menu__auth">
          <button @click="$emit('show-auth-modal', 'login')" class="btn btn-outline">
            Войти
          </button>
          <button @click="$emit('show-auth-modal', 'register')" class="btn btn-primary">
            Регистрация
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 300px;
  height: 100vh;
  background: var(--bg-secondary);
  z-index: 1000;
  transition: var(--trans-03);
}

.mobile-menu.is-open {
  right: 0;
}

.mobile-menu__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: var(--trans-03);
  z-index: -1;
}

.mobile-menu.is-open .mobile-menu__overlay {
  opacity: 1;
  visibility: visible;
}

.mobile-menu__content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.mobile-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.mobile-menu__logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
  text-decoration: none;
}

.mobile-menu__close {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}

.mobile-menu__link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  transition: var(--trans-03);
}

.mobile-menu__link:hover {
  color: var(--primary-color);
}

.mobile-menu__footer {
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.mobile-menu__auth {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.btn {
  width: 100%;
  padding: 0.8rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: var(--trans-03);
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--gradient-orange);
  color: white;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

@media (max-width: 480px) {
  .mobile-menu {
    width: 100%;
    max-width: none;
  }
}
</style> 