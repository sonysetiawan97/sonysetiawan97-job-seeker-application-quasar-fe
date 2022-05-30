<template>
  <q-page class="q-pa-md">
    <q-ajax-bar ref="loadingbar" position="top" skip-hijack />

    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Profile" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn
        flat
        icon="lock"
        class="q-ml-sm"
        label="Password"
        @click="dialogPassword = true"
      />
    </q-toolbar>

    <div class="text-h5">User Profile</div>

    <FormGenerator
      ref="formGenerator"
      :collection="collection"
      :stateForm="stateForm"
      :layout="layout"
      :validation="validation"
      :id="id"
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
                filled
                :type="isPwd ? 'password' : 'text'"
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
          <q-btn
            flat
            label="Submit"
            :disabled="readonly"
            :loading="loading"
            @click="submitChangePassword"
          />
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
            <q-item
              tag="label"
              v-ripple
              v-for="(item, index) of roles"
              :key="index"
            >
              <q-item-section avatar>
                <q-toggle
                  color="blue"
                  :disable="readonly"
                  v-model="rolesSelected"
                  :val="item.name"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Submit" :disabled="readonly" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer reveal elevated class="bg-white text-black">
      <q-toolbar style="height: 64px">
        <q-space />
        <q-btn
          icon="check"
          :loading="loading"
          class="q-ml-md bg-primary text-white"
          color="secondary"
          label="confirm"
          @click="updateProfile()"
        />
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FormGenerator from "components/form/FormGenerator";

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
  setup() {
    const $store = useStore();
    const user = $store.state.auth.user;
    const id = user.user.id;
    return {
      id,
      user,
      v$: useVuelidate(),
    };
  },
  provide() {
    return {
      form: this.form,
    };
  },
  mounted() {
    const $store = useStore();
    const { loadingbar } = this.$refs;
    loadingbar.start();
    this.loading = true;

    const params = {
      relationship: "cv",
    };

    $store
      .dispatch(`${this.collection}/detail`, { id: this.id, params })
      .then((response) => {
        const { data } = response;
        this.user = data;
        $store.commit("auth/setUser", data);

        this.loading = false;
        loadingbar.stop();
        const keys = Object.keys(this.form);
        console.log(data);
        for (const i in keys) {
          const key = keys[i];
          this.form[key] = data[key];
        }

        console.log(this.form)

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

    $store
      .dispatch(`roles/fetch`)
      .then((response) => {
        const { data } = response;
        this.roles = data;
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

    $store
      .dispatch(`${this.collection}/roles`, { id: this.id })
      .then((response) => {
        const { data } = response;
        this.rolesSelected = data;
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
    return {
      stateForm: "update", // create, update, show
      isPwd: true,
      loading: false,
      dialogPassword: false,
      dialogRole: false,
      roles: [],
      rolesSelected: [],
      change: {
        password: null,
        password_confirmation: null,
      },
    };
  },
  methods: {
    ...mapActions("users", ["changePassword"]),
    ...mapActions("files", { upload: "upcreate" }),
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
            .dispatch(`${this.collection}/destroy`, {
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
                  this.$router.push(`/${this.collection}`);
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
    submitChangePassword() {
      this.v$.change.$touch();
      if (!this.v$.change.$error) {
        this.loading = true;
        const data = {
          id: this.id,
          data: this.change,
        };
        this.changePassword(data)
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
              .finally(() => {
                this.dialogPassword = false;
                this.loading = false;
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
          })
          .finally(() => {
            this.dialogPassword = false;
            this.loading = false;
          });
      }
    },
    updateProfile() {
      const params = { ...this.form };
      const headers = { "Content-Type": "multipart/form-data" };
      this.$store
        .dispatch(`users/updateProfile`, {
          data: params,
          headers: headers,
        })
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
    ...mapState({
      validation(state, getters) {
        return getters[`${this.collection}/validation`];
      },
      form(state, getters) {
        return getters[`${this.collection}/form`];
      },
      params(state, getters) {
        return getters[`${this.collection}/params`];
      },
      layout(state, getters) {
        return getters[`${this.collection}/layout`];
      },
    }),
    ...mapState({
      userDocumentsValidation(state, getters) {
        return getters[`user_documents/validation`];
      },
      userDocumentsForm(state, getters) {
        return getters[`user_documents/form`];
      },
      userDocumentsLayout(state, getters) {
        return getters[`user_documents/layout`];
      },
    }),
    readonly() {
      return this.stateForm === "show";
    },
    collectionName() {
      const words = this.collection.split("_");
      const titles = [];
      for (const key in words) {
        const word = words[key];
        titles.push(word.charAt(0).toUpperCase() + word.slice(1));
      }
      return titles.join(" ");
    },
    titlePage() {
      let title = "";
      if (this.stateForm === "create") title = "Create New";
      if (this.stateForm === "show") title = "Detail";
      return title;
    },
  },
  validations() {
    return {
      change: {
        password: { required },
        password_confirmation: { required },
      },
    };
  },
};
</script>
