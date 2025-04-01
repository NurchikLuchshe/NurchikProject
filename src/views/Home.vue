/* Медиа-запросы */
@media (max-width: 768px) {
  .hero {
    padding: 0.8rem 0.4rem;
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    overflow-x: hidden;
  }

  .hero__content {
    padding: 0.2rem;
    gap: 0.6rem;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero__title {
    font-size: 1.4rem;
    line-height: 1.2;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    text-align: center;
  }

  .hero__subtitle {
    font-size: 0.8rem;
    line-height: 1.3;
    margin-bottom: 0.4rem;
    padding: 0 0.2rem;
    text-align: center;
    max-width: 95%;
  }

  .hero__buttons {
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
    padding: 0 0.2rem;
    max-width: 260px;
  }

  .hero__button {
    width: 100%;
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
  }

  .hero__image {
    width: 100%;
    max-width: 180px;
    margin: 0.4rem auto;
    padding: 0 0.2rem;
  }

  .features {
    padding: 1.5rem 0.6rem;
    overflow-x: hidden;
  }

  .features__grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 0 0.3rem;
  }

  .feature-card {
    padding: 0.8rem;
    text-align: center;
  }

  .feature-card__icon {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
    margin: 0 auto;
  }

  .feature-card__title {
    font-size: 0.9rem;
    margin: 0.5rem 0 0.3rem;
  }

  .feature-card__description {
    font-size: 0.75rem;
    line-height: 1.3;
  }

  .cta {
    padding: 1.5rem 0.6rem;
    overflow-x: hidden;
  }

  .cta__content {
    padding: 0.8rem;
    gap: 0.8rem;
    text-align: center;
  }

  .cta__title {
    font-size: 1.3rem;
    line-height: 1.2;
  }

  .cta__description {
    font-size: 0.8rem;
    line-height: 1.3;
  }

  .cta__button {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    width: 100%;
    max-width: 260px;
    margin: 0 auto;
  }

  .testimonials {
    padding: 1.5rem 0.6rem;
    overflow-x: hidden;
  }

  .testimonials__grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 0 0.3rem;
  }

  .testimonial-card {
    padding: 0.8rem;
  }

  .testimonial-card__content {
    font-size: 0.8rem;
    line-height: 1.3;
  }

  .testimonial-card__author {
    font-size: 0.75rem;
    margin-top: 0.4rem;
  }

  .testimonial-card__role {
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 0.6rem 0.3rem;
  }

  .hero__title {
    font-size: 1.3rem;
    padding: 0 0.15rem;
  }

  .hero__subtitle {
    font-size: 0.75rem;
    padding: 0 0.15rem;
    max-width: 98%;
  }

  .hero__buttons {
    padding: 0 0.15rem;
    max-width: 240px;
  }

  .hero__button {
    padding: 0.45rem 0.7rem;
    font-size: 0.7rem;
  }

  .hero__image {
    max-width: 160px;
    padding: 0 0.15rem;
  }

  .features {
    padding: 1.2rem 0.4rem;
  }

  .features__grid {
    padding: 0 0.2rem;
  }

  .feature-card {
    padding: 0.7rem;
  }

  .feature-card__icon {
    width: 30px;
    height: 30px;
    font-size: 1.1rem;
  }

  .feature-card__title {
    font-size: 0.85rem;
    margin: 0.4rem 0 0.25rem;
  }

  .feature-card__description {
    font-size: 0.7rem;
  }

  .cta {
    padding: 1.2rem 0.4rem;
  }

  .cta__content {
    padding: 0.7rem;
  }

  .cta__title {
    font-size: 1.2rem;
  }

  .cta__description {
    font-size: 0.75rem;
  }

  .cta__button {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
    max-width: 240px;
  }

  .testimonials {
    padding: 1.2rem 0.4rem;
  }

  .testimonials__grid {
    padding: 0 0.2rem;
  }

  .testimonial-card {
    padding: 0.7rem;
  }

  .testimonial-card__content {
    font-size: 0.75rem;
  }

  .testimonial-card__author {
    font-size: 0.7rem;
  }

  .testimonial-card__role {
    font-size: 0.6rem;
  }
}

/* Дополнительные оптимизации для очень маленьких экранов */
@media (max-width: 360px) {
  .hero {
    padding: 0.5rem 0.25rem;
  }

  .hero__title {
    font-size: 1.2rem;
  }

  .hero__subtitle {
    font-size: 0.7rem;
  }

  .hero__buttons {
    max-width: 220px;
  }

  .hero__button {
    padding: 0.4rem 0.6rem;
    font-size: 0.65rem;
  }

  .hero__image {
    max-width: 140px;
  }

  .feature-card__icon {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }

  .feature-card__title {
    font-size: 0.8rem;
  }

  .feature-card__description {
    font-size: 0.65rem;
  }

  .cta__title {
    font-size: 1.1rem;
  }

  .cta__description {
    font-size: 0.7rem;
  }

  .cta__button {
    max-width: 220px;
    padding: 0.45rem 0.7rem;
  }

  .testimonial-card__content {
    font-size: 0.7rem;
  }

  .testimonial-card__author {
    font-size: 0.65rem;
  }

  .testimonial-card__role {
    font-size: 0.55rem;
  }
}

/* Оптимизация для iPhone SE и подобных устройств */
@media (max-width: 375px) {
  .hero {
    padding: 1rem 0.5rem;
  }

  .hero__content {
    padding: 0.3rem;
  }

  .hero__title {
    font-size: 1.5rem;
    padding: 0 0.2rem;
  }

  .hero__subtitle {
    font-size: 0.8rem;
    padding: 0 0.2rem;
  }

  .hero__buttons {
    padding: 0 0.2rem;
  }

  .hero__image {
    max-width: 160px;
    padding: 0 0.2rem;
  }

  .features {
    padding: 1.2rem 0.5rem;
  }

  .features__grid {
    padding: 0 0.2rem;
  }

  .feature-card {
    padding: 0.7rem;
  }

  .cta {
    padding: 1.2rem 0.5rem;
  }

  .cta__content {
    padding: 0.7rem;
  }

  .testimonials {
    padding: 1.2rem 0.5rem;
  }

  .testimonials__grid {
    padding: 0 0.2rem;
  }

  .testimonial-card {
    padding: 0.7rem;
  }
} 