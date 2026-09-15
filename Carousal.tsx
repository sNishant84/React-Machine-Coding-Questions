import React, { useEffect, useRef, useState } from 'react';
import data from "./data.json";

function Carousal() {
 const [active,setActive]=useState(0);

 const intervalRef=useRef();

 const handleNext=()=>{
    if(active!=data.length-1){
        setActive((prev)=>prev+1);
    }else{
        setActive(0);
    }
 }
    const handlePrev=()=>{
        if(active!=0){
            setActive((prev)=>prev-1);
        }else{
            setActive(data.length-1);
        }
    }

    useEffect(()=>{
    intervalRef.current=setInterval(handleNext,1000)

   return(()=>{
    clearInterval(intervalRef.current)
   })
    },[])
    
 
   return(
    // <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    //     <button className="carousal-button" onClick={handlePrev}>{'<'}</button>
    //     {data.map((val,index)=>(
    //         <div key={index} className="carousal-container" style={{display:`${active==index ? 'block' : 'none'}`}}>
    //             <img src={val.download_url} className="carousal-image" />
    //         </div>

    //     ))}
    //     <button className="carousal-button" onClick={handleNext}>{'>'}</button>
    // </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} onMouseEnter={()=>clearInterval(intervalRef.current)} onMouseLeave={()=>intervalRef.current=setInterval(handleNext,1000)}>
      <button className="carousal-button" onClick={handlePrev}>{'<'}</button>
           <div  className="carousal-container">
                <img src={data[active].download_url} className="carousal-image" />
          </div>
        <button className="carousal-button" onClick={handleNext}>{'>'}</button>
     </div>
   )
}

export default Carousal




// import React, { useEffect, useRef, useState } from "react";
// import data from "./data.json";

// function Carousal() {
//   const [active, setActive] = useState(0);
//   const intervalRef = useRef(null);

//   // ✅ Next slide (fixed stale state issue)
//   const handleNext = () => {
//     setActive((prev) => (prev === data.length - 1 ? 0 : prev + 1));
//   };

//   // ✅ Previous slide
//   const handlePrev = () => {
//     setActive((prev) => (prev === 0 ? data.length - 1 : prev - 1));
//   };

//   // ✅ Start autoplay
//   const startAutoPlay = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(handleNext, 1000);
//   };

//   // ✅ Stop autoplay
//   const stopAutoPlay = () => {
//     clearInterval(intervalRef.current);
//   };

//   // ✅ Initial mount
//   useEffect(() => {
//     startAutoPlay();

//     return () => {
//       clearInterval(intervalRef.current);
//     };
//   }, []);

//   // ✅ Preload next image
// useEffect(() => {
//   const nextIndex = (active + 1) % data.length;
//   const prevIndex = (active - 1 + data.length) % data.length;

//   [nextIndex, prevIndex].forEach((index) => {
//     const img = new Image();
//     img.src = data[index].download_url;
//   });
// }, [active]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "10px",
//       }}
//       onMouseEnter={stopAutoPlay}
//       onMouseLeave={startAutoPlay}
//     >
//       <button className="carousal-button" onClick={handlePrev}>
//         {"<"}
//       </button>

//       <div className="carousal-container">
//         <img
//           src={data[active].download_url}
//           className="carousal-image"
//           alt="carousel"
//           loading="eager"
//           style={{ width: "300px", height: "200px", objectFit: "cover" }}
//         />
//       </div>

//       <button className="carousal-button" onClick={handleNext}>
//         {">"}
//       </button>
//     </div>
//   );
// }

// export default Carousal;
