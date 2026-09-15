import React, { useState } from "react";

const size=3

function TicTacToe() {
    const initializeState=()=>{
        return Array.from({length:size},()=>Array(size).fill(null))
    }
    const [board,setBoard]=useState(
        initializeState()
    );
    const [turnX,setTurnX]=useState(true);
   console.log("board",board)
   
    
    const checkWinner=(board,size)=>{
        //check for rows
        for(let i=0;i<size;i++){
            let symbol=board[i][0]
            if(symbol){
                let winner=true;
                for(let j=1;j<size;j++){
                    if(board[i][j]!=symbol){
                        winner =false;
                        break;
                    }
                }
                if(winner){
                    return symbol
                }
            }
            
        }

        //check for columns
        for(let j=0;j<size;j++){
            let symbol=board[0][j];
            if(symbol){
                let winner =true;
                for(let i=1;i<size;i++){
                    if(board[i][j]!=symbol){
                        winner=false;
                        break;
                    }
                }
                if(winner){
                    return symbol;
                }
            }
        }
        //check for diagonal
      let symbol=board[0][0];
      if(symbol){
      let  winner =true;
      for(let i=1;i<size;i++){
        if(board[i][i]!=symbol){
            winner=false;
            break;
        }

      }
      if(winner){
        return symbol;
      }
      }

      // check for anti diagonal
       symbol=board[0][size-1];
     
       if(symbol){
        let  winner=true;
        for(let i=1;i<size;i++){
      if(board[i][size-1-i]!=symbol){
        winner=false;
        break;
      }
        }
        if(winner){
            return symbol
        }
       }
     return null
    }
   let winner= checkWinner(board,size)
    const status=winner ? `${winner} is a winner` : turnX ? 'Player X Turn' : 'Player O Turn';
    
    const handleClick=(rowIndex,colIndex)=>{
        if(board[rowIndex][colIndex] || winner){
            return
        }
        const deepCopy=JSON.parse(JSON.stringify(board));
        deepCopy[rowIndex][colIndex]=turnX ? 'X' : 'O';
        setBoard(deepCopy)
       setTurnX((prev)=>!prev)
    }

    const handleReset=()=>{
      setBoard(initializeState)
    }

   
  return (
    <div className="container">
     <div className="board" style={{gridTemplateColumns:`repeat(${size},50px)`}}>
        {
            board.map((row,rowIndex)=>{
                return(
                    row.map((cell,colIndex)=>{
                        return(
                            <div className="cell"  key={colIndex} onClick={()=>handleClick(rowIndex,colIndex)}>{cell}</div>
                        )
                    })
                )
            })
        }
      

     </div>
     <div>{'Status'} <span>{status}</span></div> 
       <button onClick={handleReset}>Reset</button>

    </div>
  )
}

export default TicTacToe
