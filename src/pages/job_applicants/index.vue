<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el
          :label="$t(`${storeCollection}.index.title`)"
          :to="`/${storeCollection}`"
        />
        <q-breadcrumbs-el label="Record" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <DataTable
      ref="refDatatable"
      :columns="columns"
      :fetch="fetch"
      :destroy="destroy"
      :collection="storeCollection"
      :params="params"
      :stateForm="stateForm"
      :rowClickable="false"
      :rowOptionsClickable="false"
      :eventsClick="this.clicked"
    >
    </DataTable>
  </q-page>
</template>

<script>
import DataTable from "components/resources/DataTable";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    DataTable,
  },
  props: {
    collection: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      stateForm: "entries", // entries, trash
      statusApplicant: "review",
    };
  },
  methods: {
    ...mapActions({
      fetch(dispatch, payload) {
        return dispatch(this.storeCollection + "/fetch", payload);
      },
      destroy(dispatch, payload) {
        return dispatch(this.storeCollection + "/destroy", payload);
      },
    }),
    clicked() {
      return true;
    },
  },
  computed: {
    ...mapState({
      columns(state, getters) {
        return getters[`${this.storeCollection}/columns`];
      },
      params(state, getters) {
        return getters[`${this.storeCollection}/params`];
      },
    }),
    storeCollection() {
      const { collection } = this.$route.params;
      const storeCollection = this.collection || collection;
      return storeCollection;
    },
  },
};
</script>
