import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '@/views/Accueil.vue';
import Profile from '@/views/Profile.vue';
import Posts from '@/views/Posts.vue';

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
