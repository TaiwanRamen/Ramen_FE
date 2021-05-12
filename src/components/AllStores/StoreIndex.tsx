import {ChangeEvent} from 'react';
import {IStore} from "../../types/IStore";
import {useState} from "react";
import Loading from "../Loading/Loading";
import StoreCardList from "../StoreCard/StoreCardList";
import './StoreIndex.css';
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {Button} from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import useFetch from "../../customHooks/UseFetch";


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
            backgroundColor:"transparent",
            "& ul > li > button": {
                backgroundColor: "white"
            }
        }
    }),
);

type Stores = {
    current: number;
    mapboxAccessToken: string;
    pages: number;
    search: boolean;
    stores: IStore[]
};
const StoreIndex = () => {
    const [page, setPage] = useState<number>(1);
    const [searchInput, setSearchInput] = useState<string | null>(null);
    const classes = useStyles();

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const options = {
        key:"stores",
        url: process.env.REACT_APP_URL + "/api/v1/stores",
        queryParams: {
            page:page,
            search:searchInput
        }
    }

    const { data:stores, status, error } = useFetch<Stores>(options);


    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }
    if (stores?.stores?.length === 0) {
        return searchInput? <div>
            {`搜尋\"${searchInput}\"沒有找到店家`}
            <Button variant="outline-primary" className="goBack-btn" onClick={() => setSearchInput(null)}>
                <ArrowLeftIcon />
                返回店家列表
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