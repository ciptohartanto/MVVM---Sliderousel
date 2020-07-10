import {CSS_NAMES} from './constants/css-names'
import {toNextMainPage, toPrevMainPage, toNextSubPage} from './navigators/index'

import Model from './Model'

export default class Sliderousel {
  constructor () {
    this.indexes= {
      curMainPage: 1,
      historySubPage: undefined
    }
    this.cssClasses = {
      hero: `${CSS_NAMES.HERO}`,
      inactive: `${CSS_NAMES.INACTIVE}`,
      active: `${CSS_NAMES.ACTIVE}`,
      prevArrow: `${CSS_NAMES.LEFT_ARROW}`,
      nextArrow: `${CSS_NAMES.RIGHT_ARROW}`,
      topArrow: `${CSS_NAMES.TOP_ARROW}`,
      bottomArrow: `${CSS_NAMES.BOTTOM_ARROW}`,
      pageList: `${CSS_NAMES.PAGE_LIST}`,
      pageItem: `${CSS_NAMES.PAGE_ITEM}`
    }
    this.dom = {
      body: document.querySelector('body'),
      pageItems: undefined,
      pageListContent: undefined,
      nextButton: undefined,
      prevButton: undefined,
      topButton: undefined,
      bottomButton: undefined,
      windowWidth: undefined,
      newWindowWidth: undefined
    }
    this.functions = {
      toNextMainPage,
      toPrevMainPage,
      toNextSubPage
    }
  }
  init() {
    this._addPageItemId()
    this._storePageListContent()
    this._injectContent(this.dom.pagelistContent)
    this._windowWidth()
    this._onResizedWindowWidth()
    this._registerHistoryIndexProps()
    this.functions.toNextMainPage(
      this.dom.nextButton, 
      this.indexes.curMainPage, 
      this.dom.pageItems.length,
      this.dom.pagelist,
      this
    )
    this.functions.toPrevMainPage(
      this.dom.prevButton, 
      this.indexes.curMainPage, 
      this.dom.pageItems.length,
      this.dom.pagelist
    )
    this.functions.toNextSubPage(
      this.dom.bottomButton,
      this.indexes.curMainPage,
      this.indexes
    )
    // this._previousSubSection()
    // this._nextSubSection()
  }
  set currentPageIndex (newVal) {
    this.indexes.curMainPage = newVal
  }
  _previousMainPage(){
    this.dom.prevButton.addEventListener('click', e => {
      e.preventDefault()
      if(this.indexes.curMainPage <= 1) {
        this.indexes.curMainPage = this.dom.pageItems.length
      } 
      else this.indexes.curMainPage --
      this._scrollXPage(this.indexes.curMainPage)
    })
  }
  _nextMainPage() {
    this.dom.nextButton.addEventListener('click', e => {
      e.preventDefault()
      if(this.indexes.curMainPage === this.dom.pageItems.length) {
        this.indexes.curMainPage = 1
      } 
      else this.indexes.curMainPage ++
      this._scrollXPage(this.indexes.curMainPage)
    })
  }
  _nextSubSection() {
    this.dom.bottomButton.addEventListener('click', e => {
      e.preventDefault()
      const MAIN_ID = this.indexes.curMainPage
      const MAIN_ID_VAL = this.indexes.historySubPage[MAIN_ID - 1].mainPageId
      let totalContents = this.indexes.historySubPage[MAIN_ID - 1].totalContents
      if(this.indexes.historySubPage[MAIN_ID - 1].subPageId === totalContents - 1) {
        this.indexes.historySubPage[MAIN_ID - 1].subPageId = 0
      } else {
        this.indexes.historySubPage[MAIN_ID - 1].subPageId ++
      }
      this._scrollYPage(MAIN_ID_VAL, this.indexes.historySubPage[MAIN_ID - 1].subPageId)      
    })
  }
  _previousSubSection() {
    this.dom.topButton.addEventListener('click', e => {
      e.preventDefault()
      const MAIN_ID = this.indexes.curMainPage
      const MAIN_ID_VAL = this.indexes.historySubPage[MAIN_ID - 1].mainPageId
      let totalContents = this.indexes.historySubPage[MAIN_ID - 1].totalContents
      if( this.indexes.historySubPage[MAIN_ID - 1].subPageId < 1 ) {
        this.indexes.historySubPage[MAIN_ID - 1].subPageId = totalContents - 1
      } else {
        this.indexes.historySubPage[MAIN_ID - 1].subPageId --
      }
      this._scrollYPage(MAIN_ID_VAL, this.indexes.historySubPage[MAIN_ID - 1].subPageId)
    })
  }
  _storePageListContent() {
    this.dom.pagelistContent = document.querySelector('.' + this.cssClasses.pageList).innerHTML
  }
  _registerHistoryIndexProps() {
    let pageItemObject = []
    this.dom.pageItems.forEach(pageItem => {
      if (pageItem.childNodes.length > 1) {
        pageItemObject.push({
          mainPageId: parseInt(pageItem.dataset.pageId), 
          subPageId: 0,
          totalContents: pageItem.childNodes.length
        })
      } else {
        pageItemObject.push({
          mainPageId: parseInt(pageItem.dataset.pageId), 
          subPageId: null,
          totalContents: pageItem.childNodes.length
        })
      }
    })
    this.indexes.historySubPage = pageItemObject
  }
  _addPageItemId() {
    this.dom.pageItems = document.querySelectorAll('.' + this.cssClasses.pageItem)
    this.dom.pageItems.forEach((pageItem, index) => {
      index ++
      pageItem.setAttribute('data-page-id', index)
    })
  }
  _injectContent(pagelist) {
    const DEFAULT_MARKUP = `
      <div class="${this.cssClasses.hero}">

        <span class="${this.cssClasses.prevArrow}"> Prev </span>
        <span class="${this.cssClasses.nextArrow}"> Next </span>
        <span class="${this.cssClasses.topArrow}"> Before </span>
        <span class="${this.cssClasses.bottomArrow}"> Continue </span>

        <div class="${this.cssClasses.pageList}">
          ${pagelist}
        </div>
      </div>
    `
    this.dom.body.innerHTML = DEFAULT_MARKUP
    this.dom.pageitem = document.querySelector('.' + this.cssClasses.pageItem)
    this.dom.pagelist = document.querySelector('.' + this.cssClasses.pageList)
    this.dom.nextButton = document.querySelector('.' + this.cssClasses.nextArrow)
    this.dom.prevButton = document.querySelector('.' + this.cssClasses.prevArrow)
    this.dom.bottomButton = document.querySelector('.' + this.cssClasses.bottomArrow)
    this.dom.topButton = document.querySelector('.' + this.cssClasses.topArrow)
  }
  _scrollYPage(pageId, subpageIndex) {
    const PAGE_ID = `[data-page-id = "${pageId}"]`
    const currentMaintPage = document.querySelector(PAGE_ID)
    const OFFSET_FROM_TOP = this._elementOffsetTop(subpageIndex) + 'px'
    currentMaintPage.style.transform = `translateY(-${OFFSET_FROM_TOP})`
  }
  _scrollXPage(id) {
    const OFFSET_FROM_LEFT = this._elementOffsetLeft(id - 1) + 'px'
    this.dom.pagelist.style.transform = `translateX(-${OFFSET_FROM_LEFT})`
  }
  _windowWidth() {
    this.windowWidth = this.dom.body.offsetWidth
  }
  _onResizedWindowWidth() {
    window.addEventListener('resize', () => {
      this.windowWidth = this.dom.body.offsetWidth
    })
  }
  _elementOffsetTop(id = 0) {
    const OFFSET_FROM_TOP = id * this.dom.body.clientHeight
    return OFFSET_FROM_TOP
  }
  _elementOffsetLeft(id = 0) {
    const OFFSET_FROM_LEFT = id * this.windowWidth
    return OFFSET_FROM_LEFT
  }
}