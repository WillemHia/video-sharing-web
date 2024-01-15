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
                <li className="nav-item nav-item-active"><HomeOutlined className="nav-item-icon"/>首页</li>
                <li className="nav-item"><HomeOutlined className="nav-item-icon"/>推荐</li>
                <li className="nav-item"><HomeOutlined className="nav-item-icon"/>热门</li>
                <li className="nav-item"><HomeOutlined className="nav-item-icon"/>追番</li>
                <li className="nav-item"><HomeOutlined className="nav-item-icon"/>影视</li>
                <li className="nav-item"><HomeOutlined className="nav-item-icon"/>直播</li>
                <li className="nav-item"><HomeOutlined className="nav-item-icon"/>专栏</li>
                <li className="nav-item"><HomeOutlined className="nav-item-icon"/>广场</li>
            </ul>
        </div>
    )
}

export default Navigate;