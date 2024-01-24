import React, { FC } from "react";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import Button from "../../../../components/Button";
import "./index.scoped.scss";

const Tabbar: FC = () => {
    return (
        <div className="container">
            <span className="active-item item">首页</span>
            <Button isMobile={true}><VideoCameraAddOutlined /></Button>
            <span className="item">我</span>
        </div>
    );
}

export default Tabbar;