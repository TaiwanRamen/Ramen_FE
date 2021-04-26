import {Tabs, Tab, Button, Dropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from  "@fortawesome/free-solid-svg-icons";
import DeleteModal from './DeleteModal';
import { IStore } from '../../types/IStore'
import Comment from "../Comment/Comment";
import ShowRatings from "../Ratings/ShowRatings";
import CarouselImage from "../Carousel/Carousel";
import Reviews from "../Reviews/Reviews";



type Props = {
    data: {
        mapboxAccessToken: string,
        isStoreOwner: boolean,
        store: IStore
    }
}

const StoreRightCol = (props:Props) => {

    const [data] = useState(props.data)
    const storeCity = data?.store?.city;
    const storeName = data?.store?.name;
    const storeId = data?.store?._id;
    const storeRating = data?.store?.rating;
    const storeCommentLength = data?.store?.comments.length;
    const imageUrls = data?.store?.imageLarge;
    const reviewLength = data?.store?.reviews.length;
    const isStoreOwner = true;

    const [modalShow, setModalShow] = useState(false);

    console.log()

    const followOrUnFollow = () => {
        alert("follow");
    }

    return (
        // <div className="col-md-9 h-scroll scrollbar-light-blue">
        <div className="col-md-9 ">
            <div className="thumbnail">
                <div className="caption-full">
                    <Button variant="info" className="badge-pill mr-2" as={Link} to={`/stores?search=${storeCity}`} >{storeCity}</Button>
                    <Button variant="primary" className="m-2" onClick={followOrUnFollow} >追蹤</Button>

                    {isStoreOwner &&
                    <Dropdown className="store-dropdown">
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                            <FontAwesomeIcon icon={faEllipsisH}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="edit" href="#/action-1">編輯</Dropdown.Item>
                            <Dropdown.Item className="delete" onClick={() => setModalShow(true)}>刪除</Dropdown.Item>
                        </Dropdown.Menu>
                        <DeleteModal
                            storeName={storeName}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Dropdown>}

                    <h2 className="mt-2 mb-2 store-name">{storeName}</h2>

                    <Link to={`/stores/${storeId}/reviews`} className="rating-link my-2">
                        <span className="my-2">{storeRating?.toFixed(1)}</span>
                        <ShowRatings ratings={storeRating} size={25} />
                        <span className="my-2">{`(${storeCommentLength})` || 0 }</span>
                    </Link>

                    <Tabs id="controlled-tab" className="my-4 tabs nav-justified">
                        <Tab eventKey="home" title="簡介">
                            <CarouselImage imageUrls={imageUrls} />
                            <Comment storeId={storeId}/>
                        </Tab>
                        <Tab eventKey="profile" title={`食記/評論 (${reviewLength})`}>
                            <Reviews storeId={storeId}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default StoreRightCol;