import React, { FC, useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperClass } from "swiper/react";
import MobileVideo from "@/components/MobileVideo";
import 'swiper/css';
import "./index.scoped.scss";

const MobileHome: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const mobileVideoList = useRef<HTMLDivElement>(null);
    const [moreVideoVisible, setMoreVideoVisible] = useState(false);

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

    return (
        <>
            <div className="container-mobile">
                <div className="video-list" ref={mobileVideoList} style={{ width: `${moreVideoVisible ? 'calc(100% - 2.5rem)' : '100%'}` }}>
                    <Swiper
                        speed={800}
                        direction="vertical"
                        onSlideChange={(swiper: SwiperClass) => setActiveIndex(swiper.realIndex)}
                    >
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <SwiperSlide key={index}>
                                <MobileVideo />
                            </SwiperSlide>
                        )
                        )}
                    </Swiper>
                </div>
                <div className={`video-more ${moreVideoVisible && 'video-more-active'}`}>
                    <span className="title">TA的作品</span>
                    <ul>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MobileHome;
