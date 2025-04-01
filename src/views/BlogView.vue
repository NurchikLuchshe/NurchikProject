<template>
  <div class="blog">
    <div class="container">
      <h1 class="blog__title">Блог</h1>
      <p class="blog__subtitle">Мои мысли и идеи</p>

      <div class="blog__grid">
        <article 
          v-for="post in posts" 
          :key="post.id"
          class="blog-card"
          @mouseenter="post.isHovered = true"
          @mouseleave="post.isHovered = false"
        >
          <div class="blog-card__image">
            <img :src="post.image" :alt="post.title">
            <div class="blog-card__date">{{ post.date }}</div>
          </div>
          <div class="blog-card__content">
            <h3 class="blog-card__title">{{ post.title }}</h3>
            <p class="blog-card__excerpt">{{ post.excerpt }}</p>
            <div class="blog-card__meta">
              <span class="blog-card__category">{{ post.category }}</span>
              <span class="blog-card__read-time">{{ post.readTime }} мин чтения</span>
            </div>
            <button class="blog-card__button">Читать далее</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import projectImage from '@/assets/images/project1.jpg';

export default {
  name: 'BlogView',
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Современные тренды в веб-разработке',
          excerpt: 'Обзор последних технологий и подходов в создании веб-приложений',
          image: projectImage,
          date: '15 марта 2024',
          category: 'Веб-разработка',
          readTime: 5,
          isHovered: false
        },
        {
          id: 2,
          title: 'Как создать успешное мобильное приложение',
          excerpt: 'Пошаговое руководство по разработке и запуску мобильного приложения',
          image: projectImage,
          date: '10 марта 2024',
          category: 'Мобильная разработка',
          readTime: 8,
          isHovered: false
        },
        {
          id: 3,
          title: 'Основы UI/UX дизайна',
          excerpt: 'Базовые принципы создания удобных и красивых интерфейсов',
          image: projectImage,
          date: '5 марта 2024',
          category: 'Дизайн',
          readTime: 6,
          isHovered: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.blog {
  padding: 80px 0;
  min-height: 100vh;

}

.blog__title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  color: var(--text-color);
}

.blog__subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 3rem;
}

.blog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.blog-card {
  background: var(--sidebar-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.blog-card__image {
  position: relative;
  width: 100%;
  padding-top: 60%;
  overflow: hidden;
}

.blog-card__image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-card__image img {
  transform: scale(1.1);
}

.blog-card__date {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.blog-card__content {
  padding: 1.5rem;
}

.blog-card__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  color: var(--text-color);
}

.blog-card__excerpt {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.blog-card__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
}

.blog-card__button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.blog-card__button:hover {
  transform: scale(1.05);
  background: var(--primary-color-light);
}

@media (max-width: 768px) {
  .blog__title {
    font-size: 2rem;
  }

  .blog__subtitle {
    font-size: 1rem;
  }

  .blog__grid {
    grid-template-columns: 1fr;
  }
}
</style> 