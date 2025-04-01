<script>
export default {
  name: 'AppFooter'
}
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__section">
          <h3>Nurchik</h3>
          <p>FullStack Developer</p>
        </div>
        <div class="footer__section">
          <h4>Contact</h4>
          <p>Email: contact@nurchik.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div class="footer__section">
          <h4>Social</h4>
          <div class="footer__social">
            <a href="#" class="footer__social-link"><i class='bx bxl-github'></i></a>
            <a href="#" class="footer__social-link"><i class='bx bxl-linkedin'></i></a>
            <a href="#" class="footer__social-link"><i class='bx bxl-twitter'></i></a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <p>&copy; 2024 Nurchik. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--sidebar-color);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer__section h3 {
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer__section h4 {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.footer__section p {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.footer__social {
  display: flex;
  gap: 1rem;
}

.footer__social-link {
  color: var(--text-color);
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.footer__social-link:hover {
  color: var(--primary-color);
}

.footer__bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__bottom p {
  color: var(--text-color);
  opacity: 0.8;
}
</style> 