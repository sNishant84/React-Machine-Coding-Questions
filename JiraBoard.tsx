import React,{useRef, useState} from 'react';

const tasks=
    {
        todo:["create a story","create workflow","create user dashboard"],
        InProgress:["build custom model","user workflow"],
        completed:["close all tickets","complete the work"]
    }


function JiraBoard() {

const [task,setTask]=useState(tasks);
const containerRef=useRef();
const itemRef=useRef();

const handleDragStart=(e,item,container)=>{
    e.target.style.opacity=0.5;
    itemRef.current=item;
    containerRef.current=container;
}

const handleDragEnd=(e)=>{
    e.target.style.opacity=1;
}

const handleDrop=(e,targetContiner)=>{
    setTask((prev)=>{
        let newState={...prev};
        newState[containerRef.current]=newState[containerRef.current].filter((val)=>val!=itemRef.current);
        newState[targetContiner]=[...newState[targetContiner],itemRef.current];
        return newState;
    })
}

const handleDragOver=(e)=>{
    e.preventDefault();
}
  return (
    <div className="jira-container">
        {
            Object.keys(task).map((container)=>(
                <div>
                <h1>{container}</h1>
                <div className="item-container" onDrop={(e)=>handleDrop(e,container)} onDragOver={handleDragOver}>
                {task[container].map((val,index)=>(
                    <div className="item" 
                    draggable 
                    style={{
                        userSelect: "none",
                        cursor: "move",
                      }}
                    onDragEnd={(e)=>handleDragEnd(e)}
                    onDragStart={(e)=>handleDragStart(e,val,container)}
                    >{val}</div>
                ))}
                </div>
                </div>
            ))
        }
    </div>
  )
}

export default JiraBoard
