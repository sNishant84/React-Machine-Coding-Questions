import React,{useState} from 'react'

function GridLight() {
  const [order,setOrder]=useState<Number[]>([]);
  const [isDeactivating,setIsDeactivating]=useState<boolean>(false);
  const config=[
    [1,1,1],
    [1,0,1],
    [1,1,1]
  ]


  const handleClick=(index:Number)=>{
    const newOrder=[...order,index];
    setOrder(newOrder);
   if(newOrder.length == config.flat(1).filter(Boolean).length){
    setDeactivating()
   }
  }
  const setDeactivating=()=>{
    setIsDeactivating(true);
   const timeout=setInterval(()=>{
    setOrder((prevOrder:Number[])=>{
        const newOrder:Number[]=[...prevOrder];
        newOrder.pop();
        if(newOrder.length==0){
          clearInterval(timeout);
          setIsDeactivating(false);
        }
        return newOrder
    })

   },3000)
  }
  return(
    <div className="gridContainer" style={{
      gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
    }}>
      {config.flat(1).map((value,index)=>{
        return (
          value ? <button disabled={isDeactivating || order.includes(index)} key={index} className={`grid-button ${order.includes(index) ? 'grid-active' : ''}`} onClick={()=>handleClick(index)}></button> : <span></span>
        )
      })}
    </div>
  )
}

export default GridLight
