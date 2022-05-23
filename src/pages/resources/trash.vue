<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$t(`${storeCollection}.index.title`)" :to="`/${storeCollection}`" />
        <q-breadcrumbs-el label="Trash" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn icon="delete_forever" class="q-mr-md" label="Empty" flat color="negative" @click="emptyTrash" />
      <q-btn icon="restore_from_trash" class="q-mr-md" label="Restore" color="secondary" @click="restoreAll"/>
    </q-toolbar>
    <DataTable
      :columns="columns"
      :fetch="trash"
      :destroy="destroy"
      :restore="restore"
      :collection="storeCollection"
      :params="params"
      :stateForm="stateForm"
      :stateData="stateData"
    />
  </q-page>
</template>

<script>
import DataTable from 'components/resources/DataTable'
import { mapState, mapActions } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    DataTable
  },
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      stateForm: 'trash', // entries, trash
      stateData: null
    }
  },
  methods: {
    ...mapActions({
      trash (dispatch, payload) {
        return dispatch(this.storeCollection + '/trash', payload)
      },
      destroy (dispatch, payload) {
        return dispatch(this.storeCollection + '/hardDelete', payload)
      },
      restore (dispatch, payload) {
        return dispatch(this.storeCollection + '/restore', payload)
      }
    }),

    emptyTrash () {
      this.$q.dialog({
        title: 'Empty Trash',
        message: 'Are you sure to empty trash?',
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
          type: 'all'
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
            this.stateData = new Date().toISOString()
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

    restoreAll () {
      this.$q.dialog({
        title: 'Restore All',
        message: 'Are you sure to restore all?',
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
      }).onOk(() => {
        this.restore({
          type: 'all'
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
            this.stateData = new Date().toISOString()
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
    }
  },
  computed: {
    ...mapState({
      columns (state, getters) {
        return getters[`${this.storeCollection}/columns`]
      },
      params (state, getters) {
        return getters[`${this.storeCollection}/params`]
      },
    }),
    storeCollection() {
      const route = useRoute()
      const { collection } = route.params
      const storeCollection = this.collection || collection
      return storeCollection
    },
  }
}
</script>
