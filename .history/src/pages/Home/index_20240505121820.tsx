import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PCvideo from "../../components/PCVideo";
import MobileVideo from "../../components/MobileVideo";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectIsMobile } from "@/stores/slices/deviceAdjustSlice";
import { selectVideoList, setVideoList } from "@/stores/slices/videoSlice";
import "./index.scoped.scss";
import { getRandowVideo, getRandowVideoByUserId, getRecommendVideoByUserId, getVideoByKeyword } from "@/api/video";

const Home: FC = () => {

    const isMobile = useAppSelector(selectIsMobile);
    const videoList = useAppSelector(selectVideoList);
    const dispatch = useAppDispatch();
    const [params] = useSearchParams();
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

    const getVideoByKeywordData = async (keyword: string) => {
        try {
            const res = await getVideoByKeyword(keyword);
            dispatch(setVideoList(res));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(params.get('keyword')){
            const keyword = params.get('keyword')
            getVideoByKeywordData(keyword!)
        }else{
            if (localStorage.getItem('userInfo')) {
                getRandowVideoByUserIdData()
            } else {
                getRandowVideoData()
            }
        }
    }, [params]);

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