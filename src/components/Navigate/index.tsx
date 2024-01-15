import React, { FC } from "react";
import { HomeOutlined } from "@ant-design/icons";
import "./index.scoped.scss";
import LOGO from "@/assets/images/logo.png";

interface Props {
    shortNavVisible: boolean;
}

const Navigate: FC<Props> = ({ shortNavVisible }) => {
    return (
        <div className="container">
            <div className="logo">
                <img src={LOGO} alt="" className="logo-img" />
                <span className={`logo-text-active ${shortNavVisible && 'logo-text'}`}>视频网站</span>
            </div>
            <ul className="nav">
                <li className="nav-item nav-item-active"><HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`}/><span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>首页</span></li>
                <li className="nav-item"><HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`}/><span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>推荐</span></li>
                <li className="nav-item"><HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`}/><span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>热门</span></li>
                <li className="nav-item"><HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`}/><span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>追番</span></li>
                <li className="nav-item"><HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`}/><span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>影视</span></li>
                <li className="nav-item"><HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`}/><span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>直播</span></li>
                <li className="nav-item"><HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`}/><span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>专栏</span></li>
                <li className="nav-item"><HomeOutlined className={`nav-item-icon-active ${shortNavVisible && 'nav-item-icon'}`}/><span className={`nav-item-text-active ${shortNavVisible && 'nav-item-text'}`}>广场</span></li>
            </ul>
        </div>
    )
}

export default Navigate;