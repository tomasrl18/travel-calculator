<template>
    <div class="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex flex-col items-center justify-center">
        <!-- Initial animation -->
        <div v-if="showIntro" class="w-full h-screen fixed top-0 left-0 overflow-hidden">
            <div class="car-animation">
                <div class="car">
                    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="15" y="30" width="90" height="15" rx="5" fill="#FF9800" />
                        <rect x="5" y="40" width="110" height="10" rx="3" fill="#FF9800" />
                        <circle cx="25" cy="50" r="10" fill="#333" />
                        <circle cx="25" cy="50" r="4" fill="#666" />
                        <circle cx="95" cy="50" r="10" fill="#333" />
                        <circle cx="95" cy="50" r="4" fill="#666" />
                        <rect x="35" y="15" width="50" height="20" rx="8" fill="#FFECB3" />
                        <rect x="45" y="25" width="10" height="5" fill="#81D4FA" />
                        <rect x="65" y="25" width="10" height="5" fill="#81D4FA" />
                        <rect x="55" y="40" width="10" height="5" fill="#E53935" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Main view with buttons -->
        <div v-if="!showIntro && !showCalculator"
            class="container mx-auto px-4 py-8 text-center transition-all duration-500"
            :class="{ 'scale-100 opacity-100': !showIntro, 'scale-0 opacity-0': showIntro }">
            <h1 class="text-4xl font-bold mb-10 text-gray-800">Calculadora de Viajes</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <button @click="startCalculator"
                    class="main-button bg-emerald-500 hover:bg-emerald-600 text-white p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                    :class="{ 'zoom-out': zoomingOut }">
                    <span class="text-2xl font-bold block mb-2">¿Cuánto cuesta mi viaje?</span>
                    <span class="text-sm">Calcula el coste total de tu viaje</span>
                </button>

                <button
                    class="main-button bg-blue-500 hover:bg-blue-600 text-white p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    :class="{ 'zoom-out': zoomingOut }">
                    <span class="text-2xl font-bold block mb-2">Historial de viajes</span>
                    <span class="text-sm">Ver tus viajes anteriores</span>
                </button>

                <button
                    class="main-button bg-purple-500 hover:bg-purple-600 text-white p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    :class="{ 'zoom-out': zoomingOut }">
                    <span class="text-2xl font-bold block mb-2">Comparar rutas</span>
                    <span class="text-sm">Encuentra la ruta más económica</span>
                </button>

                <button
                    class="main-button bg-amber-500 hover:bg-amber-600 text-white p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300"
                    :class="{ 'zoom-out': zoomingOut }">
                    <span class="text-2xl font-bold block mb-2">Consejos de ahorro</span>
                    <span class="text-sm">Consejos para ahorrar en tus viajes</span>
                </button>
            </div>
        </div>

        <!-- Calculator view -->
        <div v-if="showCalculator" class="container mx-auto px-4 py-8 transition-all duration-500 max-w-2xl"
            :class="{ 'scale-100 opacity-100': showCalculator, 'scale-0 opacity-0': !showCalculator }">
            <button @click="goBack"
                class="mb-6 flex items-center text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clip-rule="evenodd" />
                </svg>
                Volver
            </button>

            <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 class="text-3xl font-bold mb-6 text-gray-800 text-center">Calcula el coste de tu viaje</h2>

                <form @submit.prevent="calculateCost" class="space-y-6">
                    <div class="space-y-4">
                        <div>
                            <label for="distance" class="block text-lg font-medium text-gray-700 mb-1">Distancia
                                (km)</label>
                            <input type="number" id="distance" v-model="distance"
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Ej: 100" min="1" required>
                        </div>

                        <div>
                            <label for="fuelType" class="block text-lg font-medium text-gray-700 mb-1">Tipo de
                                combustible</label>
                            <select id="fuelType" v-model="fuelType"
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                required>
                                <option value="" disabled>Selecciona un tipo</option>
                                <option value="gasoline">Gasolina</option>
                                <option value="diesel">Diésel</option>
                                <option value="electric">Eléctrico</option>
                            </select>
                        </div>

                        <div>
                            <label for="consumption" class="block text-lg font-medium text-gray-700 mb-1">
                                {{ fuelType === 'electric' ? 'Consumo (kWh/100km)' : 'Consumo (L/100km)' }}
                            </label>
                            <input type="number" id="consumption" v-model="consumption"
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                :placeholder="fuelType === 'electric' ? 'Ej: 15' : 'Ej: 6.5'" step="0.1" min="0.1"
                                required>
                        </div>

                        <div>
                            <label for="fuelPrice" class="block text-lg font-medium text-gray-700 mb-1">
                                {{ fuelType === 'electric' ? 'Precio electricidad (€/kWh)' : 'Precio combustible (€/L)'
                                }}
                            </label>
                            <input type="number" id="fuelPrice" v-model="fuelPrice"
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                :placeholder="fuelType === 'electric' ? 'Ej: 0.15' : 'Ej: 1.45'" step="0.01" min="0.01"
                                required>
                        </div>

                        <div>
                            <label for="tollCost" class="block text-lg font-medium text-gray-700 mb-1">Coste de peajes
                                (€)</label>
                            <input type="number" id="tollCost" v-model="tollCost"
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Ej: 15.50" step="0.01" min="0">
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg text-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300">
                        Calcular coste
                    </button>
                </form>

                <div v-if="showResult" class="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h3 class="text-xl font-bold text-emerald-800 mb-4">Resultado del cálculo</h3>
                    <div class="space-y-2">
                        <p class="flex justify-between">
                            <span class="text-gray-700">Coste de combustible:</span>
                            <span class="font-medium">{{ fuelCost.toFixed(2) }} €</span>
                        </p>
                        <p class="flex justify-between">
                            <span class="text-gray-700">Coste de peajes:</span>
                            <span class="font-medium">{{ Number(tollCost).toFixed(2) }} €</span>
                        </p>
                        <div class="border-t border-emerald-200 my-2 pt-2">
                            <p class="flex justify-between text-lg font-bold">
                                <span class="text-emerald-800">Coste total:</span>
                                <span>{{ totalCost.toFixed(2) }} €</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// State
const showIntro = ref(true);
const showCalculator = ref(false);
const zoomingOut = ref(false);

// Form data
const distance = ref('');
const fuelType = ref('');
const consumption = ref('');
const fuelPrice = ref('');
const tollCost = ref('0');
const showResult = ref(false);

// Computed properties
const fuelCost = computed(() => {
    if (!distance.value || !consumption.value || !fuelPrice.value) return 0;

    return (distance.value * consumption.value * fuelPrice.value) / 100;
});

const totalCost = computed(() => {
    return fuelCost.value + Number(tollCost.value || 0);
});

// Methods
const startCalculator = () => {
    zoomingOut.value = true;
    setTimeout(() => {
        showCalculator.value = true;
    }, 500);
};

const goBack = () => {
    showCalculator.value = false;
    zoomingOut.value = false;
};

const calculateCost = () => {
    showResult.value = true;
};

// Lifecycle hooks
onMounted(() => {
    // Hide intro animation after 6 seconds (matching the animation duration)
    setTimeout(() => {
        showIntro.value = false;
    }, 6000);
});
</script>

<style scoped>
.car-animation {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.car {
    position: absolute;
    animation: carZigzag 6s ease-in-out forwards;
}

@keyframes carZigzag {
    0% {
        left: 0;
        top: 0;
        transform: rotate(30deg);
    }

    20% {
        left: 40%;
        top: 70%;
        transform: rotate(-20deg);
    }

    40% {
        left: 20%;
        top: 30%;
        transform: rotate(15deg);
    }

    60% {
        left: 60%;
        top: 60%;
        transform: rotate(-15deg);
    }

    80% {
        left: 40%;
        top: 20%;
        transform: rotate(20deg);
    }

    100% {
        left: 100%;
        top: 100%;
        transform: rotate(0deg);
    }
}

@keyframes trailZigzag {
    0% {
        width: 0;
        left: 0;
        top: 0;
        transform: rotate(30deg);
    }

    20% {
        width: 100px;
        left: 40%;
        top: 70%;
        transform: rotate(-20deg);
    }

    40% {
        width: 150px;
        left: 20%;
        top: 30%;
        transform: rotate(15deg);
    }

    60% {
        width: 200px;
        left: 60%;
        top: 60%;
        transform: rotate(-15deg);
    }

    80% {
        width: 250px;
        left: 40%;
        top: 20%;
        transform: rotate(20deg);
    }

    100% {
        width: 300px;
        left: 100%;
        top: 100%;
        transform: rotate(0deg);
    }
}

.main-button {
    transition: transform 0.5s ease-in-out;
}

.main-button.zoom-out {
    transform: scale(0);
    opacity: 0;
}

/* Accessibility focus styles */
:focus {
    outline: 2px solid #4CAF50;
    outline-offset: 2px;
}
</style>