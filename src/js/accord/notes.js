import BookmarkManager from './bookmarkManager.js'

/* global Vue */
Vue.component('notes', {
  data: function () {
    return {
      amorces: [],
      art: [],
      glossary: [],
      vecu: [],
      questions: []
    }
  },
  computed: {
    count: function () {
      return this.art.length + this.amorces.length + this.glossary.length + this.vecu.length + this.questions.length
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const fetchSettings = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let bookmarks = BookmarkManager.load()

      if (bookmarks.length) {
        // Amorces
        let bookmarksAmorces = bookmarks.filter(el => el.type === 'amorce')
        if (bookmarksAmorces.length) {
          fetch('./data/talk.amorces.json', fetchSettings)
            .then((response) => response.json())
            .then((amorcesJson) => {
              this.amorces = bookmarksAmorces.map(function (bookmark) {
                let term = amorcesJson.find(item => item.id === bookmark.target)
                return '<strong>' + term.sectionId + '</strong> ' + term.amorces
              })
            })
        }

        // Art
        let bookmarksArt = bookmarks.filter(el => el.type === 'art')
        if (bookmarksArt.length) {
          fetch('./data/talk.art.json', fetchSettings)
            .then((response) => response.json())
            .then((artJson) => {
              this.art = bookmarksArt.map(function (bookmark) {
                let term = artJson.find(item => item.ID === bookmark.target)
                return '<strong>' + term.Titre + '</strong> - ' + term.Resume
              })
            })
        }

        // Glossary
        let bookmarksGlossary = bookmarks.filter(el => el.type === 'glossary')
        if (bookmarksGlossary.length) {
          fetch('./data/read.glossary.json', fetchSettings)
            .then((response) => response.json())
            .then((glossaryJson) => {
              this.glossary = bookmarksGlossary.map(function (bookmark) {
                let term = glossaryJson.find(item => item.id === bookmark.target)
                return '<strong>' + term.terme + '</strong> : ' + term.definition
              })
            })
        }

        // Vecu
        let bookmarksVecu = bookmarks.filter(el => el.type === 'vecu')
        if (bookmarksVecu.length) {
          fetch('./data/read.vecu.json', fetchSettings)
            .then((response) => response.json())
            .then((vecuJson) => {
              this.vecu = bookmarksVecu.map(function (bookmark) {
                let term = vecuJson.find(item => item.id === bookmark.target)
                return term.description
              })
            })
        }

        // Questions
        let bookmarksQuestions = bookmarks.filter(el => el.type === 'questions')
        if (bookmarksQuestions.length) {
          fetch('./data/write.questions.json', fetchSettings)
            .then((response) => response.json())
            .then((questionsJson) => {
              this.questions = bookmarksQuestions.map(function (bookmark) {
                let term = questionsJson.find(item => item.id === bookmark.target)
                return term.question
              })
            })
        }
      }
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
