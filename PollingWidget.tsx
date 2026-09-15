import React, { useState } from 'react'

function PollingWidget() {

    const [options, setOptions] = useState([
        {
          id: 1,
          name: "Python",
          count: 0,
          per: 0
        },
        {
          id: 2,
          name: "C++",
          count: 0,
          per: 0
        },
        {
          id: 3,
          name: "Java",
          count: 0,
          per: 0
        },
        {
          id: 4,
          name: "C",
          count: 0,
          per: 0
        }
      ]);

      const getPrecentage=(count)=>{
        let totalCount=options.reduce((acc,curr)=>acc+curr.count,0)+1
        return (count/totalCount)*100
      }

      const handleVote=(id)=>{
      let arr=[...options];
       arr=arr.map((val)=>{
        if(val.id == id){
            return {
                ...val,
               count:val.count+1,
               per:Math.floor(getPrecentage(val.count+1))
            }
        }else{
            return {...val,
                per:Math.floor(getPrecentage(val.count))}
        }
       })
        setOptions(arr)
      }

      console.log("ddd",options)
  return (
    <div className="polling-container">
        {options.map((val,index)=>{
         return <div className="polling-item" key={index} onClick={()=>handleVote(val.id)} style={{background:`linear-gradient(to right,blue ${val.per}%,white ${val.per-100}%)`}}>
                {val.name} {val.per}%
            </div>
        })}
    </div>
  )
}

export default PollingWidget
