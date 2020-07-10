import {calculator_elementOffset_top} from './../helpers/index'

export function scrollY (pageId, subpageIndex) {
  const PAGE_ID = `[data-page-id = "${pageId}"]`
  const currentMaintPage = document.querySelector(PAGE_ID)
  const OFFSET_FROM_TOP = calculator_elementOffset_top(subpageIndex) + 'px'
  currentMaintPage.style.transform = `translateY(-${OFFSET_FROM_TOP})`
  console.log(PAGE_ID)
}