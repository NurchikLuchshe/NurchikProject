<template>
  <div class="services">
    <div class="container">
      <h1 class="page-title">Услуги</h1>
      
      <!-- Основные услуги -->
      <div class="services-grid">
        <div v-for="service in services" 
             :key="service.id" 
             class="service-card"
             :class="{ 'featured': service.featured }">
          <div class="service-icon">
            <i :class="service.icon"></i>
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <ul class="service-features">
            <li v-for="feature in service.features" 
                :key="feature">
              <i class='bx bx-check'></i>
              {{ feature }}
            </li>
          </ul>
          <div class="service-price">
            <span class="price">{{ service.price }}</span>
            <span class="period">/ {{ service.period }}</span>
          </div>
          <button class="btn btn-primary" @click="contactService(service)">
            Заказать
          </button>
        </div>
      </div>

      <!-- Дополнительные услуги -->
      <div class="additional-services">
        <h2>Дополнительные услуги</h2>
        <div class="additional-grid">
          <div v-for="service in additionalServices" 
               :key="service.id" 
               class="additional-card">
            <i :class="service.icon"></i>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <span class="price">{{ service.price }}</span>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="faq-section">
        <h2>Часто задаваемые вопросы</h2>
        <div class="faq-list">
          <div v-for="faq in faqs" 
               :key="faq.question" 
               class="faq-item">
            <div class="faq-question" @click="toggleFaq(faq)">
              <h3>{{ faq.question }}</h3>
              <i :class="['bx', faq.isOpen ? 'bx-chevron-up' : 'bx-chevron-down']"></i>
            </div>
            <div class="faq-answer" v-show="faq.isOpen">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesView',
  data() {
    return {
      services: [
        {
          id: 1,
          title: 'Веб-разработка',
          description: 'Создание современных веб-сайтов и веб-приложений',
          icon: 'bx-code-alt',
          features: [
            'Адаптивный дизайн',
            'Оптимизация SEO',
            'Интеграция с CMS',
            'Техническая поддержка'
          ],
          price: 'от 50 000 ₽',
          period: 'проект',
          featured: true
        },
        {
          id: 2,
          title: 'UI/UX Дизайн',
          description: 'Разработка пользовательских интерфейсов и опыта',
          icon: 'bx-palette',
          features: [
            'Прототипирование',
            'Визуальный дизайн',
            'Анимации',
            'Тестирование'
          ],
          price: 'от 40 000 ₽',
          period: 'проект'
        },
        {
          id: 3,
          title: 'Мобильная разработка',
          description: 'Создание нативных и кроссплатформенных приложений',
          icon: 'bx-mobile-alt',
          features: [
            'iOS и Android',
            'Push-уведомления',
            'Офлайн-режим',
            'Обновления'
          ],
          price: 'от 60 000 ₽',
          period: 'проект'
        }
      ],
      additionalServices: [
        {
          id: 1,
          title: 'Консультация',
          description: 'Профессиональная консультация по вашему проекту',
          icon: 'bx-conversation',
          price: 'от 5 000 ₽'
        },
        {
          id: 2,
          title: 'Аудит',
          description: 'Анализ и оптимизация существующего проекта',
          icon: 'bx-line-chart',
          price: 'от 15 000 ₽'
        },
        {
          id: 3,
          title: 'Обучение',
          description: 'Индивидуальные занятия по разработке',
          icon: 'bx-book-reader',
          price: 'от 2 000 ₽/час'
        }
      ],
      faqs: [
        {
          question: 'Сколько времени занимает разработка проекта?',
          answer: 'Сроки зависят от сложности проекта. Обычно от 2 до 6 месяцев.',
          isOpen: false
        },
        {
          question: 'Какие этапы работы?',
          answer: '1. Обсуждение требований\n2. Проектирование\n3. Разработка\n4. Тестирование\n5. Запуск',
          isOpen: false
        },
        {
          question: 'Как происходит оплата?',
          answer: 'Оплата производится поэтапно: 30% аванс, 40% после утверждения макета, 30% после сдачи проекта.',
          isOpen: false
        }
      ]
    }
  },
  methods: {
    contactService(service) {
      // Здесь можно добавить логику для связи с клиентом
      console.log('Contact service:', service)
    },
    toggleFaq(faq) {
      faq.isOpen = !faq.isOpen
    }
  }
}
</script>

<style scoped>
.services {
  padding: 2rem 0;
}

.page-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-card {
  padding: 2rem;
  background: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow-color);
  text-align: center;
  transition: transform 0.3s ease;
}

.service-card.featured {
  transform: scale(1.05);
  border: 2px solid var(--primary-color);
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.service-card h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.service-card p {
  color: var(--text-color-light);
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  text-align: left;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.service-features i {
  color: var(--primary-color);
}

.service-price {
  margin-bottom: 1.5rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.period {
  color: var(--text-color-light);
}

.additional-services {
  margin-bottom: 4rem;
}

.additional-services h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.additional-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.additional-card {
  padding: 2rem;
  background: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow-color);
  text-align: center;
  transition: transform 0.3s ease;
}

.additional-card:hover {
  transform: translateY(-5px);
}

.additional-card i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.additional-card h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.additional-card p {
  color: var(--text-color-light);
  margin-bottom: 1rem;
}

.additional-card .price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.faq-section {
  margin-bottom: 4rem;
}

.faq-section h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1rem;
  background: var(--bg-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.faq-question {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-question h3 {
  margin: 0;
  color: var(--text-color);
}

.faq-question i {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: var(--text-color-light);
}

.faq-answer p {
  margin: 0;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .service-card.featured {
    transform: none;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .additional-grid {
    grid-template-columns: 1fr;
  }
}
</style> 