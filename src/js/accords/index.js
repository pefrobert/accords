import BookmarkElement from './bookmarkElement.js'
import notes from './notes.js'

var ACCORDs = {
  version: '2019-05-18 22:16:00'
}

ACCORDs.bookmarkElement = new BookmarkElement()
ACCORDs.bookmarkElement.initialize()

ACCORDs.notes = notes

window.ACCORDs = ACCORDs

export default ACCORDs
