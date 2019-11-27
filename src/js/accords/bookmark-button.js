import BookmarkManager from './bookmarkManager.js'

/* global Vue */
Vue.component('bookmark-button', {
  props: ['type', 'target'],
  data: function () {
    return {
      isBookmarked: false
    }
  },
  created: function () {
    this.isBookmarked = BookmarkManager.has(this._props)
  },
  methods: {
    click: function (event) {
      this.isBookmarked = !this.isBookmarked
      if (this.isBookmarked) {
        BookmarkManager.add(this._props)
      } else {
        BookmarkManager.remove(this._props)
      }
    }
  },
  template: '<span class="bookmark-btn" v-on:click="click" v-bind:class="{on: isBookmarked}"><span class="btn-label">Ajouter à mes notes</span></span>'
})
