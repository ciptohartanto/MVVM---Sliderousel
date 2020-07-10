import {scrollXPage} from './../scrollers/scrollXPage'

export function toPrevMainPage(prevButton, currentMainIndex, totalContents, targetDom) {
  prevButton.addEventListener('click', e => {
    e.preventDefault()
    if(currentMainIndex <= 1) currentMainIndex = totalContents
    else currentMainIndex --
    scrollXPage(currentMainIndex, targetDom)
    console.log(currentMainIndex)
  })
}