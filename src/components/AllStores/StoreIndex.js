import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import StoreCard from '../StoreCard/StoreCardList';
import './StoreIndex.css'
import Loading from "../Loading/Loading";

const StoreIndex = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [stores, setStores] = useState(null);
    const [pageCount, setPageCount] = useState(0)


    const getData = async(currentPage) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/stores?page=${currentPage}`)
            const data = res.data;
            setStores(data.stores);
            setPageCount(data.pages);
        } catch (err) {
            setStores(null);
            setPageCount(0);
        }

    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage + 1)
    };

    useEffect(() => {
        getData(currentPage)
    }, [currentPage])

    return (
        <div className="App">
            <StoreCard  stores={stores}/>

            { stores && <ReactPaginate
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
            />}

        </div>
    );
}

export default StoreIndex;