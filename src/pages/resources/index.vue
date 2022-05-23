<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$t(`${storeCollection}.index.title`)" :to="`/${storeCollection}`" />
        <q-breadcrumbs-el label="Record" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn flat rounded icon="delete" color="negative" label="Trash" :to="`/${storeCollection}/trash`" />
      <q-btn rounded icon="add" color="secondary" class="q-ml-sm" label="New" :to="`/${storeCollection}/create`" />
      <!--
      <q-btn flat round dense icon="more_vert">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list>
            <q-item clickable v-close-popup tabindex="0"  :to="`${storeCollection}/report`">
              <q-item-section avatar>
                <q-avatar icon="bar_chart" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Report</q-item-label>
                <q-item-label caption>Report Records</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>Import &amp; Export</q-item-label>
            <q-item clickable v-close-popup :to="`${storeCollection}/export`">
              <q-item-section avatar>
                <q-avatar icon="cloud_download" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Export</q-item-label>
                <q-item-label caption>Export Records</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="`${storeCollection}/import`">
              <q-item-section avatar>
                <q-avatar icon="cloud_upload" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Import</q-item-label>
                <q-item-label caption>Import Records</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item clickable v-close-popup tabindex="0" :to="`${storeCollection}/trash`" >
              <q-item-section avatar>
                <q-avatar icon="delete" color="negative" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Trash</q-item-label>
                <q-item-label caption>Records Deleted</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      -->
    </q-toolbar>
    <DataTable
      ref="refDatatable"
      :columns="columns"
      :fetch="fetch"
      :destroy="destroy"
      :collection="storeCollection"
      :params="params"
      :stateForm="stateForm"
    />
  </q-page>
</template>

<script>
import DataTable from 'components/resources/DataTable'
import { mapState, mapActions } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    DataTable
  },
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      stateForm: 'entries' // entries, trash
    }
  },
  methods: {
    ...mapActions({
      fetch (dispatch, payload) {
        return dispatch(this.storeCollection + '/fetch', payload)
      },
      destroy (dispatch, payload) {
        return dispatch(this.storeCollection + '/destroy', payload)
      }
    })
  },
  computed: {
    ...mapState({
      columns (state, getters) {
        return getters[`${this.storeCollection}/columns`]
      },
      params (state, getters) {
        return getters[`${this.storeCollection}/params`]
      }
    }),
    storeCollection() {
      const { collection } = this.$route.params
      const storeCollection = this.collection || collection
      return storeCollection
    }
  },
}
</script>
