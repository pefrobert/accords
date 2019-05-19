export default class BookmarkManager {
  static load () {
    return Array.from(JSON.parse(localStorage.getItem('bookmarks')) || [])
  }

  static save (bookmarks) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  static add (bookmark) {
    if (!BookmarkManager.has(bookmark)) {
      let bookmarks = BookmarkManager.load()
      bookmarks.push(bookmark)
      BookmarkManager.save(bookmarks)
    }
  }

  static has (bookmark) {
    let bookmarks = BookmarkManager.load()
    for (const _bookmark of bookmarks) {
      if (bookmark.type === _bookmark.type && bookmark.target === _bookmark.target) {
        return true
      }
    }
    return false
  }

  static remove (bookmark) {
    let bookmarks = BookmarkManager.load()
    bookmarks = bookmarks.filter(_bookmark => (bookmark.type !== _bookmark.type || bookmark.target !== _bookmark.target))
    BookmarkManager.save(bookmarks)
  }
}
