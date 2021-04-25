import React from 'react';
import ReactStars from "../react-rating-stars-component/src/react-stars";
const ShowRatings = (props) => {
    return (
            <ReactStars
                count={5}
                size={props.size || 25}
                value={props.ratings}
                edit={false}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
    );
};

export default ShowRatings;
