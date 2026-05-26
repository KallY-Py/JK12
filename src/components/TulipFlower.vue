<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-10 bg-gradient-to-b from-rose-100 via-pink-50 to-sky-100">
    <button
      class="absolute top-6 left-6 z-20 text-pink-600 font-semibold hover:underline"
      @click="goBack"
    >
      &larr; Back to gifts
    </button>

    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="heart in hearts"
        :key="heart.id"
        class="floating-heart"
        :style="heart.style"
      >
        &#10084;
      </span>
    </div>

    <div class="relative z-10 w-full max-w-3xl text-center flex flex-col items-center">
      <p class="text-sm uppercase tracking-wider text-pink-400 font-semibold mb-3">
        A little bloom for you
      </p>

      <h1 class="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
        Tulips for you
      </h1>

      <p class="text-pink-500 font-medium max-w-xl mb-8 animate-pulse">
        Even flowers bloom differently when I think of you.
      </p>

      <div class="tulip-stage" aria-label="Three animated tulips forming">
        <div class="ground-glow"></div>

        <div
          v-for="tulip in tulips"
          :key="tulip.id"
          class="tulip"
          :style="tulip.style"
        >
          <div class="stem"></div>
          <div class="leaf leaf-left"></div>
          <div class="leaf leaf-right"></div>

          <div class="flower-head">
            <div class="petal petal-back"></div>
            <div class="petal petal-left"></div>
            <div class="petal petal-right"></div>
            <div class="petal petal-center"></div>
            <div class="petal petal-front"></div>
          </div>
        </div>

        <span
          v-for="sparkle in sparkles"
          :key="sparkle.id"
          class="bloom-sparkle"
          :style="sparkle.style"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/gift");
};

const hearts = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  style: {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${14 + Math.random() * 24}px`,
    animationDelay: `${Math.random() * 7}s`,
    animationDuration: `${7 + Math.random() * 8}s`,
    opacity: 0.18 + Math.random() * 0.34,
  },
}));

const tulips = [
  {
    id: "left",
    style: {
      "--x": "-118px",
      "--scale": 0.82,
      "--delay": "0.08s",
      "--sway": "-1.2deg",
      "--petal-light": "#fda4af",
      "--petal-main": "#f43f5e",
      "--petal-dark": "#be123c",
    },
  },
  {
    id: "center",
    style: {
      "--x": "0px",
      "--scale": 1,
      "--delay": "0s",
      "--sway": "0deg",
      "--petal-light": "#fecdd3",
      "--petal-main": "#ec4899",
      "--petal-dark": "#be185d",
    },
  },
  {
    id: "right",
    style: {
      "--x": "118px",
      "--scale": 0.86,
      "--delay": "0.22s",
      "--sway": "1.2deg",
      "--petal-light": "#f0abfc",
      "--petal-main": "#d946ef",
      "--petal-dark": "#a21caf",
    },
  },
];

const sparkles = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2;
  const distance = 66 + Math.random() * 58;

  return {
    id: index,
    style: {
      "--x": `${Math.cos(angle) * distance}px`,
      "--y": `${Math.sin(angle) * distance}px`,
      animationDelay: `${2.9 + index * 0.08}s`,
    },
  };
});
</script>

<style scoped>
.floating-heart {
  position: absolute;
  color: rgba(236, 72, 153, 0.75);
  animation: heartFloat infinite ease-in-out;
  text-shadow: 0 8px 24px rgba(236, 72, 153, 0.24);
}

.tulip-stage {
  position: relative;
  width: min(86vw, 560px);
  height: min(64vh, 520px);
  min-height: 430px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.ground-glow {
  position: absolute;
  bottom: 28px;
  width: 250px;
  height: 42px;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(244, 114, 182, 0.32), rgba(125, 211, 252, 0));
  opacity: 0;
  transform: scale(0.5);
  animation: glowIn 0.9s ease forwards 0.2s;
}

.tulip {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 190px;
  height: 450px;
  transform: translateX(calc(-50% + var(--x))) scale(var(--scale)) rotate(var(--sway));
  transform-origin: bottom center;
}

.stem {
  position: absolute;
  bottom: 48px;
  left: 50%;
  width: 14px;
  height: 245px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #15803d, #22c55e, #86efac);
  transform: translateX(-50%) scaleY(0);
  transform-origin: bottom;
  animation: growStem 1.35s cubic-bezier(0.2, 0.9, 0.25, 1) forwards calc(0.45s + var(--delay));
  box-shadow: 0 12px 28px rgba(21, 128, 61, 0.18);
}

.leaf {
  position: absolute;
  bottom: 120px;
  width: 108px;
  height: 46px;
  border-radius: 100% 0 100% 0;
  background: linear-gradient(135deg, #16a34a, #86efac);
  opacity: 0;
  transform: scale(0) rotate(0deg);
  box-shadow: inset 14px 0 18px rgba(255, 255, 255, 0.18);
}

.leaf-left {
  right: 50%;
  transform-origin: right center;
  animation: unfurlLeft 0.9s ease forwards calc(1.35s + var(--delay));
}

.leaf-right {
  left: 50%;
  bottom: 158px;
  border-radius: 0 100% 0 100%;
  transform-origin: left center;
  animation: unfurlRight 0.9s ease forwards calc(1.55s + var(--delay));
}

.flower-head {
  position: absolute;
  bottom: 270px;
  width: 190px;
  height: 180px;
  transform-origin: bottom center;
  animation: flowerSway 4s ease-in-out infinite calc(3.2s + var(--delay));
}

.petal {
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transform: translate(-50%, 72px) scale(0.2);
  transform-origin: bottom center;
  box-shadow: inset 14px 18px 26px rgba(255, 255, 255, 0.26), 0 18px 28px rgba(219, 39, 119, 0.18);
}

.petal-back {
  width: 112px;
  height: 156px;
  border-radius: 58% 58% 44% 44%;
  background: linear-gradient(145deg, var(--petal-light), var(--petal-main));
  animation: petalRise 0.95s ease forwards calc(2.05s + var(--delay));
}

.petal-left {
  width: 92px;
  height: 140px;
  border-radius: 82% 32% 62% 42%;
  background: linear-gradient(145deg, var(--petal-main), var(--petal-dark));
  animation: petalLeft 0.95s ease forwards calc(2.28s + var(--delay));
}

.petal-right {
  width: 92px;
  height: 140px;
  border-radius: 32% 82% 42% 62%;
  background: linear-gradient(145deg, var(--petal-main), var(--petal-dark));
  animation: petalRight 0.95s ease forwards calc(2.48s + var(--delay));
}

.petal-center {
  width: 78px;
  height: 154px;
  border-radius: 56% 56% 48% 48%;
  background: linear-gradient(160deg, var(--petal-light), var(--petal-main) 62%, var(--petal-dark));
  animation: petalRise 0.9s ease forwards calc(2.7s + var(--delay));
}

.petal-front {
  width: 122px;
  height: 92px;
  border-radius: 16% 16% 62% 62%;
  background: linear-gradient(160deg, var(--petal-light), var(--petal-main));
  animation: petalFront 0.85s ease forwards calc(2.92s + var(--delay));
}

.bloom-sparkle {
  position: absolute;
  left: 50%;
  bottom: 345px;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: #fff;
  opacity: 0;
  box-shadow: 0 0 18px rgba(244, 114, 182, 0.9);
  animation: sparkleOut 1.15s ease-out forwards;
}

@keyframes growStem {
  to {
    transform: translateX(-50%) scaleY(1);
  }
}

@keyframes unfurlLeft {
  to {
    opacity: 1;
    transform: scale(1) rotate(-28deg);
  }
}

@keyframes unfurlRight {
  to {
    opacity: 1;
    transform: scale(1) rotate(26deg);
  }
}

@keyframes petalRise {
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}

@keyframes petalLeft {
  to {
    opacity: 1;
    transform: translate(-92%, 8px) rotate(-18deg) scale(1);
  }
}

@keyframes petalRight {
  to {
    opacity: 1;
    transform: translate(-8%, 8px) rotate(18deg) scale(1);
  }
}

@keyframes petalFront {
  to {
    opacity: 1;
    transform: translate(-50%, 22px) scale(1);
  }
}

@keyframes flowerSway {
  0%, 100% {
    transform: rotate(-1.5deg);
  }
  50% {
    transform: rotate(1.5deg);
  }
}

@keyframes sparkleOut {
  0% {
    opacity: 0;
    transform: translate(-50%, 0) scale(0.2);
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--x)), var(--y)) scale(0);
  }
}

@keyframes glowIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes heartFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-34px) rotate(10deg);
  }
}

@media (max-width: 640px) {
  .tulip-stage {
    width: min(96vw, 390px);
    min-height: 390px;
  }

  .tulip {
    width: 150px;
  }

  .stem {
    height: 218px;
  }

  .flower-head {
    bottom: 244px;
    transform: scale(0.88);
  }
}
</style>
