import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scoped.scss";
import LOGO from "@/assets/images/logo.png"

const Header: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <img src={LOGO} alt="logo" />
            <div className="nav-list">
                <span className="nav-item nav-item-active">推荐</span>
                <span className="nav-item">关注</span>
                <span className="nav-item">热榜</span>
                <span className="nav-item">直播</span>
                <span className="nav-item">影视</span>
            </div>
            <SearchOutlined className="search-icon" onClick={()=> navigate('search')}/>
        </div>
    );
};

export default Header;