<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-pink-50 relative overflow-hidden px-6">

    <button
      class="absolute top-6 left-6 z-20 text-pink-600 font-semibold hover:underline"
      @click="goBack"
    >
      &larr; Back to gifts
    </button>

    <div class="hearts">
      <span v-for="i in 20" :key="i">❤️</span>
    </div>

    <div class="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-xl text-center z-10">
      <h1 class="text-2xl font-bold text-pink-600 mb-6">
        A Message For You 💌
      </h1>

      <p class="text-gray-700 text-lg whitespace-pre-line min-h-[120px]">
        {{ displayedText }}
      </p>

      <p v-if="isDone" class="mt-6 text-pink-500 font-semibold animate-bounce">
        I meant every word ❤️
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const fullText =
`Every moment with you became my favorite memory.
Thank you for being part of my life.
You make ordinary days feel magical ❤️`;

const displayedText = ref("");
const isDone = ref(false);

const typeWriter = () => {
  let i = 0;

  const interval = setInterval(() => {
    displayedText.value += fullText[i];
    i++;

    if (i >= fullText.length) {
      clearInterval(interval);
      isDone.value = true;
    }
  }, 40);
};

onMounted(() => {
  typeWriter();
});

const goBack = () => {
  router.push("/gift");
};
</script>

<style scoped>
.hearts {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
}

.hearts span {
  position: absolute;
  bottom: -50px;
  font-size: 20px;
  animation: floatUp 6s linear infinite;
  opacity: 0.5;
}

.hearts span:nth-child(odd) {
  left: 20%;
}
.hearts span:nth-child(even) {
  left: 70%;
}

@keyframes floatUp {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}
</style>