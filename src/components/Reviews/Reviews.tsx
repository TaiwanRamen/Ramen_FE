import {IReview} from "../../types/IReview";
import Loading from "../Loading/Loading";
import {useState} from "react";
import Review from './Review';
import {useUser} from "../../Context/UserContext";
import useFetch from "../../customHooks/UseFetch";
import {Button} from "react-bootstrap";
import AddReviewModal from "./AddReviewModal";

type Props = {
    storeId: string
}

const Reviews = (props:Props) => {
    const { user } = useUser()!;
    const [modalShow, setModalShow] = useState(false);
    const storeId = props.storeId;
    const options = {
        key: "comments",
        url: process.env.REACT_APP_BE_URL + `/api/v1/review/${storeId}`,
        requestQuery: {}
    }

    const {data:reviews, status, error} = useFetch<IReview[]>(options);

    console.log(reviews)

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }
    if (!reviews) return <div>沒有評論/</div>;

    return !!reviews ?
        <div className="well">
            {user && <div className="text-left">
                <Button variant="success" className="m-2" onClick={() => setModalShow(true)} >留言</Button>
                <AddReviewModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>}
            {reviews.map(review => <Review review={review} key={review._id} />)}
        </div> : null
};

export default Reviews;
