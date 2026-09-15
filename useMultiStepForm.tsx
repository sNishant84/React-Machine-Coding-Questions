import React, { ReactElement, useState } from 'react'

function useMultiStepForm(steps:ReactElement[]) {
    const [currentStep,setCurrentStep]=useState(0);

    const Next=()=>{
          if(currentStep>=steps.length-1){
            setCurrentStep(currentStep)
          }else{
            setCurrentStep(prev=>prev+1);
          }
    }
    const Prev=()=>{
      if(currentStep==0){
        setCurrentStep(currentStep)
      }else{
        setCurrentStep(prev=>prev-1)
      }
    }
    
  return {
    Next,
    Prev,
    isFirst : currentStep == 0,
    isLast : currentStep==steps.length-1,
    step:steps[currentStep],
    steps:steps.length,
    currentStep,
    setCurrentStep
  }
}

export default useMultiStepForm
