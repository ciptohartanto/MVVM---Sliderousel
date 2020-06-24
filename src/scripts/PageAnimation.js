import TRANSITIONS from './Const-Transition'

export default class PageAnimation {
  constructor ({contents = [{pageContent: 'hi' }, {pageContent: '嗨' }], transition = TRANSITIONS.FADE_IN_FADE_OUT}) {
   this.contents = contents
   this.transition = transition
   this.body = document.querySelector('body')
  }
  init() {
    this._markup(this.contents)
    this._injectContent(this.markup)
    this._makeFirstPageVisible()
    this._listenPrevButton()
    this._listenNextButton()
  }
  
  _markup(contents) {
    let markup = ''
    contents.forEach((context, idx) => {
      markup += `
        <div class="page-content" id=${idx+1}>
          ${context.pageContent}
        </div>
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
  _listenPrevButton(){
    this.prevButton.addEventListener('click', e => {
      e.preventDefault()
    })
  }
  _listenNextButton() {
    this.nextButton.addEventListener('click', e => {
      e.preventDefault()
    })
  }
  _injectContent(markup) {
    const defaultMarkup = `
      <div class="page">
        <div class="page-navigation">
          <span class="page-prev"> Prev </span>
          <span class="page-next"> Next </span>
        </div>
        ${markup}
      </div>
    `
    this.body.innerHTML = defaultMarkup
    this.nextButton = document.querySelector('.page-next')
    this.prevButton = document.querySelector('.page-prev')
  }
  _makeFirstPageVisible() {
    const contentItems = document.querySelectorAll('.page-content')
    contentItems.forEach ((item,idx) => {
      if(idx === 0) {
        item.classList.add('page-content--active')
      } else {
        item.classList.add('page-content--inactive')
      }
    })
  }
  _getPageIdx() {
    // this.
  }
}