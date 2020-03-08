import Vue from 'vue';
import VueRouter from 'vue-router';
import multiguard from 'vue-router-multiguard';
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

const canManage = (to, from, next) => {
  if (store.state.user) {
    if (store.state.user.is_administrator || store.state.user.is_design) {
      next();
      return;
    }
  }
  next('player');
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: multiguard([ifAuthenticated, canManage]),
  },
  {
    path: '/game',
    name: 'game.all',
    component: () => import(/* webpackChunkName: "game.all" */ '../views/game/All'),
    beforeEnter: multiguard([ifAuthenticated, canManage]),
  },
  {
    path: '/game/:game',
    name: 'game.item',
    component: () => import(/* webpackChunkName: "game.item" */ '../views/game/Item'),
    beforeEnter: multiguard([ifAuthenticated, canManage]),
  },
  {
    path: '/game/:game/player/:player',
    name: 'game.item.player.item',
    component: () => import(/* webpackChunkName: "game.item.player.item" */ '../views/game/player/Item'),
    beforeEnter: multiguard([ifAuthenticated, canManage]),
  },
  {
    path: '/medal',
    name: 'medal.all',
    component: () => import(/* webpackChunkName: "medal.all" */ '../views/medal/All'),
    beforeEnter: multiguard([ifAuthenticated, canManage]),
  },
  {
    path: '/medal/:medal',
    name: 'medal.item',
    component: () => import(/* webpackChunkName: "medal.all" */ '../views/medal/Item'),
    beforeEnter: multiguard([ifAuthenticated, canManage]),
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
  },
  {
    path: '*',
    component: () => import('../views/PageNotFound')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
