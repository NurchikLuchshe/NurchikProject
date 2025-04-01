<template>
  <div class="portfolio">
    <div class="container">
      <h1 class="portfolio__title">Мои проекты</h1>
      
      <!-- Фильтры -->
      <div class="portfolio__filters">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          :class="['filter-btn', { active: currentFilter === filter.value }]"
          @click="currentFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Сетка проектов -->
      <div class="portfolio__grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id" 
          class="project-card"
          @click="openProject(project)"
        >
          <div class="project-card__image">
            <img :src="project.image" :alt="project.title">
            <div class="project-card__overlay">
              <div class="project-card__tags">
                <span 
                  v-for="tag in project.tags" 
                  :key="tag" 
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          <div class="project-card__content">
            <h3 class="project-card__title">{{ project.title }}</h3>
            <p class="project-card__description">{{ project.description }}</p>
          </div>
        </div>
      </div>

      <!-- Модальное окно проекта -->
      <div v-if="selectedProject" class="project-modal" @click="closeProject">
        <div class="project-modal__content" @click.stop>
          <button class="project-modal__close" @click="closeProject">
            <i class="bx bx-x"></i>
          </button>
          <div class="project-modal__image">
            <img :src="selectedProject.image" :alt="selectedProject.title">
          </div>
          <div class="project-modal__info">
            <h2>{{ selectedProject.title }}</h2>
            <div class="project-modal__tags">
              <span 
                v-for="tag in selectedProject.tags" 
                :key="tag" 
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
            <p class="project-modal__description">{{ selectedProject.description }}</p>
            <div class="project-modal__links">
              <a 
                v-if="selectedProject.demoUrl" 
                :href="selectedProject.demoUrl" 
                target="_blank" 
                class="btn btn-primary"
              >
                Посмотреть демо
              </a>
              <a 
                v-if="selectedProject.githubUrl" 
                :href="selectedProject.githubUrl" 
                target="_blank" 
                class="btn btn-outline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioView',
  data() {
    return {
      currentFilter: 'all',
      selectedProject: null,
      filters: [
        { value: 'all', label: 'Все проекты' },
        { value: 'web', label: 'Веб-разработка' },
        { value: 'mobile', label: 'Мобильные приложения' },
        { value: 'design', label: 'Дизайн' }
      ],
      projects: [
        {
          id: 1,
          title: 'Социальная сеть',
          description: 'Современная социальная платформа с чатом, профилями и лентой новостей',
          image: 'https://via.placeholder.com/400x300',
          category: 'web',
          tags: ['Vue.js', 'Node.js', 'MongoDB'],
          demoUrl: 'https://example.com',
          githubUrl: 'https://github.com'
        },
        {
          id: 2,
          title: 'Мобильное приложение',
          description: 'Приложение для отслеживания фитнес-активности',
          image: 'https://via.placeholder.com/400x300',
          category: 'mobile',
          tags: ['React Native', 'Firebase'],
          demoUrl: 'https://example.com',
          githubUrl: 'https://github.com'
        },
        {
          id: 3,
          title: 'Дизайн сайта',
          description: 'Современный дизайн для корпоративного сайта',
          image: 'https://via.placeholder.com/400x300',
          category: 'design',
          tags: ['Figma', 'UI/UX'],
          demoUrl: 'https://example.com'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      return this.currentFilter === 'all'
        ? this.projects
        : this.projects.filter(project => project.category === this.currentFilter)
    }
  },
  methods: {
    openProject(project) {
      this.selectedProject = project
      document.body.style.overflow = 'hidden'
    },
    closeProject() {
      this.selectedProject = null
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.portfolio {
  padding: 4rem 0;
  min-height: 100vh;
  background: var(--bg-secondary);
}

.portfolio__title {
  text-align: center;
  color: var(--text-color);
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.portfolio__filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-color);
  color: var(--bg-color);
}

.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px var(--shadow-color);
}

.project-card__image {
  position: relative;
  height: 200px;
}

.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__content {
  padding: 1.5rem;
}

.project-card__title {
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.project-card__description {
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
  font-size: 0.9rem;
}

.tag {
  background: var(--primary-color);
  color: var(--bg-color);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.project-modal__content {
  background: var(--card-bg);
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.project-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
}

.project-modal__image {
  width: 100%;
  height: 400px;
}

.project-modal__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-modal__info {
  padding: 2rem;
}

.project-modal__info h2 {
  color: var(--text-color);
  margin: 0 0 1rem 0;
}

.project-modal__tags {
  margin-bottom: 1rem;
}

.project-modal__description {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.project-modal__links {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .portfolio__filters {
    padding: 0 1rem;
  }

  .project-modal {
    padding: 1rem;
  }

  .project-modal__image {
    height: 250px;
  }

  .project-modal__info {
    padding: 1rem;
  }
}
</style> 