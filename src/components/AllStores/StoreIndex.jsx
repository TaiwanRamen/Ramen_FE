import { useQuery } from "react-query";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import StoreCardList from '../StoreCard/StoreCardList';
import {useState} from 'react'
import './StoreIndex.css';
import Loading from "../Loading/Loading";


async function getStores(params) {
  const [, { page }] = params.queryKey;
  const response = await axios.get(`http://localhost:4000/api/v1/stores?page=${page}`);
  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const data = await response.data;
  return data;
}
const StoreIndex = () => {
    const [page, setPage] = useState(1);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };

    const { status, error, data } = useQuery(
        ["character", { page: page }],
        getStores, {
            keepPreviousData: true,
          }
      );
    
      if (status === "loading") {
        return <Loading />;
      }

      if (status === "error") {
        return <div>{error?.message}</div>;
      }
      
      return data ? 
        <div className="App">
            <StoreCardList  stores={data.stores}/>
            { data && <ReactPaginate
                previousLabel={"上一頁"}
                nextLabel={"下一頁"}
                breakLabel={"..."}
                pageCount={data.pages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                disabledClassName={"disabledPage"}
                activeClassName={"active"}
            />}
        </div> : null;
}
export default StoreIndex;


