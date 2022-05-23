<template>
  <q-page class="q-pa-md scrolltop">
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
    <div class="text-h5">{{$t(`${storeCollection}.create.title`)}}</div>

    <FormGenerator
      ref="formGenerator"
      :collection="storeCollection"
      :stateForm="stateForm"
      :layout="layout"
      :validation="validation"
    />

    <q-footer reveal elevated class="bg-white text-black">
      <q-toolbar style="height: 64px">
        <q-toggle v-model="submitAndCreate" label="Submit and create new" />
        <q-space />
        <q-btn flat label="Cancel" :to="`/${parentCollection}/${country_id}/${storeCollection}`" />
        <q-btn
          icon="check"
          class="q-ml-md bg-primary text-white"
          color="secondary"
          label="Create"
          :loading="loading"
          @click="submit"
        />
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
import FormGenerator from 'components/form/FormGenerator'
import { scroll } from 'quasar'
import { useRoute } from 'vue-router'
import { parse } from 'qs'
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
    const { country_id } = route.params
    return {
      country_id
    }
  },
  provide () {
    return {
      form: this.form
    }
  },
  mounted () {
    this.$store
    .dispatch(`${this.parentCollection}/detail`, { id: this.country_id })
    .then(response => {
      const { data } = response
      this.country = data
    })
    this.$refs.formGenerator.setFormData(this.form)
  },
  data () {
    return {
      country: {},
      stateForm: 'create', // create, update, show
      isPwd: true,
      loading: false,
      submitAndCreate: false,
      tab: 'provinces'
    }
  },
  methods: {
    submit () {
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
        data: formGenerator.form
      }

      this.$store
      .dispatch(`${this.storeCollection}/create`, payload)
      .then((response) => {
        const { status } = response
        if (this.submitAndCreate) {
          this.$q.notify('Data created')
          const keys = Object.keys(this.form)
          for (const i in keys) {
            const key = keys[i]
            this.form[key] = null
          }
          this.$refs.formGenerator.resetForm()
          return
        }

        this.$q.dialog({
          title: `${status}`,
          message: 'Data created',
          ok: {
            flat: true
          },
          persistent: true
        }).onOk(() => {
          this.$router.push(`/${this.parentCollection}/${this.country_id}/${this.storeCollection}`)
        }).finally(() => {
          this.loading = false
        })
      }).catch((error) => {
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
      }).finally(() => {
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
        const form = getters[`${this.storeCollection}/form`]
        form['country_id'] = parseInt(this.country_id)
        return form
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
