var bookmarksManager = {

	className : 'bookmark-btn',
	classNameSelected : 'on',

	bookmarks : [],

	initialize : function(elements){
		if(elements == null){
			elements = document;
		}

		this.bookmarks = this.load();

		var manager = this;
		_.each(elements.getElementsByClassName(manager.className), function(element, index, list){
			var type = element.dataset.type;
			var target = element.dataset.target;
			_.each(manager.bookmarks, function(bookmark, index, list){
				console.log(this);
				if(bookmark.type == type && bookmark.target == target){
					element.classList.add(manager.classNameSelected);
				}
			});
			element.addEventListener('click', bookmarksManager.onClick, false);
		});
	},

	load : function(){
		return JSON.parse(localStorage.getItem("bookmarks")) || [];
	},

	save : function(bookmarks){
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	},

	onClick : function(element) {
		var type = this.dataset.type;
		var target = this.dataset.target;

		if(this.classList.contains(bookmarksManager.classNameSelected)){
			// Remove bookmark
			this.classList.remove(bookmarksManager.classNameSelected);
			bookmarksManager.bookmarks = _.filter(bookmarksManager.bookmarks, function(bookmark, index, list){
				console.log(bookmark);
				return (bookmark.type != type) || (bookmark.target != target);
			})
		} else{
			// Add bookmark
			this.classList.add(bookmarksManager.classNameSelected);
			bookmarksManager.bookmarks.push(this.dataset);
		}
		bookmarksManager.save(bookmarksManager.bookmarks);
	}

}

bookmarksManager.initialize();