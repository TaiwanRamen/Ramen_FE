import {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import StoreCard from '../StoreCard/StoreCardList';
import './StoreIndex.css';
import { IStore } from '../../interface/IStore';
// import { useQuery } from 'react-query';


interface StoreResponse {
    current: number,
    mapboxAccessToken: string,
    pages: number
    search: boolean
    stores: IStore[]
}

// const fetchStores = async (currentPage: number) => {
//     const res = await axios.get(`http://localhost:4000/api/v1/stores?page=${currentPage}`);
//     const data: StoreResponse = res.data;
//     return data;
// }

const StoreIndex = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [stores, setStores] = useState<IStore[] | null>(null);
    const [pageCount, setPageCount] = useState(0)


    const getData = async(currentPage: number) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/stores?page=${currentPage}`);
            
            const data: StoreResponse = res.data;
            console.log(data)
            setStores(data.stores);
            setPageCount(data.pages);
        } catch (err) {
            setStores(null);
            setPageCount(0);
        }

    }

    const handlePageClick = (e: any) => {
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
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                disabledClassName={"disabledPage"}
                activeClassName={"active"}
            />}

        </div>
    );
}

export default StoreIndex;