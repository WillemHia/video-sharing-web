import React, { FC, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import "./index.scoped.scss";
import LOGO from "@/assets/images/logo.png";
import { NAV_LIST } from "@/constants";

interface Props {
    shortNavVisible: boolean;
}

const Navigate: FC<Props> = ({ shortNavVisible }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <div className="container">
            <div className="logo">
                <img src={LOGO} alt="" className="logo-img" />
                <span className={`logo-text-active ${shortNavVisible && 'logo-text'}`}>视频网站</span>
            </div>
            <ul className="nav">
                {NAV_LIST.map((item, index) => {
                    return (
                        <li className={`nav-item ${activeIndex === index && 'nav-item-active'}`} key={index} onClick={() => { setActiveIndex(index) }}>
                            <HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`} />
                            <span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>{item.name}</span>
                            {shortNavVisible && <span className="nav-item-tip">{item.name}</span>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Navigate;