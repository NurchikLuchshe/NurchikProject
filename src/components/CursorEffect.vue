<template>
  <div class="cursor-container">
    <div 
      v-for="n in 8" 
      :key="n"
      class="cursor-dot"
      :style="{
        '--delay': `${(n - 1) * 0.08}s`,
        '--size': `${8 - (n - 1) * 0.5}px`
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'CursorEffect',
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      currentX: 0,
      currentY: 0,
      dots: []
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove)
    this.animate()
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    lerp(start, end, t) {
      return start * (1 - t) + end * t
    },
    handleMouseMove(e) {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    },
    animate() {
      // Плавно обновляем текущую позицию
      this.currentX = this.lerp(this.currentX, this.mouseX, 0.1)
      this.currentY = this.lerp(this.currentY, this.mouseY, 0.1)
      
      // Обновляем позиции всех точек с разной задержкой
      const dots = document.querySelectorAll('.cursor-dot')
      dots.forEach((dot, index) => {
        const delay = index * 0.08
        const x = this.lerp(
          parseFloat(dot.style.left || this.currentX),
          this.currentX,
          0.1 + delay
        )
        const y = this.lerp(
          parseFloat(dot.style.top || this.currentY),
          this.currentY,
          0.1 + delay
        )
        dot.style.left = `${x}px`
        dot.style.top = `${y}px`
      })

      this.animationFrame = requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style scoped>
.cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  position: fixed;
  width: var(--size);
  height: var(--size);
  background: var(--primary-color);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: cursorPulse 1.5s infinite;
  animation-delay: var(--delay);
  box-shadow: 0 0 10px var(--primary-color);
  will-change: transform, opacity;
}

@keyframes cursorPulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
    box-shadow: 0 0 10px var(--primary-color);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.4;
    box-shadow: 0 0 20px var(--primary-color);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
    box-shadow: 0 0 10px var(--primary-color);
  }
}

/* Добавляем эффект при наведении на кликабельные элементы */
a:hover ~ .cursor-dot,
button:hover ~ .cursor-dot {
  background: #fff;
  box-shadow: 0 0 15px #fff;
}

/* Скрываем эффект на мобильных устройствах */
@media (max-width: 768px) {
  .cursor-container {
    display: none;
  }
}
</style> 