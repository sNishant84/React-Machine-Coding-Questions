import React, { useState } from 'react'

function Comments({id=1,commentData,addNode,deleteComment,editNode}) {

    const [showReply,setShowReply]=useState(false);
    const [showEdit,setEdit]=useState(false)

  return (
    <div>
        <div className="commentsContainer">
       { showEdit ? <ReplyComments id={id} setShowReply={setEdit} addNode={editNode} value={commentData[id]?.value}    /> : 
       <>
       <p>{commentData[id]?.value}</p>
        <button onClick={()=>setEdit(true)}>Edit</button>
        <button onClick={()=>setShowReply(true)}>Reply</button>
        <button onClick={()=>deleteComment(id)}>Delete</button> 
        </>}
        </div>
       {showReply && <ReplyComments id={id} setShowReply={setShowReply} addNode={addNode}  />}

            <div className="nestedComments">
              {
                commentData[id].children.map((childId,index)=>{
                    return(
                        <Comments key={index} id={childId} commentData={commentData} addNode={addNode} editNode={editNode} deleteComment={deleteComment} />
                    )
                })
              }
            </div>
    </div>
  )
}


function ReplyComments({id,setShowReply,addNode,value=''}){

    const [query,setQuery]=useState(value);

    const handleSubmit=()=>{
        addNode(id,query);
        setShowReply(false);
    }
    return(
        <div>
            <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} />
            <button onClick={handleSubmit}>submit</button>
            <button onClick={()=>setShowReply(false)}>cancel</button>
        </div>
    )
}

export default Comments
