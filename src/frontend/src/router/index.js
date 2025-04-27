import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import CreateNote from '../views/CreateNote.vue';
import Note from '../views/Note.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/notes',
    name: 'create-note',
    component: CreateNote,
  },
  {
    path: '/notes/:id',
    name: 'note-detail',
    component: Note,
    props: true, // Permite passar o ID como prop para o componente
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    /*
      salvar posição em forma de hash do item clicado e levar
      até a posição dele quando a hash estiver presente na url 
    */
    return new Promise((resolve) => {
      if (to.hash) {
        const checkExist = setInterval(() => {
          const element = document.getElementById(to.hash.slice(1));

          if (element) {
            clearInterval(checkExist);

            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // 100px de margem do topo

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });

            resolve();
          }
        }, 100); // Verifica a cada 100ms
      } else if (savedPosition) {
        resolve(savedPosition);
      } else {
        resolve({ x: 0, y: 0 });
      }
    });
  },
});

/* router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (store.getters.authenticated === false) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
}); */

export default router;