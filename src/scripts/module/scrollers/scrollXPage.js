import {calculator_elementOffset_left} from '../helpers/calculator_elementOffset_left'

export function scrollXPage(id, dom) {
  let offsetFromLeft = calculator_elementOffset_left(id - 1) + 'px'
  dom.style.transform = `translateX(-${offsetFromLeft})`
}