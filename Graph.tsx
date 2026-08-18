import React from 'react';

const CHART_DATA = [
    { id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
    { id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
    { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#287233" },
    { id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#4E5452" },
    { id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#642424" },
    {
      id: "dep-6",
      name: "Human Resourcing",
      ticketCount: 35,
      colour: "#1D1E33"
    },
    { id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" }
  ];

function Graph() {

    const maxTicketCount=()=>{
        return Math.max(...CHART_DATA.map(item=>item.ticketCount))
    }
  return (
    <div className="chart-container">
        <div className="chart"> 
        {
            CHART_DATA.map((value,index)=>{
                return(
                
                    <div key={index} className="bar" style={{height:`${((value.ticketCount/maxTicketCount())*100)}%`,backgroundColor:value.colour,width:'50px',border:'1px solid black'}}>
                    <div className="tooltip">{value.name} - {value.ticketCount}</div>
                    </div>
                   
                )
            })
        }
        </div>

         <div className="y-axis">Number of ticket</div>
         <div className="x-axis">Department</div>
       

    </div>
  )
}

export default Graph;
