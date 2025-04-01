<template>
  <div class="testimonials">
    <div class="testimonials__container">
      <div class="testimonials__header">
        <h2>Отзывы клиентов</h2>
        <div class="testimonials__controls">
          <button class="control-btn" @click="prevSlide" :disabled="currentIndex === 0">
            <i class='bx bx-chevron-left'></i>
          </button>
          <button class="control-btn" @click="nextSlide" :disabled="currentIndex === testimonials.length - 1">
            <i class='bx bx-chevron-right'></i>
          </button>
        </div>
      </div>

      <div class="testimonials__carousel" ref="carousel">
        <div 
          class="testimonials__track"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="testimonial-card"
            :class="{ 'active': currentIndex === index }"
          >
            <div class="testimonial-card__content">
              <div class="testimonial-card__quote">
                <i class='bx bxs-quote-left'></i>
              </div>
              <p class="testimonial-card__text">{{ testimonial.text }}</p>
              <div class="testimonial-card__author">
                <div class="author-avatar">
                  <img :src="testimonial.avatar" :alt="testimonial.name">
                </div>
                <div class="author-info">
                  <h4>{{ testimonial.name }}</h4>
                  <p>{{ testimonial.position }}</p>
                </div>
              </div>
              <div class="testimonial-card__rating">
                <i 
                  v-for="star in 5" 
                  :key="star"
                  class='bx'
                  :class="star <= testimonial.rating ? 'bxs-star' : 'bx-star'"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="testimonials__indicators">
        <button 
          v-for="(_, index) in testimonials" 
          :key="index"
          class="indicator"
          :class="{ 'active': currentIndex === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestimonialsCarousel',
  data() {
    return {
      currentIndex: 0,
      testimonials: [
        {
          name: 'Александр Петров',
          position: 'CEO, Tech Solutions',
          text: 'Отличная работа! Проект был выполнен в срок и с превосходным качеством. Особенно впечатлило внимание к деталям и готовность оперативно вносить правки.',
          rating: 5,
          avatar: '/avatars/client1.jpg'
        },
        {
          name: 'Елена Смирнова',
          position: 'Product Manager, Digital Agency',
          text: 'Профессиональный подход к работе и отличное понимание требований. Результат превзошел наши ожидания. Будем рады дальнейшему сотрудничеству.',
          rating: 5,
          avatar: '/avatars/client2.jpg'
        },
        {
          name: 'Михаил Иванов',
          position: 'CTO, Startup Hub',
          text: 'Впечатляющие технические навыки и отличная коммуникация. Проект был реализован с использованием современных технологий и лучших практик.',
          rating: 5,
          avatar: '/avatars/client3.jpg'
        }
      ]
    }
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.testimonials.length - 1) {
        this.currentIndex++
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    goToSlide(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.testimonials {
  width: 100%;
  padding: 4rem 0;
  background: linear-gradient(135deg, 
    rgba(var(--card-bg-rgb), 0.4),
    rgba(var(--card-bg-rgb), 0.2)
  );
  backdrop-filter: blur(20px);
  border-radius: 30px;
  position: relative;
  overflow: hidden;
}

.testimonials::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(var(--primary-color-rgb), 0.15),
    transparent 70%
  );
  opacity: 0.5;
}

.testimonials__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.testimonials__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.testimonials__header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.testimonials__controls {
  display: flex;
  gap: 1rem;
}

.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.control-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.testimonials__carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.testimonials__track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial-card {
  min-width: 100%;
  padding: 2rem;
  opacity: 0.5;
  transform: scale(0.9);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial-card.active {
  opacity: 1;
  transform: scale(1);
}

.testimonial-card__content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.testimonial-card__quote {
  position: absolute;
  top: -20px;
  left: 30px;
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #fff;
  box-shadow: 0 10px 20px rgba(var(--primary-color-rgb), 0.3);
}

.testimonial-card__text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 20px rgba(var(--primary-color-rgb), 0.3);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info h4 {
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  color: var(--text-color);
}

.author-info p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.testimonial-card__rating {
  display: flex;
  gap: 0.5rem;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.testimonials__indicators {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator.active {
  background: var(--primary-color);
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(var(--primary-color-rgb), 0.5);
}

@media (max-width: 768px) {
  .testimonials {
    padding: 3rem 0;
  }

  .testimonials__container {
    padding: 0 1rem;
  }

  .testimonials__header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .testimonials__header h2 {
    font-size: 2rem;
  }

  .testimonial-card__content {
    padding: 2rem;
  }

  .testimonial-card__text {
    font-size: 1rem;
  }

  .author-avatar {
    width: 50px;
    height: 50px;
  }

  .author-info h4 {
    font-size: 1.1rem;
  }
}
</style> 