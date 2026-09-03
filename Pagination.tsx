import React, { useEffect, useState } from 'react'

function Pagination() {
const [currentPage,setPage]=useState(1);
const [data,setData]=useState([]);
// const [totalPages,setTotal]=useState(0) //if we want backend driven

useEffect(()=>{

    async function getData(){
      try{
        const data = await fetch('https://fakestoreapi.com/products/');
        // const data = await fetch('https://fakestoreapi.com/products/?limit=${pageSize}&skip=${currentPage-1*pageSize}');
        const productData=await data.json();
        console.log(productData)
        setData(productData)
        // setTotal(productData.total/page_size)

      }catch(err){
        console.log(err)
      }
    }
    getData()

},[]) 
const page_size=10;
console.log(data)
let totalPages=Math.floor(data.length/page_size)
const products=data.slice((currentPage-1)*page_size,currentPage*page_size)
console.log("prod",products,totalPages)
  return (
    <>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}}>
     {products.map((val,index)=>{
        return(
                <div style={{border:'1px solid black',textAlign:'center',padding:'10px'}}>
                <div>
                <img src={val.image}  style={{width:'200px',height:'200px',objectFit:'contains'}} />
               </div>
                <div>
                    <div>{val.title}</div>
                    <div>{val.price}</div>
                </div>
            </div>
        )
     })}
    </div>
    <div style={{display:'flex',justifyContent:'center'}}>
        <button onClick={()=>setPage((prev)=>prev-1)}>Prev</button>
      {[...Array(totalPages).keys()].map((val,index)=>{
        return(
            <div>
                <span onClick={()=>setPage(val+1)}  style={{backgroundColor: currentPage == val+1 ? 'blue' : ''}}> {val+1}</span>
            </div>
        )
      })}
       <button onClick={()=>setPage((prev)=>prev+1)}>Next</button>
    </div>
    </>
  )
}

export default Pagination
