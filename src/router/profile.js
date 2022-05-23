const collection = 'profile'
export const profile = {
  path: '/profile',
  component: async () => await import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      props: {
        collection: 'users'
      },
      component: () => {
        try {
          return import('pages/profile/show.vue')
        } catch (error) {
          return import('pages/resources/show.vue')
        }
      }
    },
  ]
}
