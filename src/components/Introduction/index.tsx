import React, { FC, useState } from "react";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import { IntroudctionType } from "@/enums";
import Button from "../Button";
import './index.scoped.scss';

interface Props {
    type: IntroudctionType;
    onClosed?: () => void;
    style?: React.CSSProperties;
}

const Introduction: FC<Props> = ({ onClosed, type, style }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="container" style={style}>
            {type === IntroudctionType.VIDEO && (
                <header>
                    <div className="header-choose">
                        <span className={`header-choose-item ${activeIndex === 0 && 'header-choose-active'}`} onClick={() => setActiveIndex(0)}>TA的作品</span>
                        <span className={`header-choose-item ${activeIndex === 1 && 'header-choose-active'}`} onClick={() => setActiveIndex(1)}>视频评论</span>
                    </div>
                    <CloseOutlined onClick={onClosed} className="header-close-icon" />
                </header>
            )}
            <div className="author-introduce">
                <div className="author-introduce-body">
                    <div className="author-introduce-body-name"><span className="name">小明爱敲代码</span> <RightOutlined className="icon" /></div>
                    <div className="author-introduce-body-heat">
                        <span>100粉丝</span>
                        <span>|</span>
                        <span>100点赞</span>
                        <span>|</span>
                        <span>100作品</span>
                    </div>
                </div>
                <Button>关注</Button>
            </div>
            <ul className="video-more">
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <li className="video-more-item"></li>
                <div className="on-more">
                    已经到底了哟~
                </div>
            </ul>
        </div>
    );
};

export default Introduction;