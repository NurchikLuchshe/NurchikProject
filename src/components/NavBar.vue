<template>
  <nav class="navbar">
    <router-link to="/" class="navbar__logo">
      <i class="fas fa-code"></i>
      <span>Nurchik</span>
    </router-link>
    
    <button class="navbar__burger" @click="toggleMenu">
      <i class="fas fa-bars"></i>
    </button>

    <div class="navbar__menu" :class="{ active: isMenuOpen }">
      <router-link to="/" class="navbar__link" @click="closeMenu">Главная</router-link>
      <router-link to="/portfolio" class="navbar__link" @click="closeMenu">Портфолио</router-link>
      <router-link to="/contact" class="navbar__link" @click="closeMenu">Контакты</router-link>
      <div class="navbar__actions">
        <button class="navbar__theme-toggle" @click="toggleTheme">
          <i :class="isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false,
      isDarkTheme: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.$store.dispatch('toggleTheme');
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.navbar__logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar__logo i {
  color: var(--primary-color);
}

.navbar__menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.navbar__link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.navbar__link:hover {
  color: var(--primary-color);
}

.navbar__link:hover::after {
  width: 100%;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar__theme-toggle {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.navbar__theme-toggle:hover {
  background: var(--bg-secondary);
  color: var(--primary-color);
}

.navbar__burger {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  width: 40px;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.navbar__burger:hover {
  background: var(--bg-secondary);
  color: var(--primary-color);
}

.navbar__burger i {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .navbar__burger {
    display: flex;
  }

  .navbar__menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100vh;
    background: var(--bg-color);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    transition: right 0.3s ease;
    z-index: 1000;
    border-left: 1px solid var(--border-color);
  }

  .navbar__menu.active {
    right: 0;
  }

  .navbar__link {
    font-size: 1.2rem;
  }

  .navbar__actions {
    margin-top: 2rem;
  }
}
</style> 