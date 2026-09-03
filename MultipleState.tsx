import React, { useEffect, useState } from 'react'

function MultipleState() {
    const [count,setCounter]=useState(0);

    const setStorage=()=>{
    if(localStorage.getItem('count')){
        setCounter(localStorage.getItem('count'))
    }
    }

    useEffect(()=>{
    window.addEventListener('storage',setStorage)
    },[])

    const updateCounter=()=>{
        setCounter((prev)=>{
            localStorage.setItem('count',prev+1)
            return prev+1
        })
        
    }
  return (
    <>
    <div>{count}</div>
    <button onClick={()=>updateCounter()}>Increement</button>
    </>
  )
}

export default MultipleState

// import React, { useState, useEffect } from 'react';

// function CrossTabCounter() {
//     const [counter, setCounter] = useState(0);
    
//     useEffect(() => {
//         // Step 1: Create a "walkie-talkie" channel
//         const channel = new BroadcastChannel('my-counter-channel');
        
//         // Step 2: Listen for messages from other tabs
//         channel.onmessage = (event) => {
//             console.log('Message received from another tab:', event.data);
//             setCounter(event.data.counter);
//         };
        
//         // Step 3: Cleanup when component unmounts
//         return () => {
//             channel.close();
//         };
//     }, []);
    
//     const handleIncrement = () => {
//         const newCounter = counter + 1;
//         setCounter(newCounter);
        
//         // Step 4: Tell all other tabs about the change
//         const channel = new BroadcastChannel('my-counter-channel');
//         channel.postMessage({ counter: newCounter });
//         channel.close();
//     };
    
//     const handleDecrement = () => {
//         const newCounter = counter - 1;
//         setCounter(newCounter);
        
//         // Tell other tabs
//         const channel = new BroadcastChannel('my-counter-channel');
//         channel.postMessage({ counter: newCounter });
//         channel.close();
//     };
    
//     return (
//         <div>
//             <h1>Counter: {counter}</h1>
//             <button onClick={handleIncrement}>+</button>
//             <button onClick={handleDecrement}>-</button>
//             <p>Open this page in multiple tabs and try clicking the buttons!</p>
//         </div>
//     );
// }

// export default CrossTabCounter;
