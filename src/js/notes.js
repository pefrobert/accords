var notesGlossary = new Vue({
	el: '#notes-bookmarks',
	data: {
		bookmarks : bookmarksManager.load(),
		glossary : glossaryJson
	},
  	render: function (createElement) {
		if (this.bookmarks.length) {
			var glossary = this.glossary;
			return createElement('ul', {class : {'definition' : true}}, this.bookmarks.map(function (bookmark) {
				var term = _.find(glossary, function(item, index, list){
					return item.id == bookmark.target;
				});
				return createElement('li',{class : {'definition' : true}}, term.terme + ' : ' + term.definition);
			}))
		} else {
			return createElement('p',{class : {'tip' : true}}, 'Utilisez le bouton "marque-page" <span class="bookmark-btn"></span>, que vous trouverez dans diverses pages de l\'app, pour réunir ici des contenus que vous souhaitez mettre de côté &mdash;par exemple pour y revenir et les approfondir, parce que vous les trouvez intéressants, ou pour en discuter avec des proches.')
		}
	}
});