<template>
  <div class="calculator">
    <div class="calculator__container">
      <div class="calculator__form">
        <h3>Рассчитать стоимость проекта</h3>
        
        <!-- Тип проекта -->
        <div class="calculator__group">
          <label>Тип проекта</label>
          <div class="calculator__options">
            <button 
              v-for="type in projectTypes" 
              :key="type.id"
              :class="['calculator__option', { active: selectedType === type.id }]"
              @click="selectedType = type.id"
            >
              <i :class="type.icon"></i>
              <span>{{ type.name }}</span>
            </button>
          </div>
        </div>

        <!-- Функционал -->
        <div class="calculator__group">
          <label>Функционал</label>
          <div class="calculator__checkboxes">
            <label v-for="feature in features" :key="feature.id" class="calculator__checkbox">
              <input 
                type="checkbox" 
                v-model="selectedFeatures" 
                :value="feature.id"
              >
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">{{ feature.name }}</span>
            </label>
          </div>
        </div>

        <!-- Сроки -->
        <div class="calculator__group">
          <label>Желаемые сроки (дни)</label>
          <div class="calculator__slider">
            <input 
              type="range" 
              v-model="timeline" 
              :min="minTimeline" 
              :max="maxTimeline"
              class="slider"
            >
            <div class="slider__value">{{ timeline }} дней</div>
          </div>
        </div>

        <!-- Результат -->
        <div class="calculator__result">
          <div class="result__title">Примерная стоимость:</div>
          <div class="result__price">{{ formatPrice(calculatedPrice) }} ₽</div>
          <div class="result__note">* Цена может варьироваться в зависимости от деталей проекта</div>
        </div>

        <!-- Кнопка -->
        <button class="calculator__submit" @click="submitCalculation">
          Получить детальный расчет
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCalculator',
  data() {
    return {
      selectedType: null,
      selectedFeatures: [],
      timeline: 30,
      minTimeline: 7,
      maxTimeline: 90,
      projectTypes: [
        { id: 'landing', name: 'Лендинг', icon: 'bx-landscape', basePrice: 50000 },
        { id: 'website', name: 'Веб-сайт', icon: 'bx-globe', basePrice: 100000 },
        { id: 'webapp', name: 'Веб-приложение', icon: 'bx-code-alt', basePrice: 200000 },
        { id: 'mobile', name: 'Мобильное приложение', icon: 'bx-mobile-alt', basePrice: 300000 }
      ],
      features: [
        { id: 'responsive', name: 'Адаптивный дизайн', price: 20000 },
        { id: 'admin', name: 'Админ-панель', price: 30000 },
        { id: 'auth', name: 'Авторизация', price: 15000 },
        { id: 'api', name: 'API интеграция', price: 25000 },
        { id: 'cms', name: 'CMS система', price: 40000 },
        { id: 'seo', name: 'SEO оптимизация', price: 15000 },
        { id: 'analytics', name: 'Аналитика', price: 10000 },
        { id: 'payment', name: 'Платежная система', price: 35000 }
      ]
    }
  },
  computed: {
    calculatedPrice() {
      let price = 0
      
      // Базовая цена за тип проекта
      const selectedTypeObj = this.projectTypes.find(type => type.id === this.selectedType)
      if (selectedTypeObj) {
        price += selectedTypeObj.basePrice
      }

      // Дополнительный функционал
      this.selectedFeatures.forEach(featureId => {
        const feature = this.features.find(f => f.id === featureId)
        if (feature) {
          price += feature.price
        }
      })

      // Корректировка по срокам
      const timelineFactor = this.timeline < 30 ? 1.2 : 1
      price *= timelineFactor

      return Math.round(price)
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    },
    submitCalculation() {
      // Здесь можно добавить логику отправки расчета
      alert('Спасибо! Мы свяжемся с вами для обсуждения деталей проекта.')
    }
  }
}
</script>

<style scoped>
.calculator {
  position: relative;
  z-index: 1;
  background: var(--bg-color);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.calculator::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-color);
  border-radius: 20px;
  z-index: -1;
}

.calculator__container {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-color);
}

.calculator__form {
  position: relative;
  z-index: 3;
  background: var(--bg-color);
}

.calculator__form h3 {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-align: center;
}

.calculator__group {
  position: relative;
  z-index: 4;
  margin-bottom: 2rem;
  background: var(--bg-color);
}

.calculator__group label {
  display: block;
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

.calculator__options {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background: var(--bg-color);
}

.calculator__option {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calculator__option i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.calculator__option span {
  font-size: 1rem;
  color: var(--text-color);
}

.calculator__option:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px var(--shadow-color);
}

.calculator__option.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.calculator__option.active i,
.calculator__option.active span {
  color: var(--card-bg);
}

.calculator__checkboxes {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background: var(--bg-color);
}

.calculator__checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--text-color);
}

.calculator__checkbox input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  transition: all 0.3s ease;
}

.calculator__checkbox input:checked + .checkbox-custom {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.calculator__checkbox input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label {
  font-size: 1rem;
  color: var(--text-color);
}

.calculator__slider {
  position: relative;
  padding: 1rem 0;
}

.slider {
  width: 100%;
  height: 4px;
  background: var(--bg-secondary);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.slider__value {
  text-align: center;
  margin-top: 1rem;
  font-size: 1.1rem;
  color: var(--text-color);
}

.calculator__result {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  margin: 2rem 0;
  border: 1px solid var(--border-color);
}

.result__title {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.result__price {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.result__note {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
}

.calculator__submit {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  color: white;
  background: var(--primary-color);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.calculator__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px var(--shadow-color);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .calculator {
    padding: 1rem;
  }

  .calculator__options,
  .calculator__checkboxes {
    grid-template-columns: 1fr;
  }
}
</style> 