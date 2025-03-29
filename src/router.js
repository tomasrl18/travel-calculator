import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';
import TravelCostCalculator from './views/TravelCostCalculator.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/cost', component: TravelCostCalculator },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
