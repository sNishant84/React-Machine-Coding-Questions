import React, { useEffect, useRef, useState } from 'react'

const OTP_INPUT=5
function Otp() {
    const [inputArr,setInput]=useState(new Array(OTP_INPUT).fill(''));
    const refArr=useRef([]);

    useEffect(()=>{
        refArr?.current[0]?.focus();
    },[])

    const handleOnChange=(value,index)=>{
       if(isNaN(value)){
        return;
       }
       const newArr=[...inputArr];
       const newValue=value.trim();
       newArr[index]=newValue.slice(-1);
       setInput(newArr)
       newValue && refArr?.current[index+1]?.focus();
    }

    const handleKeyDown=(e,index)=>{
        if(!e.target.value &&  e.key=='Backspace') {
            refArr.current[index-1]?.focus();
        }
    }
  return (
    <div>
        {inputArr.map((val,index)=>{
           return <input type="text" ref={(input)=>(refArr.current[index]=input)} key={index} style={{height:'50px',width:'50px'}} value={inputArr[index]}  onChange={(e)=>handleOnChange(e.target.value,index)} onKeyDown={(e)=>handleKeyDown(e,index)} />
        })}
    </div>
  )
}

export default Otp
