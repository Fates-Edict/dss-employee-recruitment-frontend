
const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'dashboard', path: '/', component: () => import('pages/dashboard/index.vue') },

      { name: 'index-users', path: '/users', component: () => import('pages/users/index.vue') },
      { name: 'add-users', path: '/users/form', component: () => import('pages/users/form.vue') },
      { name: 'edit-users', path: '/users/form/:id', component: () => import('pages/users/form.vue') },
      
      { name: 'index-roles', path: '/roles', component: () => import('pages/roles/index.vue') },

      { name: 'index-modules', path: '/modules', component: () => import('pages/modules/index.vue') },
      { name: 'add-modules', path: '/modules/form', component: () => import('pages/modules/form.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
