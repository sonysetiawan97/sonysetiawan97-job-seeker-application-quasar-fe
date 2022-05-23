<template>
  <q-table
    ref="tableRef"
    :title="pageTitle"
    :rows="data"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :rows-per-page-options="pageOptions"
    :loading="loading"
    :filter="filter"
    @request="onRequest"
    binary-state-sort
    :selected-rows-label="getSelectedString"
    :selection="selection"
    v-model:selected="selected"
    @selection="onSelection"
    v-on="events"
    class="sticky-column"
  >
    <template v-slot:top-right>

      <q-btn flat round dense icon="delete" class="q-mr-sm q-ml-sm" color="negative"  v-if="selected.length>=1&&isStateFormEntries" @click="deleteSelected()" />

      <q-btn flat rounded dense icon="restore_from_trash" class="q-mr-sm q-ml-sm" v-if="selected.length>=1&&isStateFormTrash" @click="restoreSelected()"/>
      <q-btn flat rounded dense icon="delete_forever" class="q-mr-sm" color="negative"  v-if="selected.length>=1&&isStateFormTrash" @click="deleteSelected()" />

      <slot name="filterbox"></slot>
      <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-action="props">
      <q-td v-show="isStateFormEntries" :props="props" @click.stop.prevent>
        <q-btn flat round dense icon="more_vert">
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list>
              <q-item clickable v-close-popup tabindex="0" :to="`/${path}/${props.row.id}`">
                <q-item-section avatar>
                  <q-avatar icon="remove_red_eye" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Detail</q-item-label>
                  <q-item-label caption>Detail Record</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup tabindex="0" :to="`/${path}/${props.row.id}/edit`">
                <q-item-section avatar>
                  <q-avatar icon="edit" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Edit</q-item-label>
                  <q-item-label caption>Edit Record</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset spaced />
              <q-item clickable v-close-popup tabindex="0" @click="confirmDelete(props.row.id)">
                <q-item-section avatar>
                  <q-avatar icon="delete" color="negative" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Delete</q-item-label>
                  <q-item-label caption>Delete this record</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
      <q-td v-show="isStateFormTrash" :props="props" @click.stop.prevent>
        <q-btn flat round dense icon="more_vert">
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list>
              <q-item clickable v-close-popup tabindex="0" :to="`/${path}/${props.row.id}/trashed`">
                <q-item-section avatar>
                  <q-avatar icon="remove_red_eye" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Detail</q-item-label>
                  <q-item-label caption>Detail Record</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup tabindex="0" @click="confirmRestore(props.row.id)">
                <q-item-section avatar>
                  <q-avatar icon="restore_from_trash" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Restore</q-item-label>
                  <q-item-label caption>Restore</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset spaced />
              <q-item clickable v-close-popup tabindex="0" @click="confirmDelete(props.row.id)">
                <q-item-section avatar>
                  <q-avatar icon="delete" color="negative" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Delete</q-item-label>
                  <q-item-label caption>Delete forever</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template>

    <!-- Pass on all named slots -->
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData"><slot :name="name" v-bind="slotData" /></template>
  </q-table>
</template>

<style>
.sticky-column th:nth-last-child(2),
.sticky-column td:nth-last-child(2) {
  position: sticky;
  right: 0;
  z-index: 1;
}
</style>

<script>
import useDatatableSelectable from 'app/src/app/composables/datatable/useDatatableSelectable'

export default {
  name: 'DataTable',
  props: {
    basePath: {
      type: String,
      default: () => ''
    },
    selection: {
      type: String,
      default: () => 'multiple'
    },
    rowclickable: {
      type: Boolean,
      default: () => true
    },
    collection: {
      type: String,
      default: () => ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {}
    },
    fetch: {
      type: Function,
      default: () => {}
    },
    destroy: {
      type: Function,
      default: () => {}
    },
    stateForm: {
      type: String,
      default: () => 'entries'
    },
    trash: {
      type: Function,
      default: () => {}
    },
    restore: {
      type: Function,
      default: () => {}
    },
    stateData: {
      type: String,
      default: null
    }
  },
  setup (props) {
    return {
      ...useDatatableSelectable()
    }
  },
  data () {
    const events = {}
    if(this.rowclickable) {
      events['rowClick'] = this.rowClick
    }

    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 10, // limit default set 25
        rowsNumber: 0 // total records
      },
      pageOptions: [5, 10, 25, 50, 100],
      events
    }
  },
  mounted () {
    const pagination = this.pagination
    const filter = this.filter
    this.onRequest({ pagination, filter })
  },
  watch: {
    stateData: function (newVal, oldVal) {
      const pagination = this.pagination
      const filter = this.filter
      this.onRequest({ pagination, filter })
    },
    collection: function (newVal, oldVal) {
      const pagination = this.pagination
      const filter = this.filter
      this.rows.value = []
      this.onRequest({ pagination, filter })
    }
  },
  methods: {
    onRequest (props) {
      const { filters } = props
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      let filter = {}
      if(filters) {
        filter = { ...filters }
      }
      const search = props.filter
      const params = {
        ...this.params,
        ...filter,
        search,
        page: page,
        limit: rowsPerPage,
        // [`orderby[${sortBy}]`]: descending ? 'desc' : 'asc'
      }

      const orderby = Object.keys(this.params).find((index, item) => index.startsWith("orderby"))
      if(!orderby) {
        params[[`orderby[${sortBy}]`]] = descending ? 'desc' : 'asc'
      }

      this.loading = true
      this.fetch({ params }).then((response) => {
        const { data, meta } = response
        this.pagination.rowsNumber = meta.recordsFiltered
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        this.rows.value = data
        this.loading = false
      }).catch(error => {
        if (error.response) {
          const { data } = error.response
          this.$q.dialog({
            title: `${data.status}`,
            message: `${data.message}`,
            ok: {
              flat: true
            },
            persistent: true
          })
        }
        this.loading = false
      })
    },
    emitFilter(filters) {
      const pagination = this.pagination
      const filter = this.filter
      this.onRequest({ pagination, filter, filters })
    },
    confirmDelete (id) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure to delete?',
        ok: {
          label: 'Delete',
          color: 'negative',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      })
      .onOk(() => {
        this.destroy({
          type: id,
          params: {}
        })
        .then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
          })
        })
        .catch(error => {
          if (error.response) {
            const { data } = error.response
            this.$q.dialog({
              title: `${data.status}`,
              message: `${data.message}`,
              ok: {
                flat: true
              },
              persistent: true
            })
          }
          this.loading = false
        })
      })
    },
    deleteSelected () {
      const ids = []
      for (const item of this.selected) {
        ids.push(item.id)
      }
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure to delete?',
        ok: {
          label: 'Delete',
          color: 'negative',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.destroy({
          type: 'selected',
          data: {
            selected: ids
          }
        }).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
          })
        }).catch(error => {
          if (error.response) {
            const { data } = error.response
            this.$q.dialog({
              title: `${data.status}`,
              message: `${data.message}`,
              ok: {
                flat: true
              },
              persistent: true
            })
          }
          this.loading = false
        })
      })
    },

    confirmRestore (id) {
      this.$q.dialog({
        title: 'Restore',
        message: 'Are you sure to restore?',
        ok: {
          label: 'Restore',
          color: 'secondary',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      })
      .onOk(() => {
        this.restore({
          type: id,
          params: {}
        })
        .then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
          })
        })
        .catch(error => {
          if (error.response) {
            const { data } = error.response
            this.$q.dialog({
              title: `${data.status}`,
              message: `${data.message}`,
              ok: {
                flat: true
              },
              persistent: true
            })
          }
          this.loading = false
        })
      })
    },

    restoreSelected () {
      const ids = []
      for (const item of this.selected) {
        ids.push(item.id)
      }

      this.$q.dialog({
        title: 'Restore',
        message: 'Are you sure to restore?',
        ok: {
          label: 'Restore',
          color: 'secondary',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      })
      .onOk(() => {
        this.restore({
          type: 'selected',
          data: {
            selected: ids
          }
        })
        .then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
          })
        })
        .catch(error => {
          if (error.response) {
            const { data } = error.response
            this.$q.dialog({
              title: `${data.status}`,
              message: `${data.message}`,
              ok: {
                flat: true
              },
              persistent: true
            })
          }
          this.loading = false
        })
      })
    },

    rowClick (evt, row, index) {
      if(!this.rowclickable) return
      const trashed = this.stateForm == 'trash'? '/trashed': ''
      this.$router.push(`/${this.path}/${row.id}${trashed}`)
    }
  },
  computed: {
    data () {
      return this.rows.value
    },
    pageTitle () {
      if (this.stateForm == 'trash') {
        return this.$t(`${this.collection}.trash.title`)
      }
      return this.$t(`${this.collection}.index.title`)
    },
    isStateFormEntries () {
      return this.stateForm === 'entries'
    },
    isStateFormTrash () {
      return this.stateForm === 'trash'
    },
    path () {
      if (this.basePath != '') return this.basePath
      return this.collection
    }
  }
}
</script>
