import React, { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { CloseOutlined, RightOutlined, DownOutlined, CaretRightOutlined, UpOutlined, CloseCircleFilled } from "@ant-design/icons";
import { IntroudctionType } from "@/enums";
import Button from "../Button";
import './index.scoped.scss';
import CommentIcon from "@/assets/images/comment.svg";
import LikeIcon from "@/assets/images/like.svg";
import LikeActive from "@/assets/images/likeActive.svg";
import { UserInfo } from "@/api/user/type";
import { VideoInteraction } from "@/api/video/type";
import { createFollow, updateFollow } from "@/api/follow";
import Mark from "../Mark";
import PCVideo from "../PCVideo";
import { setVideoListArray, selectVideoListArray, resetVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import { CommentDetail } from "@/api/comment/type";
import { formatDateToTime } from "@/utils/format";
import { createCommnet } from "@/api/comment";
import { NormalResponse } from "@/api/type";
import { message } from "antd";
import SendIcon from '@/assets/images/send.svg'
import { CommentLike } from "@/api/commetLike/type";
import { createCommentLike, deleteCommentLike } from "@/api/commetLike";

interface Props {
    type: IntroudctionType;
    onClosed?: () => void;
    style?: React.CSSProperties;
    index?: number;
    userInfo: UserInfo;
    videoList: VideoInteraction[];
    interactionVideoCount: number;
    fansCount: number;
    follow: boolean;
    setFollow: (value: boolean) => void;
    setIndex: (value: number) => void;
    slideToIndex: (index: number) => void;
    commentDetail: CommentDetail[];
    getCommentDetailData: (videoId: number) => void;
    commentLikeList: CommentLike[];
    getCommentLikeListData: (videoId: number) => void;
    videoId: number;
    getCommentCountData: (videoId: number) => void;
}

const Introduction: FC<Props> = ({ onClosed, type, style, index, videoId, userInfo, getCommentCountData, commentLikeList, videoList, interactionVideoCount, getCommentDetailData, getCommentLikeListData, commentDetail, fansCount, follow, setFollow, setIndex, slideToIndex }) => {
    const dispatch = useAppDispatch();
    const navgiate = useNavigate();
    const videoListArray = useAppSelector(selectVideoListArray);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showMoreIndex, setShowMoreIndex] = useState<number[]>([])
    const [comment, setComment] = useState('');
    const [videoListIndex, setVideoListIndex] = useState(0)
    const [commnetTreeList, setCommnetTreeList] = useState<CommentDetail[]>([])
    const [replyComment, setReplyComment] = useState<CommentDetail | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [currenVideoIndex, setCurrenVideoIndex] = useState(0)

    useEffect(() => {
        if(videoList){
            const index = videoList.findIndex((item) => item.id === videoId)
            setCurrenVideoIndex(index)
        }
    }, [videoId, videoList])

    useEffect(() => {
        setActiveIndex(index || 0);
    }, [index]);

    useEffect(() => {
        const tree: CommentDetail[] = []
        commentDetail.forEach((item) => {
            if (!item.parentId) {
                tree.push(item)
            } else {
                const parent = commentDetail.find((parent) => parent.id === item.parentId)
                if (parent) {
                    parent.childComment = parent.childComment || []
                    parent.childComment.push(item)
                }
            }
        })
        setCommnetTreeList(tree)
        setComment('')
        setReplyComment(null)
    }, [commentDetail])

    const handleActiveIndex = (index: number) => {
        setActiveIndex(index);
        setIndex(index);
    }

    const handleShowMoreComment = (id: number, type: number) => {
        if (type === 1) {
            setShowMoreIndex([...showMoreIndex, id])
        } else {
            const newShowMoreIndex = showMoreIndex.filter((item) => item !== id)
            setShowMoreIndex(newShowMoreIndex)
        }
    }

    const handleChangeFollow = async () => {
        try {
            if (follow) {
                const data = await updateFollow(userInfo.id)
                if (data) {
                    setFollow(false)
                }
            } else {
                const data = await createFollow(userInfo.id)
                if (data) {
                    setFollow(true)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleClickVideo = (index: number) => {
        for (let i = 0; i < videoListArray.length; i++) {
            if (JSON.stringify(videoListArray[i]) === JSON.stringify(videoList)) {
                slideToIndex(index)
                setCurrenVideoIndex(index)
                return
            }
        }
        setVideoListIndex(index)
        dispatch(setVideoListArray(videoList))
    }

    const handleReplyComment = (comment: CommentDetail) => {
        setReplyComment(comment)
        const { current } = inputRef
        if (current) {
            current.focus()
        }
    }

    const handleDeleteLike = async (commentId: number) => {
        try {
            const data = await deleteCommentLike(commentId)
            if (data.code === 200) {
                getCommentLikeListData(videoId)
                getCommentDetailData(videoId)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleCreateLike = async (commentId: number) => {
        try {
            const data = await createCommentLike(commentId)
            if (data.code === 200) {
                getCommentLikeListData(videoId)
                getCommentDetailData(videoId)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSend = async () => {
        try {
            let data = {} as NormalResponse
            if (replyComment) {
                if (replyComment.parentId) {
                    data = await createCommnet({ content: comment, videoId: replyComment.videoId, parentId: replyComment.parentId, replyUserId: replyComment.user.id })
                } else {
                    data = await createCommnet({ content: comment, videoId: replyComment.videoId, parentId: replyComment.id, replyUserId: replyComment.user.id })
                }
            } else {
                data = await createCommnet({ content: comment, videoId: videoId })
            }
            if (data.code === 200) {
                setComment('')
                setReplyComment(null)
                message.success('评论成功', 2)
            }
            getCommentDetailData(videoId)
            getCommentCountData(videoId)
        } catch (e) {
            console.log(e)
        }
    }

    const handleClickUsername = (id: number) => {
        dispatch(resetVideoListArray())
        navgiate(`/user-info/${id}`)
    }

    return (
        <div className="container" style={style}>
            {type === IntroudctionType.VIDEO && (
                <header className="choose">
                    <div className="header-choose">
                        <span className={`header-choose-item ${activeIndex === 0 && 'header-choose-active'}`} onClick={() => handleActiveIndex(0)}>TA的作品</span>
                        <span className={`header-choose-item ${activeIndex === 1 && 'header-choose-active'}`} onClick={() => handleActiveIndex(1)}>视频评论</span>
                    </div>
                    <CloseOutlined onClick={onClosed} className="header-close-icon" />
                </header>
            )}
            {activeIndex === 0 ?
                (<>
                    <div className="author-introduce">
                        <div className="author-introduce-body">
                            <div className="author-introduce-body-name"><span className="name">{userInfo.username}</span> <RightOutlined className="icon" /></div>
                            <div className="author-introduce-body-heat">
                                <span>{fansCount}粉丝</span>
                                <span>|</span>
                                <span>{interactionVideoCount}点赞</span>
                                <span>|</span>
                                <span>{videoList.length}作品</span>
                            </div>
                        </div>
                        {!follow ? <Button onClick={handleChangeFollow}>关注</Button> : <Button style={{ background: "#3c3c3c" }} onClick={handleChangeFollow}>取消关注</Button>}
                    </div>
                    <ul className="video-more">
                        {videoList.map((item, index) => (
                            <li className="video-more-item" key={item.id} onClick={() => handleClickVideo(index)}>
                                <img src={item.poster} alt="" className="poster" />
                                <div className="like-show">
                                    <img src={LikeIcon} alt="" className="icon" />
                                    <span>{item.interactionCount}</span>
                                </div>
                                {index === currenVideoIndex && <div className="mark">
                                    正在播放
                                </div>}
                            </li>
                        ))}
                        <div className="on-more">
                            已经到底了哟~
                        </div>
                    </ul>
                </>) :
                (<div className="comment-container">
                    <header className="comment-header">全部评论({commentDetail.length})</header>
                    <div className="comment-body">
                        {commnetTreeList.map((item) => (
                            <div key={item.id}>
                                <div className="comment-item">
                                    <img className="comment-item-avatar" src={item.user.avatar} alt="" />
                                    <div className="comment-item-detail">
                                        <div className="comment-item-name" onClick={() => handleClickUsername(item.user.id)}>{localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).id === item.user.id ? '我' : item.user.username : item.user.username}</div>
                                        <div className="comment-item-content">{item.content}</div>
                                        <div className="comment-item-time">{formatDateToTime(item.createTime)}</div>
                                        <div className="comment-footer">
                                            <div className="comment-item-back" onClick={() => handleReplyComment(item)}><img src={CommentIcon} alt="" />回复</div>
                                            {commentLikeList.find((commentLike) => commentLike.commentId === item.id) ?
                                                <div className="comment-item-liked"><img src={LikeActive} alt="" onClick={() => handleDeleteLike(item.id)} />{item.commentCount}</div> :
                                                <div className="comment-item-like"><img src={LikeIcon} alt="" onClick={() => handleCreateLike(item.id)} />{item.commentCount}</div>}
                                        </div>
                                    </div>
                                </div>
                                {showMoreIndex.includes(item.id) && item.childComment && item.childComment.map((child) => (
                                    <div className="comment-item-reply" key={child.id}>
                                        <img className="comment-item-avatar" src={child.user.avatar} alt="" />
                                        <div className="comment-item-detail">
                                            <div className="comment-item-name-container">
                                                <span className="comment-item-name" onClick={() => handleClickUsername(child.user.id)}>{localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).id === child.user.id ? '我' : child.user.username : child.user.username}</span>
                                                <CaretRightOutlined className="comment-reply-icon" />
                                                <span className="comment-item-name comment-item-name-reply" onClick={() => handleClickUsername(child.replyUser?.id!)}>{child.replyUser?.username}</span>
                                            </div>
                                            <div className="comment-item-content">{child.content}</div>
                                            <div className="comment-item-time">{formatDateToTime(child.createTime)}</div>
                                            <div className="comment-footer">
                                                <div className="comment-item-back" onClick={() => handleReplyComment(child)}><img src={CommentIcon} alt="" />回复</div>
                                                {commentLikeList.find((commentLike) => commentLike.commentId === child.id) ?
                                                    <div className="comment-item-liked"><img src={LikeActive} alt="" onClick={() => handleDeleteLike(child.id)} />{child.commentCount}</div> :
                                                    <div className="comment-item-like"><img src={LikeIcon} alt="" onClick={() => handleCreateLike(child.id)} />{child.commentCount}</div>}
                                            </div>
                                        </div>
                                    </div>))}
                                {item.childComment && (showMoreIndex.includes(item.id) ?
                                    (<div className="comment-more" onClick={() => handleShowMoreComment(item.id, 0)}>收起<UpOutlined className="comment-more-icon" /></div>) : (
                                        <div className="comment-more" onClick={() => handleShowMoreComment(item.id, 1)}>展开{item.childComment.length}条回复<DownOutlined className="comment-more-icon" /></div>
                                    ))}
                            </div>
                        ))}
                    </div>
                    <div className="comment-input">
                        <input ref={inputRef} type="text" placeholder="写下你的评论..." value={comment} onChange={(e) => { setComment(e.target.value) }} style={{ paddingRight: `${comment ? '40px' : '10px'}` }} className={`${replyComment && 'input-active'}`} />
                        {replyComment &&
                            <div className="reply-info">
                                <span className="info">回复@{replyComment.user.username}{replyComment.content}</span>
                                <CloseCircleFilled onClick={() => setReplyComment(null)} />
                            </div>}
                        <div className={`comment-input-button ${comment && 'comment-input-button-visible'}`}>
                            <img src={SendIcon} alt="" onClick={handleSend} />
                        </div>
                    </div>
                </div>)
            }
            {videoListArray.find(item => item === videoList) && createPortal(
                <Mark>
                    <PCVideo videoList={videoList} videoListIndex={videoListIndex} />
                </Mark>
                , document.body)}
        </div>
    );
};

export default Introduction;