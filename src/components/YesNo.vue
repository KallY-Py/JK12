<template>
  <BackHeart>
    <div class="min-h-screen flex items-center justify-center px-4 py-8">
      <div
        class="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 text-center w-full max-w-4xl border border-pink-100"
      >
        <div class="mb-6">
          <h2 class="text-sm uppercase tracking-wider text-pink-400 font-semibold">
            Our Forever
          </h2>
          <div class="w-16 h-0.5 bg-pink-300 mx-auto mt-2"></div>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-relaxed">
          Will you continue<br />
          this journey with<br />
          me? <span class="text-pink-500">❤️</span>
        </h1>

        <div v-if="!yesEnabled" class="min-h-[60px] mb-6">
          <p class="text-pink-500 font-medium animate-pulse">
            {{ message }}
          </p>
        </div>

        <div v-else class="mb-6">
          <p class="text-green-500 font-semibold animate-bounce text-lg">
            You finally accepted! ❤️
          </p>
          <p class="text-gray-500 text-sm mt-1">Click Yes to continue...</p>
        </div>

        <div class="flex flex-col items-center justify-center gap-5 mt-4 min-h-[360px]">
          <button
            class="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            :style="yesStyle"
            :disabled="!yesEnabled"
            @click="goGift"
          >
            Yes <span class="inline-block ml-1">❤️</span>
          </button>

          <button
            v-if="noClicks < requiredNoClicks"
            class="bg-gray-200 text-gray-600 rounded-2xl px-6 py-3 hover:bg-gray-300 transition-all duration-300 font-medium z-10"
            @click="handleNo"
          >
            No <span class="inline-block ml-1">💔</span>
          </button>
          
          <div v-else class="w-[72px]"></div>
        </div>

        <div class="mt-10 pt-6 border-t border-pink-100">
          <p class="text-xs text-gray-400">
            Made with love, forever and always.
          </p>
          <div class="flex items-center justify-center gap-6 mt-3 text-xs text-gray-400">
            <span class="cursor-pointer hover:text-pink-400 transition">Our Story</span>
            <span class="w-1 h-1 bg-pink-300 rounded-full"></span>
            <span class="cursor-pointer hover:text-pink-400 transition">Gallery</span>
            <span class="w-1 h-1 bg-pink-300 rounded-full"></span>
            <span class="cursor-pointer hover:text-pink-400 transition">Letters</span>
          </div>
        </div>
      </div>
    </div>
  </BackHeart>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BackHeart from "./BackHeart.vue";

const router = useRouter();

const requiredNoClicks = 10;

const noClicks = ref(0);
const yesEnabled = ref(false);

const messages = [
  "No? Are you sure? 🥺",
  "Think carefully 😭",
  "Really really sure? 💔",
  "You are breaking my heart 😢",
  "I'll ask again ❤️",
  "Please reconsider 🥹",
  "I believe in us 💞",
  "Just one chance... 💘",
  "Almost there... 💗",
  "Last chance... ❤️",
];

const message = computed(() => messages[Math.min(noClicks.value, 9)]);

const yesStyle = computed(() => {
  const progress = Math.min(noClicks.value / requiredNoClicks, 1);
  const width = 120 + progress * 520;
  const minHeight = 52 + progress * 240;
  const fontSize = 16 + progress * 34;
  
  return {
    width: `min(${width}px, 50vw)`,
    minHeight: `min(${minHeight}px, 45vh)`,
    padding: "16px 24px",
    fontSize: `${fontSize}px`,
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  };
});

const handleNo = () => {
  if (yesEnabled.value) return;

  noClicks.value++;

  if (noClicks.value >= requiredNoClicks) {
    yesEnabled.value = true;
  }
};

const goGift = () => {
  if (yesEnabled.value) {
    router.push("/gift");
  }
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 0.8s ease-in-out infinite;
}
</style>
