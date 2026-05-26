<template>
  <button
    class="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-pink-500 shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-white"
    :title="isPlaying ? 'Pause music' : 'Play music'"
    :aria-label="isPlaying ? 'Pause music' : 'Play music'"
    @pointerdown.stop
    @click="toggleMusic"
  >
    <span class="text-xl">{{ isPlaying ? "♪" : "♫" }}</span>
    <audio ref="audioRef" :src="musicSrc" loop preload="auto"></audio>
  </button>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import musicSrc from "../assets/H.E.R. - Best Part (Lyrics) Ft. Daniel Caesar.mp3";

const audioRef = ref(null);
const isPlaying = ref(false);

const startMusic = async () => {
  if (!audioRef.value || isPlaying.value) return;

  audioRef.value.volume = 0.45;

  try {
    await audioRef.value.play();
    isPlaying.value = true;
  } catch (error) {
    isPlaying.value = false;
  }
};

const stopMusic = () => {
  if (!audioRef.value) return;

  audioRef.value.pause();
  isPlaying.value = false;
};

const toggleMusic = () => {
  if (isPlaying.value) {
    stopMusic();
  } else {
    startMusic();
  }
};

const startOnFirstInteraction = () => {
  startMusic();
  window.removeEventListener("pointerdown", startOnFirstInteraction);
  window.removeEventListener("keydown", startOnFirstInteraction);
};

onMounted(() => {
  window.addEventListener("pointerdown", startOnFirstInteraction, { once: true });
  window.addEventListener("keydown", startOnFirstInteraction, { once: true });
});

onUnmounted(() => {
  stopMusic();
  window.removeEventListener("pointerdown", startOnFirstInteraction);
  window.removeEventListener("keydown", startOnFirstInteraction);
});
</script>
