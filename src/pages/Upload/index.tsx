import React, { FC, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/stores/hooks";
import { selectIsMobile } from "@/stores/slices/deviceAdjustSlice";
import './index.scoped.scss'
import { LeftOutlined } from "@ant-design/icons";
import Button from "@/components/Button";

const Upload: FC = () => {
    const isMobile = useAppSelector(selectIsMobile);
    const [labelListVisible, setLabelListVisible] = useState(false);
    const labelListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (labelListRef.current && !labelListRef.current.contains(e.target as Node)) {
                setLabelListVisible(false);
            }
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }
        , [])

    return (
        <div className="container">
            <div className="nav-back">
                <LeftOutlined />
            </div>
            <div className="upload-info">
                <div className="upload-detail">
                    <textarea className="upload-introduction" placeholder="请输入视频简介.." />
                    <div className="upload-label">
                        <div className="label-botton"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLabelListVisible(!labelListVisible);
                            }}>#话题</div>
                        {!isMobile && <Button>发布</Button>}
                        {labelListVisible &&
                            <ul ref={labelListRef}>
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
            {isMobile &&
                <div className="upload-botton">
                    <Button isMobile={isMobile} style={{ width: '100%', height: '1rem' }}>发布</Button>
                </div>}
        </div>
    )
}

export default Upload;