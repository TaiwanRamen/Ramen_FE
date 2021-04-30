import React from 'react';
import './StoreCard.css';
import ShowRatings from "../Ratings/ShowRatings";

const StoreCard = (props) => {
    const store = props.store;
    const mapFlyTo = (e) => {
        console.log(e.target)
    }
    const imageError = () =>{
        return "this.onerror=null;this.src='https://i.imgur.com/siJp2jE.png"
    }
    const descriptionTrimer = (description) => {
        if (description.length > 50) {
            return description.substring(0, 50) + "...";
        }
        return description;
    }
    const changeCityColor = (city) => {
        if (/台北市|新北市|基隆市/.test(city)) {
            return "TNK";
        } else if (/桃園市|新竹縣|新竹市|苗栗縣/.test(city)) {
            return "TCM";
        } else if (/台中市|彰化縣|南投縣/.test(city)) {
            return "CCT";
        } else if (/雲林縣|嘉義縣|嘉義市|台南市/.test(city)) {
            return "YCN";
        } else if (/高雄市|屏東縣/.test(city)) {
            return "KP";
        } else if (/宜蘭縣|花蓮縣|台東縣/.test(city)) {
            return "YHT";
        } else {
            return "PCM";
        }
    }

    return (
        <div className="col-sm-6 col-lg-4 mt-4 " onClick={mapFlyTo}>
            <div className="card" id={store._id} >
                <img className="card-img-top" src={store.imageSmall[0]} alt="StoreCard image cap" height="200px" onError={imageError}/>
                <a href={"/stores?search=" + store.city}>
                    <div className={"topleft city-btn " + changeCityColor(store.city)} >
                        {store.city}
                    </div>
                </a>
                <div className="topright">
                    <ShowRatings ratings={store.rating}/>
                </div>
                <h5 className="card-header text-center">{store.name}</h5>
                <div className="card-body scrollbar-light-blue">
                    {descriptionTrimer(store.descriptionText)}
                </div>
                <div className="card-footer text-muted text-right">
                    <a href="/stores/<%= store._id %>" className="btn btn-primary">更多資訊</a>
                </div>
            </div>

        </div>
    );
};

export default StoreCard;
