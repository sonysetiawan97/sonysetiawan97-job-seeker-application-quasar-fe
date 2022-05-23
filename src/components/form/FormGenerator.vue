<template>
<div class="q-mt-md">
  <q-form ref="formComponent" @submit.prevent>
  <div class="row q-gutter-md" v-for="(fields, index) in layout" :key="`row-${index}`">
    <div :class="field.col" v-for="field in fields" :key="`form-${field.name}`">

      <div v-if="['QSelect'].indexOf(field.type) >= 0">
        <component
          v-bind:is="field.type"
          outlined
          :class="`form-${field.name}`"
          v-model="form[field.name]"
          :readonly="readonly"
          :label="field.label"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :hint="!v$.form[field.name].required? '-- optional': ''"
          :error="v$.form[field.name].$error"
          clearable
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                Data not found
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:after v-if="field.referenceManager">
            <q-item>
              <q-item-section>
                <q-btn
                  style="margin-left: -20px"
                  icon="add"
                  flat
                  round
                  color="secondary"
                  @click="opendialog(field)"
                >
                  <q-tooltip :delay="1000" anchor="top middle" self="bottom middle" :offset="[10, 10]">Add new data</q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </template>

        </component>
      </div>

      <div v-else-if="['QRadio'].indexOf(field.type) >= 0" class="q-px-sm q-pt-sm">
        {{field.label}}:
        <component
          :class="`form-${field.name}`"
          v-for="option in field.props.options"
          :key="`form-radio-${option.value}`"
          v-bind:is="'QRadio'"
          v-model="form[field.name]"
          :readonly="readonly"
          :label="option.label"
          :val="option.value"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :hint="!v$.form[field.name].required? '-- optional': ''"
          :error="v$.form[field.name].$error"
          clearable
        />
      </div>

      <div v-else-if="['QFile'].indexOf(field.type) >= 0">
        <div :class="`form-${field.name}`"></div>
        <img
          v-if="['show', 'update', 'trashed'].indexOf(stateForm) >= 0 && field.name"
          :src="form[field.imgfield]"
          spinner-color="white"
          style="width: auto; max-width: 600px"
          class="q-mb-md"
          onerror="this.style.display='none'"
        />

        <q-file
          v-if="!readonly"
          v-bind:is="field.type"
          outlined
          v-model="form[field.name]"
          :readonly="readonly"
          :label="field.label"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :hint="!v$.form[field.name].required? '-- optional': ''"
          :error="v$.form[field.name].$error"
          clearable
        >
          <template v-slot:file="{ file }">
            <q-chip
              class="full-width q-my-md"
              square
            >
              <q-avatar>
                <q-icon :name="field.icon||'insert_drive_file'" />
              </q-avatar>

              <div class="ellipsis relative-position">
                {{ file.name }}
              </div>

              <q-tooltip>
                {{ file.name }}
              </q-tooltip>
            </q-chip>
            <q-img
              v-if="file.type.indexOf('image/') === 0"
              :src="readSrcFile(file)"
              spinner-color="white"
              style="height: 200px; max-width: 360px"
              class="rounded-borders"
              :ratio="50/10"
            />
          </template>
          <template v-slot:append>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>

      <div v-else-if="['QEditor'].indexOf(field.type) >= 0">
        <div class="text-subtitle">{{field.label}}</div>
        <component
          :class="`form-${field.name}`"
          v-bind:is="field.type"
          v-model="form[field.name]"
          :hint="!v$.form[field.name].required? '-- optional': ''"
          class="q-mb-md"
        />
        <div class="text-weight-light" v-if="field.props.hint">{{field.props.hint}}</div>
      </div>

      <div v-else-if="['QToggle'].indexOf(field.type) >= 0">
        <q-toggle
          :class="`form-${field.name}`"
          :label="field.label"
          v-model="form[field.name]"
          :readonly="readonly"
          stack-label
          v-bind="field.props"
          v-on="field.events"
        />
      </div>

      <component
        v-else
        v-bind:is="'QInput'"
        :class="`form-${field.name}`"
        outlined
        v-model="form[field.name]"
        :readonly="readonly"
        :label="field.label"
        stack-label
        :hint="!v$.form[field.name].required? '-- optional': ''"
        :error="v$.form[field.name].$error"
        v-bind="field.props"
        v-on="field.events"
        clearable
      />

    </div>
  </div>
  </q-form>

  <q-dialog v-model="dialogForms" >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Create New {{referenceCollectionName}}</div>
      </q-card-section>

      <q-card-section>
        <FormGenerator
          :collection="dialogReference"
          :stateForm="'create'"
          :onCreated="dialogFormsonCreated"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import {
  QInput,
  QSelect,
  QFile,
  QRadio,
  QEditor,
  QToggle
} from 'quasar'

export default {
  name: 'FormGenerator',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  props: {
    collection: {
      type: String,
      default: () => ''
    },
    stateForm: {
      type: String,
      default: () => 'entries'
    },
    layout: {
      type: Object,
      default: null
    },
    validation: {
      type: Object,
      default: null
    },
    id: {
      type: [String, Number],
      default: null
    }
  },
  components: {
    QInput,
    QSelect,
    QFile,
    //   QField,
    QRadio,
    QEditor,
    //   QCheckbox,
    QToggle,
    //   QBtnToggle,
    //   QOptionGroup,
    //   QSlider,
    //   QRange,
    //   QTime,
    //   QDate,
  },
  inject: ['form'],
  data () {
    return {
      submitAndCreate: false,
      isPwd: true,
      loading: false,
      readonly: this.stateForm === 'show',
      dialogForms: false,
      dialogReference: ''
    }
  },
  created () {
    for (const fields of this.layout) {
      for (const field of fields) {
        const { type, reference, events } = field
        if (type === 'QSelect' && reference) {
          events.filter = (search, update, abort) => {
            let params = {
              search
            }

            if (field.params) {
              if(Array.isArray(field.params)) {
                for (const key of field.params) {
                  params[key] = this.form[key]
                }
              } else {
                params = { ...params, ...field.params}
              }
            }

            this.$store.dispatch(`${reference}/fetch`, { params }).then(response => {
              const { data } = response
              const { props } = field
              update(() => {
                props.options = data
                if (field.updateValues) {
                  for (const key of field.updateValues) {
                    this.form[key] = null
                  }
                }
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
          }
        }
      }
    }
  },
  beforeUnmount () {
    this.$store.commit(`${this.collection}/reset`)
  },
  mounted () { },
  methods: {
    setFormData(data) {
      this.form = data
      this.setDefaultValueRefference()
    },
    resetForm() {
      this.$refs.formComponent.reset()
      this.v$.$reset()
    },

    validateError () {
      this.v$.$touch()
      return this.v$.$error
    },

    getValidation () {
      return this.v$
    },

    readSrcFile (file) {
      return URL.createObjectURL(file)
    },
    opendialog (field) {
      this.dialogForms = true
      this.dialogReference = field.reference
    },
    dialogFormsonCreated () {
      this.dialogForms = false
    },
    setDefaultValueRefference() {
      for (const fields of this.layout) {
        for (const field of fields) {
          const { type, reference } = field
          if (type === 'QSelect' && reference) {
            let params = {}

            if (field.params) {
              if(Array.isArray(field.params)) {
                for (const key of field.params) {
                  params[key] = this.form[key]
                }
              } else {
                params = { ...params, ...field.params}
              }
            }

            this.$store.dispatch(`${reference}/detail`, { id: this.form[field['name']], params }).then(response => {
              const { data } = response
              const { props } = field
              props.options = [ data ]
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
          }
        }
      }
    }
  },
  computed: {
    referenceCollectionName () {
      const words = this.dialogReference.split('_')
      const titles = []
      for (const key in words) {
        const word = words[key]
        titles.push(word.charAt(0).toUpperCase() + word.slice(1))
      }
      return titles.join(' ')
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
    rulesPassword () {
      return this.stateForm === 'create'
        ? { required }
        : { }
    }
  },
  validations () {
    return {
      form: this.validation
    }
  }
}
</script>
