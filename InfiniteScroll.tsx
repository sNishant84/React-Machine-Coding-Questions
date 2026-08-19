import React, { useEffect, useState } from 'react'

function InfiniteScroll() {
    const [pageNo,setPage]=useState(1);
    const [data,setData]=useState([])

    useEffect(()=>{
        fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`)
        .then((res)=>res.json())
        .then((data)=>setData((prev)=>[...prev,...data]));

    },[pageNo])

    useEffect(()=>{
        const observer=new IntersectionObserver((param)=>{
            if(param[0].isIntersecting){
                observer.unobserve(lastImage);
                setPage((page)=>page+1);
            }
        },{
            threshold:0.7
        }
        )
        const lastImage=document.querySelector('.image-post:last-child');
        if(!lastImage){
            return
        }
        observer.observe(lastImage)
    },[data])
  return (
    <div className="infinite-container">
        {data.map((val,index)=>(
            <img className="image-post" style={{height:'400px',width:'200px'}} key={index} src={val.download_url} />
        ))}
    </div>
  )
}

export default InfiniteScroll
