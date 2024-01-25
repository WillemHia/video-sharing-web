import React, { FC, useEffect, useRef, useState } from "react";
import { videoTimeFormat } from "@/utils/videoTimeFormat";
import "./index.scoped.scss";

interface Props {
    introductionVisible: boolean
}

let duration = '00:00'

const Video: FC<Props> = ({ introductionVisible }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [progress, setProgress] = useState(0);
    const video = useRef<HTMLVideoElement>(null);

    const handleVideoState = () => {
        const { current } = video;
        if (current) {
            if (!isPlaying) {
                current.play();
                setIsPlaying(true);
            } else {
                current.pause();
                setIsPlaying(false);
            }
        }
    };

    useEffect(() => {
        const { current } = video;
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
                duration = videoTimeFormat(current.duration);
            });
        }
    }, [video]);

    const handleProgressDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        console.log(1111)
        console.log(e)
    };

    const handleProgressUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(e)
    };

    return (
        <>
            <div className="container" style={{ borderRadius: `${introductionVisible ? '10px 0 0 10px' : '10px'}` }}>
                <img className="container-background" src="https://pic.616pic.com/bg_w1180/00/09/53/W757CqGnAG.jpg!/fh/300" alt="" />
                <video
                    className="video"
                    src="https://www.w3school.com.cn/i/movie.mp4"
                    poster="https://pic.616pic.com/bg_w1180/00/09/53/W757CqGnAG.jpg!/fh/300"
                    ref={video}
                    onClick={handleVideoState}
                />
                <div className="video-controls" style={{ borderRadius: `${introductionVisible ? '0 0 0 10px' : '0 0 10px 10px'}` }} onMouseDown={handleProgressDown} onMouseUp={handleProgressUp} onClick={()=>{console.log(222)}}>
                    <div className="video-controls-top">
                        <div className="video-controls-top-progress" style={{ width: `${progress}%` }}>
                            <div className="video-controls-top-progress-bar"/>
                        </div>
                    </div>
                    <div className="video-controls-left">
                        {!isPlaying ?
                            <svg className="video-controls-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5908" onClick={handleVideoState}>
                                <path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#dadada" p-id="5909"></path>
                            </svg> :
                            <svg className="video-controls-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6056" onClick={handleVideoState}>
                                <path d="M128 106.858667C128 94.976 137.621333 85.333333 149.12 85.333333h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333H149.12A21.290667 21.290667 0 0 1 128 917.141333V106.88z m640 0c0-11.882667 9.621333-21.525333 21.12-21.525334h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333h-85.76a21.290667 21.290667 0 0 1-21.12-21.525333V106.88z" fill="#dadada" p-id="6057"></path>
                            </svg>
                        }
                        <div className="video-controls-left-time">
                            <div className="video-controls-time-current">{currentTime}</div>
                            <div className="video-controls-time-separator">/</div>
                            <div className="video-controls-time-total">{duration}</div>
                        </div>
                    </div>
                    <div className="video-controls-right">
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1488" width="24" height="24"><path d="M257.493333 322.4l215.573334-133.056c24.981333-15.413333 57.877333-7.914667 73.493333 16.746667 5.301333 8.373333 8.106667 18.048 8.106667 27.914666v555.989334C554.666667 819.093333 530.784 842.666667 501.333333 842.666667c-9.994667 0-19.786667-2.773333-28.266666-8L257.493333 701.6H160c-41.237333 0-74.666667-33.013333-74.666667-73.738667V396.138667c0-40.725333 33.429333-73.738667 74.666667-73.738667h97.493333z m26.133334 58.4a32.298667 32.298667 0 0 1-16.96 4.8H160c-5.888 0-10.666667 4.714667-10.666667 10.538667v231.733333c0 5.813333 4.778667 10.538667 10.666667 10.538667h106.666667c5.994667 0 11.872 1.664 16.96 4.8L490.666667 770.986667V253.013333L283.626667 380.8zM800.906667 829.653333a32.288 32.288 0 0 1-45.248-0.757333 31.317333 31.317333 0 0 1 0.768-44.693333c157.653333-150.464 157.653333-393.962667 0-544.426667a31.317333 31.317333 0 0 1-0.768-44.682667 32.288 32.288 0 0 1 45.248-0.757333c183.68 175.306667 183.68 460.010667 0 635.317333z m-106.901334-126.186666a32.288 32.288 0 0 1-45.248-1.216 31.328 31.328 0 0 1 1.237334-44.672c86.229333-80.608 86.229333-210.56 0-291.178667a31.328 31.328 0 0 1-1.237334-44.672 32.288 32.288 0 0 1 45.248-1.216c112.885333 105.546667 112.885333 277.418667 0 382.965333z" fill="#dadada" p-id="1489"></path></svg>
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7960" width="18" height="18"><path d="M983.04 727.04a40.96 40.96 0 0 0-40.96 40.96v173.592381h-174.08a40.96 40.96 0 1 0 0 82.407619h173.592381A82.407619 82.407619 0 0 0 1024 941.592381v-173.592381a40.96 40.96 0 0 0-40.96-40.96zM941.592381 0h-173.592381a40.96 40.96 0 1 0 0 82.407619h173.592381v173.592381a40.96 40.96 0 1 0 82.407619 0V82.407619A82.407619 82.407619 0 0 0 941.592381 0zM256 941.592381H82.407619v-173.592381a40.96 40.96 0 1 0-82.407619 0v173.592381A82.407619 82.407619 0 0 0 82.407619 1024h173.592381a40.96 40.96 0 1 0 0-82.407619zM40.96 296.96a40.96 40.96 0 0 0 40.96-40.96V82.407619h174.08a40.96 40.96 0 1 0 0-82.407619H82.407619A82.407619 82.407619 0 0 0 0 82.407619v173.592381a40.96 40.96 0 0 0 40.96 40.96z" fill="#dadada" p-id="7961"></path><path d="M219.428571 219.428571m82.407619 0l420.32762 0q82.407619 0 82.407619 82.407619l0 420.32762q0 82.407619-82.407619 82.407619l-420.32762 0q-82.407619 0-82.407619-82.407619l0-420.32762q0-82.407619 82.407619-82.407619Z" fill="#dadada" p-id="7962"></path></svg>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Video;