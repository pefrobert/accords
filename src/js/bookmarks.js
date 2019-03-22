var bookmarkItem = 'bookmarks';
var bookmarkClass = 'bookmark';
var bookmarkSelectedClass = 'bookmark-selected';

var bookmarks = JSON.parse(localStorage.getItem(bookmarkItem)) || [];

/*
bookmark.source
bookmark.key
 */

_.each(document.getElementsByClassName(bookmarkClass), function(element, index, list){
	var source = element.dataset.source;
	var key = element.dataset.key;

	// Init bookmark
	_.each(bookmarks, function(bookmark, index, list){
		if(bookmark.key == element.dataset.key && bookmark.source == element.dataset.source){
			element.classList.add(bookmarkSelectedClass);
		}
	});

	element.addEventListener('click', function(el) {
		var source = this.dataset.source;
		var key = this.dataset.key;

		if(this.classList.contains(bookmarkSelectedClass)){
			// Remove bookmark
			this.classList.remove(bookmarkSelectedClass);
			bookmarks = _.filter(bookmarks, function(bookmark, index, list){
				console.log(bookmark);
				return (bookmark.source != source) || (bookmark.key != key);
			})
		} else{
			// Add bookmark
			this.classList.add(bookmarkSelectedClass);
			bookmarks.push(this.dataset);
		}
		localStorage.setItem(bookmarkItem, JSON.stringify(bookmarks));
	});
}); 


