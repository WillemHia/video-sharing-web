import React, { FC } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scoped.scss";
import LOGO from "@/assets/images/logo.png"
import { NAV_LIST } from "@/constants";

const Header: FC = () => {
    const [params] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate();
    return (
        <div className="container">
            <img src={LOGO} alt="logo" />
            <div className="nav-list">
                {NAV_LIST.map((item, index) => (
                    <span className={`nav-item ${params.get('keyword') === item.name ? 'nav-item-active' : (location.pathname === item.path && !params.get('keyword')) && 'nav-item-active'}`} key={index} onClick={() => navigate(item.path)}>{item.name}</span>
                ))}
            </div>
            <SearchOutlined className="search-icon" onClick={() => navigate('search')} />
        </div>
    );
};

export default Header;