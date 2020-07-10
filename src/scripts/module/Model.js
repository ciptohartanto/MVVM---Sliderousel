export default class Model {
  constructor() {
    this.indexes = {
      currentMainPageId: 0,
      totalPageItems: 0,
      historySubPages: undefined
    }
    this.windowWidth = 0
    this.windowHeight = 0
  }
  get pageId () {
    return this.indexes.currentMainPageId
  }
  set pageId(newPageId) {
    this.indexes.currentMainPageId = newPageId
  }
  get pageItems () {
    return this.totalPageItems
  }
  set pageItems(newPageItemValue) {
    this.totalPageItems = newPageItemValue
  }
  get winWidth() {
    return this.windowWidth
  }
  set winWidth(newWindowWidth) {
    this.windowWidth = newWindowWidth
  }
  get winHeight() {
    return this.windowHeight
  }
  set winHeight(newWindowHeight) {
    this.windowHeight = newWindowHeight
  }
  get histories () {
    return this.indexes.historySubPages
  }
  set histories(newHistoryArray) {
    this.indexes.historySubPages = newHistoryArray
  }
}