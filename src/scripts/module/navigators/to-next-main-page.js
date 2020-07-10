import {scrollXPage} from './../scrollers/scrollXPage'

export function toNextMainPage(nextButton, currentMainIndex, totalContents, targetDom, x) {
  nextButton.addEventListener('click', e => {
    e.preventDefault()
    if(currentMainIndex === totalContents) currentMainIndex = 1
    else currentMainIndex ++
    scrollXPage(currentMainIndex, targetDom)
    console.log(x)
  })
}