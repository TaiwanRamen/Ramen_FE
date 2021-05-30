import {IComment} from "../../types/IComment";
import Loading from "../Loading/Loading";
import {ChangeEvent, useState} from "react";
import {useUser} from "../../Context/UserContext";
import useFetch from "../../customHooks/UseFetch";
import AddCommentModal from "./AddCommentModal";
import Comment from './Comment'
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    noComment: {
        marginTop: 30
    },
    commentBtn: {},
    comments: {},
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
    }
}))

type Props = {
    storeId: string
}

type CommentsRes = {
    comments: IComment[],
    current: number,
    pages: number
}

const Comments = (props: Props) => {
        const {user} = useUser()!;
        const classes = useStyles();

        const [modalShow, setModalShow] = useState(false);
        const [page, setPage] = useState<number>(1);

        const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
            setPage(value);
        };

        const storeId = props.storeId;
        const options = {
            key: "comments",
            url: process.env.REACT_APP_BE_URL + `/api/v1/comments/${storeId}`,
            requestQuery: {
                page: page
            }
        }

        const {data, status, error} = useFetch<CommentsRes>(options);

        if (status === "loading") {
            return <Loading/>;
        }

        if (status === "error") {
            return <div>{error?.message}</div>;
        }

        if (!data) return <div>系統無法取得留言，請重新整理</div>

        return (
            <div className={classes.comments}>
                {user && <div className={classes.commentBtn}>
                    <Button variant="contained" onClick={() => setModalShow(true)}>留言</Button>
                    <AddCommentModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>}

                <Box mt={2}>
                    {(data.comments?.length > 0) ?
                        <div>
                            {data.comments.map(comment =>
                                <Comment comment={comment}/>
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
                        <Typography variant="subtitle1" className={classes.noComment}>
                            沒有留言
                        </Typography>
                    }
                </Box>


            </div>
        )
    }
;

export default Comments;


