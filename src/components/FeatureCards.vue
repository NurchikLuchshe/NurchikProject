<template>
  <div class="features-section">
    <div class="features__grid">
      <div 
        v-for="(feature, index) in features" 
        :key="feature.title"
        class="feature-card"
        :style="{ animationDelay: `${index * 0.2}s` }"
        @mouseenter="activeCard = index"
        @mouseleave="activeCard = null"
      >
        <div class="feature-card__content">
          <div class="feature-card__icon-wrapper">
            <i :class="['bx', feature.icon]"></i>
            <div class="icon-background"></div>
          </div>
          
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__description">{{ feature.description }}</p>
          
          <div class="feature-card__details">
            <ul class="feature-details__list">
              <li v-for="(detail, idx) in feature.details" :key="idx">
                <i class='bx bx-check-circle'></i>
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="feature-card__decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureCards',
  data() {
    return {
      activeCard: null,
      features: [
        {
          title: 'Современные технологии',
          description: 'Использую передовые инструменты и фреймворки для создания эффективных решений',
          icon: 'bx-code-alt',
          details: [
            'Vue.js и React для фронтенда',
            'Node.js для бэкенда',
            'Современные инструменты разработки',
            'Оптимизация производительности'
          ]
        },
        {
          title: 'Креативный дизайн',
          description: 'Создаю уникальные и привлекательные интерфейсы с отличным UX',
          icon: 'bx-palette',
          details: [
            'Современные UI тренды',
            'Адаптивный дизайн',
            'Анимации и интерактивность',
            'Внимание к деталям'
          ]
        },
        {
          title: 'Адаптивность',
          description: 'Разрабатываю сайты, которые отлично работают на всех устройствах',
          icon: 'bx-devices',
          details: [
            'Mobile-first подход',
            'Кроссбраузерная совместимость',
            'Отзывчивый дизайн',
            'Оптимизация для всех экранов'
          ]
        },
        {
          title: 'Качество кода',
          description: 'Пишу чистый, поддерживаемый и масштабируемый код',
          icon: 'bx-code-curly',
          details: [
            'Следование best practices',
            'Современная архитектура',
            'Чистый и документированный код',
            'Модульность и переиспользование'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.features-section {
  width: 100%;
  position: relative;
  z-index: 1;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 2rem;
}

.feature-card {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(var(--card-bg-rgb), 0.5),
    rgba(var(--card-bg-rgb), 0.3)
  );
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 2.5rem;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: cardAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

.feature-card:hover {
  transform: perspective(1000px) translateZ(20px) rotateX(5deg) rotateY(5deg);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.15);
}

.feature-card__content {
  position: relative;
  z-index: 2;
}

.feature-card__icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(var(--primary-color-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-card__icon-wrapper {
  transform: translateZ(30px) scale(1.1);
}

.feature-card__icon-wrapper i {
  font-size: 2.5rem;
  color: var(--primary-color);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-card__icon-wrapper i {
  transform: rotate(360deg);
}

.icon-background {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  opacity: 0.3;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .icon-background {
  transform: scale(1.2);
  opacity: 0.5;
}

.feature-card__title {
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(20px);
}

.feature-card:hover .feature-card__title {
  transform: translateZ(40px);
  background: linear-gradient(135deg, var(--primary-color), #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-card__description {
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 2rem;
  line-height: 1.6;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(10px);
}

.feature-card:hover .feature-card__description {
  transform: translateZ(30px);
  opacity: 1;
}

.feature-card__details {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-card__details {
  opacity: 1;
  transform: translateY(0) translateZ(20px);
}

.feature-details__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-details__list li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--text-color);
  font-size: 1rem;
  opacity: 0.9;
}

.feature-details__list i {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.feature-card__decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.decoration-circle {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.1),
    transparent 70%
  );
  top: -100px;
  right: -100px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .decoration-circle {
  opacity: 1;
  transform: scale(1.2);
}

.decoration-line {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  border-left: 2px solid rgba(var(--primary-color-rgb), 0.2);
  border-bottom: 2px solid rgba(var(--primary-color-rgb), 0.2);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .decoration-line {
  opacity: 1;
  transform: scale(1.2) rotate(-45deg);
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .features__grid {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 2rem;
  }

  .feature-card {
    padding: 2rem;
  }

  .feature-card__icon-wrapper {
    width: 60px;
    height: 60px;
    margin-bottom: 1.5rem;
  }

  .feature-card__icon-wrapper i {
    font-size: 2rem;
  }

  .feature-card__title {
    font-size: 1.5rem;
  }

  .feature-card__description {
    font-size: 1rem;
  }
}
</style> 