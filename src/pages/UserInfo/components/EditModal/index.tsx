import React, { FC } from "react";
import { CloseOutlined, InstagramOutlined } from "@ant-design/icons";
import './index.scoped.scss'
import Button from "@/components/Button";

interface Props {
    onClose: () => void;
}

const EditModal: FC<Props> = ({ onClose }) => {
    return (
        <div className="container" onClick={(e) => e.stopPropagation()}>
            <header className="header">
                <span className="title">编辑信息</span>
                <CloseOutlined className="close" onClick={onClose} />
            </header>
            <div className="avater-container">
                <img src='bg.jpg' alt="" className="avater" />
                <div className="avater-mark">
                    <InstagramOutlined className="icon" />
                    <span>更换头像</span>
                </div>
            </div>
            <div className="name-container">
                <span className="label">名字</span>
                <input type="text" className="input" placeholder="输入名字" />
            </div>
            <div className="introduction-container">
                <span className="label">简介</span>
                <textarea className="text-area" placeholder="介绍一下自己" />
            </div>
            <div className="button-container">
                <Button>保存</Button>
            </div>
        </div>
    )
}

export default EditModal;