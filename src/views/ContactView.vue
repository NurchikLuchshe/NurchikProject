<script>
import emailjs from "@emailjs/browser";

export default {
  name: "ContactView",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      isSubmitting: false,
      submitStatus: null,
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      this.submitStatus = null;

      const serviceID = "service_38u6xbc"; // ID сервиса из EmailJS
      const templateID = "template_int5ixc"; // ID шаблона
      const userID = "2ixnxBYS-oUHYaAYe"; // Публичный ключ из EmailJS

      const templateParams = {
        from_name: this.form.name,
        from_email: this.form.email,
        subject: this.form.subject,
        message: this.form.message,
      };

      try {
        await emailjs.send(serviceID, templateID, templateParams, userID);
        this.submitStatus = "success";
        this.form = { name: "", email: "", subject: "", message: "" };
      } catch (error) {
        console.error("Ошибка отправки:", error);
        this.submitStatus = "error";
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};


</script>

<template>
  <div class="contact">
    <div class="container">
      <h1 class="page-title">Контакты</h1>
      
      <div class="contact-content">
        <!-- Контактная информация -->
        <div class="contact-info">
          <div class="info-card">
            <i class='bx bx-envelope'></i>
            <h3>Email</h3>
            <p>nurchik@example.com</p>
          </div>
          
          <div class="info-card">
            <i class='bx bx-phone'></i>
            <h3>Телефон</h3>
            <p>+7 (999) 123-45-67</p>
          </div>
          
          <div class="info-card">
            <i class='bx bx-map'></i>
            <h3>Адрес</h3>
            <p>Москва, Россия</p>
          </div>
        </div>

        <!-- Контактная форма -->
        <div class="contact-form-container">
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

            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Отправка...' : 'Отправить сообщение' }}
            </button>

            <div v-if="submitStatus" 
                 :class="['status-message', submitStatus]">
              {{ submitStatus === 'success' ? 'Сообщение успешно отправлено!' : 'Произошла ошибка при отправке.' }}
            </div>
          </form>
        </div>

        <!-- Карта -->
        <div class="contact-map">
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

      <!-- Социальные сети -->
      <div class="social-links">
        <h2>Мы в социальных сетях</h2>
        <div class="social-grid">
          <a href="#" class="social-card">
            <i class='bx bxl-github'></i>
            <span>GitHub</span>
          </a>
          <a href="#" class="social-card">
            <i class='bx bxl-telegram'></i>
            <span>Telegram</span>
          </a>
          <a href="#" class="social-card">
            <i class='bx bxl-vk'></i>
            <span>VKontakte</span>
          </a>
          <a href="#" class="social-card">
            <i class='bx bxl-linkedin'></i>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  padding: 2rem 0;
}

.page-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
}

.contact-info {
  display: grid;
  gap: 1.5rem;
}

.info-card {
  padding: 2rem;
  background: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow-color);
  text-align: center;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-card i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.info-card h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.info-card p {
  color: var(--text-color-light);
  margin: 0;
}

.contact-form-container {
  background: var(--bg-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.contact-form {
  display: grid;
  gap: 1.5rem;
}

.form-group {
  display: grid;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-color);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-color-light);
  color: var(--text-color);
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.status-message {
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
}

.status-message.success {
  background: var(--success-color);
  color: white;
}

.status-message.error {
  background: var(--error-color);
  color: white;
}

.contact-map {
  grid-column: 1 / -1;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.social-links {
  text-align: center;
}

.social-links h2 {
  margin-bottom: 2rem;
  color: var(--text-color);
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow-color);
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.social-card:hover {
  transform: translateY(-5px);
  background: var(--primary-color);
  color: white;
}

.social-card i {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .contact-map {
    height: 300px;
  }
  
  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 