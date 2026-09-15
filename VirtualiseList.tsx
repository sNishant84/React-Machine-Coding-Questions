import React, { useState } from 'react'

function VirtualiseList() {
     const height=400;
     const width=300;
     const itemHeight=35;
     const LisData=Array.from({length:1000},(_,index)=>index+1);
     const [indices,setIndices]=useState([0,Math.floor(height/itemHeight)]);
     

     const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  };
     const visibleList=LisData.slice(indices[0],indices[1]+1);
  return (
    <div  style={{height:height,width:width,background:'grey',overflow:'auto'}} onScroll={handleScroll}>
        <div style={{ height: LisData.length * itemHeight, position: "relative" }}>
            {visibleList.map((item,index)=>{
                return(<div
                    className="item"
                    key={index}
                    style={{
                      height: itemHeight,
                      background: "coral",
                      borderTop: "5px solid grey",
                      position: "absolute",
                      top: (indices[0] + index) * itemHeight,
                      width: "100%",
                      textAlign: "center",
                      color: "whitesmoke",
                    }}
                  >
                    {"Item " + item}
                  </div>)
            })}
        </div>

    </div>
  )
}

export default VirtualiseList;
