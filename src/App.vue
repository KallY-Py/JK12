  <template>
    <BackHeart>
      <GlobalMusic />
      <router-view v-slot="{ Component }">
        <transition name="fade-scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </BackHeart>
  </template>

  <script setup>
  import BackHeart from './components/BackHeart.vue'
  import GlobalMusic from './components/GlobalMusic.vue'
  </script>

  <style>
  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: all 0.4s ease;
  }

  .fade-scale-enter-from {
    opacity: 0;
    transform: scale(0.95);
  }

  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(1.05);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  </style>
