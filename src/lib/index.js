import flagComponent from './pagination.vue'
const VueFlagList = {
 install: function (Vue) {
 if (typeof window !== 'undefined' && window.Vue) {
  Vue = window.Vue
 }
 Vue.component('VueFlagList', flagComponent)
 }
}
 
export default VueFlagList