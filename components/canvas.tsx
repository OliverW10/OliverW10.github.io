import styles from "./Canvas.module.css"
import React from 'react'

interface Line{
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

export default function Canvas(){
  // get window size to resize canvas buffer to match actual size
  // https://stackoverflow.com/a/63827136
  const [width, setWidth] = React.useState(100)
  const [height, setHeight] = React.useState(100)
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  React.useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // ref stops from reseting on rerender
  const canvasEl = React.useRef<HTMLCanvasElement>(null);
  // const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  const ctx = canvasEl.current?.getContext("2d")
  if(ctx){
    ctx.imageSmoothingEnabled= false
  }
  // idk
  React.useLayoutEffect(()=>{
    if(canvasEl.current?.style.width != canvasEl.current?.width){
      updateDimensions()
    }
  })

  const onmove = (e: React.MouseEvent<HTMLCanvasElement>)=>{
    if(!ctx){
      console.log("no ctx");
      return
    }
    if(e.buttons == 1){
      const canvasRect = (canvasEl.current as HTMLCanvasElement).getBoundingClientRect()
      ctx.beginPath()
      ctx.moveTo(e.clientX-e.movementX, e.clientY-e.movementY-canvasRect.top)
      ctx.lineTo(e.clientX, e.clientY-canvasRect.top)
      ctx.stroke();
    }
  }
  return <>
    <canvas id={styles.canvas} ref={canvasEl} onMouseMove={onmove} width={width+"px"} height={(height)+"px"}></canvas>
  </>
}
