import BookmarkManager from './bookmarkManager.js'

/* global Vue */
Vue.component('notes', {
  data: function () {
    return {
      amorces: [],
      art: [],
      glossary: [],
      vecu: [],
      questions: [],

      count: 0
    }
  },
  created: function () {
    this.fetchData()
    console.log(this._data)
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

        // Questions
        let bookmarksQuestions = bookmarks.filter(el => el.type === 'questions')
        if (bookmarksQuestions.length) {
          let questionsJson = this.fetchJson('./data/write.questions.json')
          this.questions = bookmarksQuestions.map(function (bookmark) {
            let term = questionsJson.find(function (item) {
              return item.id === bookmark.target
            })
            return term.question
          })
        }
      }
      this.count = this.art.length + this.amorces.length + this.glossary.length + this.vecu.length + this.questions.length
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
    }
  },
  template: '<div v-if="count>0">' +
    '<notes-section section="read"  type="glossary"  v-bind:bookmarks="glossary"  title="Je m\'informe : Définitions"></notes-section>' +
    '<notes-section section="read"  type="vecu"      v-bind:bookmarks="vecu"      title="Je m\'informe : Histoires vécues"></notes-section>' +
    '<notes-section section="talk"  type="amorces"   v-bind:bookmarks="amorces"   title="J\'en parle : Amorces de discussions"></notes-section>' +
    '<notes-section section="talk"  type="art"       v-bind:bookmarks="art"       title="J\'en parle : Les soins anticipés dans l\'art"></notes-section>' +
    '<notes-section section="write" type="questions" v-bind:bookmarks="questions" title="J\'écris : En cas d\'urgence"></notes-section>' +
  '</div>' +
  '<div v-else>' +
    '<p class="no-data">Aucune sélection pour l\'instant.</p>' +
    '<p class="tip">Utilisez le bouton "marque-page"<span class="bookmark-btn"></span>, que vous trouverez dans diverses pages de l\'app, pour réunir ici des contenus que vous souhaitez mettre de côté par exemple pour y revenir et les approfondir, parce que vous les trouvez intéressants, ou pour en discuter avec des proches.</p>' +
  '</div>'
})
