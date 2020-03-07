import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  if (store.state.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/game',
    name: 'game.all',
    component: () => import(/* webpackChunkName: "game.all" */ '../views/game/All'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/game/:game',
    name: 'game.item',
    component: () => import(/* webpackChunkName: "game.item" */ '../views/game/Item'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/game/:game/player/:player',
    name: 'game.item.player.item',
    component: () => import(/* webpackChunkName: "game.item.player.item" */ '../views/game/player/Item'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
