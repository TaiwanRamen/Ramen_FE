import {ChangeEvent} from 'react';
import {useQuery} from 'react-query';
import axios from "axios";
import {IStore} from "../../types/IStore";
import {useState} from "react";
import Loading from "../Loading/Loading";
import StoreCardList from "../StoreCard/StoreCardList";
import './StoreIndex.css';
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


type Stores = {
    current: number;
    mapboxAccessToken: string;
    pages: number;
    search: boolean;
    stores: IStore[]
};
const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root: {
            justifyContent: "center",
            margin: "3rem 0",
            display: "flex",
        },
        searchRoot: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        pagination:{
            backgroundColor:"white"
        }
    }),
);

const getStores = async (page: number, search: string|null): Promise<Stores> => {
    const url = process.env.REACT_APP_URL + `/api/v1/stores?page=${page}` + (search ? `&search=${search}` : "");
    console.log(url);
    const response = await axios.get(url);
    if (response.status !== 200) {
        throw new Error("Problem fetching data");
    }
    return await response.data.data;
}

const StoreIndex = () => {
    const [page, setPage] = useState<number>(1);
    const [searchInput, setSearchInput] = useState<string | null>(null);
    const classes = useStyles();
    const history = useHistory();

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const { data: stores, status, error } = useQuery<Stores, Error>(
        ['stores', page, searchInput],
            () => getStores(page, searchInput),
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
    if (stores?.stores?.length === 0) {
        return searchInput? <div>
            {`搜尋\"${searchInput}\"沒有找到店家`}
            <Button variant="outline-primary" className="goBack-btn" onClick={() => history.go(-1)}>
                <ArrowLeftIcon />
                返回上一頁
            </Button>
        </div> : <div>沒有找到店家</div>
    }

    return stores ?
        <>
            <SearchBar setPage={setPage} setSearchInput={setSearchInput}/>
            <StoreCardList  stores={stores.stores}/>
            { stores &&
                <div className={classes.root}>
                    <Pagination count={stores.pages}
                                className={classes.pagination}
                                page={page}
                                size="large"
                                variant="outlined"
                                shape="rounded"
                                onChange={handlePageChange} />
                </div>
            }

        </> : null;
}


export default StoreIndex;