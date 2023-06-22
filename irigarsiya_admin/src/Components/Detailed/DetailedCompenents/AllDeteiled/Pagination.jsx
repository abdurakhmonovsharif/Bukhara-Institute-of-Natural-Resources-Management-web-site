import React from 'react'
import { Pagination } from "react-bootstrap";
import "../../scss/Pagination.scss";

function PaginationComponent({ currentPage, setCurrentPage, totalPages }) {
   const handlePageChange = (value) => {
      setCurrentPage(value)
   };

   const items = []
   for (let i = 1; i <= totalPages; i++) {
      items.push(
         <Pagination.Item onClick={() => handlePageChange(i)} key={i} activeLabel="" active={i === currentPage}>
            {i}
         </Pagination.Item>,
      );
   }
   return (
      <div className="pagi">
         <Pagination>{items}</Pagination>
      </div>
   )
}

export default PaginationComponent