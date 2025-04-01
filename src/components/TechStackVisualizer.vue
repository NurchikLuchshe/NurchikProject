<template>
  <div class="tech-stack">
    <div class="tech-stack__container">
      <div class="tech-stack__legend">
        <div 
          v-for="category in categories" 
          :key="category"
          class="legend-item"
          :class="[category, { active: activeCategories.includes(category) }]"
          @click="toggleCategory(category)"
        >
          <span class="legend-color" :class="category"></span>
          <span>{{ categoryNames[category] }}</span>
        </div>
      </div>
      
      <div class="tech-stack__grid">
        <div 
          v-for="tech in filteredTechnologies" 
          :key="tech.id"
          class="tech-card"
          :class="tech.category"
          @mouseenter="showConnections(tech.id)"
          @mouseleave="hideConnections"
        >
          <div class="tech-card__icon">
            <i :class="tech.icon"></i>
          </div>
          <div class="tech-card__content">
            <h3>{{ tech.name }}</h3>
            <div class="tech-card__progress">
              <div 
                class="progress-bar"
                :style="{ width: tech.progress + '%' }"
              ></div>
            </div>
            <p class="tech-card__description">{{ tech.description }}</p>
          </div>
          <div class="tech-card__connections">
            <div 
              v-for="connection in tech.connections" 
              :key="connection"
              class="connection-line"
              :class="{ active: activeConnections.includes(connection) }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechStackVisualizer',
  data() {
    return {
      activeConnections: [],
      activeCategories: [],
      categories: ['frontend', 'backend', 'database', 'tools'],
      categoryNames: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        tools: 'Tools'
      },
      technologies: [
        {
          id: 'vue',
          name: 'Vue.js',
          icon: 'bx bxl-vuejs',
          category: 'frontend',
          progress: 95,
          description: 'Основной фреймворк для фронтенд-разработки',
          connections: ['typescript', 'vite', 'pinia']
        },
        {
          id: 'react',
          name: 'React',
          icon: 'bx bxl-react',
          category: 'frontend',
          progress: 90,
          description: 'Используется для сложных веб-приложений',
          connections: ['typescript', 'redux', 'nextjs']
        },
        {
          id: 'node',
          name: 'Node.js',
          icon: 'bx bxl-nodejs',
          category: 'backend',
          progress: 85,
          description: 'Серверная платформа',
          connections: ['express', 'mongodb', 'typescript']
        },
        {
          id: 'express',
          name: 'Express',
          icon: 'bx bxl-nodejs',
          category: 'backend',
          progress: 80,
          description: 'Веб-фреймворк для Node.js',
          connections: ['node', 'mongodb', 'jwt']
        },
        {
          id: 'mongodb',
          name: 'MongoDB',
          icon: 'bx bxs-data',
          category: 'database',
          progress: 85,
          description: 'NoSQL база данных',
          connections: ['node', 'express', 'mongoose']
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          icon: 'bx bxl-typescript',
          category: 'tools',
          progress: 90,
          description: 'Типизированный JavaScript',
          connections: ['vue', 'react', 'node']
        },
        {
          id: 'vite',
          name: 'Vite',
          icon: 'bx bx-bolt-circle',
          category: 'tools',
          progress: 95,
          description: 'Современный сборщик',
          connections: ['vue', 'typescript']
        },
        {
          id: 'pinia',
          name: 'Pinia',
          icon: 'bx bx-store',
          category: 'tools',
          progress: 90,
          description: 'Управление состоянием',
          connections: ['vue', 'typescript']
        },
        {
          id: 'redux',
          name: 'Redux',
          icon: 'bx bx-data',
          category: 'tools',
          progress: 85,
          description: 'Управление состоянием',
          connections: ['react', 'typescript']
        },
        {
          id: 'nextjs',
          name: 'Next.js',
          icon: 'bx bx-code-alt',
          category: 'frontend',
          progress: 80,
          description: 'React фреймворк',
          connections: ['react', 'typescript']
        },
        {
          id: 'jwt',
          name: 'JWT',
          icon: 'bx bx-key',
          category: 'tools',
          progress: 85,
          description: 'Аутентификация',
          connections: ['express', 'node']
        },
        {
          id: 'mongoose',
          name: 'Mongoose',
          icon: 'bx bx-leaf',
          category: 'tools',
          progress: 80,
          description: 'ODM для MongoDB',
          connections: ['mongodb', 'node']
        }
      ]
    }
  },
  computed: {
    filteredTechnologies() {
      if (this.activeCategories.length === 0) {
        return this.technologies
      }
      return this.technologies.filter(tech => 
        this.activeCategories.includes(tech.category)
      )
    }
  },
  methods: {
    showConnections(techId) {
      const tech = this.technologies.find(t => t.id === techId)
      if (tech) {
        this.activeConnections = tech.connections
      }
    },
    hideConnections() {
      this.activeConnections = []
    },
    toggleCategory(category) {
      const index = this.activeCategories.indexOf(category)
      if (index === -1) {
        this.activeCategories.push(category)
      } else {
        this.activeCategories.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.tech-stack {
  background: linear-gradient(135deg, 
    rgba(var(--card-bg-rgb), 0.4),
    rgba(var(--card-bg-rgb), 0.2)
  );
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.tech-stack::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(var(--primary-color-rgb), 0.1),
    transparent 70%
  );
  opacity: 0.5;
  z-index: 0;
}

.tech-stack__container {
  position: relative;
  z-index: 1;
}

.tech-stack__legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 4rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  border-radius: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.legend-item.active {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}

.legend-item.active::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(var(--primary-color-rgb), 0.2),
    transparent
  );
  opacity: 1;
}

.legend-item.active .legend-color {
  transform: scale(1.2);
  box-shadow: 0 0 30px var(--primary-color);
}

.legend-color {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 20px var(--primary-color);
}

.legend-color::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid currentColor;
  opacity: 0.3;
  animation: pulse 2s infinite;
}

.tech-stack__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.tech-card {
  position: relative;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: pointer;
}

.tech-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(var(--primary-color-rgb), 0.1),
    transparent 40%,
    transparent 60%,
    rgba(var(--primary-color-rgb), 0.1)
  );
  opacity: 0;
  transition: all 0.4s ease;
}

.tech-card::after {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-color-rgb), 0.1) 0%,
    transparent 50%
  );
  top: -50%;
  left: -50%;
  opacity: 0;
  transition: all 0.6s ease;
  transform: scale(0.5);
}

.tech-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px var(--shadow-color);
  border-color: var(--primary-color);
}

.tech-card:hover::before {
  opacity: 1;
}

.tech-card:hover::after {
  opacity: 1;
  transform: scale(1) rotate(45deg);
}

.tech-card__icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color);
  border-radius: 20px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;
  border: 1px solid var(--border-color);
}

.tech-card__icon i {
  font-size: 40px;
  transition: all 0.4s ease;
}

.tech-card:hover .tech-card__icon i {
  transform: scale(1.2);
}

.tech-card__content {
  position: relative;
  z-index: 1;
}

.tech-card__content h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.tech-card:hover .tech-card__content h3 {
  background: var(--gradient-orange);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateX(5px);
}

.tech-card__description {
  color: var(--text-color-light);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tech-card__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: auto;
}

.skill-badge {
  padding: 0.5rem 1rem;
  background: var(--bg-color);
  border-radius: 12px;
  font-size: 0.9rem;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.tech-card:hover .skill-badge {
  background: var(--primary-color);
  color: var(--bg-color);
  transform: translateY(-3px);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--bg-color);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  margin-top: 1rem;
}

.progress-bar__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--gradient-orange);
  border-radius: 3px;
  transition: width 1s ease;
}

.tech-card:hover .progress-bar__fill {
  animation: progressPulse 1.5s ease infinite;
}

@keyframes progressPulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

.tech-card__connections {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: auto;
}

.connection-line {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
}

.connection-line.active {
  background: var(--primary-color);
}

.frontend {
  --card-accent: #42b883;
  border-color: rgba(66, 184, 131, 0.3);
}

.backend {
  --card-accent: #3498db;
  border-color: rgba(52, 152, 219, 0.3);
}

.database {
  --card-accent: #e74c3c;
  border-color: rgba(231, 76, 60, 0.3);
}

.tools {
  --card-accent: #f1c40f;
  border-color: rgba(241, 196, 15, 0.3);
}

.legend-color.frontend {
  background: linear-gradient(135deg, #42b883, #2d805c);
  box-shadow: 0 0 20px rgba(66, 184, 131, 0.4);
}

.legend-color.backend {
  background: linear-gradient(135deg, #3498db, #2980b9);
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.4);
}

.legend-color.database {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.4);
}

.legend-color.tools {
  background: linear-gradient(135deg, #f1c40f, #f39c12);
  box-shadow: 0 0 20px rgba(241, 196, 15, 0.4);
}

@media (max-width: 768px) {
  .tech-stack {
    padding: 1.5rem;
  }

  .tech-stack__legend {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
  }

  .legend-item {
    padding: 0.8rem 1.5rem;
  }

  .tech-stack__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .tech-card {
    padding: 2rem;
  }
}
</style> 