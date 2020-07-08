import TRANSITIONS from './Const-Transition'
import {CSS_CLASSES} from './Const-CssClass'
export default class PageAnimation {
  constructor ({

    transition = TRANSITIONS.FADE_IN_FADE_OUT}
  ) {

    this.transition = transition
    this.body = document.querySelector('body')
    this.currentMainPageIndex = 1
    this.currentSubPageIndex = []
    this.heroClass= `${CSS_CLASSES.HERO}`
    this.inactiveCSSClass = `${CSS_CLASSES.INACTIVE}`
    this.activeCSSClass = `${CSS_CLASSES.ACTIVE}`
    this.previousArrowCSSClass = `${CSS_CLASSES.LEFT_ARROW}`
    this.nextArrowCSSClass = `${CSS_CLASSES.RIGHT_ARROW}`
    this.topArrowCSSClass = `${CSS_CLASSES.TOP_ARROW}`
    this.bottomArrowCSSClass = `${CSS_CLASSES.BOTTOM_ARROW}`
    this.navigationCSSClass = `${CSS_CLASSES.NAVIGATION}`
    this.secondaryNavigationCSSClass = `${CSS_CLASSES.SECONDARY_NAVIGATION}`
    this.pagelistCSSClass = `${CSS_CLASSES.PAGE_LIST}`
    this.pageitemCSSClass = `${CSS_CLASSES.PAGE_ITEM}`
    this.pageItems = undefined
    this.pagelistContent = undefined
    this.nextButton = undefined
    this.prevButton = undefined
    this.topButtons = undefined
    this.bottomButtons = undefined
    this.pageitem = undefined
    this.windowWidth = undefined
    this.newWindowWidth = undefined
  }
  init() {
    this._addPageItemId()
    this._storePageListContent()
    this._injectContent(this.pagelistContent)
    this._windowWidth()
    this._onResizedWindowWidth()
    this._previousMainPage()
    this._nextMainPage()
    // this._previousSubSection()
    this._nextSubSection()
    // console.log(this)
  }
  _previousMainPage(){
    this.prevButton.addEventListener('click', e => {
      e.preventDefault()
      if(this.currentMainPageIndex <= 1) {
        this.currentMainPageIndex = this.pageItems.length
      } 
      else this.currentMainPageIndex --
      this._scrollXPage(this.currentMainPageIndex)
    })
  }
  _nextMainPage() {
    this.nextButton.addEventListener('click', e => {
      e.preventDefault()
      if(this.currentMainPageIndex === this.pageItems.length) {
        this.currentMainPageIndex = 1
      } 
      else this.currentMainPageIndex ++
      this._scrollXPage(this.currentMainPageIndex)
    })
  }
  _nextSubSection(mainPageId) {
    let NEXT_BUTTON = document.querySelector(`[data-subpage-button-top-${mainPageId}]`)

    if (NEXT_BUTTON === null) {
      console.log(NEXT_BUTTON)
      NEXT_BUTTON.addEventListener('click', e => {
        alert('x')
        console.log('a')
      })
    }

    //- get Page ID
    
    //- attach click event to the secondary nav
    
    // - use scrollYPage( page ID )
  }
  _previousSubSection() {
    this.topButtons.forEach(button => {
      button.addEventListener('click', e => {
        console.log(button)
      })
    })
  }
  _storePageListContent() {
    this._hasSecondaryNavigation()
    this.pagelistContent = document.querySelector('.' + this.pagelistCSSClass).innerHTML
  }
  _addPageItemId() {
    this.pageItems = document.querySelectorAll('.' + this.pageitemCSSClass)
    this.pageItems.forEach((pageItem, index) => {
      index ++
      pageItem.setAttribute('data-page-id', index)
    })
  }
  _injectContent(pagelist) {
    const DEFAULT_MARKUP = `
      <div class="${this.heroClass}">
        <div class="${this.navigationCSSClass}">
          <span class="${this.previousArrowCSSClass}"> Prev </span>
          <span class="${this.nextArrowCSSClass}"> Next </span>
        </div>
        <div class="${this.pagelistCSSClass}">
          ${pagelist}
        </div>
      </div>
    `
    this.body.innerHTML = DEFAULT_MARKUP
    this.pageitem = document.querySelector('.' + this.pageitemCSSClass)
    this.pagelist = document.querySelector('.' + this.pagelistCSSClass)
    this.nextButton = document.querySelector('.' + this.nextArrowCSSClass)
    this.prevButton = document.querySelector('.' + this.previousArrowCSSClass)
  }
  _scrollYPage(pageId, subpageIndex) {
    const PAGE_ID = `[data-page-id = "${id}"]`
    const PAGE_CHILDREN = document.querySelector(`#${PAGE_ID}`).childNodes
    console.log(PAGE_CHILDREN)
    // const OFFSET_FROM_TOP = this._elementOffsetTop(DATA_ID) + 'px'
    // this.pageitem.style.transform = `translateY(-${OFFSET_FROM_TOP})`
  }
  _scrollXPage(id) {
    const OFFSET_FROM_LEFT = this._elementOffsetLeft(id - 1) + 'px'
    this.pagelist.style.transform = `translateX(-${OFFSET_FROM_LEFT})`
  }
  _windowWidth() {
    this.windowWidth = this.body.offsetWidth
  }
  _onResizedWindowWidth() {
    window.addEventListener('resize', () => {
      this.windowWidth = this.body.offsetWidth
    })
  }

  _secondaryNavigationMarkup(subpageId) {
    const SECONDARY_NAVIGATION_MARKUP = `
      <div class="${this.secondaryNavigationCSSClass}" data-subpage="${subpageId}">
        <span class="${this.topArrowCSSClass}" data-subpage-button-top-${subpageId}> Top </span>
        <span class="${this.bottomArrowCSSClass}" data-subpage-button-bottom-${subpageId}> Next Subsection </span>
      </div>
    `
    return SECONDARY_NAVIGATION_MARKUP
  }
  _injectSecondaryNavigation(item, subpageId) {
    const secondaryNav = this._secondaryNavigationMarkup(subpageId)
    item.insertAdjacentHTML('afterbegin', secondaryNav)
  }
  _hasSecondaryNavigation() {
    this.pageItems.forEach(pageitem => {
      const pageItemNodes = pageitem.childNodes
      const pageItemPageId = pageitem.dataset.pageId
      if(pageItemNodes.length > 1) {
        this._injectSecondaryNavigation(pageitem, pageItemPageId)
        this._nextSubSection(pageItemPageId)
      } else {
        return
      }
    })
  }
  _elementOffsetLeft(id = 0) {
    const OFFSET_FROM_LEFT = id * this.windowWidth
    return OFFSET_FROM_LEFT
  }
}