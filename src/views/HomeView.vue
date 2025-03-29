<template>
    <div id="app" class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-sky-100 to-sky-200 text-white">
        <h1 class="text-4xl font-bold text-gray-800 mb-10">Mi Viaje</h1>
        <MainButton text="¿Cuánto cuesta mi viaje?" url="/cost"/>
    </div>
</template>

<script>
import MainButton from "../components/MainButton.vue";

export default {
    components: { MainButton },
};
</script>