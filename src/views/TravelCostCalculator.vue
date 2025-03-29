<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-sky-100 to-sky-200">
        <transition name="zoom">
            <div class="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Calcula el coste de tu viaje</h2>
        
                <form @submit.prevent="calculateCost" class="space-y-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Distancia (km)</label>
                        <input 
                            v-model="distance"
                            type="number"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
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
                        <RouterLink 
                            type="button" 
                            to="/"
                            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Volver
                        </RouterLink>
                        <button 
                            type="submit" 
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Calcular
                        </button>
                    </div>
    
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
                </form>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

const distance = ref(100);
const consumption = ref(6.5);
const fuelPrice = ref(1.5);
const toll = ref(0);
const roundTrip = ref(false);
const fuelCost = ref(0);
const totalCost = ref(0);
const showResult = ref(false);

const calculateCost = () => {
    let totalDistance = distance.value
    let totalToll = parseFloat(toll.value || 0)

    if (roundTrip.value) {
        totalDistance *= 2;
        totalToll *= 2;
    }

    if (consumption.value > 0 && fuelPrice.value > 0) {
        fuelCost.value = ((totalDistance * consumption.value) / 100) * fuelPrice.value;
    } else {
        fuelCost.value = 0;
    }
      
    totalCost.value = fuelCost.value + totalToll

    showResult.value = true
}

watch([distance, consumption, fuelPrice, toll, roundTrip], () => {
    calculateCost();
});
</script>

<style scoped>
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
  transition: all 2s;
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