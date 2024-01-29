import { Canvg } from "canvg"

export type ImageExtra = {
  jumpUrl?: string
}

export function getPrefixCls(suffixCls?: string) {
  return `avar-${suffixCls}`
}
export const NTV_PREFIX_CLS = getPrefixCls("ntv") // return 'avar-ntv'
const NTV_CONTAINER_CLS = `${NTV_PREFIX_CLS}-container`
/** export img alt attr */
export const NTV_IMG_ALT = NTV_PREFIX_CLS
function canvasToImageHtml(canvasElement: HTMLCanvasElement, imgExtra: ImageExtra | undefined) {
  //   debugger
  const pngUrl = canvasElement.toDataURL()
  const { width, height } = canvasElement || {}
  const baseImageHtml = `<img alt="${NTV_IMG_ALT}" src="${pngUrl}" width="${width}" height="${height}" />`
  const imageHtml = imgExtra?.jumpUrl
    ? `<a href="${imgExtra.jumpUrl}">${baseImageHtml}</a>`
    : baseImageHtml
  return imageHtml
}

function selectorToTextHtml(selectorElement: HTMLDivElement, imgExtra: ImageExtra | undefined) {
  debugger
  let inputElement: HTMLInputElement | null = selectorElement.querySelector("input[readonly]")

  // 最后提取input元素的value属性值
  let value = inputElement ? inputElement.value : undefined
  //   const baseImageHtml = `<img alt="${NTV_IMG_ALT}" src="${pngUrl}" width="${width}" height="${height}" />`
  if (!value) {
    inputElement = selectorElement.querySelector(".ant-select-selection-item")
    value = inputElement?.innerText
  }

  const imageHtml = `<span> ${value} </span>`
  return imageHtml
}

function isNegativeArrow(svgElement: SVGSVGElement) {
  return svgElement?.parentElement?.className.includes(`${NTV_PREFIX_CLS}-value-negative`)
}
function isPositiveArrow(svgElement: SVGSVGElement) {
  return svgElement.parentElement?.className.includes(`${NTV_PREFIX_CLS}-value-positive`)
}
function isEyeIcon(svgElement: SVGSVGElement) {
  return (
    svgElement.parentElement?.className.includes("anticon-eye") ||
    svgElement.parentElement?.className.includes("anticon-eye-invisible")
  )
}
async function svgToPngUrl(
  data: { width?: number; height?: number; svg: string },
  canvas: HTMLCanvasElement,
) {
  const { svg } = data
  const ctx = canvas?.getContext("2d")
  if (ctx) {
    const v = await Canvg.from(ctx, svg)
    await v.render()
  }

  const pngUrl = canvas?.toDataURL()
  return pngUrl
}
async function svgToImageHtml(
  svgElement: SVGSVGElement,
  svgHtml: string,
  canvas: HTMLCanvasElement,
) {
  // const { width, height } = svgElement.getBBox() || {}
  const { width, height } = svgElement.getBoundingClientRect() || {} // svgElement.getBoundingClientRect()会有更好的效果
  const imageUrl = await svgToPngUrl({ width, height, svg: svgHtml }, canvas)
  const imageHtml = `<img alt="${NTV_IMG_ALT}" src="${imageUrl}" width="${width}" height="${height}"/>`
  return imageHtml
}
function transformArrowToText(svgElement: SVGSVGElement, html: string) {
  let newHtml = html
  const svgHtml = svgElement.outerHTML
  if (isNegativeArrow(svgElement)) {
    newHtml = newHtml.replace(svgHtml, "-")
  }
  if (isPositiveArrow(svgElement)) {
    newHtml = newHtml.replace(svgHtml, "+")
  }
  return newHtml
}

export async function transformHtml({
  elements = [],
  imageExtra,
  replaceType = "image",
}: {
  elements: HTMLCollectionOf<Element> | HTMLElement[]
  replaceType?: "image" | "text" | "none"
  imageExtra?: ImageExtra
}) {
  let originalHtml = ""

  for (let i = 0; i < elements.length; i += 1) {
    const element = (elements as HTMLCollectionOf<Element>).item?.(i) || elements?.[i]
    originalHtml += element?.outerHTML || "" // 使用空字符串作为默认值 zyx
  }
  let newHtml = originalHtml
  debugger

  const canvasForCopy = document.createElement("canvas")
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i]
    const allDivs = element.querySelectorAll("div")
    const svgElements = element.getElementsByTagName("svg")
    const canvasElements = element.getElementsByTagName("canvas")
    // 过滤出类名以 'ant-space css-dev-only-do-not-override-2i2tap' 开头的div元素
    const selectorElements = Array.from(allDivs).filter((div) =>
      div.className.startsWith("ant-space css-dev-only-do-not-override-2i2tap"),
    )
    for (let l = 0; l < selectorElements.length; l += 1) {
      const selectorElement = selectorElements[l]
      const selectorHtml = selectorElement.outerHTML
      if (replaceType === "image") {
        const imageHtml = selectorToTextHtml(selectorElement, imageExtra)
        newHtml = newHtml.replace(selectorHtml, imageHtml)
      }
    }
    // const selectorElements
    for (let k = 0; k < canvasElements.length; k += 1) {
      const canvasElement = canvasElements[k]
      const elemHtml = canvasElement.outerHTML
      if (replaceType === "image") {
        const imageHtml = canvasToImageHtml(canvasElement, imageExtra)
        newHtml = newHtml.replace(elemHtml, imageHtml)
      }
    }
    for (let j = 0; j < svgElements.length; j += 1) {
      const svgElement = svgElements[j]
      const svgHtml = svgElement.outerHTML
      if (replaceType === "image") {
        if (isNegativeArrow(svgElement) || isPositiveArrow(svgElement)) {
          // 因为箭头 svg 转图片有点问题，所以先转 text
          newHtml = transformArrowToText(svgElement, newHtml)
        } else if (!isEyeIcon(svgElement)) {
          // eslint-disable-next-line no-await-in-loop
          const imageHtml = await svgToImageHtml(svgElement, svgHtml, canvasForCopy)
          newHtml = newHtml.replace(svgHtml, imageHtml)
        }
      } else if (replaceType === "text") {
        newHtml = transformArrowToText(svgElements[j], newHtml)
      }
    }
    // debugger
  }

  return newHtml
}

export async function getNarrativeHtml(
  container: HTMLElement,
  imageExtra?: ImageExtra,
  replaceType: "image" | "text" | "none" = "image",
) {
  //   debugger
  const elements = container?.getElementsByClassName(NTV_CONTAINER_CLS)
  const transformedHtml = await transformHtml({ elements, imageExtra, replaceType })
  return transformedHtml
}

export async function getNarrativeHtml4Export(
  container: HTMLElement,
  imageExtra?: ImageExtra,
  replaceType: "image" | "text" | "none" = "image",
) {
  //   debugger
  const elements = container?.getElementsByClassName(NTV_CONTAINER_CLS)
  let originalHtml = ""

  for (let i = 0; i < elements.length; i += 1) {
    const element = (elements as HTMLCollectionOf<Element>).item?.(i) || elements?.[i]
    originalHtml += element?.outerHTML || "" // 使用空字符串作为默认值 zyx
  }
  return originalHtml
}
