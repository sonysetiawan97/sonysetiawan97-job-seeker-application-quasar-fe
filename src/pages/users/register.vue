<template>
  <q-page class="flex flex-center">
    <q-card rounded style="width: 600px; padding: 20px">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row q-gutter-xs">
          <div class="col">
            <q-input
              outlined
              v-model.trim="model.first_name"
              type="text"
              label="First Name"
              :error="v$.model.first_name.$error"
              required
              autofocus
            />
          </div>
          <div class="col">
            <q-input
              outlined
              v-model.trim="model.last_name"
              type="text"
              label="Last Name"
              :error="v$.model.last_name.$error"
              required
              autofocus
            />
          </div>
        </div>

        <div class="row q-gutter-xs">
          <div class="col">
            <q-input
              outlined
              v-model.trim="model.username"
              type="text"
              label="User Name"
              :error="v$.model.username.$error"
              required
              autofocus
            />
          </div>
        </div>

        <div class="row q-gutter-xs">
          <div class="col">
            <q-input
              outlined
              v-model.trim="model.email"
              type="email"
              label="Email"
              :error="v$.model.email.$error"
              required
              autofocus
              autocomplete="off"
            />
          </div>
        </div>

        <div class="row q-gutter-xs">
          <div class="col">
            <q-input
              outlined
              v-model="model.password"
              autocomplete="off"
              type="password"
              :label="$t('auth.login.password')"
              :error="v$.model.password.$error"
              required
            />
          </div>
          <div class="col">
            <q-input
              outlined
              v-model="model.password_confirmation"
              autocomplete="off"
              type="password"
              label="Retype Password"
              :error="v$.model.password_confirmation.$error"
              required
            />
          </div>
        </div>

        <div class="row q-gutter-xs">
          <div class="col">
            <q-input
              outlined
              v-model="model.phone"
              type="tel"
              mask="############"
              label="Phone"
              :error="v$.model.phone.$error"
              required
            />
          </div>
          <div class="col">
            <q-input
              outlined
              v-model="model.dob"
              type="date"
              :error="v$.model.dob.$error"
              required
            />
          </div>
        </div>

        <div class="row q-gutter-xs">
          <div class="col">
            <q-input
              outlined
              v-model="model.residence"
              type="textarea"
              label="residence"
              :error="v$.model.residence.$error"
              required
            />
          </div>
        </div>

        <div class="row q-gutter-xs">
          <div class="col">
            <q-select
              square
              filled
              v-model="model.gender"
              :options="genderOptions"
              :error="v$.model.gender.$error"
              emit-value
              map-options
              label="Gender"
            />
          </div>
          <div class="col">
            <q-select
              square
              filled
              v-model="model.religion"
              :options="religionOptions"
              :error="v$.model.religion.$error"
              emit-value
              map-options
              label="Religion"
            />
          </div>
          <div class="col">
            <q-select
              square
              filled
              v-model="model.user_type"
              :options="userTypeOptions"
              :error="v$.model.user_type.$error"
              emit-value
              map-options
              label="User Type"
            />
          </div>
        </div>

        <div class="row q-gutter-xs">
          <div class="col">
            <q-select
              square
              filled
              v-model="model.country_id"
              :options="countryOptions"
              :error="v$.model.country_id.$error"
              emit-value
              map-options
              label="Country"
            />
          </div>
          <div class="col">
            <q-select
              square
              filled
              v-model="model.province_id"
              :options="provinceOptions"
              :error="v$.model.province_id.$error"
              emit-value
              map-options
              label="Province"
            />
          </div>
          <div class="col">
            <q-select
              square
              filled
              v-model="model.city_id"
              :options="cityOptions"
              :error="v$.model.city_id.$error"
              emit-value
              map-options
              label="city"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="secondary"
          class="full-width"
          :loading="loading"
          @click="submit"
        >
          Register
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "Login",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  props: {},
  data: () => {
    return {
      model: {
        email: "",
        password: "",
        password: null,
        password_confirmation: null,
        first_name: null,
        last_name: null,
        phone: null,
        gender: "hidden",
        religion: "hidden",
        user_type: "job_seeker",
        country_id: null,
        province_id: null,
        city_id: null,
      },
      rememberMe: false,
      loading: false,
      countryOptions: [],
      provinceOptions: [],
      cityOptions: [],
    };
  },
  mounted() {
    this.$store.dispatch("countries/fetch", {}).then((response) => {
      const { data } = response;
      data.forEach((entry) => {
        this.countryOptions.push({
          label: entry.name,
          value: entry.id,
        });
      });
    });

    this.$store
      .dispatch("provinces/fetch", {
        params: {
          "id[in]": 11,
        },
      })
      .then((response) => {
        const { data } = response;
        data.forEach((entry) => {
          this.provinceOptions.push({
            label: entry.name,
            value: entry.id,
          });
        });
      });

    this.$store
      .dispatch("cities/fetch", {
        params: {
          province_id: 11,
        },
      })
      .then((response) => {
        const { data } = response;
        data.forEach((entry) => {
          this.cityOptions.push({
            label: entry.name,
            value: entry.id,
          });
        });
      });
  },
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
    genderOptions() {
      return ["male", "female", "hidden"];
    },
    religionOptions() {
      return [
        "christian",
        "catholic",
        "moslem",
        "hindu",
        "buddha",
        "confucianism",
        "hidden",
      ];
    },
    userTypeOptions() {
      return [
        {
          label: "Job Seeker",
          value: "job_seeker",
        },
        {
          label: "Recruiter",
          value: "recruiter",
        },
      ];
    },
  },
  methods: {
    ...mapActions("auth", {
      register: "register",
    }),
    submit() {
      this.v$.$touch();
      if (!this.v$.$error) {
        this.loading = true;
        this.register(this.model)
          .then((response) => {
            this.$q
              .dialog({
                title: "Registered",
                message:
                  "Your registration is successfully.",
                ok: {
                  flat: true,
                },
                persistent: true,
              })
              .onOk(() => {
                this.$router.push(`/login`);
              })
              .finally(() => {
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
            this.loading = false;
          });
      }
    },
  },
  validations() {
    return {
      model: {
        email: { required },
        username: { required },
        password: { required },
        password_confirmation: { required },
        first_name: { required },
        last_name: { required },
        phone: { required },
        dob: { required },
        residence: { required },
        gender: { required },
        religion: { required },
        user_type: { required },
        country_id: { required },
        province_id: { required },
        city_id: { required },
      },
    };
  },
};
</script>
