import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import Button from "../../../../components/Button";
import "./index.scoped.scss";

const Tabbar: FC = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(0)
    return (
        <div className="container">
            <span className={`item ${activeItem === 0 && 'active-item'}`} onClick={() =>{
                setActiveItem(0)
                navigate('')
            }}>首页</span>
            <Button isMobile={true}><VideoCameraAddOutlined /></Button>
            <span className={`item ${activeItem === 1 && 'active-item'}`} onClick={() => {
                setActiveItem(1)
                navigate('user-info')
            }}>我</span>
        </div>
    );
}

export default Tabbar;