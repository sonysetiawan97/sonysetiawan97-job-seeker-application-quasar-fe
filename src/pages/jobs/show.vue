<template>
  <q-page class="q-pa-md">
    <q-ajax-bar ref="loadingbar" position="top" skip-hijack />
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el
          :label="$t(`${storeCollection}.index.title`)"
          :to="`/${storeCollection}`"
        />
        <q-breadcrumbs-el label="Detail" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <div class="text-h5">{{ $t(`${storeCollection}.show.title`) }}</div>

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
        <q-btn flat label="Back" :to="`/${storeCollection}`" />
        <q-space />
        <q-btn
          icon="delete"
          flat
          color="negative"
          label="Delete"
          @click="confirmDelete(id)"
          v-can="`${storeCollection}.destroy.index`"
        />
        <q-btn
          icon="edit"
          :loading="loading"
          class="q-ml-md bg-primary text-white"
          color="secondary"
          label="Edit"
          :to="`/${storeCollection}/${$route.params.id}/edit`"
          v-can="`${storeCollection}.update.index`"
        />
        <q-btn
          icon="approval"
          :loading="loading"
          class="q-ml-md bg-primary text-white"
          color="secondary"
          label="Apply"
          @click="apply"
          v-if="allowApply"
        />
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapGetters, useStore } from "vuex";
import FormGenerator from "components/form/FormGenerator";
import { useRoute } from "vue-router";

export default {
  components: {
    FormGenerator,
  },
  props: {
    collection: {
      type: String,
      default: null,
    },
  },
  setup(props) {},
  provide() {
    return {
      form: this.form,
    };
  },
  async mounted() {
    await new Promise((r) => setTimeout(r, 200));
    const { loadingbar } = this.$refs;
    loadingbar.start();
    this.loading = true;

    const auth = this.$store.state.auth.user;
    const { user } = auth;

    if (!user) {
      return;
    }

    const { roles } = user;

    roles.map((entry) => {
      const { name } = entry;
      if (name) {
        this.myRoles.push(name);
      } else {
        this.myRoles.push(entry);
      }
    });

    if (this.myRoles.includes("job_seeker")) {
      this.allowApply = true;
    }

    const params = this.params;

    this.$store
      .dispatch(`${this.storeCollection}/detail`, { id: this.id, params })
      .then((response) => {
        const { data } = response;
        this.loading = false;
        loadingbar.stop();
        const keys = Object.keys(this.form);
        for (const i in keys) {
          const key = keys[i];
          this.form[key] = data[key];
        }
        this.$refs.formGenerator.setFormData(this.form);
      })
      .catch((error) => {
        this.loading = false;
        if (!error.response) return;
        const { data } = error.response;
        this.$q.dialog({
          title: `${data.status}`,
          message: `${data.message}`,
          ok: {
            flat: true,
          },
          persistent: true,
        });
      });
  },
  data() {
    const route = useRoute();
    const { id } = route.params;
    return {
      stateForm: "show", // create, update, show
      id,
      isPwd: true,
      loading: false,
      myRoles: [],
      allowApply: false,
    };
  },
  methods: {
    confirmDelete(id) {
      this.$q
        .dialog({
          title: "Delete",
          message: "Are you sure to delete?",
          ok: {
            label: "Delete",
            color: "negative",
            flat: true,
          },
          cancel: {
            label: "Cancel",
            color: "white",
            textColor: "black",
            flat: true,
          },
          persistent: true,
        })
        .onOk(() => {
          this.$store
            .dispatch(`${this.storeCollection}/destroy`, {
              type: id,
              params: {},
            })
            .then((response) => {
              const { status, message } = response;
              this.$q
                .dialog({
                  title: `${status}`,
                  message: `${message}`,
                  ok: {
                    flat: true,
                  },
                  persistent: true,
                })
                .onOk(() => {
                  this.$router.push(`/${this.storeCollection}`);
                });
            })
            .catch((error) => {
              if (error.response) {
                const { data } = error.response;
                this.$q.dialog({
                  title: `${data.status}`,
                  message: `${data.message}`,
                  ok: {
                    flat: true,
                  },
                  persistent: true,
                });
              }
              this.loading = false;
            });
        });
    },

    apply() {
      const { id, storeCollection } = this;
      if (!id) {
        this.$q.notify({
          message: `Invalid id or user id`,
          color: "red",
          position: "top",
        });
      }
      const params = {
        job_id: id,
      };

      this.$store
        .dispatch(`${storeCollection}/applyJobs`, { params })
        .then((response) => {
          const { message } = response;
          if (message) {
            this.$q.notify({
              message: message,
              color: "green",
              position: "top",
            });
          }
        })
        .catch((err) => {
          const { data } = err.response;
          if (data) {
            const { message } = data;
            this.$q.notify({
              message: message,
              color: "red",
              position: "top",
            });
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      profile: "auth/user",
    }),
    ...mapState({
      validation(state, getters) {
        return getters[`${this.storeCollection}/validation`];
      },
      form(state, getters) {
        return getters[`${this.storeCollection}/form`];
      },
      layout(state, getters) {
        return getters[`${this.storeCollection}/layout`];
      },
      params(state, getters) {
        return getters[`${this.storeCollection}/params`];
      },
    }),
    readonly() {
      return this.stateForm === "show";
    },
    storeCollection() {
      const route = useRoute();
      const { collection } = route.params;
      const storeCollection = this.collection || collection;
      return storeCollection;
    },
  },
};
</script>
