import PageAnimation from './PageAnimation'
import TRANSITIONS from './Const-Transition'

document.addEventListener('DOMContentLoaded', e => {
  const myPage = new PageAnimation({
    contents: [
      {
        pageContent: `
        <h1 class="title"> Satu </h1>
        <h2 class="subtitle"> Satu Subtitle </h2>
      `
      },
      {
        pageContent: `
        <h1 class="title"> Dua </h1>
        <h2 class="subtitle"> Dua Subtitle </h2>
      `
      },
      {
        pageContent: `
        <h1 class="title"> Tiga </h1>
        <h2 class="subtitle"> Tiga Subtitle </h2>
      `
      }
    ],
    transition: TRANSITIONS.FADE_IN_FADE_OUT
  })
  myPage.init()
})