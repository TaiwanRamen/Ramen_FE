import {Tabs, Tab, Button, Dropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
// import {UserContext} from "../../Context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from  "@fortawesome/free-solid-svg-icons";
import DeleteModal from './DeleteModal';
import { IStore } from '../../types/IStore'
import Comment from "../Comment/Comment";
import {UserContext} from "../../Context/UserContext";

type Props = {
    data: {
        mapboxAccessToken: string,
        isStoreOwner: boolean,
        store: IStore
    }
}

const StoreRightCol = (props:Props) => {

    const [user] = useContext(UserContext);
    const [data] = useState(props.data)
    console.log("store::", data);
    console.log("user::", user);
    const storeCity = data?.store?.city;
    const storeName = data?.store?.name;
    const storeId = data?.store?._id;
    const isStoreOwner = true;

    const [modalShow, setModalShow] = useState(false);


    const followOrUnFollow = () => {
        alert("follow");
    }
    return (
        <div className="col-md-9 h-scroll scrollbar-light-blue">
            <div className="thumbnail">
                <div className="caption-full">
                    <Button variant="info" className="badge-pill mr-2" as={Link} to={`/stores?search=${storeCity}`} >{storeCity}</Button>
                    <Button variant="primary" className="m-2" onClick={followOrUnFollow} >追蹤</Button>

                    {isStoreOwner && <Dropdown className="store-dropdown">
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

                    <h1>{storeName}</h1>
                    <Tabs id="controlled-tab-example">
                        <Tab eventKey="home" title="Home">
                            <Comment storeId={storeId}/>
                        </Tab>
                        <Tab eventKey="profile" title="Profile">

                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default StoreRightCol;