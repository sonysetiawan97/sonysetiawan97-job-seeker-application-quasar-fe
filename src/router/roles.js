const collection = 'roles'
export const roles = {
  path: `/${collection}`,
  component: async () => await import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      props: { collection },
      component: () => {
        try {
          const isExist = require(`pages/${collection}/index.vue`)
          if (isExist) {
            return import(`pages/${collection}/index.vue`)
          }
        } catch (error) {
          return import('pages/resources/index.vue')
        }
      }
    },
    {
      path: ':id',
      props: { collection },
      component: () => {
        try {
          const isExist = require(`pages/${collection}/show.vue`)
          if (isExist) {
            return import(`pages/${collection}/show.vue`)
          }
        } catch (error) {
          return import('pages/resources/show.vue')
        }
      }
    },
    {
      path: ':id/edit',
      props: { collection },
      component: () => {
        try {
          const isExist = require(`pages/${collection}/edit.vue`)
          if (isExist) {
            return import(`pages/${collection}/edit.vue`)
          }
        } catch (error) {
          return import('pages/resources/edit.vue')
        }
      }
    }
  ]
}
