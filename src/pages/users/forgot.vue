<template>
  <q-page class="flex flex-center">
    <q-card
      rounded
      style="width: 460px; padding:20px"
    >
      <q-card-section>
        <div class="text-h6">
          Forgot Password
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-input
          outlined
          id="email"
          v-model.trim="model.email"
          type="email"
          :label="$t('auth.login.email')"
          :error="v$.model.email.$error"
          required
          autofocus
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="secondary"
          class="full-width"
          :loading="loading"
          @click="submit"
        >
          Send Password Reset Link
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
        email: ''
      },
      loading: false
    }
  },
  mounted() {},
  computed: {
    ...mapGetters('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', {
      forgotPassword: 'forgotPassword'
    }),
    submit () {
      this.v$.$touch()
      if (!this.v$.$error) {
        this.loading = true
        this.forgotPassword(this.model)
        .then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: 'Email sent',
            message: 'We have emailed your password reset link',
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
        email: {
          required
        }
      }
    }
  }
}
</script>
