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

    <div v-if="isJobSeeker">
      <q-separator inset class="q-my-md" />
      <q-toolbar class="q-pb-md q-px-none">
        <div class="col text-h6">Experiences</div>

        <q-btn
          flat
          icon="add"
          class="q-ml-sm"
          label="Add"
          @click="openDialogExperience(null, isJobSeeker)"
        />
      </q-toolbar>
      <div class="q-pa-md">
        <q-list bordered separator>
          <q-item v-ripple v-if="experiences.length == 0">
            <q-item-section>
              <q-item-label class="text-h6 text-center">
                No Experiences</q-item-label
              ></q-item-section
            >
          </q-item>
          <q-item
            clickable
            v-ripple
            v-for="(item, key) in experiences"
            :key="`index-experiences-${key}`"
            @click="openDialogExperience(item.id, isJobSeeker)"
          >
            <q-item-section>
              <q-item-label class="text-bold q-mb-md">{{
                item.title
              }}</q-item-label>
              <q-item-label
                >Job Description: {{ item.job_description }}</q-item-label
              >
              <q-item-label>Location: {{ item.location }}</q-item-label>
              <q-item-label class="q-mb-md"
                >Company: {{ item.company_name }}</q-item-label
              >
              <q-item-label caption
                >{{ item.start_date }} -
                {{ item.end_date ? item.end_date : "present" }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <q-separator inset class="q-my-md" />
      <q-toolbar class="q-pb-md q-px-none">
        <div class="col text-h6">Skills</div>

        <q-btn
          flat
          icon="add"
          class="q-ml-sm"
          label="Add"
          @click="dialogSkills = true"
        />
      </q-toolbar>

      <div class="q-pa-md">
        <q-list bordered separator>
          <q-item v-ripple v-if="skills.length == 0">
            <q-item-section>
              <q-item-label class="text-h6 text-center">
                No Skills</q-item-label
              ></q-item-section
            >
          </q-item>
          <q-item
            v-ripple
            v-for="(item, key) in skills"
            :key="`index-skills-${key}`"
          >
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <q-dialog v-model="dialogSkills" persistent>
      <q-card style="min-width: 75vw">
        <q-card-section>
          <div class="text-h6">Skills</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row q-gutter-md q-my-md">
            <div class="col">
              <q-select
                outlined
                v-model="selectedPemission"
                :readonly="readonly"
                label="Skills"
                stack-label
                use-input
                map-options
                option-value="id"
                option-label="name"
                clearable
                @filter="onFilterSelect"
                :options="skillOptions"
                @update:model-value="onSkillSelected"
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
              <q-chip
                removable
                color="primary"
                @remove="removeSkillsAt(index)"
                text-color="white"
                v-for="(item, index) of skillsList"
                :key="index"
              >
                {{ item.name }}
              </q-chip>
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
            @click="updateSkills"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogExperience" persistent>
      <q-card style="min-width: 75vw">
        <q-card-section>
          <div class="text-h6">Experiences</div>
        </q-card-section>
        <q-card-section>
          <FormAdditionalGenerator
            ref="formAddGenerator"
            :collection="'user_experiences'"
            :stateForm="stateForm"
            :layout="userExperiencesLayout"
            :validation="userExperiencesValidation"
          />
        </q-card-section>
        <q-card-section class="q-mb-lg">
          <q-btn
            icon="check"
            class="bg-primary text-white q-ml-sm"
            color="secondary float-right"
            label="Submit"
            @click="saveExperience()"
          />
          <q-btn
            icon="cancel"
            class="bg-red text-white"
            color="secondary float-right"
            label="cancel"
            @click="closeDialogExperience"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

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
import { mapState, mapActions } from "vuex";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FormGenerator from "components/form/FormGenerator";
import FormAdditionalGenerator from "components/form/FormAdditionalGenerator";

export default {
  components: {
    FormGenerator,
    FormAdditionalGenerator,
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
    let isJobSeeker = false;
    const { roles } = user.user;
    roles.map((entry) => {
      if (entry.name == "job_seeker") {
        isJobSeeker = true;
      }
    });
    return {
      id,
      user,
      isJobSeeker,
      v$: useVuelidate(),
    };
  },
  provide() {
    return {
      form: this.form,
      formAdd: this.userExperiencesForm,
    };
  },
  mounted() {
    const $store = useStore();
    const { loadingbar } = this.$refs;
    loadingbar.start();
    this.loading = true;

    let params = {};

    if (this.isJobSeeker) {
      params["relationship"] = ["cv", "experiences", "skills"];
    }

    $store
      .dispatch(`${this.collection}/detail`, { id: this.id, params })
      .then((response) => {
        const { data } = response;
        this.user = data;
        $store.commit("auth/setUser", data);

        this.loading = false;
        loadingbar.stop();
        const keys = Object.keys(this.form);
        for (const i in keys) {
          const key = keys[i];
          this.form[key] = data[key];
        }

        const { experiences } = data;
        if (experiences) {
          this.experiences = experiences;
        }

        const { skills } = data;
        if (skills) {
          this.skills = skills;
        }

        this.$refs.formGenerator.setFormData(this.form);
        this.baseFormExperiences = { ...this.userExperiencesForm };
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
      skillOptions: [],
      dialogPassword: false,
      dialogExperience: false,
      dialogSkills: false,
      dialogRole: false,
      roles: [],
      experiences: [],
      skills: [],
      skillsList: [],
      baseFormExperiences: {},
      rolesSelected: [],
      userExperiencesCollection: "user_experiences",
      skillsCollection: "skills",
      userSkillCollection: "user_skill",
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
    async openDialogExperience(id = null, isJobSeeker = false) {
      if (!isJobSeeker) {
        return;
      }

      this.dialogExperience = true;
      await new Promise((r) => setTimeout(r, 200));

      if (id) {
        const params = {};
        this.$store
          .dispatch(`${this.userExperiencesCollection}/detail`, {
            id: id,
            params: params,
          })
          .then((response) => {
            const { data } = response;
            const keys = Object.keys(this.userExperiencesForm);
            for (const i in keys) {
              const key = keys[i];
              this.userExperiencesForm[key] = data[key];
            }
            this.fillDialogExperience(this.userExperiencesForm);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.fillDialogExperience(this.baseFormExperiences);
      }
    },
    fillDialogExperience(form) {
      this.$refs.formAddGenerator.setFormData(form);
    },
    closeDialogExperience() {
      this.dialogExperience = false;
      this.fillDialogExperience(this.baseFormExperiences);
    },
    saveExperience() {
      let params = {};
      const headers = { "Content-Type": "multipart/form-data" };
      const body = {
        ...this.$refs.formAddGenerator.formAdd,
        user_id: this.id,
      };
      const { id } = body;
      let action = "create";
      params["headers"] = headers;
      params["data"] = body;
      if (id) {
        action = "update";
        params["id"] = id;
      }
      this.$store
        .dispatch(`${this.userExperiencesCollection}/${action}`, { ...params })
        .then((response) => {
          const { message } = response;
          if (message) {
            this.$q.notify({
              message: message,
              color: "green",
              position: "top",
            });
          }
          this.$store
            .dispatch(`${this.userExperiencesCollection}/fetch`, {
              params: { user_id: this.id },
            })
            .then((response) => {
              const { data } = response;
              this.experiences = data;
            });
          this.closeDialogExperience();
        })
        .catch((error) => {
          console.error(error);
          const { response } = error;
          if (response) {
            const { data } = error.response;
            if (data) {
              const { message } = data;
              this.$q.notify({
                message: message,
                color: "red",
                position: "top",
              });
            }
          }
        });
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
    onFilterSelect(search, update, abort) {
      const params = {
        search,
      };
      this.$store
        .dispatch(`${this.skillsCollection}/fetch`, { params })
        .then((response) => {
          const { data } = response;
          update(() => {
            this.skillOptions = data;
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
        });
    },

    onSkillSelected(value) {
      this.skillsList.push(value);
    },

    removeSkillsAt(index) {
      this.skillsList = this.skillsList.slice(0, index);
    },

    updateSkills() {
      this.loading = true;
      let skillPayload = [];
      this.skillsList.map((entry) => {
        skillPayload.push(entry.id);
      });
      const payload = {
        data: {
          skills: skillPayload,
        },
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$store
        .dispatch(`${this.userSkillCollection}/update_skill`, payload)
        .then((response) => {
          const { data, status, message } = response;
          this.skills = data;
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true,
            },
            persistent: true,
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
          this.loading = false;
          this.dialogSkills = false;
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
      userExperiencesValidation(state, getters) {
        return getters[`user_experiences/validation`];
      },
      userExperiencesForm(state, getters) {
        return getters["user_experiences/form"];
      },
      userExperiencesLayout(state, getters) {
        return getters[`user_experiences/layout`];
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
