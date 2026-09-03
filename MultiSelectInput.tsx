import React, { useEffect, useRef, useState } from 'react'

function MultiSelectInput() {
    const [searchTerm,setTerm]=useState('');
    const [suggestions,setSuggestions]=useState([])
    const [selectedUsers,setSelectedUsers]=useState([]);
    const [selectedUsersSet,setSelectedUsersSet]=useState(new Set());
    const [activeIndex,setActiveIndex]=useState(0)
    const inputRef=useRef();

    useEffect(()=>{
        if(searchTerm.trim()==''){
            setSuggestions([]);
            return;
        }
        fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error(err);
        });
    },[searchTerm])

    const handleSelect=(user)=>{
        setSelectedUsers((prev)=>[...prev,user]);
        setSelectedUsersSet(new Set([...selectedUsersSet,user.email]));
        setTerm("");
        setSuggestions([]);
        inputRef.current.focus();
    }

    const removeUser=(user)=>{
        const users=selectedUsers.filter((val)=>val.id!=user.id);
        setSelectedUsers(users);
        const updatedEmailSet=new Set(selectedUsersSet);
        updatedEmailSet.delete(user.email);
        setSelectedUsersSet(updatedEmailSet)
    }

    const handleBackspace=(e)=>{
        if(e.key=='Backspace' && e.target.value==='' && selectedUsers.length > 0){
       const lastUser=selectedUsers[selectedUsers.length-1];
       removeUser(lastUser)
       setSuggestions([])
        }else if(e.key=='ArrowDown' && suggestions?.users?.length >0){
            e.preventDefault();
            setActiveIndex((prev)=>prev!=suggestions?.users?.length-1 ? prev+1 : suggestions?.users?.length-1)
        }
    }

  return (
    <div style={{position:'relative'}}>

       <div className="multiInputContainer">
        {
            selectedUsers.map((value,index)=>{
           return  <div key={index} className="pills">
                <img style={{height:'100%'}} src={`${value.image}`} /><span onClick={()=>removeUser(value)}>{value.firstName} {value.lastName} &times;</span> 

             </div>
            })
        }

        <div>
            <input ref={inputRef} type="text" className="multi-input" placeholder="search user" value={searchTerm} onKeyDown={(e)=>handleBackspace(e)}  onChange={(e)=>setTerm(e.target.value)} />
          { suggestions?.users?.length > 0 && <ul className="list-container">
                {suggestions?.users?.map((value,index)=>(
                    !selectedUsersSet.has(value.email) ?
                    <li className={`list-item ${index==activeIndex ? 'list-active': ''}`} key={index} onClick={()=>handleSelect(value)}>
                        <img style={{height:'40px',width:'40px'}} src={`${value.image}`} /><span>{value.firstName} {value.lastName}</span>
                    </li> :<></>
                ))}
            </ul>}
        </div>
        </div>
    </div>
  )
}

export default MultiSelectInput
