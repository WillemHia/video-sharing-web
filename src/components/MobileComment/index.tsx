import React, { FC, useState } from "react";
import { CloseOutlined, UpOutlined, DownOutlined, CaretRightOutlined } from "@ant-design/icons";
import './index.scoped.scss';
import LikeIcon from "@/assets/images/blackLike.svg";
import LikeActive from "@/assets/images/likeActive.svg";
import Button from "../Button";

interface Props {
    style?: React.CSSProperties;
    changeCommentVisible: () => void;
}

const MobileComment: FC<Props> = ({ style, changeCommentVisible }) => {
    const [likeActive, setLikeActive] = useState(false);
    const [showMoreComment, setShowMoreComment] = useState(false);
    const [comment, setComment] = useState('');

    return (
        <div className="container" style={style}>
            <header className="header">
                152条评论
                <div className="close" onClick={changeCommentVisible}>
                    <CloseOutlined />
                </div>
            </header>
            <div className="comment-body">
                <div className="comment-item">
                    <div className="comment-item-avatar"></div>
                    <div className="comment-item-detail">
                        <div className="comment-item-name">小明爱敲代码</div>
                        <div className="comment-item-content">这个视频真的很棒，我很喜欢</div>
                        <div className="comment-footer">
                            <div className="comment-footer-left">
                                <div className="comment-item-time">2021-01-01 12:00</div>
                                <div className="comment-item-back">回复</div>
                            </div>
                            {likeActive ?
                                <div className="comment-item-liked"><img src={LikeActive} alt="" onClick={() => setLikeActive(false)} />12</div> :
                                <div className="comment-item-like"><img src={LikeIcon} alt="" onClick={() => setLikeActive(true)} />12</div>}
                        </div>
                    </div>
                </div>
                {showMoreComment && (
                    <div className="comment-item-reply">
                        <div className="comment-item-avatar"></div>
                        <div className="comment-item-detail">
                            <div className="comment-item-name-container">
                                <span className="comment-item-name">小明爱敲代码</span>
                                <CaretRightOutlined className="comment-reply-icon" />
                                <span className="comment-item-name comment-item-name-reply">小红爱敲代码</span>
                            </div>
                            <div className="comment-item-content">这个视频真的很棒，我很喜欢</div>
                            <div className="comment-footer">
                                <div className="comment-footer-left">
                                    <div className="comment-item-time">2021-01-01 12:00</div>
                                    <div className="comment-item-back">回复</div>
                                </div>
                                {likeActive ?
                                    <div className="comment-item-liked"><img src={LikeActive} alt="" onClick={() => setLikeActive(false)} />12</div> :
                                    <div className="comment-item-like"><img src={LikeIcon} alt="" onClick={() => setLikeActive(true)} />12</div>}
                            </div>
                        </div>
                    </div>)}
                {showMoreComment ?
                    (<div className="comment-more" onClick={() => setShowMoreComment(false)}>收起<UpOutlined className="comment-more-icon" /></div>) : (
                        <div className="comment-more" onClick={() => setShowMoreComment(true)}>展开更多<DownOutlined className="comment-more-icon" /></div>
                    )}
            </div>
            <div className="comment-input">
                <input type="text" placeholder="写下你的评论..." onChange={(e) => { setComment(e.target.value) }} style={{ paddingRight: `${comment ? '70px' : '10px'}` }} />
                <div className={`comment-input-button ${comment && 'comment-input-button-visible'}`}>
                    <Button style={{ height: '1rem', borderRadius: '0 0.2rem 0.2rem 0' }}>发送</Button>
                </div>
            </div>
        </div>
    )
}

export default MobileComment;