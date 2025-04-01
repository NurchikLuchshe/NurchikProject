<template>
  <div class="contact">
    <div class="container">
      <div class="contact__content">
        <div class="contact__info">
          <h1>Свяжитесь со мной</h1>
          <p class="contact__description">
            Готов обсудить ваш проект или ответить на любые вопросы. Заполните форму или используйте другие способы связи.
          </p>
          
          <div class="contact__methods">
            <div class="contact-method">
              <i class="bx bx-envelope"></i>
              <div class="contact-method__info">
                <h3>Email</h3>
                <p>contact@example.com</p>
              </div>
            </div>
            
            <div class="contact-method">
              <i class="bx bx-phone"></i>
              <div class="contact-method__info">
                <h3>Телефон</h3>
                <p>+7 (999) 123-45-67</p>
              </div>
            </div>
            
            <div class="contact-method">
              <i class="bx bx-map"></i>
              <div class="contact-method__info">
                <h3>Адрес</h3>
                <p>Москва, Россия</p>
              </div>
            </div>
          </div>

          <div class="social-links">
            <a href="#" class="social-link">
              <i class="bx bxl-github"></i>
            </a>
            <a href="#" class="social-link">
              <i class="bx bxl-linkedin"></i>
            </a>
            <a href="#" class="social-link">
              <i class="bx bxl-telegram"></i>
            </a>
          </div>
        </div>

        <div class="contact__form-container">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name">Ваше имя</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Введите ваше имя"
              >
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Введите ваш email"
              >
            </div>

            <div class="form-group">
              <label for="subject">Тема</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                placeholder="Укажите тему сообщения"
              >
            </div>

            <div class="form-group">
              <label for="message">Сообщение</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                placeholder="Введите ваше сообщение"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Отправка...' : 'Отправить сообщение' }}
            </button>

            <div v-if="status" :class="['status-message', status.type]">
              {{ status.message }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      loading: false,
      status: null
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.status = null

      try {
        // Здесь будет логика отправки формы
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.status = {
          type: 'success',
          message: 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
        }
        
        // Очищаем форму
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      } catch (error) {
        this.status = {
          type: 'error',
          message: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 4rem 0;
  min-height: 100vh;
  background: var(--bg-color);
}

.contact__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 60px;
  background: var(--bg-color);
}

.contact__info {
  padding: 2rem;
  background: var(--bg-color);
  border-radius: 20px;
}

.contact__info h1 {
  color: var(--text-color);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.contact__description {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.contact__methods {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.contact-method:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px var(--shadow-color);
}

.contact-method i {
  font-size: 2rem;
  color: var(--primary-color);
}

.contact-method__info h3 {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.contact-method__info p {
  color: var(--text-color);
  opacity: 0.8;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 50%;
  color: var(--text-color);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.social-link:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-5px);
}

.contact__form-container {
  background: var(--bg-color);
  border-radius: 20px;
  padding: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--bg-color);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-color);
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-secondary);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-light);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-color);
  opacity: 0.5;
}

button[type="submit"] {
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

button[type="submit"]:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px var(--shadow-color);
}

button[type="submit"]:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.status-message {
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 1rem;
}

.status-message.success {
  background: var(--bg-secondary);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.status-message.error {
  background: var(--bg-secondary);
  color: #ff4757;
  border: 1px solid #ff4757;
}

@media (max-width: 768px) {
  .contact__content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact__info,
  .contact__form-container {
    padding: 1.5rem;
  }

  .contact__info h1 {
    font-size: 2rem;
  }
}
</style> 