import BookmarkManager from './bookmarkManager.js'

/* global Vue */
var notes = new Vue({
  el: '#notes-bookmarks',
  created () {
    this.fetchData()
  },
  data: {
    amorces: [],
    art: [],
    glossary: [],
    vecu: [],

    bookmarks: 0
  },
  methods: {
    fetchData () {
      let bookmarks = BookmarkManager.load()
      if (bookmarks.length) {
        // Amorces
        let bookmarksAmorces = bookmarks.filter(el => el.type === 'amorce')
        if (bookmarksAmorces.length) {
          let amorcesJson = this.fetchJson('./data/talk.amorces.json')
          this.amorces = bookmarksAmorces.map(function (bookmark) {
            let term = amorcesJson.find(function (item) {
              return item.id === bookmark.target
            })
            return '<strong>' + term.sectionId + '</strong> ' + term.amorces
          })
        }

        // Art
        let bookmarksArt = bookmarks.filter(el => el.type === 'art')
        if (bookmarksArt.length) {
          let artJson = this.fetchJson('./data/talk.art.json')
          this.art = bookmarksArt.map(function (bookmark) {
            let term = artJson.find(function (item) {
              return item.ID === bookmark.target
            })
            return '<strong>' + term.Titre + '</strong> - ' + term.Resume
          })
        }

        // Glossary
        let bookmarksGlossary = bookmarks.filter(el => el.type === 'glossary')
        if (bookmarksGlossary.length) {
          let glossaryJson = this.fetchJson('./data/read.glossary.json')
          this.glossary = bookmarksGlossary.map(function (bookmark) {
            let term = glossaryJson.find(function (item, index, list) {
              return item.id === bookmark.target
            })
            return '<strong>' + term.terme + '</strong> : ' + term.definition
          })
        }

        // Vecu
        let bookmarksVecu = bookmarks.filter(el => el.type === 'vecu')
        if (bookmarksVecu.length) {
          let vecuJson = this.fetchJson('./data/read.vecu.json')
          this.vecu = bookmarksVecu.map(function (bookmark) {
            let term = vecuJson.find(function (item, index, list) {
              return item.id === bookmark.target
            })
            return term.description
          })
        }
      }

      this.bookmarks = this.art.length + this.amorces.length + this.glossary.length + this.vecu.length
    },
    fetchJson: function (url) {
      let json = []
      let req = new XMLHttpRequest()
      req.overrideMimeType('application/json')
      req.open('GET', url, false)
      req.onload = function () {
        if (this.status !== 200) {
          throw new Error('Network response was not ok.')
        }
        json = JSON.parse(req.responseText)
      }
      req.send(null)
      return json
    },
    renderNotes: function (createElement, bookmarks, title, titleClasses, itemClasses) {
      return createElement('div', {
        class: titleClasses
      }, [
        createElement('h3', title),
        createElement('ul', bookmarks.map(function (bookmark) {
          return createElement('li', {
            class: itemClasses,
            domProps: {
              innerHTML: bookmark
            }
          })
        }))
      ])
    }
  },
  render: function (createElement) {
    if (this.bookmarks > 0) {
      let html = []

      // Amorces
      if (this.amorces.length) {
        let title = 'Amorces de discussions'
        let titleClasses = {
          'group section-talk': true
        }
        let itemClasses = {
          'bookmark-item amorce-item': true
        }
        html.push(this.renderNotes(createElement, this.amorces, title, titleClasses, itemClasses))
      }

      // Art
      if (this.art.length) {
        let title = 'Les soins anticipés dans l\'art'
        let titleClasses = {
          'group section-talk': true
        }
        let itemClasses = {
          'bookmark-item art-item': true
        }
        html.push(this.renderNotes(createElement, this.art, title, titleClasses, itemClasses))
      }

      // Glossary
      if (this.glossary.length) {
        let title = 'Glossaire'
        let titleClasses = {
          'group section-read': true
        }
        let itemClasses = {
          'bookmark-item glossary-item': true
        }
        html.push(this.renderNotes(createElement, this.glossary, title, titleClasses, itemClasses))
      }

      // Vecu
      if (this.vecu.length) {
        let title = 'Histoires Vécues'
        let titleClasses = {
          'group section-read': true
        }
        let itemClasses = {
          'bookmark-item vecu-item': true
        }
        html.push(this.renderNotes(createElement, this.vecu, title, titleClasses, itemClasses))
      }

      return createElement('div', html)
    } else {
      return createElement('div', {}, [
        createElement('p', {
          class: {
            'no-data': true
          }
        }, 'Aucune sélection pour l\'instant.'),
        createElement('p', {
          class: {
            'tip': true
          }
        }, [
          'Utilisez le bouton "marque-page"',
          createElement('span', {
            class: {
              'bookmark-btn': true
            }
          }, ''),
          ', que vous trouverez dans diverses pages de l\'app, pour réunir ici des contenus que vous souhaitez mettre de côté par exemple pour y revenir et les approfondir, parce que vous les trouvez intéressants, ou pour en discuter avec des proches.'

        ])
      ])
    }
  }
})

export default notes
