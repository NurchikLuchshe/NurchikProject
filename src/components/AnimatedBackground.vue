<template>
  <div class="animated-background">
    <canvas ref="canvas" class="animated-background__canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'AnimatedBackground',
  props: {
    color: {
      type: String,
      default: '#ffffff'
    },
    opacity: {
      type: Number,
      default: 0.1
    },
    particleCount: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      particles: [],
      animationFrame: null,
      width: 0,
      height: 0
    }
  },
  mounted() {
    this.initCanvas()
    this.createParticles()
    this.animate()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
      this.handleResize()
    },
    handleResize() {
      const container = this.canvas.parentElement
      this.width = container.offsetWidth
      this.height = container.offsetHeight
      this.canvas.width = this.width
      this.canvas.height = this.height
    },
    createParticles() {
      this.particles = []
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * this.opacity
        })
      }
    },
    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height)
      
      this.particles.forEach(particle => {
        // Обновляем позицию
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Отскок от краев
        if (particle.x < 0 || particle.x > this.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > this.height) particle.speedY *= -1

        // Рисуем частицу
        this.ctx.beginPath()
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        this.ctx.fillStyle = `${this.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
        this.ctx.fill()
      })

      this.animationFrame = requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style scoped>
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.animated-background__canvas {
  width: 100%;
  height: 100%;
}
</style> 