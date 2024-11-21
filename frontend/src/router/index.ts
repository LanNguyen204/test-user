import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import SignInView from '../views/SigninView.vue'
import SignUpView from '../views/SignupView.vue'
import { message } from 'ant-design-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create-user',
      name: 'createUser',
      component: CreateUserView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    // Catch-all route for 404
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: () => {
        message.error('Page not found.');
        return { name: 'home' };
      },
    },
  ],
});

router.beforeEach((to, from) => {
  const isAuthenticated = !!localStorage.getItem('jwt');

  // Prevent unauthenticated access to protected routes
  if (!isAuthenticated && to.name !== 'signin' && to.name !== 'signup') {
    message.error('You need to sign in first.');
    return { name: 'signin' };
  }

  // Prevent authenticated users from accessing sign-in or sign-up
  if (isAuthenticated && (to.name === 'signin' || to.name === 'signup')) {
    message.success('You are already signed in.');
    return { name: 'home' };
  }
});

export default router;
