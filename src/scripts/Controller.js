import PageAnimation from './PageAnimation'

export default class PageAnimationController {
  constructor(content, transition) {
    this.content = content
    this.transition = transition
    this.animatePage = new PageAnimation(this.content, this.transition)
  }
  init() {
    //- init
    this.animatePage
  }
  
  //- listen to clicks on prev and next buttons
  //- add content
}