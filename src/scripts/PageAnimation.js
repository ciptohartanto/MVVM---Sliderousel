import TRANSITIONS from './Const-Transition'
export default class PageAnimation {
  constructor ({
    contents = [{pageContent: 'hi' }, {pageContent: '嗨' }], 
    transition = TRANSITIONS.FADE_IN_FADE_OUT}
  ) {
    this.contents = contents
    this.transition = transition
    this.body = document.querySelector('body')
    this.currentPageIndex = 1
    this.normalClass= 'page-contentItem'
    this.inactiveCSSClass = 'page-contentItem--inactive'
    this.activeCSSClass = 'page-contentItem--active'
    this.nextButton = null
    this.prevButton = null
    this.pageWrapper = null
    this.windowWidth = null
    this.newWindowWidth = null
  }
  init() {
    this._markup(this.contents)
    this._injectContent(this.markup)
    this._windowWidth()
    this._onResizedWindowWidth()
    this._makeFirstPageVisible()
    this._prevSlide()
    this._nextSlide()
  }
  
  _markup(contents) {
    let markup = ''
    contents.forEach((context, idx) => {
      markup += `
        <li class="page-contentItem" data-page-id=${idx+1}>
          ${context.pageContent}
        </li>
      `
    })
    this.markup = markup
  }
  _transition() {
    if (this.pages.length < 1) {
      return
    } else {
      return
    }
  }
  _prevSlide(){
    this.prevButton.addEventListener('click', e => {
      e.preventDefault()
      if(this.currentPageIndex <= 1) {
        this.currentPageIndex = this.contents.length
      } 
      else this.currentPageIndex --
      this._activatePage(this.currentPageIndex)
      // this._scrollYPage(this.currentPageIndex)
      this._scrollXPage(this.currentPageIndex)
    })
  }
  _nextSlide() {
    this.nextButton.addEventListener('click', e => {
      e.preventDefault()
      if(this.currentPageIndex === this.contents.length) {
        this.currentPageIndex = 1
      } 
      else this.currentPageIndex ++
      this._activatePage(this.currentPageIndex)
      // this._scrollYPage(this.currentPageIndex)
      this._scrollXPage(this.currentPageIndex)
    })
  }
  _injectContent(markup) {
    const DEFAULT_MARKUP = `
      <div class="page">
        <div class="page-navigation">
          <span class="page-prev"> Prev </span>
          <span class="page-next"> Next </span>
        </div>
        <ul class="page-contentList">
          ${markup}
        </ul>
      </div>
    `
    this.body.innerHTML = DEFAULT_MARKUP
    this.pageWrapper = document.querySelector('.page-contentList')
    this.nextButton = document.querySelector('.page-next')
    this.prevButton = document.querySelector('.page-prev')
  }
  _makeFirstPageVisible() {
    this.contentItems = document.querySelectorAll('.page-contentItem')
    this.contentItems.forEach ((item,idx) => {
      if(idx === 0) {
        item.classList.add(this.activeCSSClass)
      } else {
        item.classList.add(this.inactiveCSSClass)
      }
    })
  }
  _activatePage(index) {
    const CONTENT_ITEMS = this.contentItems
    CONTENT_ITEMS.forEach( (item, idx) => {
      if (index === idx + 1 ){
        item.classList = 'page-contentItem page-contentItem--active'
      } else {
        item.classList = 'page-contentItem page-contentItem--inactive'
      }
    })
  }
  _scrollYPage(id) {
    const DATA_ID = `[data-page-id = "${id}"]`
    const OFFSET_FROM_TOP = this._elementOffsetTop(DATA_ID) + 'px'
    this.pageWrapper.style.transform = `translateY(-${OFFSET_FROM_TOP})`
  }
  
  _scrollXPage(id) {
    const OFFSET_FROM_LEFT = this._elementOffsetLeft(id - 1) + 'px'
    this.pageWrapper.style.transform = `translateX(-${OFFSET_FROM_LEFT})`
  }
  
  _windowWidth() {
    this.windowWidth = this.body.offsetWidth
  }
  _onResizedWindowWidth() {
    window.addEventListener('resize', () => {
      this.windowWidth = this.body.offsetWidth
    })
  }

  _elementOffsetLeft(id = 0) {
    const OFFSET_FROM_LEFT = id * this.windowWidth
    return OFFSET_FROM_LEFT
  }
}