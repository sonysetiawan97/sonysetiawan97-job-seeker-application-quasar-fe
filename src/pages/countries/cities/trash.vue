<template>
  <q-page class="q-pa-md">
    <div class="text-h5">{{country?.name}}</div>
    <q-toolbar class="q-pb-md q-px-none q-mt-lg">
      <q-tabs v-model="tab" shrink stretch active-color="light-blue-10" content-class="tabs-border" class="full-width" align="left">
        <q-route-tab :to="`/countries/${country_id}`" no-caps name="country" label="Country" />
        <q-route-tab :to="`/countries/${country_id}/provinces`" no-caps name="provinces" label="Provinces" />
        <q-route-tab :to="`/countries/${country_id}/cities`" no-caps name="cities" label="Cities" />
      </q-tabs>
    </q-toolbar>
    <q-toolbar class="q-pb-md q-px-none">
      <q-toolbar-title></q-toolbar-title>
      <q-btn icon="delete_forever" class="q-mr-md" label="Empty" flat color="negative" @click="emptyTrash" />
      <q-btn icon="restore_from_trash" class="q-mr-md" label="Restore" color="secondary" @click="restoreAll"/>
    </q-toolbar>
    <DataTable
      :columns="columns"
      :fetch="trash"
      :destroy="destroy"
      :restore="restore"
      :basePath="`${parentCollection}/${country_id}/${storeCollection}`"
      :collection="storeCollection"
      :params="params"
      :stateForm="stateForm"
      :stateData="stateData"
    />
  </q-page>
</template>
<style>
.tabs-border {
  border-bottom: 1px solid #e0e0e0;
}
</style>
<script>
import DataTable from 'components/resources/DataTable'
import { mapState, mapActions } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    DataTable
  },
  props: {
    parentCollection: {
      type: String,
      default: null
    },
    collection: {
      type: String,
      default: null
    }
  },
  setup () {
    const route = useRoute()
    const { country_id } = route.params
    return {
      country_id
    }
  },
  mounted () {
    this.$store
    .dispatch(`${this.parentCollection}/detail`, { id: this.country_id })
    .then(response => {
      const { data } = response
      this.country = data
    })
  },
  data () {
    return {
      stateForm: 'trash', // entries, trash
      stateData: null,
      country: {},
      tab: 'provinces'
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
