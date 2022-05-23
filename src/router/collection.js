export const collection = (store) => {
  return {
    path: '/:collection',
    component: async () => await import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const { collection } = to.params
      const storeExist = store.state[collection]
      if (storeExist) {
        store.commit('sysparam/route', { params: to.params })
        next()
      } else {
        next('/404')
      }
    },
    children: [
      {
        path: '',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/index.vue`)
            if (isExist) {
              return import('pages/' + collection + '/index.vue')
            }
          } catch (error) {
            return import('pages/resources/index.vue')
          }
        }
      },
      {
        path: 'trash',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/trash.vue`)
            if (isExist) {
              return import('pages/' + collection + '/trash.vue')
            }
          } catch (error) {
            return import('pages/resources/trash.vue')
          }
        }
      },
      {
        path: 'create',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
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
        path: 'report',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/report.vue`)
            if (isExist) {
              return import('pages/' + collection + '/report.vue')
            }
          } catch (error) {
            return import('pages/resources/report.vue')
          }
        }
      },
      {
        path: 'import',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/import.vue`)
            if (isExist) {
              return import('pages/' + collection + '/import.vue')
            }
          } catch (error) {
            return import('pages/resources/import.vue')
          }
        }
      },
      {
        path: 'export',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/export.vue`)
            if (isExist) {
              return import('pages/' + collection + '/export.vue')
            }
          } catch (error) {
            return import('pages/resources/export.vue')
          }
        }
      },
      {
        path: ':id',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
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
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/trashed.vue`)
            if (isExist) {
              return import('pages/' + collection + '/trashed.vue')
            }
          } catch (error) {
            return import('pages/resources/trashed.vue')
          }
        }
      },
      {
        path: ':id/edit',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/edit.vue`)
            if (isExist) {
              return import('pages/' + collection + '/edit.vue')
            }
          } catch (error) {
            return import('pages/resources/edit.vue')
          }
        }
      }
    ]
  }
}
