import PageAnimation from './PageAnimation'
import TRANSITIONS from './Const-Transition'

document.addEventListener('DOMContentLoaded', e => {
  const myPage = new PageAnimation({
    transition: TRANSITIONS.FADE_IN_FADE_OUT
  })
  myPage.init()
})