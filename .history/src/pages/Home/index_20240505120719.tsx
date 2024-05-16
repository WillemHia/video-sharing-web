import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PCvideo from "../../components/PCVideo";
import MobileVideo from "../../components/MobileVideo";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectIsMobile } from "@/stores/slices/deviceAdjustSlice";
import { selectVideoList, setVideoList } from "@/stores/slices/videoSlice";
import "./index.scoped.scss";
import { getRandowVideo, getRandowVideoByUserId, getRecommendVideoByUserId } from "@/api/video";

const Home: FC = () => {

    const isMobile = useAppSelector(selectIsMobile);
    const videoList = useAppSelector(selectVideoList);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [startRecommend, setStartRecommend] = useState(false);

    const getRandowVideoData = async () => {
        try {
            const res = await getRandowVideo();
            dispatch(setVideoList(res));
        } catch (e) {
            console.log(e);
        }
    }

    const getRandowVideoByUserIdData = async () => {
        try {
            const res = await getRandowVideoByUserId();
            dispatch(setVideoList(res));
            setStartRecommend(true);
        } catch (e) {
            console.log(e);
        }
    }

    const getRecommendVideoByUserIdData = async () => {
        try {
            const res = await getRecommendVideoByUserId();
            dispatch(setVideoList(res));
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        console.log(location)
        if (localStorage.getItem('userInfo')) {
            getRandowVideoByUserIdData()
        } else {
            getRandowVideoData()
        }
    }, []);

    useEffect(() => {
        if (startRecommend) {
            getRecommendVideoByUserIdData()
        }
    }, [startRecommend])

    return (
        <>
            {isMobile ? <MobileVideo videoList={videoList} /> : <PCvideo videoList={videoList}  />}
        </>

    );
};

export default Home;