<template>
    <RouterLink to="/cost">
        <button
            class="bg-blue-500 text-white text-xl font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-600 active:scale-95"
            @mousedown="isClicked = true"
            @mouseup="isClicked = false"
            @mouseleave="isClicked = false"
        >
            {{ text }}
        </button>
    </RouterLink>
</template>

<script>
import { ref } from "vue";

export default {
    props: {
        text: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    setup() {
        const isClicked = ref(false);
        return { isClicked };
    },
};
</script>