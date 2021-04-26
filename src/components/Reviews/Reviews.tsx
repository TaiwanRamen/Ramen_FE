import {useQuery} from "react-query";
import {IReview} from "../../types/IReview";
import axios from "axios";
import Loading from "../Loading/Loading";
import {useState} from "react";
import Review from './Review';

type Props = {
    storeId: string
}

const getReview = async (storeId: string): Promise<IReview[]> => {
    console.log(process.env.REACT_APP_URL + `/api/v1/review/${storeId}`)
    const response = await axios.get(process.env.REACT_APP_URL + `/api/v1/review/${storeId}`);
    if (response.status !== 200) {
        throw new Error("Problem fetching data");
    }
    console.log(response.data.data)
    return await response.data.data;
}


const Reviews = (props:Props) => {

    const [storeId] = useState(props?.storeId);

    const { data: reviews, status, error } = useQuery<IReview[], Error>(
        ['reviews', storeId],
        () => getReview(storeId),
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
    if (!reviews) return <div>沒有評論</div>;

    return reviews ?
        <div className="row">
            {reviews.map(review => <Review review={review} />)}
        </div> : null
};

export default Reviews;
