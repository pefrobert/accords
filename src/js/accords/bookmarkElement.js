import BookmarkManager from './bookmarkManager.js'

/**
 * Manage bookmark DOM element
 */

export default class BookmarkElement {
  static CLASSNAME () { return 'bookmark-btn' };

  static CLASSNAME_SELECTED () { return 'on' };

  initialize (elements = document) {
    let bookmarks = BookmarkManager.load()
    // Let's tag element corresponding to bookmark
    let taggedElements = elements.getElementsByClassName(BookmarkElement.CLASSNAME())
    for (const element of taggedElements) {
      element.addEventListener('click', BookmarkElement.onClick.bind(this, element))
      for (const bookmark of bookmarks) {
        if (bookmark.type === element.dataset.type && bookmark.target === element.dataset.target) {
          BookmarkElement.activate(element)
        }
      }
    }
  }

  static activate (element) {
    element.classList.add(BookmarkElement.CLASSNAME_SELECTED())
  }

  static inactivate (element) {
    element.classList.remove(BookmarkElement.CLASSNAME_SELECTED())
  }

  static onClick (element) {
    if (element.classList.contains(BookmarkElement.CLASSNAME_SELECTED())) {
      BookmarkElement.inactivate(element)
      BookmarkManager.remove(element.dataset)
    } else {
      BookmarkElement.activate(element)
      BookmarkManager.add(element.dataset)
    }
  }
}
