import React, { FC, useEffect, useRef, useState } from "react";
import "./index.scoped.scss";
import PlayIcon from "@/assets/images/play.svg";

const MobileHome: FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoPlay = () => {
        setIsPlaying(!isPlaying);
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
            current.addEventListener('loadedmetadata', () => {
                console.log(current.videoHeight, current.videoWidth);
            });
        }

        return () => {
            if (current) {
                current.removeEventListener('ended', () => {
                    setIsPlaying(false);
                });
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
        </div>
    )
}

export default MobileHome;