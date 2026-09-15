import React,{useState,useRef} from 'react';


const COLORS=['red','yellow','green','blue','orange','pink'];
const diameter=50;
function Circleredo() { 
    const [circle,setCircle]=useState([]);
    const [stack,setStack]=useState([]);
    const canvasRef=useRef()

    function getRandomIndex(){
    const index=Math.floor(Math.random()*COLORS.length);
    return index
    }

    const generateCirle=(e)=>{
        if(canvasRef.current){
            const rect=canvasRef.current.getBoundingClientRect();
            const {clientX,clientY}=e;
            const _clientX=clientX-rect.left;
            const _clientY=clientY-rect.top;
            
            const colorIndex=getRandomIndex();
            const color=COLORS[colorIndex];
            setCircle((prev)=>[...prev,{id:Date.now(),color:color,_clientX,_clientY}])
        }
       
    }


    const Circle=({key,color,_clientX,_clientY})=>{
        const radius=diameter/2
        const top=_clientY-radius;
        const left=_clientX-radius;
     return(
        <span key={key} style={{
           position:'absolute',
           backgroundColor:`${color}`,
           borderRadius:'50%',
           top,
           left,
           height:`${diameter}px`,
           width:`${diameter}px`
        }}>

        </span>
     )
    }

    const onUndo=()=>{
    const lastCircle=circle.pop();
    setStack((prev)=>[...prev,lastCircle]);
    }

    const onRedo=()=>{
        const lastCircle=stack.pop();
        setCircle((prev)=>[...prev,lastCircle]);
    }
    const reset=()=>{
        setStack([]);
        setCircle([]);
    }
    const undoDisabled=circle.length==0
    const redoDisabled=stack.length==0
    const resetDisabled=circle.length==0 && stack.length==0
  return (
    <div>
        <button onClick={onUndo} disabled={undoDisabled}>Undo</button>
        <button onClick={onRedo} disabled={redoDisabled}>Redo</button>
        <button onClick={reset} disabled={resetDisabled}>Reset</button>
    <div className="circleContainer" ref={canvasRef} onClick={generateCirle}>
       {circle.map((value)=>{
        return(
            <Circle key={value.id} {...value} />
        )
       })}
    </div>
    </div>
  )
}

export default Circleredo
