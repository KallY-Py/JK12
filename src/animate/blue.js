
export class StitchAnimationController {
  constructor(options = {}) {
    this.canvas = null
    this.ctx = null
    this.container = null
    this.particles = []
    this.shootingStars = []
    this.fallingStars = [] 
    this.animationFrameId = null
    this.lastShootingStarTime = 0
    this.animationTime = 0
    this.isRunning = false
    this.lastFallingStarTime = 0
    
    this.config = {
      particleCount: options.particleCount || null,
      shootingStarFrequency: options.shootingStarFrequency || 3000,
      interactiveMode: options.interactiveMode !== false,
      intensity: options.intensity || 1,
      fallingStarInterval: options.fallingStarInterval || 800, 
      ...options
    }
    
    this.animate = this.animate.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }
  getOptimalParticleCount() {
    if (this.config.particleCount) return this.config.particleCount
    const width = window.innerWidth
    const intensity = this.config.intensity
    if (width < 768) return Math.floor(60 * intensity)
    if (width < 1280) return Math.floor(120 * intensity)
    return Math.floor(200 * intensity)
  }
  
  createParticle(x, y, radius, speedX, speedY, alpha, glowColor) {
    return {
      x, y, radius, speedX, speedY, alpha, glowColor,
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      twinklePhase: Math.random() * Math.PI * 2,
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x < -this.radius) this.x = window.innerWidth + this.radius
        if (this.x > window.innerWidth + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = window.innerHeight + this.radius
        if (this.y > window.innerHeight + this.radius) this.y = -this.radius
        
        this.twinklePhase += this.twinkleSpeed
      },
      
      draw(ctx) {
        const twinkle = 0.5 + Math.sin(this.twinklePhase) * 0.3
        ctx.save()
        ctx.shadowBlur = this.radius * 2
        ctx.shadowColor = this.glowColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * twinkle * 0.8})`
        ctx.fill()
        ctx.restore()
      }
    }
  }
  
  createShootingStar() {
    const startX = Math.random() * window.innerWidth
    const startY = Math.random() * window.innerHeight * 0.3
    const angle = -Math.PI / 4
    const speed = 8 + Math.random() * 6
    
    return {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: 60 + Math.random() * 40,
      alpha: 1,
      decay: 0.01 + Math.random() * 0.015,
      trail: [],
      active: true,
      
      update() {
        this.trail.unshift({ x: this.x, y: this.y })
        if (this.trail.length > 20) this.trail.pop()
        
        this.x += this.vx
        this.y += this.vy
        this.alpha -= this.decay
        
        if (this.alpha <= 0 || this.x > window.innerWidth + 100 || 
            this.x < -100 || this.y > window.innerHeight + 100 || this.y < -100) {
          this.active = false
        }
      },
      
      draw(ctx) {
        if (!this.active) return
        
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        
        for (let i = 0; i < this.trail.length; i++) {
          const point = this.trail[i]
          const alpha = this.alpha * (1 - i / this.trail.length)
          ctx.lineTo(point.x, point.y)
          ctx.strokeStyle = `rgba(255, 200, 255, ${alpha * 0.7})`
          ctx.lineWidth = 3 * (1 - i / this.trail.length)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
        }
        
        ctx.shadowBlur = 15
        ctx.shadowColor = '#A684FF'
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(166, 132, 255, ${this.alpha * 0.3})`
        ctx.fill()
        ctx.restore()
      }
    }
  }
  
  createFallingStar(x, y) {
    return {
      x: x || Math.random() * window.innerWidth,
      y: y || -20,
      width: 30,
      height: 30,
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 1,
      alpha: 1,
      active: true,
      isHeart: false,
      element: null,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: 0.02 + Math.random() * 0.03,
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed
        
        if (this.y > window.innerHeight + 50 || this.x < -50 || this.x > window.innerWidth + 50) {
          this.reset()
        }
      },
      
      reset() {
        this.x = Math.random() * window.innerWidth
        this.y = -20
        this.speedY = 2 + Math.random() * 3
        this.speedX = (Math.random() - 0.5) * 1
        this.isHeart = false
        this.alpha = 1
        this.active = true
        this.rotation = Math.random() * Math.PI * 2
      },
      
      draw(ctx) {
        if (!this.active) return
        
        ctx.save()
        ctx.shadowBlur = 12
        ctx.shadowColor = this.isHeart ? '#FF6B9D' : '#A684FF'
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        
        if (this.isHeart) {
          ctx.font = `${this.width}px "Arial", sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = `rgba(255, 107, 157, ${this.alpha})`
          ctx.fillText('❤️', 0, 0)
        } else {
          ctx.font = `${this.width}px "Arial", sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = `rgba(255, 215, 0, ${this.alpha})`
          ctx.fillText('★', 0, 0)
        }
        
        ctx.restore()
      },
      
      transform() {
        this.isHeart = !this.isHeart
        this.createSparkleBurst()
      },
      
      createSparkleBurst() {
        if (this.onSparkle) this.onSparkle(this.x, this.y)
      }
    }
  }
  
  initParticles() {
    const count = this.getOptimalParticleCount()
    this.particles = []
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2 + 0.5
      const speedX = (Math.random() - 0.5) * 0.3
      const speedY = (Math.random() - 0.5) * 0.2
      const alpha = 0.3 + Math.random() * 0.5
      const glowColor = Math.random() > 0.7 ? '#A684FF' : '#50A2FF'
      this.particles.push(this.createParticle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        radius, speedX, speedY, alpha, glowColor
      ))
    }
  }
  
  initFallingStars() {
    const count = Math.floor(Math.min(30, window.innerWidth / 80)) 
    this.fallingStars = []
    for (let i = 0; i < count; i++) {
      const star = this.createFallingStar()
      star.y = Math.random() * window.innerHeight
      this.fallingStars.push(star)
    }
  }
  
  handleResize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.initParticles()
      this.initFallingStars()
    }
  }
  
  checkClick(e, container) {
    if (!container || !this.fallingStars.length) return
    
    const rect = container.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    
    for (let i = 0; i < this.fallingStars.length; i++) {
      const star = this.fallingStars[i]
      const starLeft = star.x - 20
      const starRight = star.x + 20
      const starTop = star.y - 20
      const starBottom = star.y + 20
      
      if (clickX >= starLeft && clickX <= starRight && 
          clickY >= starTop && clickY <= starBottom) {
        star.transform()
        break 
      }
    }
  }
  
  animate() {
    if (!this.isRunning || !this.ctx || !this.canvas) return
    
    this.animationTime += 1
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    for (const particle of this.particles) {
      particle.update()
      particle.draw(this.ctx)
    }
    
    for (const star of this.fallingStars) {
      star.update()
      star.draw(this.ctx)
    }
    
    const now = Date.now()
    if (now - this.lastShootingStarTime > this.config.shootingStarFrequency / this.config.intensity) {
      this.shootingStars.push(this.createShootingStar())
      this.lastShootingStarTime = now
    }
    
    this.shootingStars = this.shootingStars.filter(star => {
      star.update()
      star.draw(this.ctx)
      return star.active
    })
    
    this.animationFrameId = requestAnimationFrame(this.animate)
  }
  
  start(canvas, container) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.container = container
    this.isRunning = true
    
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    
    this.animate()
  }
  
  stop() {
    this.isRunning = false
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
    window.removeEventListener('resize', this.handleResize)
  }
  
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig }
    if (newConfig.particleCount !== undefined || newConfig.intensity !== undefined) {
      this.initParticles()
    }
  }
}

export function createStitchController(options) {
  return new StitchAnimationController(options)
}