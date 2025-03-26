<template>
  <div class="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex flex-col items-center justify-center p-4">
    <div v-if="state === 'home'" class="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
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
        class="absolute bottom-10 text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-bold transition-all"
      >
        Continuar
      </button>
    </div>

    <transition name="fade">
      <div v-if="state === 'main'" class="flex flex-col items-center justify-center h-screen w-full">
        <h1 class="text-4xl font-bold text-gray-800 mb-10">Calculadora de Viaje</h1>
        <button 
          @click="showCalculator" 
          class="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold py-6 px-12 rounded-xl shadow-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="¿Cuánto cuesta mi viaje?"
        >
          ¿Cuánto cuesta mi viaje?
        </button>
      </div>
    </transition>

    <transition name="zoom">
      <div v-if="state === 'calculator'" class="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Calcula el coste de tu viaje</h2>
        
        <form @submit.prevent="calculateCost" class="space-y-4">
          <div class="space-y-2">
            <label for="distance" class="block text-sm font-medium text-gray-700">Distancia (km)</label>
            <input 
              type="number" 
              id="distance" 
              v-model="distance" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              required
              min="1"
            />
          </div>
          
          <div class="space-y-2">
            <label for="consumption" class="block text-sm font-medium text-gray-700">Consumo (L/100km)</label>
            <input 
              type="number" 
              id="consumption" 
              v-model="consumption" 
              step="0.1" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              required
              min="0.1"
            />
          </div>
          
          <div class="space-y-2">
            <label for="fuelPrice" class="block text-sm font-medium text-gray-700">Precio combustible (€/L)</label>
            <input 
              type="number" 
              id="fuelPrice" 
              v-model="fuelPrice" 
              step="0.001" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              required
              min="0.1"
            />
          </div>
          
          <div class="space-y-2">
            <label for="toll" class="block text-sm font-medium text-gray-700">Coste peaje (€)</label>
            <input 
              type="number" 
              id="toll" 
              v-model="toll" 
              step="0.01" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              min="0"
            />
          </div>

          <div class="mt-4">
            <div class="flex items-center">
              <input 
                type="checkbox"
                id="idaVuelta"
                v-model="roundTrip"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="idaVuelta" class="ml-2 block text-sm font-medium text-gray-700">
                Calcular ida y vuelta
              </label>
            </div>
          </div>
          
          <div class="pt-4 flex justify-between">
            <button 
              type="button" 
              @click="backToMain" 
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Volver
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calcular
            </button>
          </div>
        </form>
        
        <transition name="fade">
          <div v-if="showResult" class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Resultado:</h3>
            <p class="text-gray-700" v-if="roundTrip"><span class="font-medium">Tipo de viaje:</span> <span class="font-bold">Ida y vuelta</span></p>
            <p class="text-gray-700" v-else><span class="font-medium">Tipo de viaje:</span> <span class="font-bold">Solo ida</span></p>
            <p class="text-gray-700"><span class="font-medium">Distancia total:</span> <span class="font-bold">{{ roundTrip ? (distance * 2) : distance }} km</span></p>
            <p class="text-gray-700"><span class="font-medium">Coste de combustible:</span> <span class="font-bold">{{ fuelCost.toFixed(2) }}€</span></p>
            <p class="text-gray-700"><span class="font-medium">Coste de peajes:</span> <span class="font-bold">{{ roundTrip ? (toll * 2).toFixed(2) : toll.toFixed(2) }}€</span></p>
            <p class="text-xl font-bold text-blue-700 mt-2">Coste total: {{ totalCost.toFixed(2) }}€</p>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'home',
      distance: 100,
      consumption: 6.5,
      fuelPrice: 1.5,
      toll: 0,
      roundTrip: false,
      fuelCost: 0,
      totalCost: 0,
      showResult: false
    }
  },
  methods: {
    showMainScreen() {
      this.state = 'main'
    },
    showCalculator() {
      this.state = 'calculator'
      this.showResult = false
    },
    backToMain() {
      this.state = 'main'
    },
    calculateCost() {
      let totalDistance = this.distance
      let totalToll = parseFloat(this.toll || 0)

      if (this.roundTrip) {
        totalDistance *= 2;
        totalToll *= 2;
      }

      this.fuelCost = ((totalDistance * this.consumption) / 100) * this.fuelPrice
      
      this.totalCost = this.fuelCost + totalToll
      
      this.showResult = true
    }
  },
  watch: {
    roundTrip() {
      this.calculateCost();
    }
  }
}
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