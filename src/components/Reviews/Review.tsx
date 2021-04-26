import {IReview} from "../../types/IReview";
import Moment from 'react-moment';

type Props = {
    review: IReview
}
const Review = (props: Props) => {

    const review = props.review;
    return (
        <div className="grid-container">
            <div className="avatar">
                {review._id}

                <Moment fromNow>{review.createdAt}</Moment>
            </div>
        </div>
    );
};

export default Review;
