<template>
  <div
    @click="handleClick"
    class="relative w-56 h-56 md:w-64 md:h-64 cursor-pointer group perspective"
  >
    <div
      class="relative w-full h-full transition-all duration-300 transform-gpu hover:scale-110 hover:rotate-3 active:scale-95"
      :class="{ 'animate-bounce-once': clicked }"
    >
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div
        class="w-full h-full rounded-2xl bg-gradient-to-br shadow-2xl flex flex-col items-center justify-center gap-3 border border-white/40 backdrop-blur-sm"
        :class="bgColor"
      >
        <span class="text-6xl md:text-7xl drop-shadow-md transform transition-transform group-hover:scale-110 duration-200">
          {{ emoji }}
        </span>
        <span class="text-white font-bold text-xl md:text-2xl tracking-wide drop-shadow">
          {{ label }}
        </span>
        <div class="absolute bottom-4 right-4 opacity-60 group-hover:opacity-100 transition">
          <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.5 7.5l-2-2m0 0l2-2m-2 2h8"></path>
          </svg>
        </div>
      </div>

      <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-amber-300 rounded-full opacity-80 -rotate-12 group-hover:rotate-6 transition duration-300"></div>
      <div class="absolute top-0 left-1/2 w-3 h-10 bg-amber-400 rounded-full transform -translate-x-1/2 -translate-y-2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  label: { type: String, required: true },
  emoji: { type: String, default: '🎁' },
  bgColor: { type: String, default: 'from-purple-400 to-pink-500' },
  redirectTo: { type: String, required: true }
})

const router = useRouter()
const clicked = ref(false)

const handleClick = () => {
  clicked.value = true
  setTimeout(() => {
    router.push(props.redirectTo)
  }, 200)
  setTimeout(() => {
    clicked.value = false
  }, 400)
}
</script>

<style scoped>
.perspective {
  perspective: 800px;
}
@keyframes bounceOnce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}
.animate-bounce-once {
  animation: bounceOnce 0.3s ease-in-out forwards;
}
</style>