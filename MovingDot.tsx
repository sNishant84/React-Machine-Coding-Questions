import React, { useState } from 'react'

function MovingDot() {
    const [cordinate,setCoordinate]=useState({
        x:0,
        y:0
    })

    const handlePointer=(e)=>{
        setCoordinate({
        x:e.clientX,
        y:e.clientY
      })
    }

    console.log("dot",cordinate)
  return (
    <div style={{height:'100vh',width:'100vw',position:'relative'}}  onPointerMove={(e)=>handlePointer(e)}>
        <div className="pointer" style={{transform:`translate(${cordinate.x}px,${cordinate.y}px)`}}></div>

    </div>
  )
}

export default MovingDot
