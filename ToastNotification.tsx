import React, { useRef, useState } from 'react'

function ToastNotification() {

    const [toast,setToast]=useState([]);
    const timer=useRef({})

    const handleClose=(id)=>{
       clearTimeout(timer.current[id])
       delete timer.current[id]
       setToast((prev)=>{
        let filterToast=[...prev]
         filterToast=filterToast?.filter((val)=>val.id!=id);
        return filterToast
       })
    }

    const handleToast=(message,type)=>{
        const id = new Date().getTime();

    const newToasts = [...toast, { id, message, type }];
    setToast(newToasts);
      timer.current[id]=setTimeout(()=>handleClose(id),5000);
    }
  return (
    <>
   
   <div style={{position:'fixed',top:'0.5rem',right:'0.5rem'}}>
        {toast.map((val,index)=>(
            <div key={index} className={`toast-notification ${val.type}`}>
                <span>{val?.message}</span><span onClick={()=>handleClose(val.id)}>X</span>
            </div>
        ))}
    
    </div>
    <div className="toast-container">
        <button onClick={()=>handleToast('Success','Success')}>Success</button>
        <button onClick={()=>handleToast('Warning','Warning')}>Warning</button>
        <button onClick={()=>handleToast('Info','Info')}>Info</button>
        <button onClick={()=>handleToast('Error','Error')}>Error</button>
    </div>
    </>
  )
}

export default ToastNotification
