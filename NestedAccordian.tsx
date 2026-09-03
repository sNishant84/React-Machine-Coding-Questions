import React,{useState} from 'react';


const data=[
    {id:1,name:"parent1",parentId:null},
    {id:2,name:"child1.1",parentId:1},
    {id:3,name:"chile1.2",parentId:1},
    {id:4,name:"parent2",parentId:null},
    {id:5,name:"child2.1",parentId:4}
 ]

function NestedAccordian() {

    function buildData(data){
        const result=[];
        const parent={};
        data.forEach(item=>{
            if(item.parentId==null){
                parent[item.id]={...item,children:[]};
                result.push(parent[item.id]);
            }
        })

        data.forEach((item)=>{
            if(item.parentId!=null){
                parent[item.parentId].children.push(item)
            }
        })
        return result;
    }

const tree=buildData(data);
  return (
    <>
      {
        tree?.map(value=>{
            return(
                <List value={value} />
            )
         })
      }
      </>
  )
}


function List({value}){
    const[open,setOpen]=useState(false);
    return(
        <div style={{marginLeft:'10px'}}>
         <span> {open && value.children.length > 0 ? '-' : '+'}</span> <span onClick={()=>setOpen((prev)=>!prev)}>{value.name}</span>
           {open && value.children.length > 0 && value.children.map((val)=>{
            return(
                <List value={val}  />
            )
           })}
        </div>
    )
}

export default NestedAccordian
