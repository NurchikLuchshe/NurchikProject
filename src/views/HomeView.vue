<template>
  <div class="home">
    <!-- Навигация по страницам -->
    <div class="page-nav">
      <div 
        v-for="page in totalPages" 
        :key="page"
        :class="['page-number', { active: currentPage === page }]"
        @click="goToPage(page)"
      ></div>
    </div>

    <!-- Hero Section -->
    <section id="section-1" class="hero">
      <div class="hero__content">
        <div class="hero__left">
          <div class="hero__social">
            <a href="#" class="social-icon">
              <i class="fab fa-github"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-telegram"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          <div class="hero__stats">
            <div class="stat-item">
              <span class="stat-number">5+</span>
              <span class="stat-label">Лет опыта</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Проектов</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">30+</span>
              <span class="stat-label">Клиентов</span>
            </div>
          </div>
        </div>
        <div class="hero__center">
          <div class="hero__image">
            <img :src="userAvatar || defaultAvatar" :alt="isAuthenticated ? currentUser?.username : 'Nurchik'">
          </div>
          <h1 class="hero__title">
            ПРИВЕТ
            <br>
            {{ isAuthenticated ? currentUser?.username.toUpperCase() : 'Я NURCHIK' }}
          </h1>
          <p class="hero__subtitle">Веб-разработчик &  монтажер</p>
          <div class="hero__buttons">
            <router-link to="/portfolio" class="btn btn-primary">Мои работы</router-link>
            <router-link to="/contact" class="btn btn-outline">Связаться</router-link>
          </div>
        </div>
        <div class="hero__right">
          <div class="hero__skills">
            <div class="skill-tag">Vue.js</div>
            <div class="skill-tag">React</div>
            <div class="skill-tag">Node.js</div>
            <div class="skill-tag">TypeScript</div>
            <div class="skill-tag">UI/UX</div>
            <div class="skill-tag">Figma</div>
          </div>
          <div class="hero__quote">
            <i class="fas fa-quote-left quote-icon"></i>
            <p>Создаю современные и удобные веб-приложения, которые помогают бизнесу расти</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="section-2" class="about">
      <div class="container">
        <h2 class="section-title">Обо мне</h2>
        <div class="about__content">
          <div class="about__left">
            <div class="about__image">
              <div class="image-wrapper">
                <img :src="defaultAvatar" alt="Nurchik">
                <div class="image-overlay"></div>
              </div>
            </div>
            <div class="about__achievements">
              <div class="achievement-item">
                <i class="fas fa-award"></i>
                <span>Топ-разработчик 2023</span>
              </div>
              <div class="achievement-item">
                <i class="fas fa-certificate"></i>
                <span>Vue.js Expert</span>
              </div>
              <div class="achievement-item">
                <i class="fas fa-medal"></i>
                <span>Best UI/UX Design</span>
              </div>
            </div>
          </div>
          <div class="about__right">
            <div class="about__text">
              <h3 class="about__heading">Профессиональный путь</h3>
              <p>Я опытный веб-разработчик с более чем 5-летним стажем. Специализируюсь на создании современных и удобных веб-приложений с использованием передовых технологий.</p>
              
              <div class="about__expertise">
                <h4>Ключевые компетенции:</h4>
                <ul class="expertise-list">
                  <li>
                    <i class="fas fa-check-circle"></i>
                    <span>Создание адаптивных и отзывчивых интерфейсов</span>
                  </li>
                  <li>
                    <i class="fas fa-check-circle"></i>
                    <span>Оптимизация производительности веб-приложений</span>
                  </li>
                  <li>
                    <i class="fas fa-check-circle"></i>
                    <span>Разработка пользовательских компонентов</span>
                  </li>
                  <li>
                    <i class="fas fa-check-circle"></i>
                    <span>Интеграция с различными API и сервисами</span>
                  </li>
                </ul>
              </div>

              <div class="about__values">
                <h4>Мои принципы:</h4>
                <div class="values-grid">
                  <div class="value-item">
                    <i class="fas fa-rocket"></i>
                    <h5>Инновации</h5>
                    <p>Постоянное изучение новых технологий</p>
                  </div>
                  <div class="value-item">
                    <i class="fas fa-heart"></i>
                    <h5>Качество</h5>
                    <p>Внимание к деталям в каждом проекте</p>
                  </div>
                  <div class="value-item">
                    <i class="fas fa-users"></i>
                    <h5>Команда</h5>
                    <p>Эффективное взаимодействие с клиентами</p>
                  </div>
                  <div class="value-item">
                    <i class="fas fa-lightbulb"></i>
                    <h5>Креативность</h5>
                    <p>Нестандартный подход к решению задач</p>
                  </div>
                </div>
              </div>

              <div class="about__interests">
                <h4>Профессиональные интересы:</h4>
                <div class="interests-tags">
                  <span class="interest-tag">Web Development</span>
                  <span class="interest-tag">UI/UX Design</span>
                  <span class="interest-tag">Mobile Apps</span>
                  <span class="interest-tag">Cloud Solutions</span>
                  <span class="interest-tag">AI Integration</span>
                  <span class="interest-tag">Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="section-3" class="experience">
      <Timeline />
    </section>

    <!-- Skills Section -->
    <section id="section-4" class="skills">
      <div class="container">
        <h2 class="section-title">Навыки</h2>
        <TechStackVisualizer />
      </div>
    </section>

    <!-- Projects Section -->
    <section id="section-5" class="projects">
      <div class="container">
        <h2 class="section-title">Последние проекты</h2>
        <ProjectGallery />
        <div class="projects__calculator">
          <ProjectCalculator />
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="section-6" class="testimonials section">
      <div class="container">
        <TestimonialsCarousel />
      </div>
    </section>

    <!-- Features Section -->
    <section id="section-7" class="features">
      <div class="features__background">
        <div class="features__gradient"></div>
        <div class="features__pattern"></div>
      </div>
      <div class="container">
        <h2 class="section-title">Мои преимущества</h2>
        <FeatureCards />
      </div>
    </section>

    <!-- Contact Section -->
    <section id="section-8" class="contact">
      <div class="container">
        <h2 class="section-title">Контакты</h2>
        <ContactForm />
      </div>
    </section>

    <!-- Chat Bot -->
    <ChatBot />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ChatBot from '@/components/ChatBot.vue'
import Timeline from '@/components/Timeline.vue'
import ProjectCalculator from '@/components/ProjectCalculator.vue'
import TechStackVisualizer from '@/components/TechStackVisualizer.vue'
import TestimonialsCarousel from '@/components/TestimonialsCarousel.vue'
import FeatureCards from '@/components/FeatureCards.vue'
import ContactForm from '@/components/ContactForm.vue'
import defaultAvatar from '@/assets/images/photo_2024-10-08_17-17-39.jpg'

export default {
  name: 'HomeView',
  components: {
    ChatBot,
    Timeline,
    ProjectCalculator,
    TechStackVisualizer,
    TestimonialsCarousel,
    FeatureCards,
    ContactForm
  },
  data() {
    return {
      defaultAvatar,
      currentPage: 1,
      totalPages: 8,
      skills: [
        { name: 'Веб-разработка', icon: 'bx-code-alt', progress: 95 },
        { name: 'UI/UX Дизайн', icon: 'bx-palette', progress: 90 },
        { name: 'Мобильная разработка', icon: 'bx-mobile-alt', progress: 85 },
        { name: 'SEO оптимизация', icon: 'bx-line-chart', progress: 88 }
      ],
      projects: [
        {
          title: 'Веб-сайт компании',
          description: 'Современный корпоративный сайт с адаптивным дизайном',
          image: defaultAvatar,
          technologies: ['Vue.js', 'SCSS', 'Node.js'],
          demo: 'https://demo.com',
          github: 'https://github.com'
        },
        {
          title: 'Мобильное приложение',
          description: 'Приложение для управления задачами',
          image: defaultAvatar,
          technologies: ['React Native', 'Firebase', 'Redux'],
          demo: 'https://demo.com',
          github: 'https://github.com'
        },
        {
          title: 'Интернет-магазин',
          description: 'Полнофункциональный онлайн-магазин',
          image: defaultAvatar,
          technologies: ['Vue.js', 'Laravel', 'MySQL'],
          demo: 'https://demo.com',
          github: 'https://github.com'
        }
      ],
      features: [
        {
          title: 'Современные технологии',
          description: 'Использую передовые инструменты разработки',
          icon: 'bx-code-alt'
        },
        {
          title: 'Креативный дизайн',
          description: 'Создаю уникальные и привлекательные интерфейсы',
          icon: 'bx-palette'
        },
        {
          title: 'Адаптивность',
          description: 'Сайты отлично работают на всех устройствах',
          icon: 'bx-devices'
        }
      ],
      currentSlide: 0,
      autoPlayInterval: null,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    ...mapState(['userAvatar'])
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeUnmount() {
    this.stopAutoPlay();
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
      const section = document.querySelector(`#section-${page}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.projects.length;
      this.resetAutoPlay();
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.projects.length) % this.projects.length;
      this.resetAutoPlay();
    },
    goToSlide(index) {
      this.currentSlide = index;
      this.resetAutoPlay();
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(this.nextSlide, 5000);
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
      }
    },
    resetAutoPlay() {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }
}
</script>

<style scoped>
/* Стили для курсора */
.hero__buttons .btn,
.hero__social .social-icon,
.hero__link,
.btn,
a,
button, 
input, 
textarea, 
select, 
[role="button"] {
  cursor: none !important;
}

.hero__buttons .btn:hover,
.hero__social .social-icon:hover,
.hero__link:hover,
.btn:hover,
a:hover,
button:hover, 
input:hover, 
textarea:hover, 
select:hover, 
[role="button"]:hover {
  cursor: none !important;
}

.home {
  padding-top: 0;
  overflow: visible;
  background: var(--bg-color);
}

.page-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 1000;
  pointer-events: none;
}

.page-number {
  width: 12px;
  height: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  pointer-events: auto;
}

.page-number::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 255, 136, 0.1);
  opacity: 0;
  transition: all 0.3s ease;
}

.page-number:hover::before {
  opacity: 1;
}

.page-number.active {
  background: #00ff88;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.page-number.active::before {
  opacity: 1;
}

@media (max-width: 768px) {
  .page-nav {
    right: 1rem;
  }

  .page-number {
    width: 10px;
    height: 10px;
  }

  .page-number::before {
    width: 20px;
    height: 20px;
  }
}

section {
  min-height: 100vh;
  height: auto;
  overflow: visible;
  padding: 4rem 0;
  position: relative;
}

.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0;
  background: var(--bg-color);
  overflow: visible;
  min-height: 100vh;
}

.hero__content {
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  gap: 5rem;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
  z-index: 2;
}

.hero__left {
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 3rem;
  background: var(--bg-secondary);
  border-radius: 40px;
  box-shadow: 0 15px 40px var(--shadow-color);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}

.hero__social {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  position: relative;
}

.hero__social::after {
  content: '';
  position: absolute;
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
  opacity: 0.5;
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  font-size: 1.5rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  position: relative;
}

.social-icon::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-color), transparent);
  opacity: 0;
  transition: all 0.4s ease;
}

.social-icon:hover {
  color: var(--primary-color);
  transform: translateY(-5px) scale(1.1);
  border-color: var(--primary-color);
}

.social-icon:hover::before {
  opacity: 0.5;
}

.hero__stats {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: var(--bg-color);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, var(--primary-color-light), transparent);
  opacity: 0;
  transition: all 0.4s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-item:hover::before {
  opacity: 0.1;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, var(--primary-color), var(--text-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.8;
  position: relative;
  z-index: 1;
}

.hero__center {
  text-align: center;
  padding: 4rem;
  background: rgba(var(--bg-secondary-rgb), 0.7);
  border-radius: 50px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
}

.hero__image {
  width: 260px;
  height: 260px;
  margin: 0 auto 4rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--primary-color);
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
  position: relative;
  z-index: 1;
}

.hero__title {
  font-size: 4.5rem;
  background: linear-gradient(45deg, var(--text-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  font-weight: 800;
  line-height: 1.2;
  position: relative;
  z-index: 1;
  word-break: break-word;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.hero__subtitle {
  font-size: 2rem;
  color: var(--text-color);
  opacity: 0.9;
  margin-bottom: 4rem;
  font-weight: 300;
  position: relative;
  z-index: 1;
}

.hero__buttons {
  display: flex;
  gap: 3rem;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.btn {
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  cursor: none !important;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  color: #2d3436;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
}

.btn-outline {
  border: 2px solid transparent;
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.btn-outline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  padding: 2px;
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 255, 136, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.section-title {
  font-size: 3rem;
  background: linear-gradient(45deg, var(--text-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 800;
  position: relative;
  display: inline-block;
  text-shadow: none;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.about {
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
  padding: 8rem 0;
}

.about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 20%, rgba(var(--primary-color-rgb), 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(var(--primary-color-rgb), 0.05) 0%, transparent 50%);
  opacity: 0.8;
  z-index: 1;
}

.about::after {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(to bottom, var(--bg-color) 0%, transparent 15%),
    linear-gradient(to top, var(--bg-color) 0%, transparent 15%);
  pointer-events: none;
  z-index: 2;
}

.about__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  align-items: start;
  position: relative;
  z-index: 3;
}

.about__left {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.about__image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 40px var(--shadow-color);
  position: relative;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.image-wrapper:hover img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 255, 136, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.about__achievements {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: var(--bg-color);
  border-radius: 15px;
  box-shadow: 0 5px 15px var(--shadow-color);
  transition: all 0.3s ease;
}

.achievement-item:hover {
  transform: translateX(10px);
  background: var(--primary-color);
  color: var(--bg-color);
}

.achievement-item i {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.achievement-item:hover i {
  color: var(--bg-color);
}

.achievement-item span {
  font-weight: 600;
  font-size: 1.1rem;
}

.about__right {
  padding: 3rem;
  background: var(--bg-color);
  border-radius: 30px;
  box-shadow: 0 15px 40px var(--shadow-color);
}

.about__heading {
  font-size: 2.5rem;
  background: linear-gradient(45deg, var(--text-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
}

.about__text {
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.8;
}

.about__text p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.about__expertise {
  margin: 3rem 0;
}

.about__expertise h4 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.expertise-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.expertise-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.expertise-list li:hover {
  transform: translateX(10px);
  background: var(--primary-color-light);
}

.expertise-list i {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.about__values {
  margin: 3rem 0;
}

.about__values h4 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.value-item {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
  background: var(--primary-color-light);
}

.value-item i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.value-item h5 {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.value-item p {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
}

.about__interests {
  margin-top: 3rem;
}

.about__interests h4 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.interests-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.interest-tag {
  padding: 0.8rem 1.5rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  color: var(--text-color);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.interest-tag:hover {
  background: var(--primary-color);
  color: var(--bg-color);
  transform: translateY(-3px);
}

@media (max-width: 1200px) {
  .about__content {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .about__left {
    max-width: 600px;
    margin: 0 auto;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about {
    padding: 6rem 0;
  }

  .about__right {
    padding: 2rem;
  }

  .about__heading {
    font-size: 2rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .expertise-list li {
    padding: 0.8rem;
  }

  .interest-tag {
    padding: 0.6rem 1.2rem;
  }
}

.hero__right {
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 3rem;
  background: var(--bg-secondary);
  border-radius: 40px;
  box-shadow: 0 15px 40px var(--shadow-color);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}

.hero__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  position: relative;
}

.hero__skills::after {
  content: '';
  position: absolute;
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
  opacity: 0.5;
}

.skill-tag {
  padding: 0.8rem 1.5rem;
  background: var(--bg-color);
  border-radius: 20px;
  color: var(--text-color);
  font-size: 0.9rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.skill-tag::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, var(--primary-color-light), transparent);
  opacity: 0;
  transition: all 0.4s ease;
}

.skill-tag:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.skill-tag:hover::before {
  opacity: 0.1;
}

.hero__quote {
  background: var(--bg-color);
  padding: 2.5rem;
  border-radius: 25px;
  position: relative;
  transition: all 0.4s ease;
  overflow: hidden;
}

.hero__quote::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, 
    rgba(0, 255, 136, 0.1),
    transparent,
    rgba(0, 255, 136, 0.1)
  );
  opacity: 0;
  transition: all 0.4s ease;
}

.hero__quote:hover::before {
  opacity: 1;
}

.quote-icon {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
  transition: all 0.4s ease;
}

.hero__quote:hover .quote-icon {
  transform: rotate(-10deg) scale(1.1);
  opacity: 0.8;
}

.hero__quote p {
  color: var(--text-color);
  font-style: italic;
  line-height: 1.8;
  font-size: 1.1rem;
  position: relative;
  z-index: 1;
}

@media (max-width: 1400px) {
  .hero__content {
    grid-template-columns: 1fr 2fr 1fr;
    gap: 4rem;
    padding: 0 3rem;
  }

  .hero__image {
    width: 220px;
    height: 220px;
    margin-bottom: 3rem;
  }

  .hero__title {
    font-size: 4rem;
  }
}

@media (max-width: 1200px) {
  .hero__content {
    grid-template-columns: 1fr;
    gap: 4rem;
    padding: 2rem;
    max-width: 800px;
  }

  .hero__left {
    flex-direction: row;
    padding: 3rem;
    gap: 4rem;
  }

  .hero__social {
    flex-direction: row;
    gap: 2rem;
  }

  .hero__social::after {
    display: none;
  }

  .hero__stats {
    flex-direction: row;
    gap: 2rem;
  }

  .hero__center {
    padding: 3rem;
  }

  .hero__right {
    padding: 3rem;
    gap: 4rem;
  }

  .hero__skills::after {
    display: none;
  }

  .hero__image {
    width: 180px;
    height: 180px;
    margin-bottom: 2rem;
  }

  .hero__title {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 6rem 0;
  }

  .hero__content {
    padding: 1.5rem;
    gap: 3rem;
  }

  .hero__left {
    flex-direction: column;
    padding: 2rem;
    gap: 3rem;
  }

  .hero__social {
    gap: 1.5rem;
  }

  .hero__stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .hero__center {
    padding: 2rem;
  }

  .hero__image {
    width: 180px;
    height: 180px;
    margin-bottom: 2rem;
  }

  .hero__title {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
  }

  .hero__subtitle {
    font-size: 1.6rem;
    margin-bottom: 3rem;
  }

  .hero__buttons {
    gap: 2rem;
  }

  .hero__right {
    padding: 2rem;
    gap: 3rem;
  }

  .skill-tag {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }

  .hero__quote {
    padding: 1.5rem;
  }
}

.features {
  position: relative;
  background: var(--bg-color);
  overflow: hidden;
  padding: 8rem 0;
}

.features::before,
.features::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 150px;
  z-index: 3;
  pointer-events: none;
}

.features::before {
  top: 0;
  background: linear-gradient(to bottom,
    var(--bg-color) 0%,
    rgba(var(--bg-color-rgb), 0.8) 40%,
    transparent 100%
  );
}

.features::after {
  bottom: 0;
  background: linear-gradient(to top,
    var(--bg-color) 0%,
    rgba(var(--bg-color-rgb), 0.8) 40%,
    transparent 100%
  );
}

.features__background {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.features__gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%);
  animation: gradientMove 15s ease infinite;
  mask: linear-gradient(to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
}

.features__pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  opacity: 0.5;
  animation: patternMove 20s linear infinite;
  mask: linear-gradient(to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
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

@keyframes patternMove {
  0% {
    transform: translateX(0) translateY(0);
  }
  100% {
    transform: translateX(20px) translateY(20px);
  }
}

.features .container {
  position: relative;
  z-index: 2;
}

.features .section-title {
  margin-bottom: 6rem;
  position: relative;
}

.features .section-title::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.2), transparent 70%);
  border-radius: 50%;
  filter: blur(20px);
  z-index: -1;
}

</style>