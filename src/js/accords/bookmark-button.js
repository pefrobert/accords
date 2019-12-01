import BookmarkManager from './bookmarkManager.js'

/* global Vue */
Vue.component('bookmark-button', {
  props: ['type', 'target'],
  data: function () {
    return {
      isBookmarked: false,
      label: "Ajouter à mes notes"
    }
  },
  created: function () {
    this.isBookmarked = BookmarkManager.has(this._props)
    if (this.isBookmarked) {
      this.label = "Ajouté à mes notes"
    }
  },
  methods: {
    click: function (event) {
      this.isBookmarked = !this.isBookmarked
      if (this.isBookmarked) {
        BookmarkManager.add(this._props)
        this.label = "Ajouté à mes notes"
      } else {
        BookmarkManager.remove(this._props)
        this.label = "Ajouter à mes notes"
      }
    }
  },
  template: '<span class="bookmark-btn" v-on:click="click" v-bind:class="{on: isBookmarked}"><span class="btn-label">{{label}}</span></span>'
})
