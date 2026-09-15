import React, { useState } from 'react';
import commentData from "./commentData.json"


export const CommentContext=React.createContext();

export const CommentContextWrapper=({children})=>{

const [comment,setComments]=useState(commentData);

const addComment=(id,value)=>{
    const newId=Date.now();
    const parentId=id;
    const newData={
        id:newId,
        value:value,
        parentId:id,
        children:[]
    };
    
    const newComment={...comment,[newId]:newData};
    newComment[parentId].children.push(newId);
    setComments(newComment);

}
const deleteComment=(id)=>{
 const newState={...comment};
 const parentId=newState[id].parentId;
 newState[parentId].children=newState[parentId].children.filter((el)=>el!=id);
 const queue=[id];
 while(queue.length){
    const currentId=queue.shift();
    if(newState[currentId].children){
        queue.push(...newState[currentId].children)
        delete newState[currentId];
    }
 }
 setComments(newState)
}

const editComment=(id,value)=>{
  const newState={...comment};
  newState[id].value=value;
  setComments(newState)
}

   return( <CommentContext.Provider value={{comment,addComment,deleteComment,editComment}}>
        {children}
    </CommentContext.Provider>)
}

