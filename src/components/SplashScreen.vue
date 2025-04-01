<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SplashScreen',
  data() {
    return {
      showGreeting: false,
      showName: false,
      isHiding: false,
      progress: 0
    }
  },
  computed: {
    ...mapState(['userAvatar']),
    ...mapGetters(['isAuthenticated', 'currentUser']),
    username() {
      return this.isAuthenticated ? this.currentUser?.username : 'Nurchik'
    }
  },
  mounted() {
    // Показываем логотип
    setTimeout(() => {
      this.showGreeting = true
    }, 500)

    // Показываем имя и прогресс
    setTimeout(() => {
      this.showName = true
      this.startProgress()
    }, 2000)

    // Скрываем splash screen
    setTimeout(() => {
      this.isHiding = true
    }, 4000)

    // Удаляем компонент
    setTimeout(() => {
      this.$emit('hide')
    }, 4500)
  },
  methods: {
    startProgress() {
      const interval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 1
        } else {
          clearInterval(interval)
        }
      }, 20)
    }
  }
}
</script>

<template>
  <div class="splash-screen" :class="{ 'fade-out': isHiding }">
    <div class="splash-background">
      <div class="gradient-overlay"></div>
      <div class="particles">
        <div v-for="n in 20" :key="n" class="particle"></div>
      </div>
    </div>
    
    <div class="splash-content">
      <div class="logo-container" :class="{ 'show': showGreeting }">
        <div class="logo-circle">
          <div class="logo-inner"></div>
          <div class="logo-text">N</div>
        </div>
        <div class="logo-rings">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
        </div>
      </div>

      <div class="text-container" :class="{ 'show': showName }">
        <div class="greeting">
          <span v-for="(letter, index) in 'Добро пожаловать'" :key="index" class="letter">{{ letter }}</span>
        </div>
        <div class="name-container">
          <div class="name">
            <span v-for="(letter, index) in username" :key="index" class="letter">{{ letter }}</span>
          </div>
          <div class="title">WEB DEVELOPER</div>
        </div>
      </div>

      <div class="progress-container" :class="{ 'show': showName }">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease, transform 0.5s ease;
  overflow: hidden;
}

.splash-screen.fade-out {
  opacity: 0;
  transform: translateY(-100%);
}

.splash-background {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--primary-color-light) 0%, transparent 70%);
  opacity: 0.1;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, 
    rgba(0, 255, 136, 0.1),
    transparent,
    rgba(0, 255, 136, 0.1)
  );
  animation: gradientMove 8s ease infinite;
}

.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 3s ease-in-out infinite;
}

.particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; top: 40%; animation-delay: 0.2s; }
.particle:nth-child(3) { left: 30%; top: 60%; animation-delay: 0.4s; }
.particle:nth-child(4) { left: 40%; top: 80%; animation-delay: 0.6s; }
.particle:nth-child(5) { left: 50%; top: 20%; animation-delay: 0.8s; }
.particle:nth-child(6) { left: 60%; top: 40%; animation-delay: 1.0s; }
.particle:nth-child(7) { left: 70%; top: 60%; animation-delay: 1.2s; }
.particle:nth-child(8) { left: 80%; top: 80%; animation-delay: 1.4s; }
.particle:nth-child(9) { left: 90%; top: 20%; animation-delay: 1.6s; }
.particle:nth-child(10) { left: 95%; top: 40%; animation-delay: 1.8s; }
.particle:nth-child(11) { left: 5%; top: 60%; animation-delay: 2.0s; }
.particle:nth-child(12) { left: 15%; top: 80%; animation-delay: 2.2s; }
.particle:nth-child(13) { left: 25%; top: 20%; animation-delay: 2.4s; }
.particle:nth-child(14) { left: 35%; top: 40%; animation-delay: 2.6s; }
.particle:nth-child(15) { left: 45%; top: 60%; animation-delay: 2.8s; }
.particle:nth-child(16) { left: 55%; top: 80%; animation-delay: 3.0s; }
.particle:nth-child(17) { left: 65%; top: 20%; animation-delay: 3.2s; }
.particle:nth-child(18) { left: 75%; top: 40%; animation-delay: 3.4s; }
.particle:nth-child(19) { left: 85%; top: 60%; animation-delay: 3.6s; }
.particle:nth-child(20) { left: 95%; top: 80%; animation-delay: 3.8s; }

.splash-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.logo-container {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-container.show {
  opacity: 1;
  transform: scale(1);
}

.logo-circle {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.logo-inner {
  position: absolute;
  inset: 0;
  border: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: circleRotate 3s linear infinite;
}

.logo-inner::before,
.logo-inner::after {
  content: '';
  position: absolute;
  inset: -4px;
  border: 4px solid transparent;
  border-radius: 50%;
  animation: circlePulse 2s ease-in-out infinite;
}

.logo-inner::before {
  border-top-color: var(--primary-color);
  border-right-color: var(--primary-color);
}

.logo-inner::after {
  border-bottom-color: var(--primary-color);
  border-left-color: var(--primary-color);
  animation-delay: 1s;
}

.logo-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(45deg, var(--primary-color), var(--text-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textGlow 2s ease-in-out infinite;
}

.logo-rings {
  position: absolute;
  inset: -20px;
  pointer-events: none;
}

.ring {
  position: absolute;
  inset: 0;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  opacity: 0;
  animation: ringExpand 2s ease-out infinite;
}

.ring-1 { animation-delay: 0s; }
.ring-2 { animation-delay: 0.5s; }
.ring-3 { animation-delay: 1s; }

.text-container {
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.text-container.show {
  opacity: 1;
  transform: translateY(0);
}

.greeting {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.name-container {
  margin-top: 1rem;
}

.name {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.8;
  letter-spacing: 2px;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: letterAppear 0.5s ease forwards;
}

.letter:nth-child(1) { animation-delay: 0.1s; }
.letter:nth-child(2) { animation-delay: 0.2s; }
.letter:nth-child(3) { animation-delay: 0.3s; }
.letter:nth-child(4) { animation-delay: 0.4s; }
.letter:nth-child(5) { animation-delay: 0.5s; }
.letter:nth-child(6) { animation-delay: 0.6s; }
.letter:nth-child(7) { animation-delay: 0.7s; }
.letter:nth-child(8) { animation-delay: 0.8s; }
.letter:nth-child(9) { animation-delay: 0.9s; }
.letter:nth-child(10) { animation-delay: 1.0s; }
.letter:nth-child(11) { animation-delay: 1.1s; }
.letter:nth-child(12) { animation-delay: 1.2s; }
.letter:nth-child(13) { animation-delay: 1.3s; }

.progress-container {
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.progress-container.show {
  opacity: 1;
  transform: translateY(0);
}

.progress-bar {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.progress-fill {
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #00cc6a);
  border-radius: 2px;
  transition: width 0.3s ease;
  animation: progressFill 2s ease forwards;
}

@keyframes circleRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes circlePulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

@keyframes textGlow {
  0% {
    filter: drop-shadow(0 0 5px var(--primary-color));
  }
  50% {
    filter: drop-shadow(0 0 20px var(--primary-color));
  }
  100% {
    filter: drop-shadow(0 0 5px var(--primary-color));
  }
}

@keyframes ringExpand {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

@keyframes letterAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100px) translateX(20px);
    opacity: 0;
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

@keyframes progressFill {
  to {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .logo-circle {
    width: 120px;
    height: 120px;
  }

  .logo-text {
    font-size: 3rem;
  }

  .greeting {
    font-size: 2rem;
  }

  .name {
    font-size: 2.5rem;
  }

  .title {
    font-size: 1rem;
  }

  .progress-bar {
    width: 150px;
  }
}
</style> 