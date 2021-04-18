import React from 'react';
import ReactStars from "react-rating-stars-component";

const ShowRatings = (props) => {
    return (
        <div>
            <ReactStars
                count={5}
                size={22}
                value={props.ratings}
                edit={false}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
        </div>
    );
};

export default ShowRatings;
