<template>
  <div class="contact">
    <div class="contact__container">
      <div class="contact__info">
        <h3>Свяжитесь со мной</h3>
        <p class="contact__description">Готов обсудить ваш проект и ответить на любые вопросы</p>
        
        <div class="contact__details">
          <div class="contact__item">
            <i class='bx bx-envelope'></i>
            <div class="contact__text">
              <h4>Email</h4>
              <p>nurchik@example.com</p>
            </div>
          </div>
          
          <div class="contact__item">
            <i class='bx bx-phone'></i>
            <div class="contact__text">
              <h4>Телефон</h4>
              <p>+7 (999) 123-45-67</p>
            </div>
          </div>
          
          <div class="contact__item">
            <i class='bx bx-map'></i>
            <div class="contact__text">
              <h4>Адрес</h4>
              <p>Москва, Россия</p>
            </div>
          </div>
        </div>

        <div class="contact__social">
          <a href="#" class="social-link"><i class='bx bxl-github'></i></a>
          <a href="#" class="social-link"><i class='bx bxl-telegram'></i></a>
          <a href="#" class="social-link"><i class='bx bxl-vk'></i></a>
          <a href="#" class="social-link"><i class='bx bxl-linkedin'></i></a>
        </div>
      </div>

      <div class="contact__form">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Ваше имя</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required
              placeholder="Введите ваше имя"
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
              placeholder="Введите ваш email"
            >
          </div>

          <div class="form-group">
            <label for="subject">Тема</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              required
              placeholder="Введите тему сообщения"
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

          <button type="submit" class="submit-btn">
            Отправить сообщение
            <i class='bx bx-send'></i>
          </button>
        </form>
      </div>

      <div class="contact__map">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.0!2d37.6!3d55.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQyJzAwLjAiTiAzN8KwMzYnMDAuMCJF!5e0!3m2!1sru!2sru!4v1234567890!5m2!1sru!2sru" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Здесь можно добавить логику отправки формы
      console.log('Form submitted:', this.form)
      alert('Спасибо! Я свяжусь с вами в ближайшее время.')
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact {
  background: var(--bg-color);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.contact__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  position: relative;
}

.contact__info {
  padding-right: 2rem;
}

.contact__info h3 {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.contact__description {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact__details {
  margin-bottom: 2rem;
}

.contact__item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.contact__item:hover {
  transform: translateX(10px);
  background: var(--bg-secondary);
  box-shadow: 0 5px 15px var(--shadow-color);
}

.contact__item i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-right: 1rem;
}

.contact__text h4 {
  color: var(--text-color);
  margin-bottom: 0.3rem;
}

.contact__text p {
  color: var(--text-color);
  opacity: 0.8;
}

.contact__social {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  width: 40px;
  height: 40px;
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

.contact__form {
  background: var(--bg-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
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

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
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

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px var(--shadow-color);
}

.submit-btn i {
  font-size: 1.2rem;
}

.contact__map {
  grid-column: span 2;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .contact__container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact__info {
    padding-right: 0;
  }

  .contact__map {
    grid-column: span 1;
  }
}
</style> 