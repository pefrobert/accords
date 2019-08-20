/* global Vue */
Vue.component('notes-section', {
  props: ['section', 'type', 'title', 'bookmarks'],
  data: function () {
    return {
      titleClass: '',
      itemClass: ''
    }
  },
  created: function () {
    this.titleClass = 'section-' + this.section
    this.itemClass = this.type + '-item'
    console.log(this._props)
  },
  template: '<div v-if="bookmarks.length > 0" class="group" v-bind:class="titleClass">' +
      '<h3>{{ title }}</h3>' +
      '<ul>' +
        '<li v-for="bookmark in bookmarks" class="bookmark-item" v-bind:class="itemClass" v-html="bookmark"></li>' +
      '</ul>' +
    '</div>'
})
