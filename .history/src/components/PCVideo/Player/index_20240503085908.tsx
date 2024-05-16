import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { videoTimeFormat } from "@/utils/videoTimeFormat";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setIsVideoFullScreen, selectIsVideoFullScreen, selectVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import Interction from "../../Interction";
import "./index.scoped.scss";
import SoundIcon from "@/assets/images/sound.svg";
import FullScreenIcon from "@/assets/images/fullScreen.svg";
import PauseIcon from "@/assets/images/pause.svg";
import PlayIcon from "@/assets/images/play.svg";
import ExitFullScreenIcon from "@/assets/images/exitFullScreen.svg";
import MuteIcon from "@/assets/images/mute.svg";
import { getVideoDetailById } from "@/api/video";
import { VideoDetail } from "@/api/video/type";
import { getInteractionByVideoId, getIsInteraction } from "@/api/Interaction";
import { getCollectByVideoId, getIsCollect } from "@/api/collect";
import { getIsFollow } from "@/api/follow";
import { UserInfo } from "@/api/user/type";

interface Props {
    introductionVisible: boolean,
    index: number,
    activeIndex: number,
    changeAllowTouchMove?: (allowTouchMove: boolean) => void,
    commentVisibleHandle?: () => void,
    videoId?: number,
    setUserInfo: (userInfo: UserInfo) => void,
    setFollow: (value: boolean) => void,
    follow: boolean,
    getCommentCountData: (videoId: number) => void,
    commentCount: number,
    setIsRecommend: (value: boolean) => void,
    setWatchProgrees: (progress: number) => void
}
interface CustomFullscreenElement extends Element {
    msRequestFullscreen?(): void,
    mozRequestFullScreen?(): void,
    webkitRequestFullScreen?(): void,
}
interface CustomFullscreenDocument extends Document {
    msExitFullscreen?(): void,
    mozCancelFullScreen?(): void,
    webkitCancelFullScreen?(): void
}

const Player: FC<Props> = ({ introductionVisible, index, activeIndex, commentCount, setWatchProgrees, setIsRecommend, getCommentCountData, changeAllowTouchMove, commentVisibleHandle, videoId, setUserInfo, setFollow, follow }) => {
    const dispatch = useAppDispatch();
    const videoListArray = useAppSelector(selectVideoListArray);
    const isVideoFullScreen = useAppSelector(selectIsVideoFullScreen);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const [progress, setProgress] = useState(0);
    const [soundProgress, setSoundProgress] = useState(50);
    const [progressVisible, setProgressVisible] = useState(false);
    const [videoDetail, setVideoDetail] = useState<VideoDetail>({} as VideoDetail)
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoProgressRef = useRef<HTMLDivElement>(null);
    const videoSoundProgressRef = useRef<HTMLDivElement>(null);
    const [interactionCount, setInteractionCount] = useState(0);
    const [collectCount, setCollectCount] = useState(0);
    const [collect, setCollect] = useState(false);
    const [interactionType, setInteractionType] = useState(0);
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

    const getInteractionInfo = useCallback(async (userId: number, videoId: number) => {
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
    }, [setFollow])


    const handleVideoState = useCallback(() => {
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    useEffect(() => {
        setIsPlaying(false)
    }, [videoListArray])

    useEffect(() => {
        if (activeIndex !== index) {
            setIsPlaying(false)
        }
    }, [activeIndex, index])

    useEffect(() => {
        const getVideoDetailData = async () => {
            const data = await getVideoDetailById(videoId!);
            setVideoDetail(data)
            setUserInfo(data.user)
        }
        if (index === activeIndex) {
            getVideoDetailData()
            getInteractionCountData(videoId!)
            getCollectCountData(videoId!)
            getCommentCountData(videoId!)
            if (localStorage.getItem('userInfo')) {
                getInteractionInfo(JSON.parse(localStorage.getItem('userInfo')!).id, videoId!)
            }
        }
    }, [activeIndex, getInteractionInfo, index, setUserInfo, videoId])

    useEffect(() => {
        const { current } = videoRef;
        if (current) {
            current.addEventListener('timeupdate', () => {
                const { currentTime, duration } = current;
                setCurrentTime(videoTimeFormat(currentTime));
                setProgress(currentTime / duration * 100);
            });
            current.addEventListener('ended', () => {
                setIsPlaying(false);
            });
            current.addEventListener('loadedmetadata', () => {
                current.volume = 0.5;
            });
            current.addEventListener('volumechange', () => {
                setSoundProgress(current.volume * 100);
            });
        }

        return () => {
            if (current) {
                current.removeEventListener('timeupdate', () => { });
                current.removeEventListener('ended', () => { });
                current.removeEventListener('loadedmetadata', () => { });
                current.removeEventListener('volumechange', () => { });
            }
        };
    }, []);

    useEffect(() => {
        const { current } = videoRef;
        if (current) {
            setDuration(videoTimeFormat(isNaN(current.duration) ? 0 : current.duration))
        }
    }, [videoRef])

    useEffect(() => {
        setDuration(videoTimeFormat(videoDetail.totalTime))
    }, [videoDetail])

    useEffect(() => {
        setWatchProgrees(progress)
        if (!isChange && progress > 75) {
            setIsChange(true)
            setIsRecommend(true)
        }
    }, [isChange, progress, setIsRecommend])

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
        const handleProgressKeyDown = (e: KeyboardEvent) => {
            if (e.target !== document.body) return
            if (activeIndex !== index) return;
            const { current } = videoRef;
            if (current) {
                switch (e.code) {
                    case 'ArrowLeft':
                        current.currentTime -= 2;
                        break;
                    case 'ArrowRight':
                        current.currentTime += 2;
                        break;
                    case 'Space':
                        handleVideoState();
                        break;
                    default:
                        break;
                }
            }
        };
        const changeVideoFullScreen = () => {
            if (!document.fullscreenElement) {
                dispatch(setIsVideoFullScreen(false));
            }
        }
        document.addEventListener('keydown', handleProgressKeyDown);
        //监听全屏退事件
        document.addEventListener('fullscreenchange', changeVideoFullScreen);
        return () => {
            document.removeEventListener('keydown', handleProgressKeyDown);
            document.removeEventListener('fullscreenchange', changeVideoFullScreen);
        };
    }, [activeIndex, index, dispatch, handleVideoState]);

    const handleProgressDown = ({ nativeEvent: e }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.button !== 0) return;
        setProgressVisible(true);
        document.addEventListener('mouseup', handleProgressUp);
        const { current } = videoRef;
        if (current) {
            const { current: progress } = videoProgressRef;
            if (progress) {
                progress.addEventListener('mousemove', handleProgressMove);
                changeProgress(e, progress, current);
                current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleProgressUp = () => {
        setProgressVisible(false);
        const { current: progress } = videoProgressRef;
        if (progress) {
            progress.removeEventListener('mousemove', handleProgressMove);
        }
        const { current } = videoRef;
        if (current) {
            current.play();
            setIsPlaying(true);
        }
        document.removeEventListener('mouseup', handleProgressUp);
    };

    const handleProgressMove = (e: MouseEvent) => {
        const { current } = videoRef;
        if (current) {
            const { current: progress } = videoProgressRef;
            if (progress) {
                changeProgress(e, progress, current);
            }
        }
    };

    const changeProgress = (e: MouseEvent, progress: HTMLDivElement, video: HTMLVideoElement) => {
        const { width, x } = progress.getBoundingClientRect();
        const offsetX = e.clientX - x;
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


    const handleSoundProgressDown = ({ nativeEvent: e }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.button !== 0) return;
        document.addEventListener('mouseup', handleSoundProgressUp)
        changeAllowTouchMove!(false)
        const { current: soundProgress } = videoSoundProgressRef
        if (soundProgress) {
            soundProgress.addEventListener('mousemove', handleSoundProgressMove)
            const { current: video } = videoRef
            if (video) {
                changeSoundProgress(e, soundProgress, video)
            }
        }
    }

    const handleSoundProgressUp = () => {
        changeAllowTouchMove!(true)
        const { current: soundProgress } = videoSoundProgressRef
        if (soundProgress) {
            soundProgress.removeEventListener('mousemove', handleSoundProgressMove)
        }
        document.removeEventListener('mouseup', handleSoundProgressUp)
    }

    const handleSoundProgressMove = (e: MouseEvent) => {
        e.stopPropagation()
        const { current: soundProgress } = videoSoundProgressRef
        if (soundProgress) {
            const { current: video } = videoRef
            if (video) {
                changeSoundProgress(e, soundProgress, video)
            }
        }
    }

    const changeSoundProgress = (e: MouseEvent, soundProgress: HTMLDivElement, video: HTMLVideoElement) => {
        const { height, y } = soundProgress.getBoundingClientRect()
        const offsetY = e.clientY - y
        //边界处理
        if (offsetY < 0) {
            video.volume = 1
            return
        }
        if (offsetY > height) {
            video.volume = 0
            return
        }
        video.volume = 1 - offsetY / height
    }

    const handleSoundClose = () => {
        const { current } = videoRef
        if (current) {
            current.volume = 0
        }
    }

    const handleSoundOpen = () => {
        const { current } = videoRef
        if (current) {
            current.volume = 0.5
        }
    }

    const handleFullScreen = () => {
        let ele = document.documentElement as CustomFullscreenElement
        if (ele.requestFullscreen) {
            ele.requestFullscreen()
        } else if (ele.webkitRequestFullScreen) {
            ele.webkitRequestFullScreen()
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen()
        } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen()
        }
        dispatch(setIsVideoFullScreen(true))
    }

    const handleExitFullScreen = () => {
        let ele = document as CustomFullscreenDocument
        if (ele.exitFullscreen) {
            ele.exitFullscreen()
        } else if (ele.webkitCancelFullScreen) {
            ele.webkitCancelFullScreen()
        } else if (ele.mozCancelFullScreen) {
            ele.mozCancelFullScreen()
        } else if (ele.msExitFullscreen) {
            ele.msExitFullscreen()
        }
        dispatch(setIsVideoFullScreen(false))
    }

    return (
        <>
            <div className="container" style={{ borderRadius: `${introductionVisible ? '20px 0 0 20px' : '20px'}` }}>
                <div className="container-background" style={{ borderRadius: `${introductionVisible ? '20px 0 0 20px' : '20px'}` }}>
                    <img src={videoDetail.poster} alt="" />
                </div>
                {!isPlaying && (
                    <div className="play-icon" onClick={handleVideoState}>
                        <img src={PlayIcon} alt="play" />
                    </div>
                )}
                <video
                    className="video"
                    poster={videoDetail.poster}
                    src={videoDetail.url}
                    ref={videoRef}
                    onClick={handleVideoState}
                />
                <Interction
                    introductionVisible={introductionVisible}
                    commentVisibleHandle={commentVisibleHandle}
                    videoDetail={videoDetail}
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
                <div className="video-controls" style={{ borderRadius: `${introductionVisible ? '0 0 0 20px' : '0 0 20px 20px'}` }}>
                    <div className={`video-controls-top ${progressVisible && 'video-controls-top-active'}`}
                        onMouseDown={handleProgressDown}
                        ref={videoProgressRef}>
                        <div className="video-controls-top-progress" style={{ width: `${progress}%` }}>
                            <div className="video-controls-top-progress-bar" />
                        </div>
                    </div>
                    <div className="video-controls-left">
                        {!isPlaying ?
                            <img className="video-controls-icon" src={PlayIcon} alt="" onClick={handleVideoState} /> :
                            <img className="video-controls-icon" src={PauseIcon} alt="" onClick={handleVideoState} />
                        }
                        <div className="video-controls-left-time">
                            <div className="video-controls-time-current">{currentTime}</div>
                            <div className="video-controls-time-separator">/</div>
                            <div className="video-controls-time-total">{duration}</div>
                        </div>
                    </div>
                    <div className="video-controls-right">
                        <div className="video-controls-suond">
                            {soundProgress === 0 ? <img className="video-controls-right-sound" src={MuteIcon} alt="" onClick={handleSoundOpen} /> : <img className="video-controls-right-sound" src={SoundIcon} alt="" onClick={handleSoundClose} />}
                            <div className="video-sound-progress-conatiner">
                                <div className="video-sound-progress"
                                    onMouseDown={handleSoundProgressDown}
                                    ref={videoSoundProgressRef}
                                    style={{ '--progrees-height': `${soundProgress}%` } as React.CSSProperties}>
                                    <div className="video-sound-progress-bar" />
                                </div>
                            </div>
                        </div>
                        {isVideoFullScreen ?
                            <img className="video-controls-right-exitFullScreen" src={ExitFullScreenIcon} alt="" onClick={handleExitFullScreen} />
                            :
                            <img className="video-controls-right-fullScreen" src={FullScreenIcon} alt="" onClick={handleFullScreen} />
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Player;