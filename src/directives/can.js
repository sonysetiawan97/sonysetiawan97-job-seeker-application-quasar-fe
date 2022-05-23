export default {
  created() {},
  beforeMount() {},
  mounted(el, binding, vnode) {
    const store = binding.instance.$store
    const permissions = store.getters['auth/permissions']
    const isPermitted = binding.value
    const url = isPermitted.replaceAll('.', '/')
    const filtered = permissions.filter((permission) => {
      const route = permission.replaceAll('.', '/')
      const routeMatcher = new RegExp(route.replace(/\*/g, '([\\w-]+)'))
      const permitted = url.match(routeMatcher)
      if(permitted) return true
    })
    if(!filtered.length) {
      el.style.display = 'none'
    }
  },
  beforeUpdate() {}, // new
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
