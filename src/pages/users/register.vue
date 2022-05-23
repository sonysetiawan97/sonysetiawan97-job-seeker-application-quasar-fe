<template>
  <q-page class="flex flex-center">
    <q-card
      rounded
      style="width: 600px; padding:20px"
    >
      <q-card-section>
        <div class="text-h6">
          Register
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row q-gutter-xs">
          <div class="col">
            <q-input
              outlined
              v-model.trim="model.referral_id"
              type="text"
              label="Referral Code"
              :error="v$.model.referral_id.$error"
              required
              autofocus
            />
          </div>
        </div>

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
              v-model.trim="model.email"
              type="email"
              label="Email"
              :error="v$.model.email.$error"
              required
              autofocus
            />
          </div>
        </div>

        <div class="row q-gutter-xs">
          <div class="col">
            <q-input
              outlined
              v-model="model.password"
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
          </div>
        </div>
        <div class="row q-gutter-xs">
          <div class="col">
            <q-radio v-model="model.gender" val="male" label="Male" />
            <q-radio v-model="model.gender" val="female" label="Female" />
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

        <q-btn
          flat
          class="full-width q-mt-lg"
          to="/login"
        >
          Login
        </q-btn>

      </q-card-actions>

    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'Login',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data: () => {
    return {
      model: {
        email: '',
        password: '',
        password: null,
        password_confirmation: null,
        first_name: null,
        last_name: null,
        referral_id: null,
        phone: null,
        gender: 'male',
        role: "agent",
      },
      rememberMe: false,
      loading: false
    }
  },
  mounted() {},
  computed: {
    ...mapGetters('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', {
      register: 'register'
    }),
    submit () {
      this.v$.$touch()
      if (!this.v$.$error) {
        this.loading = true
        this.register(this.model)
        .then((response) => {
          // const { status } = response
          this.$q.dialog({
            title: 'Registered',
            message: 'Your registration is successfully, please see your email for detail information.',
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            this.$router.push(`/login`)
          }).finally(() => {
            this.loading = false
          })
        })
        .catch((error) => {
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
          this.loading = false
        })
      }
    }
  },
  validations () {
    return {
      model: {
        email: { required },
        password: { required },
        password_confirmation: { required },
        first_name: { required },
        last_name: { required },
        referral_id: { required },
        phone: { required },
        gender: { required },
      }
    }
  }
}
</script>
