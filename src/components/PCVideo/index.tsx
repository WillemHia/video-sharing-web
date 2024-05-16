import React, { FC, useEffect, useState } from "react";
import { DownOutlined, UpOutlined, LeftOutlined, LeftCircleFilled } from "@ant-design/icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper/modules';
import type { SwiperClass } from "swiper/react";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectIsVideoFullScreen, selectVideoListArray, deleteVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import { setVideoList } from "@/stores/slices/videoSlice";
import Introduction from "@/components/Introduction";
import Player from "@/components/PCVideo/Player";
import { IntroudctionType } from "@/enums";
import 'swiper/css';
import "./index.scoped.scss"
import { VideoInfo, VideoInteraction } from "@/api/video/type";
import { getRandowVideo, getRecommendVideoByUserId, getRecommendVideoByVideoId, getVideoByUserId } from "@/api/video";
import { getInteractionByUserId } from "@/api/Interaction";
import { getFansCount } from "@/api/follow";
import { UserInfo } from "@/api/user/type";
import { getAllCommentByVideoId, getCommentByVideoId } from "@/api/comment";
import { CommentDetail } from "@/api/comment/type";
import { CommentLike } from "@/api/commetLike/type";
import { getCommnetLikeByVideoIdAndUserId } from "@/api/commetLike";
import { createWatchHistory } from "@/api/watchHistory";

interface Props {
    videoList: VideoInteraction[] | VideoInfo[];
    videoListIndex?: number;
}

let recommendCount = 0;
const PCVideo: FC<Props> = ({ videoList, videoListIndex }) => {
    const isVideoFullScreen = useAppSelector(selectIsVideoFullScreen);
    const videoListArray = useAppSelector(selectVideoListArray);
    const dispatch = useAppDispatch();
    const [activeIndex, setActiveIndex] = useState(videoListIndex || 0);
    const [swiperPCInstance, setSwipePCrInstance] = useState<SwiperClass>();
    const [introductionVisible, setIntroductionVisible] = useState(false);
    const [allowTouchMove, setAllowTouchMove] = useState(true);
    const [videoListData, setVideoListData] = useState<VideoInteraction[]>([]);
    const [interactionVideoCount, setInteractionVideoCount] = useState<number>(0);
    const [fansCount, setFansCount] = useState<number>(0);
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const [follow, setFollow] = useState(false);
    const [index, setIndex] = useState(0);
    const [commentDetail, setCommentDetail] = useState<CommentDetail[]>([]);
    const [commentLikeList, setCommentLikeList] = useState<CommentLike[]>([]);
    const [commentCount, setCommentCount] = useState<number>(0);
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

    const getVideoByUserIdData = async (userId: string) => {
        try {
            const data = await getVideoByUserId(userId)
            setVideoListData(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getInteractionByUserIdData = async (userId: string) => {
        try {
            const data = await getInteractionByUserId(userId)
            setInteractionVideoCount(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getFansCountData = async (userId: string) => {
        try {
            const data = await getFansCount(userId)
            setFansCount(data)
        } catch (e) {
            console.log(e)
        }
    }

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

    const introductionVisibleHandle = () => {
        setIntroductionVisible(true);
        setIndex(0)
    }

    const commentVisibleHandle = () => {
        setIntroductionVisible(true);
        setIndex(1)
    }

    const slideToIndex = (index: number) => {
        if (swiperPCInstance) {
            swiperPCInstance.slideTo(index)
        }
    }

    const handleSildeChange = (swiper: SwiperClass) => {
        if (localStorage.getItem('userInfo')) {
            cratetWatchProgress(videoList![activeIndex].id, watchProgrees / 100)
            setWatchProgrees(0)
        }
        setActiveIndex(swiper.realIndex)
    }

    const cratetWatchProgress = async (videoId: number, watchProgrees: number) => {
        try {
            await createWatchHistory({ videoId, progress: watchProgrees })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (swiperPCInstance) {
            swiperPCInstance.allowTouchMove = allowTouchMove;
        }
    }, [allowTouchMove, swiperPCInstance])

    useEffect(() => {
        if (userInfo && introductionVisible && index === 0) {
            getVideoByUserIdData(userInfo.id.toString())
            getInteractionByUserIdData(userInfo.id.toString())
            getFansCountData(userInfo.id.toString())
        }

        if (introductionVisible && index === 1) {
            getCommentDetailData(videoList![activeIndex].id)
            if (localStorage.getItem('userInfo')) {
                getCommentLikeListData(videoList![activeIndex].id)
            }
        }
    }, [introductionVisible, userInfo, index, videoList, activeIndex])

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
            <div className="container-pc" style={{ padding: `${isVideoFullScreen || videoListArray.length > 0 ? '0' : '10px'}` }}>
                {videoListArray.length > 0 &&
                    <LeftCircleFilled className="video-back" onClick={() => {
                        dispatch(deleteVideoListArray(videoList!))
                    }} />}
                <div className="video-list" style={{ background: `${isVideoFullScreen || videoListArray.length > 0 ? '#242424' : 'transparent'}` }}>
                    <Swiper
                        spaceBetween={20}
                        speed={800}
                        direction="vertical"
                        mousewheel={true}
                        keyboard={true}
                        modules={[Mousewheel, Keyboard]}
                        onSlideChange={handleSildeChange}
                        onSwiper={setSwipePCrInstance}
                        touchStartPreventDefault={false}
                        touchMoveStopPropagation={true}
                        style={{ width: `${introductionVisible ? 'min(70%, calc(100% - 300px))' : '100%'}` }}
                        initialSlide={activeIndex}
                    >
                        {
                            videoList?.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <Player introductionVisible={introductionVisible}
                                        index={index}
                                        activeIndex={activeIndex}
                                        changeAllowTouchMove={setAllowTouchMove}
                                        commentVisibleHandle={commentVisibleHandle}
                                        videoId={item.id}
                                        setUserInfo={setUserInfo}
                                        setFollow={setFollow}
                                        follow={follow}
                                        getCommentCountData={getCommentCountData}
                                        commentCount={commentCount}
                                        setIsRecommend={setIsRecommend}
                                        setWatchProgrees={setWatchProgrees}
                                    />
                                </SwiperSlide>
                            )
                            )
                        }
                    </Swiper>
                    <div className={`video-more-active ${introductionVisible && 'video-more'}`} onClick={introductionVisibleHandle}>
                        <LeftOutlined />
                    </div>
                    <div className={`video-introudction ${introductionVisible && 'video-introudction-active'}`}>
                        <Introduction
                            type={IntroudctionType.VIDEO}
                            onClosed={() => setIntroductionVisible(false)}
                            index={index}
                            setIndex={setIndex}
                            userInfo={userInfo}
                            videoList={videoListData}
                            interactionVideoCount={interactionVideoCount}
                            fansCount={fansCount}
                            follow={follow}
                            setFollow={setFollow}
                            slideToIndex={slideToIndex}
                            commentDetail={commentDetail}
                            getCommentDetailData={getCommentDetailData}
                            commentLikeList={commentLikeList}
                            getCommentLikeListData={getCommentLikeListData}
                            videoId={videoList.length > 0 ? videoList[activeIndex].id : 0}
                            getCommentCountData={getCommentCountData}
                        />
                    </div>
                </div>
                {(!isVideoFullScreen && !(videoListArray.length > 0)) && (
                    <div className="video-choose">
                        <UpOutlined className={`video-choose-icon ${activeIndex === 0 && 'video-choose-icon-disabled'}`} onClick={() => swiperPCInstance!.slidePrev()} />
                        <DownOutlined className={`video-choose-icon ${activeIndex === 4 && 'video-choose-icon-disabled'}`} onClick={() => swiperPCInstance!.slideNext()} />
                    </div>
                )}
            </div >
        </>
    )
}

export default PCVideo;