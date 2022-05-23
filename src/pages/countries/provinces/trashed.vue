<template>
  <q-page class="q-pa-md">
    <q-ajax-bar
      ref="loadingbar"
      position="top"
      skip-hijack
    />
    <div class="text-h5">{{country?.name}}</div>
    <q-toolbar class="q-pb-md q-px-none q-mt-lg">
      <q-tabs v-model="tab" shrink stretch active-color="light-blue-10" content-class="tabs-border" class="full-width" align="left">
        <q-route-tab :to="`/countries/${country_id}`" no-caps name="country" label="Country" />
        <q-route-tab :to="`/countries/${country_id}/provinces`" no-caps name="provinces" label="Provinces" />
        <q-route-tab :to="`/countries/${country_id}/cities`" no-caps name="cities" label="Cities" />
      </q-tabs>
    </q-toolbar>
    <div class="text-h5">{{$t(`${storeCollection}.trashed.title`)}}</div>

    <FormGenerator
      ref="formGenerator"
      :collection="storeCollection"
      :stateForm="stateForm"
      :layout="layout"
      :validation="validation"
      :id="id"
    />

    <q-footer reveal elevated class="bg-white text-black">
      <q-toolbar style="height: 64px">
        <q-btn flat label="Cancel" :to="`/${parentCollection}/${country_id}/${storeCollection}/trash`" />
        <q-space />
        <q-btn icon="delete_forever" flat color="negative" label="Delete Forever" @click="confirmHardDelete(id)" />
        <q-btn icon="restore_from_trash" class="q-ml-md bg-primary text-white" color="secondary" label="Restore" @click="confirmRestore(id)" />
      </q-toolbar>
    </q-footer>
  </q-page>
</template>
<style>
.tabs-border {
  border-bottom: 1px solid #e0e0e0;
}
</style>
<script>
import { mapState, useStore } from 'vuex'
import { useRoute } from 'vue-router'
import FormGenerator from 'components/form/FormGenerator'

export default {
  components: {
    FormGenerator
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
  setup (props) {
    const route = useRoute()
    const { country_id, id } = route.params
    return {
      country_id,
      id
    }
  },
  provide () {
    return {
      form: this.form
    }
  },
  mounted () {
    const $store = useStore()
    const { loadingbar } = this.$refs
    loadingbar.start()
    this.loading = true

    $store
    .dispatch(`${this.storeCollection}/trashed`, { id: this.id })
    .then(response => {
      const { data } = response
      this.loading = false
      loadingbar.stop()
      const keys = Object.keys(this.form)
      for (const i in keys) {
        const key = keys[i]
        this.form[key] = data[key]
      }
      this.$refs.formGenerator.setFormData(this.form)
    })
    .catch(error => {
      this.loading = false
      if (!error.response) return
      const { data } = error.response
      this.$q.dialog({
        title: `${data.status}`,
        message: `${data.message}`,
        ok: {
          flat: true
        },
        persistent: true
      })
    })

    this.$store
    .dispatch(`${this.parentCollection}/detail`, { id: this.country_id })
    .then(response => {
      const { data } = response
      this.country = data
    })
  },
  data () {
    return {
      country: {},
      stateForm: 'trashed', // create, update, show, trashed
      isPwd: true,
      loading: false,
      tab: 'provinces'
    }
  },
  methods: {
    confirmHardDelete (id) {
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
        this.$store.dispatch(`${this.storeCollection}/hardDelete`, {
          type: id,
          params: {}
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
            this.$router.push(`/${this.parentCollection}/${this.country_id}/${this.storeCollection}/trash`)
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
      }).onOk(() => {
        this.$store.dispatch(`${this.storeCollection}/restore`, {
          type: id,
          params: {}
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
            this.$router.push(`/${this.parentCollection}/${this.country_id}/${this.storeCollection}/trash`)
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
  },
  computed: {
    ...mapState({
      validation (state, getters) {
        return getters[`${this.storeCollection}/validation`]
      },
      form (state, getters) {
        return getters[`${this.storeCollection}/form`]
      },
      layout (state, getters) {
        return getters[`${this.storeCollection}/layout`]
      }
    }),
    readonly () {
      return this.stateForm === 'show'
    },
    storeCollection() {
      const route = useRoute()
      const { collection } = route.params
      const storeCollection = this.collection || collection
      return storeCollection
    },
  }
}
</script>
