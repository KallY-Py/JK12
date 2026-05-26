<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

    <div class="absolute inset-0 bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 opacity-80"></div>

    <h1 class="text-3xl font-bold text-pink-600 mb-10 z-10 animate-pulse">
      Choose your mystery gift 🎁
    </h1>

    <div class="flex gap-8 z-10 flex-wrap justify-center">

      <div
        class="gift-box"
        @click="openGift('/photo')"
      >
        🎁
      </div>

      <div
        class="gift-box"
        @click="openGift('/message')"
      >
        🎁
      </div>

      <div
        class="gift-box"
        @click="openGift('/tulip')"
      >
        🎁
      </div>

    </div>

    <p class="mt-10 text-pink-500 z-10 animate-bounce">
      Pick carefully... each gift is special ❤️
    </p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const openGift = (path) => {
  router.push(path);
};
</script>

<style scoped>
.gift-box {
  font-size: 5rem;
  cursor: pointer;
  transition: all 0.4s ease;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
  animation: floatGift 3s ease-in-out infinite;
}

.gift-box:hover {
  transform: scale(1.2) rotate(8deg);
  filter: drop-shadow(0 20px 25px rgba(255, 105, 180, 0.4));
}

@keyframes floatGift {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>