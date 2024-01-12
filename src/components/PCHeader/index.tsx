import React, { FC } from "react";
import "./index.scoped.scss";
import NavFewerIcon from "@/assets/images/navFewer.png";
import NavSpreadIcon from "@/assets/images/navSpread.png";
import SearchIcon from "@/assets/images/search.png";


interface Props {
    shortNavVisible: boolean;
    changeNvaLen: (visible: boolean) => void;
}

const PCHeader: FC<Props> = ({ changeNvaLen, shortNavVisible }) => {
    return (
        <div className="container">
            <img
                onClick={() => changeNvaLen(!shortNavVisible)}
                src={shortNavVisible ? NavSpreadIcon : NavFewerIcon}
                style={{ left: `${shortNavVisible ? '60px' : '170px'}` }}
                alt=""
            />
            <div className="search">
                <input type="text" placeholder="搜索" />
                <img src={SearchIcon} alt="" />
            </div>
        </div>
    )
}

export default PCHeader;