<template>
  <div class="timeline-section">
    <!-- Декоративные элементы фона -->
    <div class="decorative-elements">
      <div class="floating-circle" v-for="n in 8" :key="n"></div>
      <div class="tech-pattern" v-for="n in 12" :key="n + 8">
        <i :class="randomTechIcon()"></i>
      </div>
      <div class="grid-pattern"></div>
    </div>

    <!-- Заголовок секции -->
    <div class="section-header">
      <h2 class="section-title">Мой путь в разработке</h2>
      <p class="section-subtitle">От Junior до Team Lead: история профессионального роста</p>
    </div>

    <div class="timeline">
      <div class="timeline__container">
        <div 
          v-for="(item, index) in timelineItems" 
          :key="index"
          class="timeline__item"
          :class="{ 'timeline__item--right': index % 2 === 1 }"
          @mouseenter="activeItem = index"
          @mouseleave="activeItem = null"
        >
          <div class="timeline__content" :class="{ 'timeline__content--active': activeItem === index }">
            <div class="timeline__header">
              <div class="timeline__icon">
                <i :class="item.icon"></i>
              </div>
              <div class="timeline__date">{{ item.date }}</div>
            </div>
            
            <div class="timeline__main">
              <h3 class="timeline__title">{{ item.title }}</h3>
              <div class="timeline__company">{{ item.company }}</div>
              <p class="timeline__description">{{ item.description }}</p>
            </div>

            <div class="timeline__footer">
              <div class="timeline__tags">
                <span v-for="(tag, tagIndex) in item.tags" 
                      :key="tagIndex" 
                      class="timeline__tag"
                      :style="{ animationDelay: tagIndex * 0.1 + 's' }">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          <div class="timeline__dot" :class="{ 'timeline__dot--active': activeItem === index }"></div>
          <div class="timeline__line"></div>
        </div>
      </div>
    </div>

    <!-- Нижняя секция с призывом к действию -->
    <div class="timeline-footer">
      <p class="footer-text">Заинтересованы в сотрудничестве?</p>
      <router-link to="/contact" class="contact-button">
        Связаться со мной
        <i class='bx bx-right-arrow-alt'></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      activeItem: null,
      techIcons: [
        'bx bxl-react',
        'bx bxl-vue',
        'bx bxl-javascript',
        'bx bxl-nodejs',
        'bx bxl-typescript',
        'bx bxl-docker',
        'bx bxl-aws',
        'bx bxl-github'
      ],
      timelineItems: [
        {
          date: '2023 - Настоящее время',
          title: 'Ведущий Full-Stack разработчик',
          company: 'TechInnovate Solutions',
          icon: 'bx bx-code-block',
          description: 'Руководство командой разработчиков, внедрение микросервисной архитектуры и оптимизация процессов разработки. Успешная реализация крупных проектов с использованием современных технологий.',
          tags: ['Vue.js', 'Node.js', 'Docker', 'AWS']
        },
        {
          date: '2021 - 2023',
          title: 'Senior Frontend разработчик',
          company: 'Digital Dynamics',
          icon: 'bx bx-devices',
          description: 'Разработка высоконагруженных SPA приложений, создание компонентной библиотеки и менторство junior разработчиков. Оптимизация производительности и внедрение современных практик разработки.',
          tags: ['React', 'TypeScript', 'Redux', 'GraphQL']
        },
        {
          date: '2019 - 2021',
          title: 'Middle Frontend разработчик',
          company: 'WebCraft Studio',
          icon: 'bx bx-store',
          description: 'Разработка и оптимизация e-commerce проектов, внедрение PWA и улучшение пользовательского опыта. Создание эффективных инструментов для аналитики и A/B тестирования.',
          tags: ['Vue.js', 'Nuxt.js', 'PWA', 'Jest']
        },
        {
          date: '2018 - 2019',
          title: 'Junior Frontend разработчик',
          company: 'StartUp Hub',
          icon: 'bx bx-game',
          description: 'Разработка интерактивных образовательных интерфейсов и игровых механик. Создание анимированных компонентов и оптимизация производительности canvas-приложений.',
          tags: ['JavaScript', 'HTML5', 'CSS3', 'Canvas']
        }
      ]
    }
  },
  methods: {
    randomTechIcon() {
      return this.techIcons[Math.floor(Math.random() * this.techIcons.length)]
    }
  }
}
</script>

<style scoped>
.timeline-section {
  position: relative;
  min-height: 100vh;
  padding: 4rem 0;
  background: var(--bg-color);
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.decorative-elements::before,
.decorative-elements::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 300px;
  pointer-events: none;
}

.decorative-elements::before {
  top: 0;
  background: linear-gradient(to bottom, 
    var(--bg-color) 0%,
    var(--bg-color) 30%,
    color-mix(in srgb, var(--bg-color) 60%, transparent) 60%,
    color-mix(in srgb, var(--bg-color) 20%, transparent) 80%,
    transparent 100%
  );
}

.decorative-elements::after {
  bottom: 0;
  background: linear-gradient(to top, 
    var(--bg-color) 0%,
    var(--bg-color) 30%,
    color-mix(in srgb, var(--bg-color) 60%, transparent) 60%,
    color-mix(in srgb, var(--bg-color) 20%, transparent) 80%,
    transparent 100%
  );
}

/* Remove old gradient styles */
.timeline-section::before,
.timeline-section::after {
  display: none;
}

/* Adjust z-indexes to ensure proper layering */
.section-header {
  position: relative;
  z-index: 2;
}

.timeline {
  position: relative;
  z-index: 2;
}

.timeline-footer {
  position: relative;
  z-index: 2;
}

/* Декоративные элементы */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(var(--primary-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--primary-color) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.03;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: top;
}

.floating-circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-color) 0%, transparent 70%);
  opacity: 0.05;
  animation: float 20s infinite linear;
  filter: blur(50px);
}

.floating-circle:nth-child(1) { top: -250px; left: -250px; width: 600px; height: 600px; }
.floating-circle:nth-child(2) { top: 20%; right: -300px; width: 800px; height: 800px; animation-delay: -5s; }
.floating-circle:nth-child(3) { bottom: 10%; left: -200px; width: 400px; height: 400px; animation-delay: -10s; }
.floating-circle:nth-child(4) { bottom: -300px; right: 20%; width: 700px; height: 700px; animation-delay: -15s; }
.floating-circle:nth-child(5) { top: 40%; left: 30%; width: 300px; height: 300px; animation-delay: -7s; }
.floating-circle:nth-child(6) { top: 60%; right: 40%; width: 450px; height: 450px; animation-delay: -12s; }
.floating-circle:nth-child(7) { bottom: 30%; left: 50%; width: 350px; height: 350px; animation-delay: -18s; }
.floating-circle:nth-child(8) { top: 10%; left: 60%; width: 550px; height: 550px; animation-delay: -9s; }

.tech-pattern {
  position: absolute;
  color: var(--primary-color);
  opacity: 0.08;
  font-size: 4rem;
  animation: techFloat 15s infinite linear;
  filter: blur(1px);
}

.tech-pattern:nth-child(9) { top: 5%; left: 5%; }
.tech-pattern:nth-child(10) { top: 15%; right: 10%; }
.tech-pattern:nth-child(11) { top: 45%; left: 15%; }
.tech-pattern:nth-child(12) { top: 65%; right: 20%; }
.tech-pattern:nth-child(13) { bottom: 15%; left: 25%; }
.tech-pattern:nth-child(14) { bottom: 35%; right: 30%; }
.tech-pattern:nth-child(15) { top: 25%; left: 35%; }
.tech-pattern:nth-child(16) { top: 75%; right: 40%; }
.tech-pattern:nth-child(17) { bottom: 25%; left: 45%; }
.tech-pattern:nth-child(18) { top: 35%; right: 50%; }
.tech-pattern:nth-child(19) { bottom: 45%; left: 55%; }
.tech-pattern:nth-child(20) { top: 85%; right: 60%; }

@keyframes float {
  0% { transform: rotate(0deg) translate(100px) rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) translate(100px) rotate(-180deg) scale(1.2); }
  100% { transform: rotate(360deg) translate(100px) rotate(-360deg) scale(1); }
}

@keyframes techFloat {
  0% { transform: translateY(0) rotate(0deg) scale(1); }
  50% { transform: translateY(30px) rotate(180deg) scale(1.1); }
  100% { transform: translateY(0) rotate(360deg) scale(1); }
}

/* Заголовок секции */
.section-header {
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: 4rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, var(--primary-color), var(--text-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleAppear 1s ease forwards;
  letter-spacing: -1px;
  text-shadow: 0 10px 30px var(--shadow-color);
}

.section-subtitle {
  font-size: 1.4rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 3rem;
  animation: subtitleAppear 1s ease 0.3s forwards;
  opacity: 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

@keyframes titleAppear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes subtitleAppear {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}

/* Нижняя секция */
.timeline-footer {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.footer-text {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px var(--shadow-color);
}

.contact-button i {
  transition: transform 0.3s ease;
}

.contact-button:hover i {
  transform: translateX(5px);
}

/* Существующие стили таймлайна */
.timeline {
  position: relative;
  z-index: 1;
}

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: transparent;
}

.timeline__container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline__container::after {
  content: '';
  position: absolute;
  width: 6px;
  background: var(--primary-color);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
  border-radius: 3px;
  opacity: 0.3;
}

.timeline__item {
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  margin: 2rem 0;
}

.timeline__item:nth-child(odd) {
  left: 0;
}

.timeline__item:nth-child(even) {
  left: 50%;
}

.timeline__item::before {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background: var(--primary-color);
  border: 4px solid var(--bg-color);
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

.timeline__item:nth-child(even)::before {
  left: -17px;
}

.timeline__content {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 15px;
  box-shadow: 0 10px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  max-width: 500px;
  margin: 0 auto;
}

.timeline__content:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px var(--shadow-color);
}

.timeline__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.timeline__icon {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.timeline__icon i {
  transition: transform 0.3s ease;
}

.timeline__content--active .timeline__icon i {
  transform: scale(1.2);
}

.timeline__date {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 600;
}

.timeline__main {
  margin-bottom: 1rem;
}

.timeline__title {
  font-size: 1.3rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.timeline__company {
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.timeline__description {
  color: var(--text-color);
  opacity: 0.9;
  line-height: 1.5;
  font-size: 0.95rem;
}

.timeline__footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.timeline__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline__tag {
  padding: 0.3rem 0.8rem;
  background: var(--primary-color);
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
  opacity: 0.9;
  animation: tagAppear 0.5s ease forwards;
}

@keyframes tagAppear {
  to {
    opacity: 0.9;
    transform: translateY(0);
  }
}

.timeline__dot {
  transition: all 0.3s ease;
}

.timeline__dot--active {
  transform: scale(1.4);
  box-shadow: 0 0 20px var(--primary-color);
}

.timeline__content {
  transform-origin: left center;
  transition: all 0.3s ease;
}

.timeline__item:nth-child(even) .timeline__content {
  transform-origin: right center;
}

.timeline__content--active {
  transform: scale(1.02);
}

@media screen and (max-width: 768px) {
  .timeline-section {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .timeline__content {
    padding: 1rem;
    max-width: 100%;
  }

  .timeline__title {
    font-size: 1.1rem;
  }

  .timeline__description {
    font-size: 0.9rem;
  }

  .timeline__container::after {
    left: 31px;
  }
  
  .timeline__item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }
  
  .timeline__item:nth-child(even) {
    left: 0;
  }
  
  .timeline__item::before {
    left: 18px;
    right: auto;
  }
}
</style> 