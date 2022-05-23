<template>
  <q-page class="q-pa-md">
    <q-ajax-bar
      ref="loadingbar"
      position="top"
      skip-hijack
    />
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="collectionName" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Create" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <div class="text-h5">{{$t(`${collection}.create.title`)}}</div>

    <FormGenerator
      ref="formGenerator"
      :collection="collection"
      :stateForm="stateForm"
      :layout="layout"
      :validation="validation"
    />

    <q-footer reveal elevated class="bg-white text-black">
      <q-toolbar style="height: 64px">
        <q-toggle v-model="submitAndCreate" label="Submit and create new" />
        <q-space />
        <q-btn flat label="Cancel" :to="`/${collection}`" />
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

<script>
import { mapState, useStore } from 'vuex'
import FormGenerator from 'components/form/FormGenerator'
import { required } from '@vuelidate/validators'

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
    const form = { ...this.form,
                  password: null,
                  password_confirmation: null,
                  role: null
                }
    return {
      form
    }
  },
  mounted () {
    const $store = useStore()
    $store
    .dispatch(`roles/fetch`)
    .then(response => {
      const { data } = response
      this.roles = data
      this.layout[0].push({
        type: 'QSelect',
        col: 'col-2',
        name: 'role',
        label: 'Role',
        props: {
          options: this.roles,
          'use-input': true,
          'emit-value': true,
          'map-options': true,
          'option-value': 'name',
          'option-label': 'name',
          'hide-selected': true,
          'fill-input': true
        },
        reference: 'roles',
        updateValues: [], // update values to be null on value changed
        events: {}
      })
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

    this.layout.splice(2, 0,
      [
        {
          type: 'QInput',
          col: 'col-4',
          name: 'password',
          label: 'Password',
          props: {
            type: 'password',
            maxlength: 50
          },
          events: {}
        },
        {
          type: 'QInput',
          col: 'col-4',
          name: 'password_confirmation',
          label: 'Retype Password',
          props: {
            type: 'password',
            maxlength: 50
          },
          events: {}
        },
      ],
    )
  },
  data () {
    return {
      stateForm: 'create', // create, update, show
      isPwd: true,
      loading: false,
      submitAndCreate: false,
      roles: []
    }
  },
  methods: {
    submit () {
      const { formGenerator } = this.$refs
      if (formGenerator.validateError()) return

      const { loadingbar } = this.$refs
      loadingbar.start()
      this.loading = true

      const payload = {
        data: formGenerator.form
      }

      this.$store
      .dispatch(`${this.collection}/create`, payload)
      .then((response) => {
        const { status } = response
        this.$q.dialog({
          title: `${status}`,
          message: 'Data created',
          ok: {
            flat: true
          },
          persistent: true
        }).onOk(() => {
          if (!this.submitAndCreate) {
            this.$router.push(`/${this.collection}`)
          } else {
            const keys = Object.keys(this.form)
            for (const i in keys) {
              const key = keys[i]
              this.form[key] = null
            }
            this.$refs.formGenerator.resetForm()
          }
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
        const validations = getters[`${this.collection}/validation`]
        validations['role'] = { required }
        return validations
      },
      form (state, getters) {
        return getters[`${this.collection}/form`]
      },
      layout (state, getters) {
        return getters[`${this.collection}/layout`]
      }
    }),
    readonly () {
      return this.stateForm === 'show'
    },
    collectionName () {
      const words = this.collection.split('_')
      const titles = []
      for (const key in words) {
        const word = words[key]
        titles.push(word.charAt(0).toUpperCase() + word.slice(1))
      }
      return titles.join(' ')
    },
    titlePage () {
      let title = ''
      if (this.stateForm === 'create') title = 'Create New'
      if (this.stateForm === 'show') title = 'Detail'
      return title
    },
  }
}
</script>
