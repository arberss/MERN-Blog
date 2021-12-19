import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
  const { handlePagination, pageCount, forcePage } = props;

  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='>'
      onPageChange={handlePagination}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel='<'
      renderOnZeroPageCount={null}
      forcePage={forcePage - 1}
      className='pagination'
      activeClassName='pagination__active'
    />
  );
};

export default Pagination;
