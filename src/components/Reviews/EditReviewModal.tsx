import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, Paper,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useDelete from "../../customHooks/UseDelete";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import {useHistory} from "react-router-dom";
import he from "he";
import ReactQuill from "react-quill";
import RamenNavbar from "../RamenNavbar/RamenNavbar";
import {NotificationProvider} from "../../Context/NotificationContext";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import QuillEditor from "../QuillEditor/QuillEditor";
import {IReview} from "../../types/IReview";
import {useState} from "react";


const useStyles = makeStyles(() => ({
    closeBtn: {
        margin: 0,
        padding: 5,
        float: "right"
    },
    submitBtn: {
        margin: 5,
        float: "right",
    },
    cancelBtn: {
        margin: 5,
        float: "right",
        color: "gray"
    },
    ratingTitle: {
        marginBottom: 5
    },
    ratingText: {
        alignText:"middle",
        color: "red"
    },
}))

type Props = {
    review: IReview,
    storeId: string,
    open: boolean,
    onClose: () => void
}
const EditReviewModal = (props: Props) => {
    const classes = useStyles();
    const reviewId = props.review._id;
    const storeId = props.storeId;
    const history = useHistory();
    const storageKey = `review_${storeId}`;
    const [reviewText, setReviewText] = useState<string>(props.review.text);
    const [rating, setRating] = useState<number | null>(props.review.rating);


    const {mutateAsync} = useDelete();
    const showSnackBar = useStackedSnackBar();

    const handleEditReview = async () => {
        if (rating === null) {
            showSnackBar(`評分不可為空`, 'error');
            return;
        }
        let review = window.localStorage.getItem(storageKey);
        if (review === null || review === "<p><br></p>") {
            showSnackBar(`評論不可為空！`, 'error');
            return;
        }
        const reqProps = {
            url: process.env.REACT_APP_BE_URL + `/api/v1/reviews/edit`,
            requestBody: {
                storeId: storeId,
                reviewId: reviewId,
                text: review,
                rating: rating
            },
        };
        let response = await mutateAsync(reqProps);

        if (response.status === 200) {
            showSnackBar(`上傳評論成功`, 'success');
            window.localStorage.removeItem(storageKey);
            history.push(`/stores/${storeId}`)
        } else {
            showSnackBar(`上傳評論失敗`, 'error');
            return new Error()
        }

    }

    const handleDialogClose = () => {
        props.onClose();
    }

    return (
        <Dialog
            open={props.open}
            onClose={handleDialogClose}
            fullWidth={true}
            maxWidth={"lg"}
            aria-labelledby="form-dialog-title">
            <Box m={5}>
                <Box>
                    <IconButton onClick={props.onClose} className={classes.closeBtn}>
                        <CloseIcon/>
                    </IconButton>
                    <h3>
                        編輯評論
                    </h3>
                </Box>

                <Box mt={2} mb={3}>
                    <Typography variant="body1" color="textPrimary" component="p" className={classes.ratingTitle}>
                        評分：
                    </Typography>
                    <Rating
                        name="customized-empty"
                        value={rating}
                        size={"large"}
                        onChange={(_event, newValue) => {
                            setRating(newValue);
                        }}
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    />
                    {!rating && <Typography variant="caption" component="p" className={classes.ratingText}>
                       請輸入評分
                    </Typography>}
                </Box>
                <QuillEditor
                    storageKey={storageKey}
                    defaultContent={he.decode(reviewText)}
                />
                <Box mt={2} mb={2}>
                    <Button variant="outlined" color="primary" className={classes.submitBtn} onClick={handleEditReview}>
                        送出
                    </Button>
                    <Button variant="outlined" color="default" className={classes.cancelBtn} onClick={handleDialogClose}>
                        取消
                    </Button>
                </Box>
            </Box>

        </Dialog>
    );
};

export default EditReviewModal;

