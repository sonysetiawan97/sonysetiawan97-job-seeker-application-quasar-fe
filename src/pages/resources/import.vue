<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$route.params.collection" icon="home" :to="`/${$route.params.collection}`" />
        <q-breadcrumbs-el label="Import" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <q-card>
      <q-card-section>
        <div class="text-h5">Import</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-md">
          <div class="col">
              <q-input
                @input="val => { file = val[0] }"
                filled
                type="file"
                hint=".csv, .xlsx, .json"
              />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn label="Import" icon="import_export" color="cyan-8" class="flex q-ml-auto" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      file: null,
      files: null
    }
  }
}
</script>
