import React, { FC, useEffect, useState } from "react";
import { CloseOutlined, RightOutlined, DownOutlined, CaretRightOutlined, UpOutlined } from "@ant-design/icons";
import { IntroudctionType } from "@/enums";
import Button from "../Button";
import './index.scoped.scss';
import CommentIcon from "@/assets/images/comment.svg";
import LikeIcon from "@/assets/images/like.svg";
import LikeActive from "@/assets/images/likeActive.svg";

interface Props {
    type: IntroudctionType;
    onClosed?: () => void;
    style?: React.CSSProperties;
    index?: number;
}

const Introduction: FC<Props> = ({ onClosed, type, style, index }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showMoreComment, setShowMoreComment] = useState(false);
    const [comment, setComment] = useState('');
    const [likeActive, setLikeActive] = useState(false);

    useEffect(() => {
        setActiveIndex(index || 0);
    }, [index]);

    return (
        <div className="container" style={style}>
            {type === IntroudctionType.VIDEO && (
                <header className="choose">
                    <div className="header-choose">
                        <span className={`header-choose-item ${activeIndex === 0 && 'header-choose-active'}`} onClick={() => setActiveIndex(0)}>TA的作品</span>
                        <span className={`header-choose-item ${activeIndex === 1 && 'header-choose-active'}`} onClick={() => setActiveIndex(1)}>视频评论</span>
                    </div>
                    <CloseOutlined onClick={onClosed} className="header-close-icon" />
                </header>
            )}
            {activeIndex === 0 ?
                (<>
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
                </>) :
                (<div className="comment-container">
                    <header className="comment-header">全部评论(123)</header>
                    <div className="comment-body">
                        <div className="comment-item">
                            <div className="comment-item-avatar"></div>
                            <div className="comment-item-detail">
                                <div className="comment-item-name">小明爱敲代码</div>
                                <div className="comment-item-content">这个视频真的很棒，我很喜欢</div>
                                <div className="comment-item-time">2021-01-01 12:00</div>
                                <div className="comment-footer">
                                    <div className="comment-item-back"><img src={CommentIcon} alt="" />回复</div>
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
                                    <div className="comment-item-time">2021-01-01 12:00</div>
                                    <div className="comment-footer">
                                        <div className="comment-item-back"><img src={CommentIcon} alt="" />回复</div>
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
                            <Button style={{ height: '40px', borderRadius: '0 10px 10px 0' }}>发送</Button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Introduction;