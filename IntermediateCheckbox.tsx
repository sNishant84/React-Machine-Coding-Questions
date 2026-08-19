import React, { useState } from 'react'
const CheckboxesData = [
    {
      id: 1,
      label: "Fruits",
      children: [
        { id: 2, label: "Apple" },
        { id: 3, label: "Banana" },
        {
          id: 4,
          label: "Citrus",
          children: [
            { id: 5, label: "Orange" },
            { id: 6, label: "Lemon" },
          ],
        },
      ],
    },
    {
      id: 7,
      label: "Vegetables",
      children: [
        { id: 8, label: "Carrot" },
        { id: 9, label: "Broccoli" },
      ],
    },
  ];

function IntermediateCheckBox({data,checked,setChecked}) {
console.log("log",checked)
    const handleCheck=(isChecked,value)=>{
    setChecked((prev)=>{
    const newState={...prev,[value.id]:isChecked};
      const updatedNode=(value)=>{
        value?.children?.forEach((val)=>{
         newState[val.id]=isChecked
         val.children && updatedNode(val);
        })
      }
        updatedNode(value);

     const verifyCheck=(val)=>{
        if(!val.children) return newState[val.id] || false;

        const areAllChildrenChecked=val?.children.map((child)=>
             verifyCheck(child)
        )
        const areAllChecked = areAllChildrenChecked.every(Boolean);
        newState[val.id]=areAllChecked;
        return areAllChecked
     }


     CheckboxesData.forEach((val)=>verifyCheck(val));
      
          return newState

        })

    }
  return (
    <div>
        {
          data.map((value,index)=>{
            return(
                <div key={index} style={{marginLeft:'10px'}}>
                <input type="checkbox" checked={checked[value.id] || false} onChange={(e)=>handleCheck(e.target.checked,value)} />
                <span>{value.label}</span>
                {value.children && <IntermediateCheckBox data={value.children} checked={checked} setChecked={setChecked} />}
            </div>
            )
          })
        }
    </div>
  )
}

export default IntermediateCheckBox
