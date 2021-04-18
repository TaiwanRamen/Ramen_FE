import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './AllStores.css'

const Pageination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0)


  const getData = async(currentPage) => {
    console.log('current page:', currentPage);
      const res = await axios.get(`http://localhost:4000/api/v1/stores?page=${currentPage}`)
      const data = res.data;
      console.log(data)
      const postData = data.stores.map(store => <div key={store._id}>
          <p>{store.name}</p>
          <p>{store.descriptionText}</p>
      </div>)
      setData(postData)
      setPageCount(data.pages);
  }

  

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage + 1)
    setCurrentPage(selectedPage + 1)
  };

 useEffect(() => {
   getData(currentPage)
 }, [currentPage])

  return (
    <div className="App">
      {data}
       <ReactPaginate
          previousLabel={"上一頁"}
          nextLabel={"下一頁"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      
    </div>
  );
}

export default Pageination;