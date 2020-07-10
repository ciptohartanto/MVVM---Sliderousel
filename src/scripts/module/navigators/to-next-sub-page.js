import {scrollY} from './../scrollers/scrollYPage'

export function toNextSubPage (bottomButton, currenMainPageIndex, historyProp) {
  bottomButton.addEventListener('click', e => {
    e.preventDefault()
    const MAIN_ID = currenMainPageIndex
    const MAIN_ID_VAL = historyProp.historySubPage[MAIN_ID - 1].mainPageId
    let totalContents = historyProp.historySubPage[MAIN_ID - 1].totalContents
    if(historyProp.historySubPage[MAIN_ID - 1].subPageId === totalContents - 1) {
      historyProp.historySubPage[MAIN_ID - 1].subPageId = 0
    } else {
      historyProp.historySubPage[MAIN_ID - 1].subPageId ++
    }
    // scrollY(MAIN_ID_VAL, historyProp.historySubPage[MAIN_ID - 1].subPageId) 
    console.log(historyProp) 
  })
}