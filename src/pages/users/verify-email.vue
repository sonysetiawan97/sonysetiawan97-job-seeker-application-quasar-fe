<template>
  <q-page class="flex flex-center">
    <q-card
      rounded
      style="width: 460px; padding:20px"
    >
      <q-card-section>
        <div class="text-h6">
          Verify Email
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-linear-progress indeterminate v-show="loading" />
      </q-card-section>
      <q-card-actions v-show="!loading">
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
      loading: true
    }
  },
  mounted() {
    const { id, hash } = this.$route.params
    const params = this.$route.query
    params.hash = hash

    this.verifyEmail({id, params})
    .then((response) => {
      const { status, message } = response
      console.log(response)
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
  },
  computed: {
    ...mapGetters('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', {
      verifyEmail: 'verifyEmail'
    })
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
