/* global Vue */
Vue.component('glossary', {
  props: ['link'],
  data: function () {
    return {}
  },
  computed: {
    url: function () {
      return 'read.glossary.html#' + this.link
    }
  },
  template: '<a class="glossary-dfn" v-bind:href="url"><slot></slot></a>'
})
