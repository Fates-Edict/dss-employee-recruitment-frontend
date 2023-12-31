
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
      { name: 'add-roles', path: '/roles/form', component: () => import('pages/roles/form.vue') },
      { name: 'edit-roles', path: '/roles/form/:id', component: () => import('pages/roles/form.vue') },

      { name: 'index-modules', path: '/modules', component: () => import('pages/modules/index.vue') },
      { name: 'add-modules', path: '/modules/form', component: () => import('pages/modules/form.vue') },
      { name: 'edit-modules', path: '/modules/form/:id', component: () => import('pages/modules/form.vue') },

      { name: 'index-job-vacancies', path: '/job-vacancies', component: () => import('pages/job-vacancies/index.vue') },
      { name: 'add-job-vacancies', path: '/job-vacancies/form', component: () => import('pages/job-vacancies/form.vue') },
      { name: 'edit-job-vacancies', path: '/job-vacancies/form/:id', component: () => import('pages/job-vacancies/form.vue') },

      { name: 'index-alternatives', path: '/alternatives', component: () => import('pages/alternatives/index.vue') },
      { name: 'add-alternatives', path: '/alternatives/form', component: () => import('pages/alternatives/form.vue') },
      { name: 'edit-alternatives', path: '/alternatives/form/:id', component: () => import('pages/alternatives/form.vue') },

      { name: 'index-criteria', path: '/criteria', component: () => import('pages/criteria/index.vue') },
      { name: 'add-criteria', path: '/criteria/form', component: () => import('pages/criteria/form.vue') },
      { name: 'edit-criteria', path: '/criteria/form/:id', component: () => import('pages/criteria/form.vue') },

      { name: 'index-simulations', path: '/simulations', component: () => import('pages/simulations/index.vue') },
      { name: 'add-simulations', path: '/simulations/form', component: () => import('pages/simulations/form.vue') },
      { name: 'edit-simulations', path: '/simulations/form/:id', component: () => import('pages/simulations/form.vue') }
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
