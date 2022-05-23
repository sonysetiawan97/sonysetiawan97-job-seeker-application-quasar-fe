<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$route.params.collection" icon="home" :to="`/${$route.params.collection}`" />
        <q-breadcrumbs-el label="Export" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md shadow-1">
      <div class="text-h5">Export {{$route.params.collection}}</div>
      <div class="row q-gutter-md q-my-md">
        <div class="col">
          <q-select
            filled
            clearable
            use-input
            stack-label
            input-debounce="0"
            label="Field"
            v-model="field"
            :options="fieldOptions"
            @filter="filterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            clearable
            use-input
            stack-label
            input-debounce="0"
            label="Operator"
            v-model="operator"
            :options="operatorOptions"
            @filter="filterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-input filled bottom-slots v-model="text" label="Value" stack-label maxlength="100" clearable />
        </div>
      </div>

      <div class="row q-mt-sm">
        <div class="col">
          <q-btn icon="add" flat label="Filter" />
        </div>
      </div>
      <div class="q-mt-md q-mb-md row justify-between">
        <div class="justify-start">
          <div class="q-gutter-sm">
            <q-radio v-model="exportAs" val="xlsx" label="XLSX" />
            <q-radio v-model="exportAs" val="csv" label="CSV" />
            <q-radio v-model="exportAs" val="json" label="JSON" />
            <q-radio v-model="exportAs" val="xml" label="XML" />
          </div>
        </div>
        <div class="justify-end">
          <q-btn flat label="Cancel" :to="`/${$route.params.collection}`" />
          <q-btn icon="cloud_upload" class="q-ml-md bg-primary text-white" color="secondary" label="Export" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
const fieldOptions = [
  'id', 'name', 'created_at', 'updated_at', 'deleted_at'
]
const operatorOptions = [
  '=', '>', '>=', '<', '<=', '!=', 'LIKE', 'LIKE %...%', 'NOT LIKE', 'IN (...)', 'NOT IN (...)', 'BETWEEN', 'NOT BETWEEN', 'IS NULL', 'IS NOT NULL'
]

export default {
  data () {
    return {
      field: null,
      operator: null,
      fieldOptions,
      operatorOptions,
      exportAs: null
    }
  },

  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.fieldOptions = fieldOptions

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.fieldOptions = fieldOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterOperator (val, update) {
      if (val === '') {
        update(() => {
          this.operatorOptions = operatorOptions

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.operatorOptions = operatorOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
