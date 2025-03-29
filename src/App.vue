<template>
  <div v-if="state === 'home'" class="w-full bg-gradient-to-b from-sky-100 to-sky-200 h-screen fixed flex items-center justify-center">
    <div class="car-animation">
      <div class="car">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="100" height="20" rx="5" fill="#3b82f6" />
          <rect x="20" y="15" width="60" height="15" rx="5" fill="#3b82f6" />
          <circle cx="30" cy="50" r="10" fill="#1f2937" />
          <circle cx="90" cy="50" r="10" fill="#1f2937" />
        </svg>
      </div>
    </div>

    <button 
      @click="showMainScreen" 
      class="absolute bottom-30 text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-bold transition-all"
    >
      Continuar
    </button>
  </div>

  <transition name="fade">
    <div v-if="state == 'main'">
      <RouterView />
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

const state = ref('home');

const showMainScreen = () => {
  state.value = 'main';
};
</script>

<style scoped>
.car-animation {
  position: relative;
  width: 100%;
  height: 100px;
}

.car {
  position: absolute;
  animation: drive 3s linear infinite;
}

@keyframes drive {
  0% {
    transform: translateX(-150px);
  }
  100% {
    transform: translateX(calc(100vw + 150px));
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.5s;
}

.zoom-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.zoom-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>