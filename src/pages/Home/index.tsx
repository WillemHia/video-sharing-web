import React, { FC, useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper/modules';
import type { SwiperClass } from "swiper/react";
import 'swiper/css';
import "./index.scoped.scss";

const Home: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperClass>();

    return (
        <div className="container-pc">
            <div className="video-list">
                <Swiper
                    spaceBetween={20}
                    speed={800}
                    direction="vertical"
                    mousewheel={true}
                    keyboard={true}
                    modules={[Mousewheel,Keyboard]}
                    onSlideChange={(swiper: SwiperClass) => setActiveIndex(swiper.realIndex)}
                    onSwiper={setSwiperInstance}
                >
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="video-item">{item}</div>
                        </SwiperSlide>
                    )
                    )}
                </Swiper>
            </div>
            <div className="video-choose">
                <UpOutlined className={`video-choose-icon ${activeIndex === 0 && 'video-choose-icon-disabled'}`} onClick={() => swiperInstance!.slidePrev()} />
                <DownOutlined className={`video-choose-icon ${activeIndex === 4 && 'video-choose-icon-disabled'}`} onClick={() => swiperInstance!.slideNext()} />
            </div>
        </div>
    );
};

export default Home;