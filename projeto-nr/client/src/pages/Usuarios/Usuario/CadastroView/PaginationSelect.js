import React from "react";



const PaginationSelect = ({itensPages, setItensPages}) => {

    return(
        <div>
        <select value={itensPages} onChange = {(e) => setItensPages(Number(e.target.value)) }>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={25}>25</option>
        </select>
    </div>
    )

}

export default PaginationSelect;