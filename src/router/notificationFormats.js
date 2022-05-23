const collection = 'notificationFormats'
export const notificationFormats = {
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
      path: 'trash',
      props: { collection },
      component: () => {
        try {
          const isExist = require(`pages/${collection}/trash.vue`)
          if (isExist) {
            return import(`pages/${collection}/trash.vue`)
          }
        } catch (error) {
          return import('pages/resources/trash.vue')
        }
      }
    },
    {
      path: 'create',
      props: { collection },
      component: () => {
        try {
          const isExist = require(`pages/${collection}/create.vue`)
          if (isExist) {
            return import('pages/' + collection + '/create.vue')
          }
        } catch (error) {
          return import('pages/resources/create.vue')
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
            return import('pages/' + collection + '/show.vue')
          }
        } catch (error) {
          return import('pages/resources/show.vue')
        }
      }
    },
    {
      path: ':id/trashed',
      props: { collection },
      component: () => {
        try {
          const isExist = require(`pages/${collection}/trashed.vue`)
          if (isExist) {
            return import(`pages/${collection}/trashed.vue`)
          }
        } catch (error) {
          return import('pages/resources/trashed.vue')
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
    },
  ]
}
