import React from 'react';
import './Store.css'

const StoreLeftCol = (store) => {
    return (
        <div className="col-md-3 fix" id="left-col">

            <a href="javascript:history.back()" className="btn btn-outline-primary mt-4">
                <icon  className="fas fa-angle-double-left"></icon> &nbsp 返回上一頁</a>

            <div id="map" className="store-map">
                地圖
            </div>

            <p className="mt-2">地址：
                <a href="https://www.google.com.tw/maps/place/%>">
                    台北市大安區羅斯福路四段一號
                </a>
            </p>


        </div>
    );
};

export default StoreLeftCol;
