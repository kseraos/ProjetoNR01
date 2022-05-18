import React from "react";

const PaginationComponents = ({pages, setCurrentPage}) =>{


    return(
        <div className="pagina-num">
        {Array.from(Array(pages), (dados, index) =>{
            return <button className="pagina-num-butao" value={index} onClick ={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
        })}
    </div>
    )
}

export default PaginationComponents;