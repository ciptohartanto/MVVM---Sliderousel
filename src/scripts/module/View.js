import {CSS_NAMES} from './constants/css-names'

export default class View {
  constructor() {
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
      pagelistContent: undefined,
      pageitem: undefined,
      pagelist: undefined,
      nextButton: undefined,
      prevButton: undefined,
      bottomButton: undefined,
      topButton: undefined,
      body: document.querySelector('body'),
      pageItems: document.querySelectorAll('.' + this.cssClasses.pageItem)
    }
  }
  
  init() {
    this._storePageListContent()
    //create markup
    this.createMarkup(this.pagelistContent)
  }
  
  createMarkup(pagelist) {
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
    this.dom = {
      pagelistContent: document.querySelector('.' + this.cssClasses.pageList),
      pageitem: document.querySelector('.' + this.cssClasses.pageItem),
      pagelist: document.querySelector('.' + this.cssClasses.pageList),
      nextButton: document.querySelector('.' + this.cssClasses.nextArrow),
      prevButton: document.querySelector('.' + this.cssClasses.prevArrow),
      bottomButton: document.querySelector('.' + this.cssClasses.bottomArrow),
      topButton: document.querySelector('.' + this.cssClasses.topArrow),
      body: document.querySelector('body'),
      pageItems: document.querySelectorAll('.' + this.cssClasses.pageItem)
    }
  }
  
  _storePageListContent() {
    this.pagelistContent = document.querySelector('.' + this.cssClasses.pageList).innerHTML
  }
  
}