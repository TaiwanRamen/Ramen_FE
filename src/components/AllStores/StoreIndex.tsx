import { useQuery } from 'react-query';
import axios from "axios";
import {IStore} from "../../types/IStore";
import {useState} from "react";
import Loading from "../Loading/Loading";
import StoreCardList from "../StoreCard/StoreCardList";
import ReactPaginate from "react-paginate";
import './StoreIndex.css';

type Stores = {
    current: number;
    mapboxAccessToken: string;
    pages: number;
    search: boolean;
    stores: IStore[]
};


const getStores = async (page: number): Promise<Stores> => {
    console.log("page", page)
    const response = await axios.get(`http://localhost:4000/api/v1/stores?page=${page}`);
    if (response.status !== 200) {
        throw new Error("Problem fetching data");
    }
    const data = await response.data.data;
    return data;
}

const StoreIndex = () => {
    const [page, setPage] = useState(1);

    const handlePageClick = (e:any) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };
    // Call the useQueryClient hook
    const { data: stores, status, error } = useQuery<Stores, Error>(
        ['stores', page],
            () => getStores(page),
            {
                keepPreviousData: true,
            }
    );

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }
    if (!stores) return <div>沒有找到店家</div>;

    return stores ?
        <div className="App">
            <StoreCardList  stores={stores.stores}/>
            { stores && <ReactPaginate
                previousLabel={"上一頁"}
                nextLabel={"下一頁"}
                breakLabel={"..."}
                pageCount={stores.pages}
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