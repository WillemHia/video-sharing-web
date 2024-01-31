import React, { FC, useEffect, useRef, useState } from "react";
import { videoTimeFormat } from "@/utils/videoTimeFormat";
import "./index.scoped.scss";
import PlayIcon from "@/assets/images/play.svg";

const MobileHome: FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoProgressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoTimeVisible, setVideoTimeVisible] = useState(false);

    const handleVideoPlay = () => {
        setIsPlaying(!isPlaying);
    }

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
        <div className="container">
            {!isPlaying && (
                <div className="play-icon" onClick={handleVideoPlay}>
                    <img src={PlayIcon} alt="play" />
                </div>
            )}
            <video
                className="video"
                src="/test.mp4"
                poster="https://pic.616pic.com/bg_w1180/00/09/53/W757CqGnAG.jpg!/fh/300"
                ref={videoRef}
                onClick={handleVideoPlay}
            />
            <div className="video-progress">
                {videoTimeVisible && (
                    <div className="video-time">
                        <span className="current-time">{videoTimeFormat(videoRef.current?.currentTime!)}</span>
                        <span>/</span>
                        <span>{videoTimeFormat(videoRef.current?.duration!)}</span>
                    </div>
                )}
                <div
                    className={`progress ${!isPlaying && 'progress-pause'} ${videoTimeVisible && 'progress-move'}`}
                    style={{ '--progress-width': `${videoProgress}%` } as React.CSSProperties}
                    onTouchStart={handleVideoProgressStart}
                    ref={videoProgressRef}
                >
                    <div className="progress-bar" />
                </div>
            </div>
        </div>
    )
}

export default MobileHome;