<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <nav class="nav container">
      <router-link to="/" class="nav__logo">
        <span class="logo-text">Нурчик</span>
      </router-link>

      <div class="nav__menu" :class="{ 'show-menu': isMenuShown }">
        <ul class="nav__list">
          <li class="nav__item">
            <router-link to="/" class="nav__link" active-class="active" exact>
              Главная
            </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/portfolio" class="nav__link" active-class="active">
              Портфолио
            </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/contact" class="nav__link" active-class="active">
              Контакты
            </router-link>
          </li>
        </ul>

        <div class="nav__close" @click="toggleMenu">
          <i class='bx bx-x'></i>
        </div>
      </div>

      <div class="nav__toggle" @click="toggleMenu">
        <i class='bx bx-menu'></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      isMenuShown: false,
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleMenu() {
      this.isMenuShown = !this.isMenuShown
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  z-index: 100;
  transition: all 0.4s ease;
}

.header--scrolled {
  background: var(--bg-color);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.nav {
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__logo {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
  text-decoration: none;
}

.logo-text {
  background: linear-gradient(45deg, var(--text-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
}

.nav__list {
  display: flex;
  column-gap: 2.5rem;
}

.nav__item {
  list-style: none;
}

.nav__link {
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.nav__link:hover::after,
.nav__link.active::after {
  width: 100%;
}

.nav__link.active {
  color: var(--primary-color);
}

.nav__close,
.nav__toggle {
  display: none;
}

@media screen and (max-width: 768px) {
  .nav__menu {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    background: var(--bg-color);
    padding: 4rem 0;
    border-radius: 0 0 1.5rem 1.5rem;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
  }

  .show-menu {
    top: 0;
  }

  .nav__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2rem;
  }

  .nav__close,
  .nav__toggle {
    display: block;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-color);
  }

  .nav__close {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
  }
}
</style> 