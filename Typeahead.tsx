
import React, { useEffect, useState } from 'react';
function Typeahead() {
  const [query,setQuery]=useState("");
  const [product,setProduct]=useState([]);
  const [activeIndex,setActiveIndex]=useState(null)
  const [isAutoComplete,setAutoComplete]=useState(true)

  useEffect(()=>{
    console.log("query",query)
    const controller = new AbortController();
    const signal=controller.signal
    const fetchData=()=>{
      if(query=='' || !isAutoComplete){
        setProduct([])
        return ;
      }else{
       
        console.log("querys",query)
        fetch(`https://dummyjson.com/products/search?q=${query}`,{signal})
        .then(res => res.json())
       .then(res=>setProduct(res.products));
      } 
    }
   const timeout= setTimeout(fetchData,1000);

   return(()=>{
    clearInterval(timeout);
    controller.abort()
   })
    

  },[query])

  const handleKeyUp=(e)=>{
    if(e.keyCode==13){
      
    }else if(e.keyCode == 40 ){
      setActiveIndex(activeIndex==null || activeIndex == product.length-1 ? 0 : activeIndex+1);
    }else if(e.keyCode==38){
      setActiveIndex(activeIndex === 0 ? product.length - 1 : activeIndex - 1 );

    }
  }

  const handleListClick=(item)=>{
     setQuery(item)
     setProduct([])
     setAutoComplete(false)
     return
  }


  console.log("sss",product)
  return (
   <div className="container"> 
   <input type="text" className="input" value={query} onChange={(e)=>setQuery(e.target.value)} onKeyUp={handleKeyUp} autoComplete={isAutoComplete} />
   {product.length > 0 && <ul className="product-list">
     {product.map((val,index)=>{
      return(
        <li key={index} className={`${index==activeIndex ? 'active' : ''}`} onClick={()=>handleListClick(val.title)}>
          {val.title}
        </li>
      )
    })}
   </ul>}
   </div>
  )
};

export default Typeahead
