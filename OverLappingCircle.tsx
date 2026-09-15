import React, { useEffect, useState } from 'react'

const RADIUS=50;

function OverLappingCircle() {
    const [circles,setCircles]=useState([]);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    const drawCircle=(e)=>{
        const {clientX,clientY}=e

        const newCircleCords={
             top:clientY-RADIUS,
             left:clientX-RADIUS,
            right:clientX-RADIUS+(RADIUS*2),
            bottom:clientY-RADIUS+(RADIUS*2),
            background:'red'
        }
        setCircles((prev)=>{
           for(let i=0;i<prev.length;i++){
            const collide=elementOverlap(newCircleCords,prev[i]);
            if(collide){
                newCircleCords.background=getRandomColor()
            }
           }
           return [...prev,newCircleCords]
        })

    }

    const elementOverlap=(circle1,circle2)=>{
     const collide=!(circle1.top>circle2.bottom || circle1.right < circle2.left || circle1.bottom < circle2.top || circle1.left > circle2.right);
     return collide
    }
    useEffect(()=>{

        document.addEventListener('click',drawCircle)
    },[])
  return (
    <div style={{width:'100vh',height:'100vh'}}>
        {circles.map((val)=>{
            return <div style={{width:RADIUS*2,height:RADIUS*2,top:val.top,left:val.left,position:'absolute',background:val.background,borderRadius:'50%'}}></div>
        })}
    </div>
  )
}

export default OverLappingCircle
