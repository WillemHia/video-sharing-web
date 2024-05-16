import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectIsMobile, resetVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import './index.scoped.scss'
import AttentionIcon from "@/assets/images/attention.svg";
import LikeIcon from "@/assets/images/like.svg";
import LikeActiveIcon from "@/assets/images/likeActive.svg";
import CommnetIcon from "@/assets/images/comment.svg";
import CollecIcon from "@/assets/images/collect.svg";
import CollecActivetIcon from "@/assets/images/collectActive.svg";
import TransmitIcon from "@/assets/images/transmit.svg";
import SixIcon from "@/assets/images/666.svg";
import EmoIcon from "@/assets/images/emo.png";
import IndignationIcon from "@/assets/images/indignation.png";
import UpvoteIcon from "@/assets/images/upvote.png";
import LaughIcon from "@/assets/images/laugh.png";
import { VideoDetail } from "@/api/video/type";
import { createFollow } from "@/api/follow";
import { message } from "antd";
import { createCollect, updateCollect } from "@/api/collect";
import { updateInteractionType } from "@/api/Interaction";

interface Props {
    introductionVisible?: boolean;
    videoTimeVisible?: boolean;
    commentVisibleHandle?: () => void;
    changeCommentVisible?: () => void;
    videoDetail: VideoDetail;
    commentCount: number;
    collectCount: number;
    interactionCount: number;
    follow: boolean;
    collect: boolean;
    interactionType: number;
    setFollow: (vaule: boolean) => void;
    setCollect: (vaule: boolean) => void;
    setInteractionType: (type: number) => void;
    getCollectCountData: (videoId: number) => void;
    getInteractionCountData: (videoId: number) => void;
}

const InterctionIcons = [
    { id: 1, icon: LikeActiveIcon, name: 'like-active' },
    { id: 2, icon: SixIcon, name: 'six' },
    { id: 3, icon: EmoIcon, name: 'emo' },
    { id: 4, icon: IndignationIcon, name: 'indignation' },
    { id: 5, icon: UpvoteIcon, name: 'upvote' },
    { id: 6, icon: LaughIcon, name: 'laugh' },
]

let clickCount = 0;

const Interction: FC<Props> = ({
    introductionVisible,
    videoTimeVisible,
    commentVisibleHandle,
    changeCommentVisible,
    videoDetail,
    commentCount,
    collectCount,
    interactionCount,
    follow,
    collect,
    interactionType,
    setFollow,
    setCollect,
    setInteractionType,
    getCollectCountData,
    getInteractionCountData }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useAppSelector(selectIsMobile);
    const [acitveIcon, setActiveIcon] = useState(0);
    const [showMoreLabel, setShowMoreLabel] = useState(false);
    const [moreInterctionVisible, setMoreInterctionVisible] = useState(false);
    const MoreInterctionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (MoreInterctionRef.current && !MoreInterctionRef.current.contains(e.target as Node)) {
                setMoreInterctionVisible(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    useEffect(() => {
        setActiveIcon(interactionType);
    }, [interactionType])

    const mobileInterctionClickHandle = () => {
        clickCount++;
        setTimeout(() => {
            if (clickCount === 1) {
                setActiveIcon(acitveIcon ? 0 : 1);
            } else {
                setMoreInterctionVisible(true);
            }
            clickCount = 0;
        }, 200);
    }

    const handleFollow = async () => {
        try {
            const data = await createFollow(videoDetail.userId);
            if (data.code === 200) {
                message.success('关注成功', 2);
                setFollow(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCollect = async () => {
        try {
            if (collect) {
                const data = await updateCollect(videoDetail.id);
                if (data.code === 200) {
                    message.success('取消收藏', 2);
                    setCollect(false);
                }
            } else {
                const data = await createCollect(videoDetail.id);
                if (data.code === 200) {
                    message.success('收藏成功', 2);
                    setCollect(true);
                }
            }
            getCollectCountData(videoDetail.id)
        } catch (error) {
            console.log(error);
        }
    }

    const handleInteractionType = async (type: number) => {
        try {
            const data = await updateInteractionType(videoDetail.id, type);
            if (data.code === 200) {
                setInteractionType(type);
                getInteractionCountData(videoDetail.id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickUsername = (userId: number) => {
        dispatch(resetVideoListArray());
        navigate(`/user-info/${userId}`, { state: { tabbarHidden: true } });
    }
    return (
        <>
            <div className="video-interaction" style={{ right: `${isMobile ? '0.4rem' : introductionVisible ? '20px' : '50px'}` }}>
                <div className="video-author-avater">
                    <img src={videoDetail.user?.avatar} alt="" />
                    {!follow && <img className="attention-icon" src={AttentionIcon} alt="" onClick={handleFollow} />}
                </div>
                <div className="video-interction-item">
                    {acitveIcon === 0 ?
                        (<img className="video-interction-item-icon" src={LikeIcon} alt="" onClick={isMobile ? mobileInterctionClickHandle : () => handleInteractionType(1)} onMouseEnter={isMobile ? () => { } : () => { setMoreInterctionVisible(true) }} onMouseLeave={isMobile ? () => { } : () => { setMoreInterctionVisible(false) }} />) :
                        InterctionIcons.filter(item => item.id === acitveIcon).map(item => (
                            <img className={`video-interction-item-icon ${item.name}`} src={item.icon} alt="" key={item.id} onClick={isMobile ? mobileInterctionClickHandle : () => handleInteractionType(0)} onMouseEnter={isMobile ? () => { } : () => { setMoreInterctionVisible(true) }} onMouseLeave={isMobile ? () => { } : () => { setMoreInterctionVisible(false) }} />
                        ))}
                    <span className="video-interction-item-text ">
                        {interactionCount}
                    </span>
                    <div
                        className={`more-interction ${moreInterctionVisible && 'more-interction-visible'}`}
                        onMouseEnter={isMobile ? () => { } : () => { setMoreInterctionVisible(true) }}
                        onMouseLeave={isMobile ? () => { } : () => { setMoreInterctionVisible(false) }}
                        ref={MoreInterctionRef}>
                        {InterctionIcons.filter(item => item.id !== acitveIcon).map(item => (
                            <img
                                className={`video-interction-item-icon ${item.name}`}
                                src={item.icon}
                                alt=""
                                key={item.id}
                                onClick={() => {
                                    handleInteractionType(item.id)
                                    setMoreInterctionVisible(false)
                                }} />
                        ))}
                    </div>
                </div>
                <div className="video-interction-item">
                    <img className="video-interction-item-icon comment" src={CommnetIcon} alt="" onClick={isMobile ? changeCommentVisible : commentVisibleHandle} />
                    <span className="video-interction-item-text ">
                        {commentCount}
                    </span>
                </div>
                <div className="video-interction-item">
                    <img className="video-interction-item-icon" src={collect ? CollecActivetIcon : CollecIcon} alt="" onClick={handleCollect} />
                    <span className="video-interction-item-text ">
                        {collectCount}
                    </span>
                </div>
                <div className="video-interction-item">
                    <img className="video-interction-item-icon transmit" src={TransmitIcon} alt="" />
                    <span className="video-interction-item-text ">
                        0
                    </span>
                </div>
            </div>
            <div className="video-detail" style={{ opacity: `${videoTimeVisible ? '0' : '1'}` }}>
                <div className="video-author">
                    <span onClick={() => handleClickUsername(videoDetail.user.id)}>@{videoDetail?.user?.username}</span>
                </div>
                <div className={`video-description-label ${!showMoreLabel && 'video-description-label-hidden'}`} onClick={() => setShowMoreLabel(!showMoreLabel)}>
                    <span>{videoDetail.introduce}</span>
                    {
                        videoDetail.label?.split('/').map((item, index) => (
                            <span key={index}>#{item}</span>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Interction;