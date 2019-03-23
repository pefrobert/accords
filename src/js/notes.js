var notesGlossary = new Vue({
	el: '#notes-bookmarks',
	data: {
		art : artJson,
		bookmarks : bookmarksManager.load(),
		glossary : glossaryJson
	},
  	render: function (createElement) {
		if (this.bookmarks.length) {
			console.log(this.bookmarks);

			var html = [];

			// Art
			var art = this.art;
			var bookmarksArt = _.filter(this.bookmarks, function(el){
				return el.type == "art";
			});
			if(bookmarksArt.length){
				html.push(
					createElement('div', {class : {'group section-talk' : true}},[
						createElement('h3', 'Les soins anticipés dans l\'art'),
						createElement('ul', bookmarksArt.map(function (bookmark) {
							var term = _.find(art, function(item, index, list){
								return item.ID == bookmark.target;
							});
							return createElement('li',{class : {'art-item' : true}}, term.Titre + ' : ' + term.Resume);
						}))
					])
				);
			}

			// Glossary
			var glossary = this.glossary;
			var bookmarksGlossary = _.filter(this.bookmarks, function(el){
				return el.type == "glossary";
			});
			if(bookmarksGlossary.length){

				html.push(
					createElement('div', {class : {'group section-read' : true}},[
						createElement('h3', 'Glossaire'),
						createElement('ul', bookmarksGlossary.map(function (bookmark) {
							var term = _.find(glossary, function(item, index, list){
								return item.id == bookmark.target;
							});
							return createElement('li',{class : {'glossary-item' : true}}, term.terme + ' : ' + term.definition);
						}))
					])
				);
			}
			return createElement('div',html);
		} else {
			return '<p class="tip">Utilisez le bouton "marque-page" <span class="bookmark-btn"></span>, que vous trouverez dans diverses pages de l\'app, pour réunir ici des contenus que vous souhaitez mettre de côté &mdash;par exemple pour y revenir et les approfondir, parce que vous les trouvez intéressants, ou pour en discuter avec des proches.</p>';
		}
	}
});