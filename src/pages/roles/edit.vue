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
        <q-breadcrumbs-el label="Detail" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
      <q-btn flat rounded icon="vpn_key" class="q-ml-sm" label="Permissions" @click="dialogPermission=true" />
    </q-toolbar>
    <div class="text-h5">{{$t(`${collection}.edit.title`)}}</div>

    <FormGenerator
      ref="formGenerator"
      :collection="collection"
      :stateForm="stateForm"
      :layout="layout"
      :validation="validation"
      :id="id"
    />

    <q-dialog v-model="dialogPermission" persistent>
      <q-card style="min-width: 650px">
        <q-card-section>
          <div class="text-h6">Permissions</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row q-gutter-md q-my-md">
            <div class="col">
              <q-select
                outlined
                v-model="selectedPemission"
                :readonly="readonly"
                label="Permissions"
                stack-label
                use-input
                emit-value
                map-options
                option-value="name"
                option-label="name"
                clearable
                @filter="onFilterSelect"
                :options="permissionOptions"
                @update:model-value="onPermissionSelected"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-italic text-grey">
                      Data not found
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="row q-gutter-md q-my-md">
            <div class="col">
              <q-chip removable color="primary" @remove="removePermissionAt(index)" text-color="white" v-for="(item, index) of permissions" :key="index">
                {{item}}
              </q-chip>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Submit" :disabled="readonly" :loading="loading" @click="updatePermissions" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer reveal elevated class="bg-white text-black">
      <q-toolbar style="height: 64px">
        <q-btn flat label="Cancel" :to="`/${collection}`" />
        <q-space />
        <q-btn icon="delete" flat color="negative" label="Delete" @click="confirmDelete(id)" />
        <q-btn icon="check" class="q-ml-md bg-primary text-white" :loading="loading" color="secondary" label="Update" @click="submitUpdate" />
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { useStore } from 'vuex'
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
    .dispatch(`${this.collection}/detail`, { id: this.id })
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

    $store
    .dispatch(`${this.collection}/getPermissions`, { id: this.id })
    .then(response => {
      const { data } = response
      this.permissions = data
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
      stateForm: 'update', // create, update, show
      id: this.$route.params.id,
      isPwd: true,
      loading: false,
      dialogPermission: false,
      selectedPemission: null,
      permissions: [],
      permissionOptions: []
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
        this.$store.dispatch(`${this.collection}/destroy`, {
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
            this.$router.push(`/${this.collection}`)
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
      if (formGenerator.validateError()) return

      const { loadingbar } = this.$refs
      loadingbar.start()
      this.loading = true

      const payload = {
        id: this.id,
        data: formGenerator.form
      }

      this.$store
      .dispatch(`${this.collection}/update`, payload)
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
            this.$router.push(`/${this.collection}`)
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

    submitChangePermissions () {
    },

    onFilterSelect (search, update, abort) {
      const params = {
        search
      }
      this.$store.dispatch(`permissions/fetch`, { params }).then(response => {
        const { data } = response
        update(() => {
          this.permissionOptions = data
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
      })
    },

    onPermissionSelected (value) {
      this.permissions.push(value)
    },

    removePermissionAt (index) {
      this.permissions = this.permissions.slice(0, index)
    },

    updatePermissions () {
      this.loading = true
      const payload = {
        id: this.id,
        data: {
          permissions: this.permissions
        }
      }
      this.$store
      .dispatch(`${this.collection}/changePermissions`, payload)
      .then((response) => {
        const { status, message } = response
        this.$q.dialog({
          title: `${status}`,
          message: `${message}`,
          ok: {
            flat: true
          },
          persistent: true
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
      })
      .finally(() => {
        this.loading = false
        this.dialogPermission = false
      })
    },
  },
  computed: {
    ...mapState({
      validation (state, getters) {
        return getters[`${this.collection}/validation`]
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
      if (this.stateForm === 'update') title = 'Update'
      return title
    },
  }
}
</script>
