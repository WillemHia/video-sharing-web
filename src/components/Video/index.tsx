import React, { FC, useEffect, useRef, useState } from "react";
import { videoTimeFormat } from "@/utils/videoTimeFormat";
import "./index.scoped.scss";
import SoundIcon from "@/assets/images/sound.svg";
import FullScreenIcon from "@/assets/images/fullScreen.svg";
import PauseIcon from "@/assets/images/pause.svg";
import PlayIcon from "@/assets/images/play.svg";

interface Props {
    introductionVisible: boolean,
    index: number,
    activeIndex: number
}

const Video: FC<Props> = ({ introductionVisible, index, activeIndex }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const [progress, setProgress] = useState(0);
    const [soundProgress, setSoundProgress] = useState(20);
    const [progressVisible, setProgressVisible] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoProgressRef = useRef<HTMLDivElement>(null);
    const videoSoundProgressRef = useRef<HTMLDivElement>(null);

    const handleVideoState = () => {
        const { current } = videoRef;
        if (current) {
            if (current.paused) {
                current.play();
            } else {
                current.pause();
            }
        }
    };

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
                setDuration(videoTimeFormat(current.duration));
            });
            document.addEventListener('keydown', handleProgressKeyDown);
        }
    }, []);

    useEffect(() => {
        const { current } = videoRef;
        if (current) {
            if (current.paused) {
                setIsPlaying(false);
            } else {
                setIsPlaying(true);
            }
        }
    }, [videoRef.current?.paused]);

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
        video.currentTime = video.duration * offsetX / width;
    }


    const handleProgressKeyDown = (e: KeyboardEvent) => {
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
    }

    const handleSoundProgressDown = ()=>{

    }

    return (
        <>
            <div className="container" style={{ borderRadius: `${introductionVisible ? '10px 0 0 10px' : '10px'}` }}>
                <img className="container-background" src="https://pic.616pic.com/bg_w1180/00/09/53/W757CqGnAG.jpg!/fh/300" alt="" />
                <video
                    className="video"
                    src="/test.mp4"
                    poster="https://pic.616pic.com/bg_w1180/00/09/53/W757CqGnAG.jpg!/fh/300"
                    ref={videoRef}
                    onClick={handleVideoState}
                />
                <div className="video-controls" style={{ borderRadius: `${introductionVisible ? '0 0 0 10px' : '0 0 10px 10px'}` }}>
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
                            <img className="video-controls-right-sound" src={SoundIcon} alt="" />
                            <div className="video-sound-progress-conatiner">
                                <div className="video-sound-progress" onMouseDown={handleSoundProgressDown} ref={videoSoundProgressRef} style={{'--progrees-height':`${soundProgress}%`} as React.CSSProperties}>
                                    <div className="video-sound-progress-bar" />
                                </div>
                            </div>
                        </div>
                        <img className="video-controls-right-fullScreen" src={FullScreenIcon} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Video;