<script>
import project1Image from '@/assets/images/project1.jpg'

export default {
  name: 'PortfolioView',
  data() {
    return {
      activeProject: null,
      currentFilter: 'Все',
      filters: ['Все', 'Веб-приложения', 'Мобильные', 'UI/UX', 'E-commerce', 'Игры'],
      skillCategories: [
        {
          title: 'Frontend',
          icon: 'bx-layout',
          skills: [
            { name: 'Vue.js', level: 95 },
            { name: 'React', level: 90 },
            { name: 'JavaScript', level: 95 },
            { name: 'HTML/CSS', level: 98 }
          ]
        },
        {
          title: 'Backend',
          icon: 'bx-server',
          skills: [
            { name: 'Node.js', level: 85 },
            { name: 'Python', level: 80 },
            { name: 'MongoDB', level: 85 },
            { name: 'SQL', level: 75 }
          ]
        },
        {
          title: 'Mobile',
          icon: 'bx-mobile-alt',
          skills: [
            { name: 'React Native', level: 85 },
            { name: 'Flutter', level: 75 },
            { name: 'iOS/Swift', level: 70 },
            { name: 'Android/Kotlin', level: 65 }
          ]
        },
        {
          title: 'Дизайн',
          icon: 'bx-palette',
          skills: [
            { name: 'UI/UX', level: 90 },
            { name: 'Figma', level: 95 },
            { name: 'Adobe XD', level: 85 },
            { name: 'Photoshop', level: 80 }
          ]
        }
      ],
      projects: [
        {
          id: 1,
          title: 'Социальная платформа для творческих людей',
          description: 'Инновационная социальная сеть для художников, музыкантов и креативных профессионалов. Платформа включает систему монетизации контента, live-стриминг и коллаборативные инструменты.',
          image: project1Image,
          technologies: [
            { name: 'Vue.js', icon: 'bxl-vuejs' },
            { name: 'Node.js', icon: 'bxl-nodejs' },
            { name: 'MongoDB', icon: 'bxl-mongodb' },
            { name: 'WebRTC', icon: 'bx-video' }
          ],
          category: 'Веб-приложения',
          duration: '6 месяцев',
          role: 'Full-stack разработчик',
          demo: 'https://demo.com',
          github: 'https://github.com',
          featured: true
        },
        {
          id: 2,
          title: 'AI Фитнес-тренер',
          description: 'Мобильное приложение с искусственным интеллектом для персонализированных тренировок. Включает распознавание движений через камеру, real-time корректировку техники и адаптивные планы тренировок.',
          image: project1Image,
          technologies: [
            { name: 'React Native', icon: 'bxl-react' },
            { name: 'TensorFlow', icon: 'bx-brain' },
            { name: 'Firebase', icon: 'bxl-firebase' }
          ],
          category: 'Мобильные',
          duration: '4 месяца',
          role: 'Mobile разработчик',
          demo: 'https://demo.com',
          github: 'https://github.com'
        },
        {
          id: 3,
          title: 'Система дизайн-компонентов',
          description: 'Масштабируемая дизайн-система с более чем 100 компонентами, темизацией и автоматической генерацией документации. Используется в крупных enterprise-проектах.',
          image: project1Image,
          technologies: [
            { name: 'Figma', icon: 'bxl-figma' },
            { name: 'Storybook', icon: 'bx-book' },
            { name: 'TypeScript', icon: 'bxl-typescript' }
          ],
          category: 'UI/UX',
          duration: '3 месяца',
          role: 'UI/UX дизайнер',
          demo: 'https://demo.com',
          github: 'https://github.com'
        },
        {
          id: 4,
          title: 'Маркетплейс эксклюзивной одежды',
          description: 'E-commerce платформа для дизайнерской одежды с AR примеркой, интеграцией с блокчейном для подтверждения оригинальности и системой dropshipping.',
          image: project1Image,
          technologies: [
            { name: 'Next.js', icon: 'bxl-react' },
            { name: 'Stripe', icon: 'bx-credit-card' },
            { name: 'AWS', icon: 'bxl-aws' }
          ],
          category: 'E-commerce',
          duration: '5 месяцев',
          role: 'Lead Developer',
          demo: 'https://demo.com',
          github: 'https://github.com',
          featured: true
        },
        {
          id: 5,
          title: '3D Головоломка',
          description: 'Браузерная игра-головоломка с процедурной генерацией уровней, физическим движком и мультиплеером. Поддерживает VR режим.',
          image: project1Image,
          technologies: [
            { name: 'Three.js', icon: 'bx-cube' },
            { name: 'WebGL', icon: 'bx-shape-triangle' },
            { name: 'Socket.io', icon: 'bx-network-chart' }
          ],
          category: 'Игры',
          duration: '4 месяца',
          role: 'Game Developer',
          demo: 'https://demo.com',
          github: 'https://github.com'
        },
        {
          id: 6,
          title: 'Приложение для медитации',
          description: 'Мобильное приложение с 3D-звуком, генеративной музыкой и биометрической обратной связью для глубокой медитации.',
          image: project1Image,
          technologies: [
            { name: 'Flutter', icon: 'bxl-flutter' },
            { name: 'Unity', icon: 'bx-unity' },
            { name: 'CoreML', icon: 'bx-chip' }
          ],
          category: 'Мобильные',
          duration: '3 месяца',
          role: 'Mobile Developer',
          demo: 'https://demo.com',
          github: 'https://github.com'
        },
        {
          id: 7,
          title: 'Дашборд аналитики',
          description: 'Интерактивная система визуализации данных с real-time обновлениями, кастомизируемыми виджетами и ML-предсказаниями.',
          image: project1Image,
          technologies: [
            { name: 'D3.js', icon: 'bx-chart' },
            { name: 'Python', icon: 'bxl-python' },
            { name: 'Redis', icon: 'bx-data' }
          ],
          category: 'Веб-приложения',
          duration: '4 месяца',
          role: 'Frontend Developer',
          demo: 'https://demo.com',
          github: 'https://github.com'
        },
        {
          id: 8,
          title: 'NFT Маркетплейс',
          description: 'Платформа для торговли цифровым искусством с поддержкой multiple blockchains, собственным токеном и системой роялти.',
          image: project1Image,
          technologies: [
            { name: 'Solidity', icon: 'bx-coin-stack' },
            { name: 'Web3.js', icon: 'bx-bitcoin' },
            { name: 'React', icon: 'bxl-react' }
          ],
          category: 'E-commerce',
          duration: '6 месяцев',
          role: 'Blockchain Developer',
          demo: 'https://demo.com',
          github: 'https://github.com'
        },
        {
          id: 9,
          title: 'Дизайн-система банка',
          description: 'Комплексный редизайн мобильного и веб-интерфейса крупного банка, включая создание дизайн-системы и гайдлайнов для команды из 50+ дизайнеров.',
          image: project1Image,
          technologies: [
            { name: 'Figma', icon: 'bxl-figma' },
            { name: 'Principle', icon: 'bx-motion' },
            { name: 'Framer', icon: 'bx-layout' }
          ],
          category: 'UI/UX',
          duration: '8 месяцев',
          role: 'Lead Designer',
          demo: 'https://demo.com',
          github: 'https://github.com',
          featured: true
        },
        {
          id: 10,
          title: 'AR Игра-квест',
          description: 'Мобильная игра с дополненной реальностью, где игроки решают загадки в реальном мире. Включает систему геолокации и социальные механики.',
          image: project1Image,
          technologies: [
            { name: 'Unity', icon: 'bx-unity' },
            { name: 'ARKit', icon: 'bx-glasses' },
            { name: 'C#', icon: 'bx-code-alt' }
          ],
          category: 'Игры',
          duration: '5 месяцев',
          role: 'AR Developer',
          demo: 'https://demo.com',
          github: 'https://github.com'
        }
      ],
      workSteps: [
        {
          title: 'Обсуждение',
          description: 'Детальное обсуждение проекта, целей и ожиданий',
          icon: 'bx-conversation'
        },
        {
          title: 'Планирование',
          description: 'Разработка стратегии и технического плана',
          icon: 'bx-pencil'
        },
        {
          title: 'Разработка',
          description: 'Создание проекта с регулярными обновлениями',
          icon: 'bx-code-alt'
        },
        {
          title: 'Тестирование',
          description: 'Тщательное тестирование и оптимизация',
          icon: 'bx-test-tube'
        },
        {
          title: 'Запуск',
          description: 'Развертывание проекта и поддержка',
          icon: 'bx-rocket'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.currentFilter === 'Все') {
        return this.projects
      }
      return this.projects.filter(project => project.category === this.currentFilter)
    }
  },
  methods: {
    setFilter(filter) {
      this.currentFilter = filter
    },
    getSkillIcon(skillName) {
      const icons = {
        'Vue.js': 'bxl-vuejs',
        'React': 'bxl-react',
        'JavaScript': 'bxl-javascript',
        'HTML/CSS': 'bxl-html5',
        'Node.js': 'bxl-nodejs',
        'Python': 'bxl-python',
        'MongoDB': 'bxl-mongodb',
        'SQL': 'bx-data',
        'React Native': 'bxl-react',
        'Flutter': 'bxl-flutter',
        'iOS/Swift': 'bxl-apple',
        'Android/Kotlin': 'bxl-android',
        'UI/UX': 'bx-palette',
        'Figma': 'bxl-figma',
        'Adobe XD': 'bx-x',
        'Photoshop': 'bxl-adobe'
      }
      return icons[skillName] || 'bx-code-alt'
    },
    startCounters() {
      const counters = document.querySelectorAll('.counter')
      const speed = 200

      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target')
        const increment = target / speed

        const updateCount = () => {
          const count = +counter.innerText
          if (count < target) {
            counter.innerText = Math.ceil(count + increment)
            setTimeout(updateCount, 1)
          } else {
            counter.innerText = target
          }
        }

        updateCount()
      })
    }
  },
  mounted() {
    this.startCounters()

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.statistics__item, .skill-category, .process-step').forEach(el => {
      observer.observe(el)
    })
  }
}
</script>

<template>
  <div class="portfolio">
    <div class="container">
      <h1 class="page-title">Портфолио</h1>
      
      <!-- Фильтры -->
      <div class="portfolio-filters">
        <button 
          v-for="filter in filters" 
          :key="filter"
          :class="['filter-btn', { active: currentFilter === filter }]"
          @click="setFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Сетка проектов -->
      <div class="portfolio-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id" 
          class="portfolio-item"
          :class="{ 'featured': project.featured }"
        >
          <div class="portfolio-item__image">
            <img :src="project.image" :alt="project.title">
            <div class="portfolio-item__overlay">
              <h3>{{ project.title }}</h3>
              <p>{{ project.category }}</p>
              <div class="portfolio-item__tech">
                <i v-for="tech in project.technologies" 
                   :key="tech.name" 
                   :class="tech.icon"
                   class="tech-icon">
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Статистика -->
      <div class="statistics">
        <div class="statistics__item">
          <div class="counter" data-target="150">0</div>
          <p>Выполненных проектов</p>
        </div>
        <div class="statistics__item">
          <div class="counter" data-target="50">0</div>
          <p>Довольных клиентов</p>
        </div>
        <div class="statistics__item">
          <div class="counter" data-target="5">0</div>
          <p>Лет опыта</p>
        </div>
      </div>

      <!-- Навыки -->
      <div class="skills-section">
        <h2>Навыки</h2>
        <div class="skills-grid">
          <div v-for="category in skillCategories" 
               :key="category.title" 
               class="skill-category">
            <i :class="category.icon" class="category-icon"></i>
            <h3>{{ category.title }}</h3>
            <div class="skills-list">
              <div v-for="skill in category.skills" 
                   :key="skill.name" 
                   class="skill-item">
                <div class="skill-info">
                  <span>{{ skill.name }}</span>
                  <span>{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Процесс работы -->
      <div class="work-process">
        <h2>Процесс работы</h2>
        <div class="process-steps">
          <div v-for="step in workSteps" 
               :key="step.title" 
               class="process-step">
            <i :class="step.icon" class="step-icon"></i>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.portfolio {
  padding: 2rem 0;
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.portfolio-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: var(--primary-color-light);
}

.filter-btn.active {
  background: var(--primary-color);
  color: white;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.portfolio-item {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: transform 0.3s ease;
}

.portfolio-item.featured {
  grid-column: span 2;
}

.portfolio-item:hover {
  transform: translateY(-5px);
}

.portfolio-item__image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.portfolio-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-item__image img {
  transform: scale(1.1);
}

.portfolio-item__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-item__overlay {
  transform: translateY(0);
}

.portfolio-item__overlay h3 {
  margin: 0;
  font-size: 1.2rem;
}

.portfolio-item__overlay p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.portfolio-item__tech {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tech-icon {
  font-size: 1.2rem;
}

.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  text-align: center;
}

.statistics__item {
  padding: 2rem;
  background: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.statistics__item .counter {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.skills-section {
  margin: 4rem 0;
}

.skills-section h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-category {
  padding: 2rem;
  background: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.category-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.skill-category h3 {
  margin-bottom: 1rem;
}

.skill-item {
  margin-bottom: 1rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-bar {
  height: 8px;
  background: var(--bg-color-light);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: var(--primary-color);
  border-radius: 4px;
  transition: width 1s ease;
}

.work-process {
  margin: 4rem 0;
}

.work-process h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.process-step {
  text-align: center;
  padding: 2rem;
  background: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.step-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.process-step h3 {
  margin-bottom: 0.5rem;
}

.process-step p {
  color: var(--text-color-light);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .portfolio-item.featured {
    grid-column: span 1;
  }
  
  .statistics {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .process-steps {
    grid-template-columns: 1fr;
  }
}
</style> 