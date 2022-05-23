import { boot } from 'quasar/wrappers'
import CanDirective from 'src/directives/can'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.directive('can', CanDirective)
})
