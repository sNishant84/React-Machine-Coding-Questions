import React, { useState } from 'react'

function TransferList() {
    const [checked,setChecked]=useState([]);
    const [left,setLeft]=useState([1,2,3]);
    const [right,setRight]=useState([4,5,6,7])

    const handleChange=(val)=>{
     let newState=[...checked];
     if(checked.indexOf(val)==-1){
      newState.push(val)
     }else{
    newState.splice(checked.indexOf(val),1)
     }
     setChecked(newState)
    }

    const intersection=(a,b)=>{     
         return a.filter(id=>b.includes(id))
    }

    const notCommon=(a,b)=>{
        return a.filter(id=>!b.includes(id))
    }

    const handleRight=()=>{
        const checkedLeft=intersection(checked,left)
        let newLeft=notCommon(left,checkedLeft);
        let newChecked=notCommon(checked,checkedLeft)
        setLeft([...newLeft])
        setRight([...right,...checkedLeft])
        setChecked(newChecked)
        
    }
    const handleLeft=()=>{
        const checkedRight=intersection(checked,right);
        let newRight=notCommon(right,checkedRight)
        let newChecked=notCommon(checked,checkedRight)
        setRight([...newRight])
        setLeft([...left,...checkedRight])
        setChecked(newChecked)
        
    }

    const hanndleAllRight=()=>{
     setRight([...right,...left]);
     setLeft([])
    }
    const hanndleAllLeft=()=>{
    setLeft([...right,...left]);
     setRight([])
    }
    console.log(checked)
  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',border:'1px solid black',width:'30%' }}>
            <ul>
                
                {left.map((val,index)=>(
                    <li>
                    <input type="checkbox" id={`in-${val}`} checked={checked.includes(val)}   name='listItem' onChange={()=>handleChange(val)} />
                    <label htmlFor={`in-${val}`}>{val}</label>
                    </li>
                ))}
            </ul>
        </div>
        <div style={{display:'flex',flexDirection:'column',width: '10%'}}>
        <button onClick={()=>hanndleAllRight()}>&gt;&gt;</button>
        <button onClick={()=>handleRight()}>&gt;</button>
        <button onClick={()=>handleLeft()}>&lt;</button>
        <button onClick={()=>hanndleAllLeft()}>&lt;&lt;</button>
        </div>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',border:'1px solid black',width:'30%' }}>
            <ul>
            
                {right.map((val,index)=>(
                   <li>
                    <input type="checkbox" name='listItem' id={`in-${val}`} checked={checked.includes(val)} onChange={()=>handleChange(val)} />
                    <label htmlFor={`in-${val}`}>{val}</label>
                    </li>
                ))}
            </ul>
    </div>
    </div>
  )
}

export default TransferList
