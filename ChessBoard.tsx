import React from 'react'

function ChessBoard({size=8}) {

    const generateColums=()=>{
        return new Array(size).fill(0).map((_,index)=><div className={index%2==0 ? 'white' : 'black'} key={index}></div>)
    }

    const generateRows=()=>{
        return new Array(size).fill(0).map((_,index)=><div className={index%2==0 ? 'chess-row' : 'chess-row-reverse'} key={index}>{generateColums()}</div>)
    }
  return (
    <div className="chessBoardContainer">
        {generateRows()}
    </div>
  )
}

export default ChessBoard
