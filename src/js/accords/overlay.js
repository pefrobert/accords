/* global Vue */
Vue.component('overlay', {
  data: function () {
    return {
      glossaryId: '',
      activeDisplay: 'none',
      isOpened: true
    }
  },
  mounted: function () {
    this.$root.$on('overlayOpen', (link) => {
      this.open(link)
    })
  },
  methods: {
    open: function (glossaryId) {
      this.glossaryId = glossaryId

      // Hide all glossary items
      document.querySelectorAll('#overlay-content dl').forEach(function (item) {
        item.style.display = 'none'
      })

      // Display requested glossary item only
      document.getElementById('glossary-' + glossaryId).style.display = 'block'

      this.isOpened = true
      this.activeDisplay = 'block'
      document.body.classList.add('overlay-open')
    },
    close: function () {
      this.isOpened = false
      this.activeDisplay = 'none'
      document.body.classList.remove('overlay-open')
    }
  },
  template: '<div id="overlay" ref="overlay" class="overlay" v-bind:style="{ display: activeDisplay }">' +
    '<div id="overlay-close" class="overlay-close" v-on:click="close"></div>' +
    '<div id="overlay-content" class="overlay-content content-text">' +
      '<slot>Loading…</slot>' +
    '</div>'
})
