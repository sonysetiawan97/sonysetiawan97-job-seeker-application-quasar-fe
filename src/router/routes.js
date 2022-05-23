import { collection } from './collection'

import { countries } from './countries'

import { users } from './users'
import { roles } from './roles'
import { profile } from './profile'
import { addresses } from './addresses'
import { contacts } from './contacts'
import { files } from './files'
import { sysparam } from './sysparam'

import { notifications } from './notifications'
import { notificationTemplates } from './notificationTemplates'
import { notificationFormats } from './notificationFormats'

const routes = (store) => [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/UserLogin.vue'),
    children: [
      { path: '', component: () => import('pages/users/login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/UserLogin.vue'),
    children: [
      { path: '', component: () => import('pages/users/register.vue') }
    ]
  },
  {
    path: '/forgot-password',
    component: () => import('layouts/UserLogin.vue'),
    children: [
      { path: '', component: () => import('pages/users/forgot.vue') }
    ]
  },
  {
    path: '/verify-email/:id/:hash',
    component: () => import('layouts/UserLogin.vue'),
    children: [
      { path: '', component: () => import('pages/users/verify-email.vue') }
    ]
  },

  // {
  //   path: '/profile',
  //   component: async () => await import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       props: {
  //         collection: 'users'
  //       },
  //       component: () => {
  //         try {
  //           return import('pages/profile/show.vue')
  //         } catch (error) {
  //           return import('pages/resources/show.vue')
  //         }
  //       }
  //     },
  //   ]
  // },


  { ...profile },

  { ...countries(store) },

  { ...users },
  { ...roles },
  { ...addresses },
  { ...contacts },
  { ...files },
  { ...sysparam },

  { ...notifications },
  { ...notificationTemplates },
  { ...notificationFormats },

  // Default route
  { ...collection(store) },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
