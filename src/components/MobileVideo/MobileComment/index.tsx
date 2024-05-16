import React, { FC, useEffect, useRef, useState } from "react";
import { CloseOutlined, UpOutlined, DownOutlined, CaretRightOutlined } from "@ant-design/icons";
import './index.scoped.scss';
import LikeIcon from "@/assets/images/blackLike.svg";
import LikeActive from "@/assets/images/likeActive.svg";
import { createCommnet, getAllCommentByVideoId } from "@/api/comment";
import { CommentDetail } from "@/api/comment/type";
import { CommentLike } from "@/api/commetLike/type";
import { createCommentLike, deleteCommentLike, getCommnetLikeByVideoIdAndUserId } from "@/api/commetLike";
import { formatDateToTime } from "@/utils/format";
import SendIcon from "@/assets/images/send.svg";
import { NormalResponse } from "@/api/type";
import { message } from "antd";
import { resetVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import { useAppDispatch } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";

interface Props {
    style?: React.CSSProperties;
    changeCommentVisible: () => void;
    videoId: number;
    getCommentCountData: (videoId: number) => void;
}

let sendButtonClicked = false
const MobileComment: FC<Props> = ({ style, changeCommentVisible, videoId, getCommentCountData }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showMoreIndex, setShowMoreIndex] = useState<number[]>([])
    const [comment, setComment] = useState('');
    const [commentDetail, setCommentDetail] = useState<CommentDetail[]>([]);
    const [commentLikeList, setCommentLikeList] = useState<CommentLike[]>([]);
    const [commnetTreeList, setCommnetTreeList] = useState<CommentDetail[]>([])
    const [replyComment, setReplyComment] = useState<CommentDetail | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const getCommentDetailData = async (videoId: number) => {
        try {
            const data = await getAllCommentByVideoId(videoId)
            setCommentDetail(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getCommentLikeListData = async (videoId: number) => {
        try {
            const data = await getCommnetLikeByVideoIdAndUserId(videoId)
            setCommentLikeList(data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleShowMoreComment = (id: number, type: number) => {
        if (type === 1) {
            setShowMoreIndex([...showMoreIndex, id])
        } else {
            const newShowMoreIndex = showMoreIndex.filter((item) => item !== id)
            setShowMoreIndex(newShowMoreIndex)
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
        sendButtonClicked = true
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
        sendButtonClicked = false
    }

    const handleBlur = () => {
        if (!sendButtonClicked && !comment) {
            setReplyComment(null)
        }
        sendButtonClicked = false
    }

    const handleClickUsername = (userId: number) => {
        dispatch(resetVideoListArray());
        navigate(`/user-info/${userId}`, { state: { tabbarHidden: true } });
    }

    useEffect(() => {
        getCommentDetailData(videoId)
        if (localStorage.getItem('userInfo')) {
            getCommentLikeListData(videoId)
        }
    }, [videoId])


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

    useEffect(() => {
        if (replyComment) {
            inputRef.current!.focus()
        }
    }, [replyComment])

    return (
        <div className="container" style={style}>
            <header className="header">
                {commentDetail.length}条评论
                <div className="close" onClick={changeCommentVisible}>
                    <CloseOutlined />
                </div>
            </header>
            <div className="comment-body">
                {commnetTreeList.map((item) => (
                    <div key={item.id}>
                        <div className="comment-item">
                            <img className="comment-item-avatar" src={item.user.avatar} alt="" onClick={() => handleClickUsername(item.userId)} />
                            <div className="comment-item-detail">
                                <div className="comment-item-name" onClick={() => handleClickUsername(item.userId)}>{localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).id === item.user.id ? '我' : item.user.username : item.user.username}</div>
                                <div className="comment-item-content">{item.content}</div>
                                <div className="comment-footer">
                                    <div className="comment-footer-left">
                                        <div className="comment-item-time">{formatDateToTime(item.createTime)}</div>
                                        <div className="comment-item-back" onClick={() => setReplyComment(item)}>回复</div>
                                    </div>
                                    {commentLikeList.find((commentLike) => commentLike.commentId === item.id) ?
                                        <div className="comment-item-liked"><img src={LikeActive} alt="" onClick={() => handleDeleteLike(item.id)} />{item.commentCount}</div> :
                                        <div className="comment-item-like"><img src={LikeIcon} alt="" onClick={() => handleCreateLike(item.id)} />{item.commentCount}</div>}
                                </div>
                            </div>
                        </div>
                        {showMoreIndex.includes(item.id) && item.childComment && item.childComment.map((child) => (
                            <div className="comment-item-reply" key={child.id}>
                                <img className="comment-item-avatar" src={child.user.avatar} alt="" onClick={() => handleClickUsername(child.userId)}/>
                                <div className="comment-item-detail">
                                    <div className="comment-item-name-container">
                                        <span className="comment-item-name" onClick={() => handleClickUsername(child.userId)}>{localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).id === child.user.id ? '我' : child.user.username : child.user.username}</span>
                                        <CaretRightOutlined className="comment-reply-icon" />
                                        <span className="comment-item-name comment-item-name-reply" onClick={() => handleClickUsername(child.replyUser?.id!)}>{child.replyUser?.username}</span>
                                    </div>
                                    <div className="comment-item-content">{child.content}</div>
                                    <div className="comment-footer">
                                        <div className="comment-footer-left">
                                            <div className="comment-item-time">{formatDateToTime(item.createTime)}</div>
                                            <div className="comment-item-back" onClick={() => setReplyComment(child)}>回复</div>
                                        </div>
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
                    </div>))}
            </div>
            <div className="comment-input">
                <input type="text" ref={inputRef} onBlur={handleBlur} placeholder={replyComment ? `回复 ${replyComment.user.username}` : '写下你的评论...'} onChange={(e) => { setComment(e.target.value) }} value={comment} style={{ paddingRight: `${comment ? '1.2rem' : '0.26666rem'}` }} />
                <div className={`comment-input-button ${comment && 'comment-input-button-visible'}`}>
                    <img src={SendIcon} alt="" onClick={handleSend} />
                </div>
            </div>
        </div>
    )
}

export default MobileComment;