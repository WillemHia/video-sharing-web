import React, { FC, useEffect, useState } from "react";
import { DownOutlined, UpOutlined, LeftOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper/modules';
import type { SwiperClass } from "swiper/react";
import { useAppSelector } from "@/stores/hooks";
import { selectIsVideoFullScreen } from "@/stores/slices/deviceAdjustSlice";
import Introduction from "@/components/Introduction";
import Video from "@/components/Video";
import { IntroudctionType } from "@/enums";
import 'swiper/css';
import "./index.scoped.scss"

const PCHome: FC = () => {
    const isVideoFullScreen = useAppSelector(selectIsVideoFullScreen);
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperPCInstance, setSwipePCrInstance] = useState<SwiperClass>();
    const [introductionVisible, setIntroductionVisible] = useState(false);
    const [allowTouchMove, setAllowTouchMove] = useState(true);

    useEffect(() => {
        if (swiperPCInstance) {
            swiperPCInstance.allowTouchMove = allowTouchMove;
        }
    }, [allowTouchMove, swiperPCInstance])

    return (
        <>
            <div className="container-pc" style={{ padding: `${isVideoFullScreen ? '0' : '10px'}` }}>
                <div className="video-list" style={{ background: `${isVideoFullScreen ? '#242424' : 'transparent'}` }}>
                    <Swiper
                        spaceBetween={20}
                        speed={800}
                        direction="vertical"
                        mousewheel={true}
                        keyboard={true}
                        modules={[Mousewheel, Keyboard]}
                        onSlideChange={(swiper: SwiperClass) => setActiveIndex(swiper.realIndex)}
                        onSwiper={setSwipePCrInstance}
                        touchStartPreventDefault={false}
                        touchMoveStopPropagation={true}
                    >
                        {[1, 2, 3, 4, 5].map(item => (
                            <SwiperSlide key={item}>
                                <Video introductionVisible={introductionVisible}
                                    index={item - 1}
                                    activeIndex={activeIndex}
                                    changeAllowTouchMove={setAllowTouchMove} />
                            </SwiperSlide>
                        )
                        )}
                    </Swiper>
                    {!introductionVisible &&
                        <div className="video-more" onClick={() => setIntroductionVisible(true)}>
                            <LeftOutlined />
                        </div>
                    }
                    {introductionVisible && <Introduction type={IntroudctionType.VIDEO} onClosed={() => setIntroductionVisible(false)} />}
                </div>
                {!isVideoFullScreen && (
                    <div className="video-choose">
                        <UpOutlined className={`video-choose-icon ${activeIndex === 0 && 'video-choose-icon-disabled'}`} onClick={() => swiperPCInstance!.slidePrev()} />
                        <DownOutlined className={`video-choose-icon ${activeIndex === 4 && 'video-choose-icon-disabled'}`} onClick={() => swiperPCInstance!.slideNext()} />
                    </div>
                )}
            </div>
        </>
    )
}

export default PCHome;