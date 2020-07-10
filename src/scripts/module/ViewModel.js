import Model from './Model'
import View from './View'

export default class ViewModel {
  constructor() {
    this.model = new Model()
    this.view = new View()
    this.createMarkup = this.view.init()
    this.currentPageId = this.model.indexes.currentMainPageId
    this.updatePageItems = this._updateTotalPageItems()
    this.totalPageItems = this.model.totalPageItems
    this.updateWindowWidth = this._updateWindowWidth()
    this.winWidth = this.model.windowWidth
    this.updateWindowHeight = this._updateWindowHeight()
    this.winHeight = this.model.windowHeight
    console.log(this.model)
  }
  init() {
    this._addIdToPageItems()
    this._createHistoryArr(this._updateHistorySubPages.bind(this))
    this._clickToNextPage(this._updateCurrentPageId.bind(this))
    this._clickToPreviousPage(this._updateCurrentPageId.bind(this))
  }
  _updateCurrentPageId(newId) {
    this.model.pageId = newId
  }
  _updateTotalPageItems() {
    this.model.pageItems = this.view.dom.pageItems.length
  }
  _updateWindowWidth() {
    let windowWidth = 0
    windowWidth = this.view.dom.body.offsetWidth
    window.addEventListener('resize', () => {
      windowWidth = this.view.dom.body.offsetWidth
      this.model.winWidth = windowWidth
    })
    this.model.winWidth = windowWidth
  }
  _updateWindowHeight() {
    let windowHeight = 0
    windowHeight = this.view.dom.body.clientHeight
    window.addEventListener('resize', () => {
      windowHeight = this.view.dom.body.clientHeight
      this.model.winHeight = windowHeight
    })
    this.model.winHeight = windowHeight
  }
  _updateHistorySubPages(newHistoryArray) {
    this.model.histories = newHistoryArray
  }
  _addIdToPageItems () {
    this.view.dom.pageItems.forEach((pageItem, index) => {
      index ++
      pageItem.setAttribute('data-page-id', index)
    })
  }
  _createHistoryArr(callback) {
    let historyArr = []
    this.view.dom.pageItems.forEach(pageItem => {
      historyArr.push( {
        mainPageId: parseInt(this.currentPageId),
        subpageId: pageItem.childNodes.length > 1 ? 0 : null,
        totalContents: pageItem.childNodes.length
      })
    })
    callback(historyArr)
    // this.model.histories = pageHistoryObject

  }
  _clickToNextPage(callback) {
    this.view.dom.nextButton.addEventListener('click', e => {
      e.preventDefault()    
      if( this.currentPageId === this.totalPageItems - 1 ) this.currentPageId = 0
      else this.currentPageId ++ 
      callback(this.currentPageId)
      this._horizontalScroll()
    })
  }
  _clickToPreviousPage(callback) {
    this.view.dom.prevButton.addEventListener('click', e => {
      e.preventDefault()
      if( this.currentPageId <= 0 ) this.currentPageId = this.totalPageItems -1
      else this.currentPageId --
      callback(this.currentPageId)
      this._horizontalScroll()
    })
  }
  _horizontalScroll() {
    // const SELECTOR = `[data-page-id = "${this.currentPageId}"]`
    // const TARGET_DOM = document.querySelector(SELECTOR)
    let distance = this.currentPageId * this.winWidth + 'px'
    this.view.dom.pagelist.style.transform = `translateX(-${distance})`
  }
}