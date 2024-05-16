import React, { FC, useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperClass } from "swiper/react";
import MobliePlayer from "@/components/MobileVideo/Player";
import 'swiper/css';
import "./index.scoped.scss";
import MobileComment from "./MobileComment";
import { VideoInfo, VideoInteraction } from "@/api/video/type";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { deleteVideoListArray, selectVideoListArray, setVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import { setVideoList } from "@/stores/slices/videoSlice";
import { LeftCircleFilled } from "@ant-design/icons";
import { getRandowVideo, getRecommendVideoByUserId, getRecommendVideoByVideoId, getVideoByUserId } from "@/api/video";
import LikeIcon from "@/assets/images/like.svg";
import { createPortal } from "react-dom";
import Mark from "../Mark";
import { getCommentByVideoId } from "@/api/comment";
import { createWatchHistory } from "@/api/watchHistory";
interface Props {
    videoList: VideoInteraction[] | VideoInfo[];
    videoId?: number;
}

let recommendCount = 0;
const MobileVideo: FC<Props> = ({ videoList, videoId }) => {
    const dispatch = useAppDispatch();
    const videoListArray = useAppSelector(selectVideoListArray);
    const [activeIndex, setActiveIndex] = useState(videoList.findIndex((item) => item.id === videoId) === -1 ? 0 : videoList.findIndex((item) => item.id === videoId));
    const mobileVideoList = useRef<HTMLDivElement>(null);
    const [moreVideoVisible, setMoreVideoVisible] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false)
    const [videoListData, setVideoListData] = useState<VideoInteraction[]>([]);
    const [chooseIndex, setChooseIndex] = useState<number>(0);
    const [swiperPCInstance, setSwipePCrInstance] = useState<SwiperClass>();
    const [currenVideoIndex, setCurrenVideoIndex] = useState(0)
    const [commentCount, setCommentCount] = useState(0);
    const [isRecommend, setIsRecommend] = useState<boolean>(false);
    const [watchProgrees, setWatchProgrees] = useState<number>(0);

    const getCommentCountData = async (videoId: number) => {
        try {
            const data = await getCommentByVideoId(videoId);
            setCommentCount(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (videoListData) {
            const index = videoListData.findIndex((item) => item.id === videoList![activeIndex].id)
            setCurrenVideoIndex(index)
        }
    }, [activeIndex, videoList, videoListData])

    useEffect(() => {
        const { current } = mobileVideoList;
        let startX = 0;
        const handleLeftSlide = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            current!.addEventListener('touchmove', handleLeftSlideMove, { passive: true });
            current!.addEventListener('touchend', () => {
                current!.removeEventListener('touchmove', handleLeftSlideMove);
            }, { passive: true });
        };

        const handleLeftSlideMove = (e: TouchEvent) => {
            if (startX - e.touches[0].clientX > 70) {
                setMoreVideoVisible(true);
            }

            if (e.touches[0].clientX - startX > 70) {
                setMoreVideoVisible(false);
            }
        };

        if (current) {
            current.addEventListener('touchstart', handleLeftSlide, { passive: true });
        }

        return () => {
            if (current) {
                current.removeEventListener('touchstart', handleLeftSlide);
            }
        };
    }, [mobileVideoList]);

    useEffect(() => {
        const getVideoByUserIdData = async (userId: string) => {
            try {
                const data = await getVideoByUserId(userId)
                setVideoListData(data)
            } catch (e) {
                console.log(e)
            }
        }
        if (moreVideoVisible) {
            getVideoByUserIdData(videoList ? videoList[activeIndex].userId.toString() : '0')
        }
    }, [activeIndex, moreVideoVisible, videoList, videoListData.length])

    const handleClickVideo = (index: number) => {
        for (let i = 0; i < videoListArray.length; i++) {
            if (JSON.stringify(videoListArray[i]) === JSON.stringify(videoListData)) {
                swiperPCInstance?.slideTo(index)
                return
            }
        }
        setChooseIndex(index)
        dispatch(setVideoListArray(videoListData))
    }

    const cratetWatchProgress = async (videoId: number, watchProgrees: number) => {
        try {
            await createWatchHistory({ videoId, progress: watchProgrees })
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSlideChange = (swiper: SwiperClass) => {
        if (localStorage.getItem('userInfo')) {
            cratetWatchProgress(videoList![activeIndex].id, watchProgrees / 100)
            setWatchProgrees(0)
        }
        setActiveIndex(swiper.activeIndex)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getRecommendByVideoIdData = async (videoId: number) => {
        try {
            const data = await getRecommendVideoByVideoId(videoId);
            dispatch(setVideoList(data))
        } catch (e) {
            console.log(e)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getRandowVideoData = async () => {
        try {
            const res = await getRandowVideo();
            dispatch(setVideoList(res));
        } catch (e) {
            console.log(e);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getRecommendVideoByUserIdData = async () => {
        try {
            const res = await getRecommendVideoByUserId();
            dispatch(setVideoList(res));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (isRecommend && recommendCount < 2) {
            getRecommendByVideoIdData(videoList![activeIndex].id)
            setIsRecommend(false)
            recommendCount++;
        }
        if (activeIndex === videoList.length - 4) {
            if (localStorage.getItem('userInfo')) {
                getRecommendVideoByUserIdData()
            } else {
                getRandowVideoData()
            }
            recommendCount = 0;
        }
    }, [activeIndex, getRandowVideoData, getRecommendByVideoIdData, getRecommendVideoByUserIdData, isRecommend, videoList])

    return (
        <>
            <div className={`container-mobile ${videoListArray.length > 0 && 'container-full'}`}>
                {videoListArray.length > 0 &&
                    <LeftCircleFilled className="video-back" onClick={() => {
                        dispatch(deleteVideoListArray(videoList!))
                    }} />}
                <div className="video-list" ref={mobileVideoList} style={{ width: `${moreVideoVisible ? 'calc(100% - 2.5rem)' : '100%'}` }}>
                    <Swiper
                        speed={800}
                        direction="vertical"
                        onSlideChange={handleSlideChange}
                        initialSlide={activeIndex}
                        onSwiper={setSwipePCrInstance}
                    >
                        {videoList.map((item, index) => (
                            <SwiperSlide key={item.id}>
                                <MobliePlayer
                                    changeCommentVisible={() => {
                                        setCommentVisible(!commentVisible)
                                        setMoreVideoVisible(false)
                                    }}
                                    commentVisible={commentVisible}
                                    index={index}
                                    activeIndex={activeIndex}
                                    videoId={item.id}
                                    commentCount={commentCount}
                                    getCommentCountData={getCommentCountData}
                                    setIsRecommend={setIsRecommend}
                                    setWatchProgrees={setWatchProgrees}
                                />
                            </SwiperSlide>
                        )
                        )}
                    </Swiper>
                </div>
                <div className={`video-more ${moreVideoVisible && 'video-more-active'}`} style={{ padding: `${videoListArray.length > 0 ? '0.3rem 0.1rem 0 0.1rem' : 'padding: 0.93333rem 0.1rem 0 0.1rem;'}` }}>
                    <span className="title">TA的作品</span>
                    <ul>
                        {videoListData.map((item, index) => (
                            <li key={item.id} onClick={() => handleClickVideo(index)}>
                                <img src={item.poster} alt="" className="poster" />
                                <div className="like-show">
                                    <img src={LikeIcon} alt="" className="like-icon" />
                                    <span>{item.interactionCount}</span>
                                </div>
                                {currenVideoIndex === index && <div className="mark">
                                    正在播放
                                </div>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <MobileComment
                style={{ transform: `${commentVisible ? 'translateY(0)' : 'translateY(100%)'}` }}
                changeCommentVisible={() => setCommentVisible(!commentVisible)}
                getCommentCountData={getCommentCountData}
                videoId={videoList[activeIndex] ? videoList[activeIndex].id : 0}
            />
            {videoListArray.find((item) => item === videoListData) && createPortal(
                <Mark>
                    <MobileVideo videoList={videoListData} videoId={videoListData[chooseIndex].id} />
                </Mark>
                , document.body)}
        </>
    )
}

export default MobileVideo;
