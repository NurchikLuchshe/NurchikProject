<template>
  <div class="skills-map">
    <div class="skills-map__container">
      <div class="skills-map__categories">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-btn', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="skills-map__grid">
        <div 
          v-for="skill in filteredSkills" 
          :key="skill.id"
          class="skill-card"
          @mouseenter="showSkillDetails(skill)"
          @mouseleave="hideSkillDetails"
        >
          <div class="skill-card__icon">
            <i :class="skill.icon"></i>
          </div>
          <div class="skill-card__name">{{ skill.name }}</div>
          <div class="skill-card__level">
            <div class="level-bar" :style="{ width: skill.level + '%' }"></div>
          </div>
        </div>
      </div>

      <div 
        v-if="selectedSkill" 
        class="skill-details"
        :class="{ 'skill-details--visible': selectedSkill }"
      >
        <div class="skill-details__header">
          <h3>{{ selectedSkill.name }}</h3>
          <button class="close-btn" @click="hideSkillDetails">&times;</button>
        </div>
        <div class="skill-details__content">
          <p>{{ selectedSkill.description }}</p>
          <div class="skill-details__examples">
            <h4>Примеры работ:</h4>
            <ul>
              <li v-for="(example, index) in selectedSkill.examples" :key="index">
                {{ example }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsMap',
  data() {
    return {
      activeCategory: 'frontend',
      selectedSkill: null,
      categories: [
        { id: 'frontend', name: 'Frontend' },
        { id: 'backend', name: 'Backend' },
        { id: 'design', name: 'Дизайн' },
        { id: 'tools', name: 'Инструменты' }
      ],
      skills: [
        {
          id: 1,
          name: 'Vue.js',
          icon: 'fab fa-vuejs',
          level: 90,
          category: 'frontend',
          description: 'Современный фреймворк для создания пользовательских интерфейсов',
          examples: ['Разработка SPA приложений', 'Интеграция с REST API', 'Управление состоянием приложения']
        },
        {
          id: 2,
          name: 'React',
          icon: 'fab fa-react',
          level: 85,
          category: 'frontend',
          description: 'Библиотека для создания пользовательских интерфейсов',
          examples: ['Разработка компонентов', 'Хуки и функциональные компоненты', 'Оптимизация производительности']
        },
        {
          id: 3,
          name: 'Node.js',
          icon: 'fab fa-node-js',
          level: 80,
          category: 'backend',
          description: 'Среда выполнения JavaScript на стороне сервера',
          examples: ['REST API', 'WebSocket серверы', 'Микросервисная архитектура']
        },
        {
          id: 4,
          name: 'Figma',
          icon: 'fas fa-paint-brush',
          level: 75,
          category: 'design',
          description: 'Профессиональный инструмент для дизайна интерфейсов',
          examples: ['Создание прототипов', 'Дизайн-системы', 'UI/UX дизайн']
        },
        {
          id: 5,
          name: 'Git',
          icon: 'fab fa-git-alt',
          level: 95,
          category: 'tools',
          description: 'Система контроля версий',
          examples: ['Управление ветками', 'CI/CD', 'Коллективная разработка']
        }
      ]
    }
  },
  computed: {
    filteredSkills() {
      return this.skills.filter(skill => skill.category === this.activeCategory)
    }
  },
  methods: {
    showSkillDetails(skill) {
      this.selectedSkill = skill
    },
    hideSkillDetails() {
      this.selectedSkill = null
    }
  }
}
</script>

<style scoped>
.skills-map {
  padding: 2rem;
  background: var(--color-background);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.skills-map__container {
  position: relative;
}

.skills-map__categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--color-background-light);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn.active {
  background: var(--color-primary);
  color: white;
}

.skills-map__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  background: var(--color-background-light);
  padding: 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-card__icon {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.skill-card__name {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.skill-card__level {
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.level-bar {
  height: 100%;
  background: var(--color-primary);
  transition: width 0.3s ease;
}

.skill-details {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: var(--color-background);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
}

.skill-details--visible {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}

.skill-details__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text);
}

.skill-details__content {
  line-height: 1.6;
}

.skill-details__examples {
  margin-top: 1rem;
}

.skill-details__examples ul {
  list-style: none;
  padding: 0;
}

.skill-details__examples li {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.skill-details__examples li::before {
  content: "•";
  color: var(--color-primary);
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .skills-map {
    padding: 1rem;
  }
  
  .skills-map__grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .skill-details {
    width: 95%;
    padding: 1rem;
  }
}
</style> 