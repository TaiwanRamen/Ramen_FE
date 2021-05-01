import React from 'react';
import './Store.css'
import { useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from  "@fortawesome/free-solid-svg-icons";
const StoreLeftCol = (store) => {
    const history = useHistory(); //this object represent history

    const clickCity = (city) => {
        history.push('/');
    }

    return (
        <div className="col-md-3 fix" id="left-col">


            <Button variant="outline-primary" className="goBack-btn" onClick={() => history.go(-1)}>
                <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                返回上一頁
            </Button>

            <div id="map" className="store-map">
                地圖
            </div>

            <p className="mt-2">地址：
                <a href="https://www.google.com.tw/maps/place/%>">
                    台北市大安區羅斯福路四段一號
                </a>
            </p>

            <div id="map" className="store-map">
                說不定廣告
            </div>

        </div>
    );
};

export default StoreLeftCol;
