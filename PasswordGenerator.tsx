import React, { useState } from 'react'

function PasswordGenerator() {
    const [length,setLength]=useState(4);
    const [checkboxData,setCheckBoxData]=useState([
        {title:'Include Uppercase letters',state:false},
        {title:'Include Lowercase letters', state:false},
        {title:'Include Numbers', state:false},
        {title:'Include Symbols', state:false},
    ]);
    const [copied,setCopied]=useState(false);
    const [password,setPassword]=useState('');
    const [errorMessage,setErrorMessage]=useState('')

    const setCheckBoxValue=(e,index)=>{
        const copyState=[...checkboxData];
        copyState[index].state=!copyState[index].state
        setCheckBoxData(copyState);
    }

    const generatePassword=(checkboxData,length)=>{
        let charSet='';
        let generatedPassword='';

        let selectedCheckbox=checkboxData.filter((val)=>val.state);
        if(selectedCheckbox.length==0){
        setErrorMessage("please select any checkbox");
        }
        selectedCheckbox.forEach((value)=>{
            switch(value.title){
                case 'Include Uppercase letters':
                    charSet+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    break;
                case 'Include Lowercase letters':
                    charSet+='abcdefghijklmnopqrstuvwxyz';
                    break;
                case 'Include Numbers':
                    charSet+='0123456789';
                    break;
                case 'Include Symbols':
                    charSet+='!@#$%^&*()';
                default:
                    break;                
            }
        })
        for(let i=0;i<length;i++){
           const randomIndex=Math.floor(Math.random()*charSet.length);
           generatedPassword+=charSet[randomIndex];
        }
        setPassword(generatedPassword);
        setErrorMessage('');
    }

    const handleCopy=()=>{
        navigator.clipboard.writeText(password)
        setCopied(true);

        setTimeout(()=>{
            setCopied(false)
        },300)
    }
    const passwordStrengthChecker=(password)=>{
       let passwordLength=password.length;
       if(passwordLength<1){
        return ""
       }else if(passwordLength < 4){
        return "PassWord is weak";
       }else if(passwordLength < 8){
        return "Poor";
       }else if(passwordLength < 12){
        return "Medium"
       }else if(passwordLength < 16){
        return "strong"
       }else{
        return "very Strong"
       }
    }
  return (
    <>
    <div>
        <div>
          {password}  <button onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
        </div>
        <span>{length}</span>
        <input type="range" value={length} min={4} max={20} onChange={(e)=>setLength(e.target.value)} />
    </div>
    <div>
        {checkboxData.map((value,index)=>{
            return(
                <div>
                <input type="checkbox"   checked={value.state} onChange={(e)=>setCheckBoxValue(e,index)} /> 
                <label>{value.title}</label>
                </div>
            )
        })}
    </div>
    <div>
         Strength  {passwordStrengthChecker(password)}
    </div> 
    <div>
       <button onClick={()=>generatePassword(checkboxData,length)}>Generate Password</button>
    </div>
    </>
  )
}

export default PasswordGenerator
