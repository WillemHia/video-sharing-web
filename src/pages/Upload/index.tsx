import React, { FC, useState } from "react";
import './index.scoped.scss'
import { LeftOutlined } from "@ant-design/icons";
import Button from "@/components/Button";

const Upload: FC = () => {
    const [labelListVisible, setLabelListVisible] = useState(false);
    return (
        <div className="container">
            <div className="nav-back">
                <LeftOutlined />
            </div>
            <div className="upload-info">
                <div className="upload-detail">
                    <textarea className="upload-introduction" placeholder="请输入视频简介.." />
                    <div className="upload-label">
                        <div className="label-botton" onClick={() => setLabelListVisible(!labelListVisible)}>#话题</div>
                        {labelListVisible &&
                            <ul>
                                <li onClick={() => setLabelListVisible(false)}>#话题1</li>
                                <li>#话题2</li>
                                <li>#话题3</li>
                            </ul>}
                    </div>
                </div>
                <div className="upload-image">
                    <img src="/bg.jpg" alt="" />
                    <div className="change">更换封面</div>
                </div>
            </div>
            <div className="upload-botton">
                <Button isMobile={true} style={{ width: '100%', height: '1rem' }}>发布</Button>
            </div>
        </div>
    )
}

export default Upload;