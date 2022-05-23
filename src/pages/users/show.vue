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

      <q-btn flat icon="lock" class="q-ml-sm" label="Password" @click="dialogPassword=true" />
      <q-btn flat icon="face" color="secondary" class="q-ml-sm" label="Role" @click="dialogRole=true" />
    </q-toolbar>

    <div class="text-h5">User Profile</div>

    <q-item>
      <q-item-section side>
        <q-avatar round size="72px" clickable v-ripple>
          <img :src="photo.fullpath" v-if="photo" @click="popupimage=true" />
          <q-icon name="account_circle" v-else />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-file
          v-model="avatar.file"
          label="Upload new photo"
          filled
          style="max-width: 300px"
          accept="image/*"
          @update:model-value="fileSelected"
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-file>
      </q-item-section>
    </q-item>

    <q-item v-if="!loading && form.status=='inactive'">
      <q-item-section side>
        <q-btn icon="done" class="bg-primary text-white" color="secondary" label="Activate Account" />
      </q-item-section>
    </q-item>

    <FormGenerator
      ref="formGenerator"
      :collection="collection"
      :stateForm="stateForm"
      :layout="layout"
      :validation="validation"
      :id="id"
    />

    <q-separator inset class="q-my-md" />
    <div class="text-h6">Address</div>

    <FormAdditionalGenerator
      ref="formAddGenerator"
      :collection="'addresses'"
      :stateForm="stateForm"
      :layout="addressLayout"
      :validation="addressValidation"
      :id="formAddID"
    />

    <q-dialog v-model="dialogPassword" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Change Password</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row q-gutter-md q-my-md">
            <div class="col">
              <q-input
                v-model="change.password"
                :readonly="readonly"
                filled :type="isPwd ? 'password' : 'text'"
                label="Password"
                stack-label
                hint="Password"
                :error="v$.change.password.$error"
                >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-gutter-md q-my-md">
            <div class="col">
              <q-input
                v-model="change.password_confirmation"
                :readonly="readonly"
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Retype Password"
                stack-label
                hint="Retype Password"
                :error="v$.change.password_confirmation.$error"
                >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Submit" :disabled="readonly" :loading="loading" @click="submitChangePassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogRole" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">User Roles</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <q-list>
            <q-item tag="label" v-ripple v-for="(item, index) of roles" :key="index">
              <q-item-section avatar>
                <q-toggle color="blue" :disable="readonly" v-model="rolesSelected" :val="item.name" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{item.name}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Submit" :disabled="readonly" :loading="loading"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="popupimage">
      <q-img :src="photo.fullpath" width="50%" contain />
    </q-dialog>

    <q-footer reveal elevated class="bg-white text-black">
      <q-toolbar style="height: 64px">
        <q-btn flat label="Cancel" :to="`/${collection}`" />
        <q-space />
        <!--
        <q-btn icon="close" v-if="form.status=='active'" class="q-mr-md" flat color="negative" label="Deactivate Account" />
        <q-separator v-if="form.status=='active'" vertical inset class="q-mr-md" />
        -->
        <q-btn icon="delete" flat color="negative" label="Delete" @click="confirmDelete(id)" />
        <q-btn icon="edit" :loading="loading" class="q-ml-md bg-primary text-white" color="secondary" label="Edit" :to="`/${collection}/${$route.params.id}/edit`" />
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import FormGenerator from 'components/form/FormGenerator'
import FormAdditionalGenerator from 'components/form/FormAdditionalGenerator'
import { QFile } from 'quasar'

export default {
  components: {
    FormGenerator,
    FormAdditionalGenerator,
    QFile
  },
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  provide () {
    return {
      form: this.form,
      formAdd: this.addressForm
    }
  },
  mounted () {
    const $store = useStore()
    const { loadingbar } = this.$refs
    loadingbar.start()
    this.loading = true

    const params = {
      relationship: ['photo', 'address'],
    }

    $store
    .dispatch(`${this.collection}/detail`, { id: this.id, params })
    .then(response => {
      const { data } = response
      this.user = data
      this.loading = false
      loadingbar.stop()
      const keys = Object.keys(this.form)
      for (const i in keys) {
        const key = keys[i]
        this.form[key] = data[key]
      }
      this.photo = data.photo

      const address = data.address
      this.formAddID = address.id
      const keysAdd = Object.keys(this.addressForm)
      for (const i in keysAdd) {
        const key = keysAdd[i]
        this.addressForm[key] = address[key]
      }
      this.$refs.formGenerator.setFormData(this.form)
      this.$refs.formAddGenerator.setFormData(this.addressForm)
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
    .dispatch(`roles/fetch`)
    .then(response => {
      const { data } = response
      this.roles = data
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
    .dispatch(`${this.collection}/roles`, { id: this.id })
    .then(response => {
      const { data } = response
      this.rolesSelected = data
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
      stateForm: 'show', // create, update, show
      id: this.$route.params.id,
      formAddID: null,
      isPwd: true,
      loading: false,
      dialogPassword: false,
      dialogRole: false,
      roles: [],
      rolesSelected: [],
      user: null,
      change: {
        password: null,
        password_confirmation: null
      },
      avatar: {
        file: null,
        foreign_table: 'users',
        foreign_id: null,
        directory: 'users/profile',
        type: 'image'
      },
      photo: null,
      popupimage: false
    }
  },
  methods: {
    ...mapActions('users', ['changePassword']),
    ...mapActions('files', { upload: 'upcreate' }),
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
    submitChangePassword () {
      this.v$.change.$touch()
      if (!this.v$.change.$error) {
        this.loading = true
        const data = {
          id: this.id,
          data: this.change
        }
        this.changePassword(data).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          })
          .finally(() => {
            this.dialogPassword = false
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
            this.dialogPassword = false
            this.loading = false
        })
      }
    },
    readSrcFile (file) {
      return URL.createObjectURL(file)
    },
    fileSelected (file) {
      if (file) {
        const { loadingbar } = this.$refs
        loadingbar.start()
        const data = this.avatar
        data.foreign_id = this.id
        this.upload({ data }).then((response) => {
          const { data } = response
          this.photo = data
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
        })
      }
    }
  },
  computed: {
    ...mapState({
      validation (state, getters) {
        return getters[`${this.collection}/validation`]
      },
      form (state, getters) {
        return getters[`${this.collection}/form`]
      },
      params (state, getters) {
        return getters[`${this.collection}/params`]
      },
      layout (state, getters) {
        return getters[`${this.collection}/layout`]
      }
    }),
    ...mapState({
      addressValidation (state, getters) {
        return getters[`addresses/validation`]
      },
      addressForm (state, getters) {
        return getters[`addresses/form`]
      },
      addressLayout (state, getters) {
        return getters[`addresses/layout`]
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
  },
  validations () {
    return {
      change: {
        password: { required },
        password_confirmation: { required }
      }
    }
  }
}
</script>
