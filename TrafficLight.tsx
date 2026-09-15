import React, { useEffect, useState } from 'react'

function TrafficLight() {
    const light=['red','yellow','green'];
    const [currentLight,setCurrenLight]=useState(0)

    useEffect(()=>{
    const interval=setInterval(()=>{
        setCurrenLight((prev)=>(prev+1)%light.length)
    },1000)

    return ()=>{
        clearInterval(interval)
    }
    },[light])
  return (
    <div className="light-container">
     {light.map((color,index)=>{
       return(
        <div className="light" key={index} style={{backgroundColor:`${light[currentLight] == color ? color : ''}`}}>

        </div>
       )
     })}
    </div>
  )
}

export default TrafficLight
