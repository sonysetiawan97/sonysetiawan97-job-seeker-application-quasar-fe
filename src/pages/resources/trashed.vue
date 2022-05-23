<template>
  <q-page class="q-pa-md">
    <q-ajax-bar
      ref="loadingbar"
      position="top"
      skip-hijack
    />
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$t(`${storeCollection}.index.title`)" :to="`/${storeCollection}`" />
        <q-breadcrumbs-el label="Detail" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
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
        <q-btn flat label="Cancel" :to="`/${storeCollection}/trash`" />
        <q-space />
        <q-btn icon="delete_forever" flat color="negative" label="Delete Forever" @click="confirmHardDelete(id)" />
        <q-btn icon="restore_from_trash" class="q-ml-md bg-primary text-white" color="secondary" label="Restore" @click="confirmRestore(id)" />
      </q-toolbar>
    </q-footer>

  </q-page>
</template>

<script>
import { mapState, useStore } from 'vuex'
import { useRoute } from 'vue-router'
import FormGenerator from 'components/form/FormGenerator'

export default {
  components: {
    FormGenerator
  },
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  setup (props) {

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
  },
  data () {
    return {
      stateForm: 'trashed', // create, update, show, trashed
      id: this.$route.params.id,
      isPwd: true,
      loading: false
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
            this.$router.push(`/${this.storeCollection}/trash`)
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
            this.$router.push(`/${this.storeCollection}/trash`)
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
