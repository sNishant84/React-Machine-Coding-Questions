import React, { useEffect, useState } from 'react'

function AutoComplete() {
    const [data,setData]=useState([]);
    const [input,setInput]=useState('');
    const [show,setShow]=useState(true);
    const cache = useRef({});

useEffect(() => {
  if (input === "" || !show) {
    setData([]);
    return;
  }

  if (cache.current[input]) {
    setData(cache.current[input]);
    return;
  }

  const timer = setTimeout(() => {
    fetch(`https://dummyjson.com/products/search?q=${input}`)
      .then(res => res.json())
      .then(res => {
        setData(res.products);
        cache.current[input] = res.products;
      });
  }, 500);

  return () => clearTimeout(timer);
}, [input]);

    const handleClick=(value)=>{
        setInput(value);
        setData([]);
        setShow(false)
        return;
    }

  return (
    <div  style={{position:'relative',width:'400px'}}>
    <input type="text" placeholder="search" style={{width:'100%'}} value={input} onChange={(e)=>setInput(e.target.value)} autoComplete={show}   />
   { <ul className="autocomplist">
    {
      data.map((val,index)=>(
        <li style={{padding:'10px',cursor:'pointer'}} onClick={()=>handleClick(val?.title)}>{val?.title}</li>
      ))
    }
    </ul>}

    </div>
  )
}

export default AutoComplete
