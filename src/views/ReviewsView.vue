<template>
  <div class="reviews-page">
    <div class="container">
      <h1 class="page-title">Отзывы</h1>
      
      <!-- Кнопка добавления отзыва -->
      <button @click="showModal = true" class="add-review-btn">
        <i class="bx bx-plus"></i>
        Добавить отзыв
      </button>

      <!-- Сетка отзывов -->
      <div class="reviews-grid">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-header">
            <img :src="review.avatar" :alt="review.name" class="review-avatar">
            <div class="review-info">
              <h3>{{ review.name }}</h3>
              <div class="review-rating">
                <i v-for="n in 5" :key="n" 
                   class="bx" 
                   :class="n <= review.rating ? 'bxs-star' : 'bx-star'">
                </i>
              </div>
            </div>
            <div class="review-actions">
              <button @click="editReview(review)" class="action-btn edit-btn">
                <i class="bx bx-edit"></i>
              </button>
              <button @click="deleteReview(review.id)" class="action-btn delete-btn">
                <i class="bx bx-trash"></i>
              </button>
            </div>
          </div>
          <p class="review-text">{{ review.text }}</p>
          <div class="review-image" v-if="review.image">
            <img :src="review.image" alt="Review image">
          </div>
          <div class="review-date">{{ review.date }}</div>
        </div>
      </div>
    </div>

    <!-- Модальное окно для добавления/редактирования отзыва -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ editingReview ? 'Редактировать отзыв' : 'Добавить отзыв' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Ваше имя</label>
            <input v-model="form.name" type="text" required>
          </div>
          
          <div class="form-group">
            <label>Оценка</label>
            <div class="rating-input">
              <i v-for="n in 5" :key="n" 
                 class="bx" 
                 :class="n <= form.rating ? 'bxs-star' : 'bx-star'"
                 @click="form.rating = n">
              </i>
            </div>
          </div>

          <div class="form-group">
            <label>Ваш отзыв</label>
            <textarea v-model="form.text" required></textarea>
          </div>

          <div class="form-group">
            <label>Изображение (необязательно)</label>
            <input type="file" @change="handleImageUpload" accept="image/*">
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-outline">Отмена</button>
            <button type="submit" class="btn btn-primary">{{ editingReview ? 'Сохранить' : 'Отправить' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewsView',
  data() {
    return {
      reviews: [],
      showModal: false,
      editingReview: null,
      form: {
        name: '',
        rating: 0,
        text: '',
        image: null
      }
    }
  },
  created() {
    this.loadReviews()
  },
  methods: {
    loadReviews() {
      const savedReviews = localStorage.getItem('reviews')
      if (savedReviews) {
        this.reviews = JSON.parse(savedReviews)
      }
    },
    saveReviews() {
      localStorage.setItem('reviews', JSON.stringify(this.reviews))
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.form.image = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    editReview(review) {
      this.editingReview = review
      this.form = {
        name: review.name,
        rating: review.rating,
        text: review.text,
        image: review.image
      }
      this.showModal = true
    },
    deleteReview(id) {
      if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
        this.reviews = this.reviews.filter(review => review.id !== id)
        this.saveReviews()
      }
    },
    closeModal() {
      this.showModal = false
      this.editingReview = null
      this.form = {
        name: '',
        rating: 0,
        text: '',
        image: null
      }
    },
    handleSubmit() {
      if (this.editingReview) {
        // Редактирование существующего отзыва
        const index = this.reviews.findIndex(r => r.id === this.editingReview.id)
        if (index !== -1) {
          this.reviews[index] = {
            ...this.editingReview,
            name: this.form.name,
            rating: this.form.rating,
            text: this.form.text,
            image: this.form.image,
            date: new Date().toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        }
      } else {
        // Добавление нового отзыва
        const newReview = {
          id: Date.now(),
          name: this.form.name,
          rating: this.form.rating,
          text: this.form.text,
          image: this.form.image,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.form.name}`,
          date: new Date().toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
        this.reviews.unshift(newReview)
      }
      
      this.saveReviews()
      this.closeModal()
    }
  }
}
</script>

<style scoped>
.reviews-page {
  padding: 2rem 0;
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  background: var(--gradient-orange);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.add-review-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: var(--gradient-orange);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--trans-03);
}

.add-review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--shadow-color);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.review-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: var(--trans-03);
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px var(--shadow-color);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.review-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.review-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-color);
}

.review-rating {
  color: #ffd700;
  font-size: 1.2rem;
}

.review-text {
  color: var(--text-color);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.review-image {
  margin-bottom: 1rem;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.review-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.review-date {
  color: var(--text-color-light);
  font-size: 0.9rem;
}

.review-actions {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  transition: var(--trans-03);
  color: var(--text-color-light);
}

.action-btn:hover {
  background: var(--bg-tertiary);
  transform: scale(1.1);
}

.edit-btn:hover {
  color: var(--primary-color);
}

.delete-btn:hover {
  color: #ff4444;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px var(--shadow-color);
}

.modal-content h2 {
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-color);
  color: var(--text-color);
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.rating-input {
  display: flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #ffd700;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    width: 95%;
    padding: 1.5rem;
  }
}
</style> 