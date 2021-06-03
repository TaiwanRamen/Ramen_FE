import {IReview} from "../../types/IReview";
import Loading from "../Loading/Loading";
import {ChangeEvent, useState} from "react";
import Review from './Review';
import {useUser} from "../../Context/UserContext";
import useFetch from "../../customHooks/UseFetch";
import {Box, Button, Typography} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/core/styles";
import RateReviewIcon from '@material-ui/icons/RateReview';
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
    noReview: {
        marginTop: 30
    },
    pages: {
        justifyContent: "center",
        margin: "3rem 0",
        display: "flex",
    },
    pagination: {
        backgroundColor: "transparent",
        "& ul > li > button": {
            backgroundColor: "white"
        }
    },
    reviews: {},
    reviewBtn: {}
}))

type ReviewsRes = {
    reviews: IReview[],
    current: number,
    pages: number
}

type Props = {
    storeId: string
}

const Reviews = (props: Props) => {
    const classes = useStyles();
    const {user} = useUser()!;
    const [page, setPage] = useState<number>(1);

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const storeId = props.storeId;
    const options = {
        key: "comments",
        url: process.env.REACT_APP_BE_URL + `/api/v1/reviews/${storeId}`,
        requestQuery: {
            page: page
        }
    }

    const {data, status, error} = useFetch<ReviewsRes>(options);

    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }
    if (!data?.reviews) return <div>系統無法取得留言，請重新整理</div>

    return (
        <div className={classes.reviews}>
            {user && <div className={classes.reviewBtn}>
                <Button
                    size="large"
                    variant="outlined"
                    color="primary"
                    startIcon={<RateReviewIcon/>}
                    component={RouterLink}
                    to={`/stores/${storeId}/newReview`}>
                    新增 食記/評論
                </Button>
            </div>}

            <Box mt={2}>

                {(data.reviews?.length > 0) ?
                    <div>
                        {data.reviews.map(review =>
                            <Review review={review} key={review._id}/>
                        )}
                        <div className={classes.pages}>
                            <Pagination count={data.pages}
                                        className={classes.pagination}
                                        page={page}
                                        size="medium"
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={handlePageChange}/>
                        </div>

                    </div>
                    :
                    <Typography variant="subtitle1" className={classes.noReview}>
                        沒有留言
                    </Typography>
                }
            </Box>
        </div>
    )
};

export default Reviews;
