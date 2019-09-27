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
  methods: {
    open: function () {
      this.$root.$emit('overlayOpen', this.link)
    }
  },
  template: '<a v-if="window.location.pathname === \'/accords/read.glossary.html\'" class="glossary-dfn" v-bind:href="url"><slot></slot></a>' +
  '<span v-else class="glossary-dfn" v-on:click="open"><slot></slot></span>'
})
