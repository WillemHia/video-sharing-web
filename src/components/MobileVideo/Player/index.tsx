import React, { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectCurrentVideoDetail, setVideoDetailList } from "@/stores/slices/videoSlice";
import { selectVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import { videoTimeFormat } from "@/utils/videoTimeFormat";
import Interction from "../../Interction";
import "./index.scoped.scss";
import PlayIcon from "@/assets/images/play.svg";
import { getIsFollow } from "@/api/follow";
import { getCollectByVideoId, getIsCollect } from "@/api/collect";
import { getInteractionByVideoId, getIsInteraction } from "@/api/Interaction";
import { VideoDetail } from "@/api/video/type";

interface Props {
    changeCommentVisible: () => void;
    commentVisible: boolean;
    index: number;
    activeIndex: number;
    videoId: number;
    commentCount: number;
    getCommentCountData: (videoId: number) => void;
    setIsRecommend: (isRecommend: boolean) => void;
    setWatchProgrees: (watchProgrees: number) => void;
}

const MobliePlayer: FC<Props> = ({ changeCommentVisible, commentVisible, index, setIsRecommend, setWatchProgrees, activeIndex, videoId, commentCount, getCommentCountData }) => {
    const dispatch = useAppDispatch();
    const videoListArray = useAppSelector(selectVideoListArray);
    const videoDetail = useAppSelector(selectCurrentVideoDetail(videoId));
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoProgressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoTimeVisible, setVideoTimeVisible] = useState(false);
    const [interactionCount, setInteractionCount] = useState(0);
    const [collectCount, setCollectCount] = useState(0);
    const [collect, setCollect] = useState(false);
    const [interactionType, setInteractionType] = useState(0);
    const [follow, setFollow] = useState(false);
    const [isChange, setIsChange] = useState(false);

    const getInteractionCountData = async (videoId: number) => {
        try {
            const data = await getInteractionByVideoId(videoId);
            setInteractionCount(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getCollectCountData = async (videoId: number) => {
        try {
            const data = await getCollectByVideoId(videoId);
            setCollectCount(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getInteractionInfo = async (userId: number, videoId: number) => {
        try {
            const follow = await getIsFollow(userId, videoId);
            const collect = await getIsCollect(userId, videoId);
            const interactionType = await getIsInteraction(userId, videoId);
            setFollow(follow);
            setCollect(collect);
            setInteractionType(interactionType);
        } catch (error) {
            console.log(error);
        }
    }


    const handleVideoPlay = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        if (index !== activeIndex) {
            setIsPlaying(false);
        } else {
            dispatch(setVideoDetailList(videoId));
            getInteractionCountData(videoId);
            getCollectCountData(videoId);
            getCommentCountData(videoId);
            if (localStorage.getItem('userInfo')) {
                getInteractionInfo(JSON.parse(localStorage.getItem('userInfo')!).id, videoId!)
            }
        }
    }, [index, activeIndex, dispatch, videoId]);

    useEffect(() => {
        setWatchProgrees(videoProgress)
        if (!isChange && videoProgress > 75) {
            setIsChange(true)
            setIsRecommend(true)
        }
    }, [isChange, videoProgress, setIsRecommend])

    const handleVideoProgressStart = ({ nativeEvent: e }: React.TouchEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setVideoTimeVisible(true);
        document.addEventListener('touchend', handleVideoProgressEnd);
        const { current } = videoRef;
        if (current) {
            setIsPlaying(false);
            const { current: progress } = videoProgressRef;
            if (progress) {
                progress.addEventListener('touchmove', handleVideoProgressMove);
                changeProgress(e, progress, current);
            }
        }

    }

    const handleVideoProgressMove = (e: TouchEvent) => {
        e.stopPropagation();
        const { current } = videoRef;
        if (current) {
            const { current: progress } = videoProgressRef;
            if (progress) {
                changeProgress(e, progress, current);
            }
        }
    }

    const handleVideoProgressEnd = (e: TouchEvent) => {
        e.stopPropagation();
        setVideoTimeVisible(false);
        const { current } = videoRef;
        if (current) {
            setIsPlaying(true);
            const { current: progress } = videoProgressRef;
            if (progress) {
                progress.removeEventListener('touchmove', handleVideoProgressMove);
            }
        }
        document.removeEventListener('touchend', handleVideoProgressEnd);
    }

    const changeProgress = (e: TouchEvent, progress: HTMLDivElement, video: HTMLVideoElement) => {
        const { width, x } = progress.getBoundingClientRect();
        const offsetX = e.touches[0].clientX - x;
        //边界处理
        if (offsetX < 0) {
            video.currentTime = 0;
            return;
        }
        if (offsetX > width) {
            video.currentTime = video.duration;
            return;
        }
        video.currentTime = video.duration * offsetX / width;
    }


    useEffect(() => {
        const { current } = videoRef;
        if (current) {
            if (isPlaying) {
                current.play();
            } else {
                current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        const { current } = videoRef;
        if (current) {
            current.addEventListener('ended', () => {
                setIsPlaying(false);
            });
            current.addEventListener('timeupdate', () => {
                const { currentTime, duration } = current;
                setVideoProgress(currentTime / duration * 100);
            });
        }

        return () => {
            if (current) {
                current.removeEventListener('ended', () => { });
            }
        }
    }, []);

    return (
        <div className="container" style={{ height: `${commentVisible ? '40vh' : 'calc(100% - 0.05rem)'}` }}>
            {!isPlaying && !commentVisible && (
                <div className="play-icon" onClick={handleVideoPlay}>
                    <img src={PlayIcon} alt="play" />
                </div>
            )}
            <video
                className="video"
                src={videoDetail?.url}
                poster={videoDetail?.poster}
                ref={videoRef}
                onClick={commentVisible ? changeCommentVisible : handleVideoPlay}
            />
            <div className={`video-progress ${commentVisible && 'video-progress-hidden'}`} style={{ bottom: `${videoListArray.length > 0 ? '0.2rem' : '0'}` }}>
                <div className="video-time" style={{ opacity: `${videoTimeVisible ? '1' : '0'}` }} onClick={handleVideoPlay}>
                    <span className="current-time">{videoTimeFormat(videoRef.current?.currentTime!)}</span>
                    <span>/</span>
                    <span>{videoTimeFormat(videoRef.current?.duration!)}</span>
                </div>
                <div
                    className={`progress ${!isPlaying && 'progress-pause'} ${videoTimeVisible && 'progress-move'}`}
                    style={{ '--progress-width': `${videoProgress}%` } as React.CSSProperties}
                    onTouchStart={handleVideoProgressStart}
                    ref={videoProgressRef}
                >
                    <div className="progress-bar" />
                </div>
            </div>
            <div className={`interction-container ${commentVisible && 'interction-container-hidden'}`}>
                <Interction
                    videoTimeVisible={videoTimeVisible}
                    changeCommentVisible={changeCommentVisible}
                    videoDetail={videoDetail || {} as VideoDetail}
                    interactionCount={interactionCount}
                    collectCount={collectCount}
                    commentCount={commentCount}
                    follow={follow}
                    collect={collect}
                    interactionType={interactionType}
                    setFollow={setFollow}
                    setCollect={setCollect}
                    setInteractionType={setInteractionType}
                    getCollectCountData={getCollectCountData}
                    getInteractionCountData={getInteractionCountData}
                />
            </div>
        </div>
    )
}

export default MobliePlayer;