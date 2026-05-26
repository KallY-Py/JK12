<template>
  <div class="min-h-screen px-6 py-10 relative overflow-hidden">
    <button
      class="absolute top-6 left-6 z-20 text-pink-600 font-semibold hover:underline"
      @click="goBack"
    >
      &larr; Back to gifts
    </button>

    <div class="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center pt-12 text-center">
      <div class="heart-gallery" aria-label="Memories forming a heart">
        <div class="heart-center-message">
          <h1 class="text-3xl md:text-4xl font-bold text-pink-600 mb-3">
            Our Memories
          </h1>

          <p class="text-pink-500 font-medium animate-pulse">
            Little pieces of us, floating together.
          </p>
        </div>

        <button
          v-for="(memory, index) in memories"
          :key="memory.label"
          class="memory-card"
          :style="memory.style"
          @click="openModal(memory.src)"
        >
          <img :src="memory.src" :alt="memory.label" />
          <span>{{ index + 1 }}</span>
        </button>
      </div>
    </div>

    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
      @click="selectedImage = null"
    >
      <img
        :src="selectedImage"
        class="max-w-2xl w-full max-h-[80vh] object-contain rounded-xl shadow-2xl animate-pop"
        alt="Selected memory"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const images = [
  require("../assets/images/k1.jpg"),
  require("../assets/images/k2.jpg"),
  require("../assets/images/k3.jpg"),
  require("../assets/images/k4.jpg"),
  require("../assets/images/k5.jpg"),
  require("../assets/images/k6.jpg"),
  require("../assets/images/k7.jpg"),
  require("../assets/images/k8.jpg"),
  require("../assets/images/k9.jpg"),
  require("../assets/images/k10.jpg"),
];

const heartPositions = [
  { x: "clamp(-170px, -22vw, -94px)", y: "clamp(-150px, -20vw, -88px)", rotate: -12, floatRotate: 3 },
  { x: "clamp(-80px, -10vw, -42px)", y: "clamp(-200px, -25vw, -126px)", rotate: 8, floatRotate: -2 },
  { x: "clamp(42px, 10vw, 80px)", y: "clamp(-200px, -25vw, -126px)", rotate: -8, floatRotate: 2 },
  { x: "clamp(94px, 22vw, 170px)", y: "clamp(-150px, -20vw, -88px)", rotate: 12, floatRotate: -3 },
  { x: "clamp(-245px, -32vw, -128px)", y: "clamp(-42px, -6vw, -24px)", rotate: 10, floatRotate: -2 },
  { x: "clamp(128px, 32vw, 245px)", y: "clamp(-42px, -6vw, -24px)", rotate: -10, floatRotate: 2 },
  { x: "clamp(-170px, -21vw, -88px)", y: "clamp(68px, 12vw, 106px)", rotate: -7, floatRotate: 1 },
  { x: "clamp(88px, 21vw, 170px)", y: "clamp(68px, 12vw, 106px)", rotate: 7, floatRotate: -1 },
  { x: "clamp(-82px, -10vw, -40px)", y: "clamp(170px, 24vw, 220px)", rotate: 9, floatRotate: -2 },
  { x: "clamp(40px, 10vw, 82px)", y: "clamp(170px, 24vw, 220px)", rotate: -9, floatRotate: 2 },
];

const memories = images.map((src, index) => ({
  src,
  label: `Memory ${index + 1}`,
  style: {
    "--x": heartPositions[index].x,
    "--y": heartPositions[index].y,
    "--rotate": `${heartPositions[index].rotate}deg`,
    "--float-rotate": `${heartPositions[index].floatRotate}deg`,
    "--delay": `${0.25 + index * 0.18}s`,
  },
}));

const selectedImage = ref(null);

const openModal = (img) => {
  selectedImage.value = img;
};

const goBack = () => {
  router.push("/gift");
};
</script>

<style scoped>
.heart-gallery {
  position: relative;
  width: min(94vw, 820px);
  height: min(70vh, 660px);
  min-height: 560px;
}

.heart-gallery::before {
  content: "";
  position: absolute;
  inset: 12%;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(244, 114, 182, 0.24), rgba(255, 255, 255, 0));
  filter: blur(6px);
  opacity: 0;
  animation: glowIn 1.2s ease forwards 0.4s;
}

.heart-center-message {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
  width: min(68vw, 330px);
  padding: 16px 18px;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.memory-card {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
  width: clamp(82px, 12vw, 128px);
  aspect-ratio: 1;
  border: 7px solid rgba(255, 255, 255, 0.92);
  border-bottom-width: 24px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  cursor: pointer;
  box-shadow: 0 18px 34px rgba(190, 24, 93, 0.18);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.25) rotate(0deg);
  animation:
    formHeart 1.15s cubic-bezier(0.2, 0.9, 0.24, 1.1) forwards var(--delay),
    floatMemory 4.5s ease-in-out infinite calc(var(--delay) + 1.3s);
}

.memory-card:hover {
  z-index: 15;
  box-shadow: 0 24px 42px rgba(219, 39, 119, 0.26);
}

.memory-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.memory-card:hover img {
  transform: scale(1.08);
}

.memory-card span {
  position: absolute;
  left: 50%;
  bottom: 2px;
  transform: translateX(-50%);
  color: #db2777;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
}

@keyframes formHeart {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.25) rotate(0deg);
  }
  55% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1) rotate(var(--rotate));
  }
}

@keyframes floatMemory {
  0%, 100% {
    transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1) rotate(var(--rotate));
  }
  50% {
    transform: translate(calc(-50% + var(--x)), calc(-56% + var(--y))) scale(1.03) rotate(var(--float-rotate));
  }
}

@keyframes glowIn {
  to {
    opacity: 1;
  }
}

@keyframes pop {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pop {
  animation: pop 0.3s ease;
}

@media (max-width: 640px) {
  .heart-gallery {
    width: min(98vw, 430px);
    min-height: 520px;
  }

  .memory-card {
    width: clamp(60px, 18vw, 78px);
    border-width: 5px;
    border-bottom-width: 20px;
  }

  .heart-center-message {
    width: min(58vw, 240px);
    padding: 10px;
  }
}
</style>
