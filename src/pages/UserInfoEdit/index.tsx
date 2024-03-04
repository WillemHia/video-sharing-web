import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined, InstagramOutlined, LeftOutlined } from "@ant-design/icons";
import './index.scoped.scss'
import Button from "@/components/Button";

const UserInfoEdit: FC = () => {
    const navigate = useNavigate();
    const [sexSelectVisible, setSexSelectVisible] = useState(false);

    return (
        <div className="container">
            <div className="nav-back">
                <LeftOutlined className="icon" onClick={()=> navigate(-1)}/>
            </div>
            <div className="header">
                <img className="background" src='/bg.jpg' alt="" />
                <div className="header-body">
                    <img className="avater" src='/bg.jpg' alt="" />
                    <div className="avater-mark">
                        <InstagramOutlined className="icon" />
                        <span>更换头像</span>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="body-item">
                    <span className="label">名称</span>
                    <input />
                </div>
                <div className="body-item">
                    <span className="label">性别</span>
                    <input readOnly onClick={() => setSexSelectVisible(true)} />
                    <DownOutlined className="icon" />
                </div>
                <div className="body-item">
                    <span className="label">年龄</span>
                    <input />
                </div>
                <div className="body-item">
                    <span className="label">学校</span>
                    <input />
                </div>
                <div className="body-item">
                    <span className="label">所在地区</span>
                    <input />
                </div>
                <div className="body-item">
                    <span className="label">简介</span>
                    <textarea />
                </div>
                <div className="body-item">
                    <span className="label"></span>
                    <Button>确认</Button>
                </div>
            </div>
            {sexSelectVisible && <div className="mark" onClick={() => setSexSelectVisible(false)}>
                <div className="sex-select" onClick={(e) => e.stopPropagation()}>
                    <div className="title">请选择性别</div>
                    <div className="sex-option sex-option-selected">男</div>
                    <div className="sex-option">女</div>
                </div>
            </div>}
        </div>
    );
}

export default UserInfoEdit;

