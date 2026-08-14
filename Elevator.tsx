import React, { useEffect, useState } from 'react'

const Floors=9;
const Elevators=4;

const createElevator=()=>Array.from({length:Elevators},(_,index)=>({
    id:index,
    status:'idle',
    currentFloor:0
}))

function Elevator() {
    const [elevators,setElevators]=useState(createElevator());
    const [callQueue,setQueue]=useState([]);
    const [disabledButtons,setButtons]=useState(new Set());

    useEffect(()=>{
        if(callQueue.length>0){
            const idleIndex=elevators.findIndex(e=>e.status=='idle');
            if(idleIndex!=-1){
                const newFloor=callQueue[0];
                assignElevators(idleIndex,newFloor);
                setQueue((queue)=>queue.slice(1));
            }
        }


    },[callQueue,elevators])

    const assignElevators=(index,floor)=>{
        setButtons((prev=>new Set(prev).add(floor)));
        setElevators((prev)=>{
            const updated=[...prev];
            updated[index].status='transit';
            return updated;
        })
        const timeToReach=Math.abs(elevators[index].currentFloor-floor)*1000;

        setTimeout(()=>{
            setElevators((prev)=>{
                const updated=[...prev];
                updated[index].currentFloor=floor;
                updated[index].status='destination';
                return updated
            })
            setTimeout(()=>{
                setElevators((prev)=>{
            const updated=[...prev];
                updated[index].status='idle';
                return updated;
                })

                setButtons((prev)=>{
                    const newSet=new Set(prev);
                    newSet.delete(floor);
                    return newSet;
                })
            },3000)

        },timeToReach)
    }


    function statusColor(status){
        switch(status){
            case "idle" : return "black";
            case "transit" : return "red";
            case "destination" : return "green"
            default : return "grey";
        }
    }

    const handleClick=(floor)=>{
        if(!disabledButtons.has(floor)){
            setQueue((prev)=>[...prev,floor]);
            setButtons((prev)=>new Set(prev).add(floor));
        }
    }
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "max-content" }}>
    {[...Array(Floors).keys()].reverse().map(floor => (
      <div
        key={floor}
        style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
      >
        {/* Call Button */}
        <button
          disabled={disabledButtons.has(floor)}
          onClick={() => handleClick(floor)}
          style={{ width: 80, height: 35, marginRight: 12 }}
        >
          Call {floor}
        </button>
  
        {/* Elevator columns */}
        {elevators.map((elevator, idx) => (
          <div
            key={elevator.id}
            style={{
              width: 40,
              height: 35,
              marginRight: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
              color:
                elevator.currentFloor === floor
                  ? statusColor(elevator.status)
                  : "transparent",
              border: "1px solid #ccc",
              borderRadius: 4,
              backgroundColor: "#f9f9f9",
            }}
          >
            {elevator.currentFloor === floor ? "⬤" : ""}
          </div>
        ))}
      </div>
    ))}
  </div>
  )
}

export default Elevator
