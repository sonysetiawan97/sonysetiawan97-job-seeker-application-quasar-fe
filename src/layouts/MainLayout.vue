<template>
  <q-layout view="hHh lpR lFr" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-ml-md"
        />

        <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
          <img src="~/assets/startapp.png" width="56" />
          <span class="q-ml-sm">Startapp</span>
        </q-toolbar-title>

        <q-space />

        <q-input class="GPL__toolbar-input" dense standout="bg-white text-dark" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="notifications" to="/notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>

          <q-btn round dense flat to="/profile">
            <q-avatar size="26px" icon="face">
            </q-avatar>
            <q-tooltip>Your Profile</q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="more_vert">
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-list>
                <q-item clickable v-close-popup to="/profile" >
                  <q-item-section avatar>
                    <q-avatar icon="face" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Profile</q-item-label>
                    <q-item-label caption>User Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset spaced />
                <q-item clickable v-close-popup tabindex="0" @click="logout">
                  <q-item-section avatar>
                    <q-avatar icon="exit_to_app" color="negative" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Log Out</q-item-label>
                    <q-item-label caption>Exit to app</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">

          <q-item class="GNL__drawer-item" v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <div v-can="'nav.aside.marketing'">
          <q-separator inset class="q-my-sm" />
          <q-item-label header>Marketing &amp; Contents</q-item-label>
          <q-item v-ripple v-can="'banners.read.index'"  clickable to="/banners">
            <q-item-section avatar>
              <q-icon name="ad_units" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Banners</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple v-can="'contents.read.faq'" clickable to="/faq">
            <q-item-section avatar>
              <q-icon name="help_center" />
            </q-item-section>
            <q-item-section>
              <q-item-label>F.A.Q</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple v-can="'contents.read.terms'" clickable to="/terms">
            <q-item-section avatar>
              <q-icon name="gavel" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Terms &amp; Condition</q-item-label>
            </q-item-section>
          </q-item>
          </div>

          <div v-can="'nav.aside.notifications'">
          <q-separator inset class="q-my-sm" />
          <q-item-label header>Notifications</q-item-label>

          <q-item v-ripple v-can="'notifications.read.index'" clickable to="/notifications">
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Notification</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple v-can="'notification_templates.read.index'" clickable to="/notificationTemplates">
            <q-item-section avatar>
              <q-icon name="feedback" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Notification Template</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple v-can="'format_messages.read.index'" clickable to="/notificationFormats">
            <q-item-section avatar>
              <q-icon name="warning" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Notification Format</q-item-label>
            </q-item-section>
          </q-item>
          </div>

          <q-separator inset class="q-my-sm" />
          <q-item-label header>Administrator</q-item-label>

          <q-expansion-item
            icon="people"
            label="Users Management"
            class="q-my-sm"
          >
            <q-item clickable v-ripple :inset-level="1" to="/users">
              <q-item-section>
                Users
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple :inset-level="1" to="/roles">
              <q-item-section>
                Roles
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple :inset-level="1" to="/permissions">
              <q-item-section>
                Permissions
              </q-item-section>
            </q-item>

          </q-expansion-item>

          <q-expansion-item
            icon="storage"
            label="Data Master"
            class="q-my-sm"
          >
            <q-item clickable v-ripple :inset-level="1" to="/contacts">
              <q-item-section>
                Contacts
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :inset-level="1" to="/addresses">
              <q-item-section>
                Addresses
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :inset-level="1" to="/files">
              <q-item-section>
                Files &amp; Media Manager
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            icon="flag"
            label="Countries"
            class="q-my-sm"
          >
            <q-item clickable v-ripple :inset-level="1" to="/countries">
              <q-item-section>
                Countries
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :inset-level="1" to="/provinces">
              <q-item-section>
                Provinces
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :inset-level="1" to="/cities">
              <q-item-section>
                Cities
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            icon="settings"
            label="Settings"
            class="q-my-sm"
          >
            <q-item clickable v-ripple :inset-level="1" to="/sysparam">
              <q-item-section>
                Sysparams
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: true,
      search: '',
      storage: 0.26,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'auth/user',
      loggedIn: 'auth/loggedIn'
    }),
    name () {
      return this.profile.first_name + ' ' + this.profile.last_name
    },
    username () {
      return this.profile.username
    }
  },
  methods: {
    ...mapMutations('auth', ['loggedOut']),
    logout () {
      this.$q
      .dialog({
        title: 'Logout',
        message: 'Are you sure to logout?',
        ok: {
          label: 'Logout',
          color: 'negative',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      })
      .onOk(() => {
        this.loggedOut()
        this.$q.localStorage.clear()
        this.$q.sessionStorage.clear()
        this.$q.cookies.remove('authorization_token')
        this.$q.notify('You\'re logged out')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 35%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
