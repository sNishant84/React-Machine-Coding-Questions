import React, { useEffect, useState } from 'react'

function MemoryGame() {

    const generateGrid=()=>{
        const arr=Array.from({length:18},(_,index)=>index+1);
        const grid=[...arr,...arr].sort(()=>Math.random()-0.5);
        const card =grid.map((item,index)=>{
            return({
                id:index,number:item,isFlipped:false
        })
        })
        return card
    }

    const [cards,setCard]=useState(generateGrid());
    const [isLock,setLock]=useState(false);
    const [flippedCard,setFlippedCards]=useState([])
    console.log("cards",cards)

    const handleClick=(index)=>{
       if(cards[index].isFlipped || isLock) return;
        const updatedCard=[...cards];
        updatedCard[index].isFlipped=true;
        setCard(updatedCard);
        setFlippedCards([...flippedCard,index])
    }

    useEffect(()=>{
        if(flippedCard.length==2){
        setLock(true);
        setTimeout(()=>{
                if(cards[flippedCard[0]].number!=cards[flippedCard[1]].number){
                    setCard((prev)=>{
                        const copy=[...prev];
                        copy[flippedCard[0]].isFlipped=false;
                        copy[flippedCard[1]].isFlipped=false;
                        return copy
                    })
                }
              setLock(false);
              setFlippedCards([])

        },2000)
    }

    },[flippedCard])
  return (
    <div className="memoryContainer">
        {cards.map((item,index)=>{
            return(<div className="memoryItem" key={index} onClick={()=>handleClick(index)}>
                {item.isFlipped ? item.number : '?'  }
            </div>)
        })}
    </div>
  )
}

export default MemoryGame
