
import {createContext, useState} from "react";
import folderData from "./folder.json"

export const FileContext=createContext();

export default function FileExplorerContext({children}){
    console.log("fff",folderData,children);

    const [node,setNode]=useState(folderData);

    const addNode=(id,name)=>{
        const newId=Date.now();
        const newObj={
            id:newId,
            name:name,
            type:'',
            parentId:id
        }
        const extension=name.split('.');
        if(extension[1]=='js'){
            newObj['type']="file"
        }else{
            newObj['type']="folder";
            newObj.children=[]
        }
        const updatedNode={...node,[newId]:newObj};
        updatedNode[id].children.push(newId);
        setNode(updatedNode);

    }

    const deleteNode=(id)=>{
        const updatedNode={...node};
        const parentId=updatedNode[id].parentId;
        if(parentId){
            updatedNode[parentId].children=updatedNode[parentId].children.filter((el=>el!=id));
        }
        const queue=[id];
        while(queue.length>0){
            const currentId=queue.shift();
            if(node[currentId].children){
                queue.push(...node[currentId].children);
            }
            delete updatedNode[currentId];
        }
     setNode(updatedNode)
    }

    const editNode=(id,name)=>{
      const updatedNode={...node};
        updatedNode[id].name=name;
        setNode(updatedNode);
    }

   return(<FileContext.Provider  value={{node,addNode,deleteNode,editNode}}>
        {children}
     </FileContext.Provider>)
}
