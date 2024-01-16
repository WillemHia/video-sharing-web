import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import "./index.scoped.scss"
import NOTFOUNDPNG from "@/assets/images/404.png";

const NotFound: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <img src={NOTFOUNDPNG} alt="" />
            <div className="text">页面迷路啦~~~</div>
            <div className="button" onClick={() => navigate('/home', { replace: true })}>
                <Button>返回首页</Button>
            </div>
        </div>
    );
};

export default NotFound;