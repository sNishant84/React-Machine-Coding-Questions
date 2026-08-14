import React, { useContext, useState } from 'react';
import { FileContext } from './FileContext';


function FileExplorer({id=1}) {

  const [showChildren,setChildren]=useState(false);
  const [showInput,setShowInput]=useState(false);
  const [showEdit,setShowEdit]=useState(false);

  console.log("node")

  const {node,addNode,deleteNode,editNode} = useContext(FileContext);
 

  return (
   <div>
   {showEdit ?  
   <Input id={id} name={node[id].name} setShowInput={setShowEdit} addNode={editNode} />
   :
    (<><span>{node[id]?.type == 'folder' ? showChildren ? "📂" : "📁" : "📄"}</span>
     <span onClick={()=>setChildren(prev=>!prev)}>{node[id]?.name}</span>
     {node[id]?.type=='folder' && <span onClick={()=>setShowInput((prev)=>!prev)}>➕</span>}
    <span onClick={()=>setShowEdit((prev=>!prev))}>🖊️</span>
    <span onClick={()=>deleteNode(id)}>❌</span></>)}
     {showInput &&  <Input id={id} setShowInput={setShowInput} addNode={addNode} /> }

      {showChildren ?
        node[id]?.children?.map((childId,index)=>{
          return(
            <FileExplorer id={childId} key={index} />
          )
        })
     : <></> }
   </div>
  )
}


function Input({id,setShowInput,addNode,name=''}){

  const [query,setQuery]=useState(name);

  return(
    <div>
      <input type="text" onChange={(e)=>setQuery(e.target.value)} />
      <span onClick={()=>{
        addNode(id,query);
        setShowInput((prev)=>!prev);
      }
        }>✅</span>
      <span onClick={()=>setShowInput((prev)=>!prev)}>❌</span>
    </div>
  )
}

export default FileExplorer
