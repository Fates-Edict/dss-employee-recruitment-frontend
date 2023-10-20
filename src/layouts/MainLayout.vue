<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">
    <q-header elevated>
      <q-toolbar class="bg-white text-black">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title style="font-size: 15px">{{ $Helper.getAppName() }}</q-toolbar-title>

        <q-btn no-caps size="sm" class="q-mr-sm" color="primary" unelevated :label="$Helper.getCurrentLanguage() === 'EN' ? 'English' : 'Indonesia'">
          <q-avatar size="18px" class="q-ml-sm">
            <img v-if="$Helper.getCurrentLanguage() === 'EN'" src="~assets/usa-icon.webp">
            <img v-else src="~assets/indonesia-icon.webp">
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-for="val, i in languages" :key="i" @click="changeLanguage(val)">
                <q-item-section>{{ val.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="250">
      <q-list style="font-size: 12px">
        <SidebarList v-for="val, i in menus" :key="i" :item="val" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SidebarList from 'components/SidebarList.vue'
export default {
  name: 'MainLayout',
  components: {
    SidebarList
  },
  created() {
    this.defaultLanguage()
    this.getMe()
  },
  data() {
    return {
      leftDrawerOpen: false,
      menus: [],
      languages: [
        { label: 'English', slug: 'EN' },
        { label: 'Indonesia', slug: 'ID' }
      ]
    }
  },

  watch: {
    '$route'() {
      this.getMe()
    }
  },

  methods: {
    getMe() {
      const token = localStorage.getItem('token') || null
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      this.$api.get('me', config).then((full) => {
        if(full.status === 200) {
          const data = full.data.data
          const permissions = JSON.stringify(data.role.permissions)
          sessionStorage.removeItem('permissions')
          sessionStorage.setItem('permissions', permissions)
          let menus = [
            { label: 'Dashboard', icon: 'home', path: '/', childs: [] },
            { label: 'User Managements', icon: 'manage_accounts', path: '', 
              childs: [
                { label: 'Users', icon: 'group', path: '/users' },
                { label: 'Roles', icon: 'admin_panel_settings', path: '/roles' },
                { label: 'Modules', icon: 'content_copy', path: '/modules' },
              ]
            },
            { label: 'Master Data', icon: 'folder', path: '', 
              childs: [
                { label: 'Job Vacancies', icon: 'work_history', path: '/job-vacancies' },
                { label: 'Criteria', icon: 'zoom_out_map', path: '/criteria' },
                { label: 'Alternatives', icon: 'badge', path: '/alternatives' },
              ]
            }
          ]

          const checkPermissions = JSON.parse(sessionStorage.getItem('permissions'))
          menus.forEach(element => {
            if(element.childs.length === 0) {
              const compare = checkPermissions.find(obj => obj.name === element.label)
              !compare.read ? menus = menus.filter(obj => obj.label !== compare.name) : ''
            } else {

            }
          })
          this.menus = menus
        }
      }).catch((resE) => {
        if(resE.response.status === 401) {
          localStorage.removeItem('token')
          sessionStorage.removeItem('permissions')
          this.$router.push({ name: 'login' })
        }
      })
    },
    defaultLanguage() {
      if(!localStorage.getItem('language')) localStorage.setItem('language', 'EN')
    },

    changeLanguage(val) {
      if(val) {
        localStorage.setItem('language', val.slug)
        location.reload()
      }
    }
  }
}
</script>
