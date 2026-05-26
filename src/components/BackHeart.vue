<template>
  <div class="min-h-screen w-full overflow-hidden bg-gradient-heart">
    
    <div class="fixed inset-0 pointer-events-none z-0">
      <div
        v-for="heart in hearts"
        :key="heart.id"
        class="absolute animate-float"
        :style="heart.style"
      >
        ❤️
      </div>
    </div>
    <div class="relative z-10">
      <slot></slot>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const generateHearts = (count = 35) => {
  const heartsArray = []
  for (let i = 0; i < count; i++) {
    heartsArray.push({
      id: i,
      style: {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        fontSize: Math.random() * 24 + 12 + 'px',
        animationDuration: 3 + Math.random() * 7 + 's',
        animationDelay: Math.random() * 5 + 's',
        opacity: 0.2 + Math.random() * 0.5,
        transform: `rotate(${Math.random() * 360}deg)`
      }
    })
  }
  return heartsArray
}

const hearts = ref(generateHearts(40))

const regenerateOnResize = () => {
  hearts.value = generateHearts(40)
}

onMounted(() => {
  window.addEventListener('resize', regenerateOnResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', regenerateOnResize)
})
</script>

<style scoped>
.bg-gradient-heart {
  background: linear-gradient(135deg, #E6E5B9 0%, #FFECEE 50%, #E6E5B9 100%);
  min-height: 100vh;
  width: 100%;
}

@keyframes float {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateY(-15px) translateX(10px);
  }
  50% {
    transform: translateY(-25px) translateX(-5px);
  }
  75% {
    transform: translateY(-10px) translateX(15px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}

.animate-float {
  animation: float infinite ease-in-out;
  will-change: transform;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
}
</style>