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
    <div class="text-h5">{{$t(`${storeCollection}.edit.title`)}}</div>

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
        <q-btn flat label="Cancel" :to="`/${parentCollection}/${country_id}/${storeCollection}`" />
        <q-space />
        <q-btn icon="delete" flat color="negative" label="Delete" @click="confirmDelete(id)" />
        <q-btn icon="check" class="q-ml-md bg-primary text-white" :loading="loading" color="secondary" label="Update" @click="submitUpdate" />
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
import { mapState } from 'vuex'
import { useStore } from 'vuex'
import FormGenerator from 'components/form/FormGenerator'
import { scroll } from 'quasar'
import { useRoute } from 'vue-router'
const { getScrollTarget, setVerticalScrollPosition } = scroll

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

    const params = this.params

    $store
    .dispatch(`${this.storeCollection}/detail`, { id: this.id, params })
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
      stateForm: 'update', // create, update, show
      isPwd: true,
      loading: false,
      tab: 'provinces'
    }
  },
  methods: {
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
      }).onOk(() => {
        this.$store.dispatch(`${this.storeCollection}/destroy`, {
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
            this.$router.push(`/${this.parentCollection}/${this.country_id}/${this.storeCollection}`)
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

    submitUpdate () {
      const { formGenerator } = this.$refs
      if (formGenerator.validateError()) {
        const $v = formGenerator.getValidation()
        const el = this.$el.querySelector(`.form-${$v.$errors[0].$property}`)
        const target = getScrollTarget(el)
        const offset = el.offsetTop
        const duration = 500
        setVerticalScrollPosition(target, offset, duration)
        return
      }

      const { loadingbar } = this.$refs
      loadingbar.start()
      this.loading = true

      const payload = {
        id: this.id,
        data: formGenerator.form
      }

      this.$store
      .dispatch(`${this.storeCollection}/update`, payload)
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
          if (!this.submitAndCreate) {
            this.$router.push(`/${this.parentCollection}/${this.country_id}/${this.storeCollection}`)
          }
        }).finally(() => {
          this.loading = false
        })
      })
      .catch((error) => {
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
      })
      .finally(() => {
        loadingbar.stop()
        this.loading = false
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
      },
      params (state, getters) {
        return getters[`${this.storeCollection}/params`]
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
    }
  }
}
</script>
