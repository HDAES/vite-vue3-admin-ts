/*
 * @Descripttion: 水印
 * @Author: Hades
 * @Date: 2021-10-19 14:05:12
 */

export interface WaterMark {
    set: Function
    out: Function
}


let watermark: WaterMark = {
  set: () =>{},
  out: () =>{}
}

let setWatermark = (str: string) => {
  let id = '1.23452384164.123412415'
  let doc =  document.getElementById(id)
  if (doc !== null) {
    document.body.removeChild(doc)
  }
  let can: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement
  can.width = 150
  can.height = 120
  
  let cans : CanvasRenderingContext2D = can.getContext('2d') as CanvasRenderingContext2D
  cans.rotate(-20 * Math.PI / 180)
  cans.font = '20px Vedana'
  cans.fillStyle = 'rgba(200, 200, 200, 0.20)'
  cans.textAlign = 'left'
  cans.textBaseline = 'middle'
  cans?.fillText(str, can.width / 3, can.height / 2)
  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = document.documentElement.clientWidth  + 'px'
  div.style.height = document.documentElement.clientHeight  + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}
// 该方法只允许调用一次
watermark.set = (str) => {
  let id = setWatermark(str)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str)
    }
  }, 500)
  window.onresize = () => {
    setWatermark(str)
  }
}

watermark.out = () =>{
    let id = '1.23452384164.123412415'
    let doc = document.getElementById(id)
    if ( doc !== null) {
        doc.style.display = 'none'
    }
}

export default watermark