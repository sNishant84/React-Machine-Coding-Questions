import React, { useState } from 'react'

function Stepper() {

    const [active,setActive]=useState(0)
    const steps = [
        {
          label: "Personal Info",
          content: <div>Personal Information Content</div>,
        },
        {
          label: "Account Info",
          content: <div>Account Info Content</div>,
        },
        {
          label: "Payment",
          content: <div>Payment Content</div>,
        },
        {
          label: "Confirmation",
          content: <div>Confirmation Content</div>,
        },
        {
          label: "Review",
          content: <div>Review Content</div>,
        },
      ];

      const handleNext=()=>{
        if(active<steps.length-1){
            setActive(prev=>prev+1)  
        }
      }

      const handlePrev=()=>{
        if(active>0){
            setActive(prev=>prev-1) 
        }
      }
  return (
    <div className="stepper">
        {steps.map((val,index)=>{
            return(
                <div className="steppers-container">
                <div className="steps" style={{backgroundColor:`${index<=active ? 'blue' : '' }`}}>
                    {index+1}
                   {index < steps.length-1 && <div className="line" style={{backgroundColor:`${index<active ? 'blue' : '' }`}}></div>}
                </div>
                <div className="steps-label">{val.label}</div>
                </div>

            )
        })}

        <div>
            {steps[active].content}
        </div>
        <div>
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
        </div>

    </div>
  )
}

export default Stepper
