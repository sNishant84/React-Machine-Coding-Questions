import React, { useState } from 'react'

const size=4;

function StarRating() {
    const [starValue,setStarValue]=useState();
    const [hoverValue,setHoverValue]=useState(0);
  return (
    <div>
        {
         new Array(size).fill(0).map((Val,index)=>(
            <span key={index} className={`${index < starValue && hoverValue ==0 || index < hoverValue ? 'gold' : ''}`} onClick={()=>setStarValue(index+1)}
            onMouseEnter={()=>setHoverValue(index+1)}
            onMouseLeave={()=>setHoverValue(0)}
            >
                  &#9733;
            </span>
         ))
        }
    </div>
  )
}

export default StarRating
