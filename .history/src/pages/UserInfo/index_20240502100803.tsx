import React, { FC, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getUserInfo } from "@/api/user";
import { EditOutlined, LeftCircleFilled } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectIsMobile, setVideoListArray, selectVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import { selectUserInfo } from "@/stores/slices/userInfoSlice";
import { setUserInfo } from "@/stores/slices/userInfoSlice";
import './index.scoped.scss'
import Button from "@/components/Button";
import EditModal from "./components/EditModal";
import Mark from "@/components/Mark";
import { getVideoByCollect, getVideoByInteraction, getVideoByUserId, getVideoCountByUserId } from "@/api/video";
import { VideoInteraction } from "@/api/video/type";
import { getCollectByUserId } from "@/api/collect";
import { getInteractionByUserId, getInteractionCountByUserId } from "@/api/Interaction";
import { getFansCount, getFollowRelationship, getFollowingsCount } from "@/api/follow";
import LikeIcon from "@/assets/images/like.svg";
import ManIcon from '@/assets/images/man.svg';
import WomanIcon from '@/assets/images/woman.svg';
import SchoolIcon from '@/assets/images/school.svg';
import LocaltionIcon from '@/assets/images/localtion.svg';
import PCVideo from "@/components/PCVideo";
import MobileVideo from "@/components/MobileVideo";

const Myself: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const params = useParams()
    const location = useLocation()
    const isMobile = useAppSelector(selectIsMobile)
    const userInfo = useAppSelector(selectUserInfo)
    const videoListArray = useAppSelector(selectVideoListArray)
    const [videoList, setVideoList] = useState<VideoInteraction[]>([])
    const [isEdit, setIsEdit] = useState(false)
    const [collectCount, setCollectCount] = useState(0)
    const [videoCount, setVideoCount] = useState(0)
    const [interactionVideoCount, setInteractionVideoCount] = useState(0)
    const [chooseIndex, setChooseIndex] = useState(0)
    const [interactionCount, setInteractionCount] = useState(0)
    const [fansCount, setFansCount] = useState(0)
    const [followingsCount, setFollowingsCount] = useState(0)
    const [videoListIndex, setVideoListIndex] = useState(0)
    const [follow, setFollow] = useState(false)

    const openEdit = () => {
        setIsEdit(true)
    }

    const closeEdit = () => {
        setIsEdit(false)
    }

    const handleChooseChange = (index: number) => {
        if (index === chooseIndex) return
        switch (index) {
            case 0:
                getVideoByUserIdData(params.id!)
                break
            case 1:
                getVideoByInteractionData(params.id!)
                break
            case 2:
                getVideoByCollectData(params.id!)
                break
            default:
                break
        }
        setChooseIndex(index)
    }

    const getUserInfoData = useCallback(async (id: string) => {
        try {
            const data = await getUserInfo(id)
            dispatch(setUserInfo(data))
        } catch (e) {
            console.log(e)
        }
    }, [dispatch])

    const getVideoByUserIdData = async (userId: string) => {
        try {
            const data = await getVideoByUserId(userId)
            setVideoList(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getVideoCountByUserIdData = async (userId: string) => {
        try {
            const data = await getVideoCountByUserId(userId)
            setVideoCount(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getCollectByUserIdData = async (userId: string) => {
        try {
            const data = await getCollectByUserId(userId)
            setCollectCount(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getInteractionByUserIdData = async (userId: string) => {
        try {
            const data = await getInteractionByUserId(userId)
            setInteractionVideoCount(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getVideoByInteractionData = async (userId: string) => {
        try {
            const data = await getVideoByInteraction(userId)
            setVideoList(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getVideoByCollectData = async (userId: string) => {
        try {
            const data = await getVideoByCollect(userId)
            setVideoList(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getInteractionCountByUserIdData = async (userId: string) => {
        try {
            const data = await getInteractionCountByUserId(userId)
            setInteractionCount(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getFansCountData = async (userId: string) => {
        try {
            const data = await getFansCount(userId)
            setFansCount(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getFollowingsCountData = async (userId: string) => {
        try {
            const data = await getFollowingsCount(userId)
            setFollowingsCount(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const init = (id: string) => {
            getUserInfoData(id)
            getVideoByUserIdData(id)
            getCollectByUserIdData(id)
            getInteractionByUserIdData(id)
            getVideoCountByUserIdData(id)
            getInteractionCountByUserIdData(id)
            getFansCountData(id)
            getFollowingsCountData(id)
        }
        const id = params.id!
        setChooseIndex(0)
        init(id)
    }, [getUserInfoData, params])

    const handleClickVideo = (index: number) => {
        setVideoListIndex(index)
        dispatch(setVideoListArray(videoList))
    }

    const getFolloRelationshipData = async (followId: string) => {
        try {
            const data = await getFollowRelationship(followId)
            setFollow(data ? true : false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (params.id !== JSON.parse(localStorage.getItem('userInfo')!).id.toString()) {
            getFolloRelationshipData(params.id!)
        }
    }, [params.id])

    return (
        <>
            <div className="container" style={{ height: `${location.state ? (location.state.tabbarHidden ? 'auto' : 'calc(100vh - 1.6rem)') : 'calc(100vh - 1.6rem)'}` }}>
                {isMobile ?
                    <div className="mobile-header">
                        {location.state?.tabbarHidden && <LeftCircleFilled className="video-back" onClick={() => navigate(-1)} />}
                        <img className="background" src={userInfo?.backgroundImg} alt="" />
                        <div className="header-body">
                            <img className="avater" src={userInfo?.avatar} alt="" />
                            <div className="name-container">
                                <span className="name">{userInfo?.username}</span>
                                <span className="id">ID：{userInfo?.userId}</span>
                            </div>
                        </div>
                    </div> :
                    (<header className="header">
                        <div className="header-body">
                            <img className="avater" src={userInfo?.avatar} alt="" />
                            <div className="info-container">
                                <span className="name">{userInfo?.username}</span>
                                <div className="follow">
                                    <span className="follow-item">
                                        <span className="follow-item-text">获赞</span>
                                        <span className="follow-item-count">{interactionCount}</span>
                                    </span>
                                    <span className="follow-item-split">|</span>
                                    <span className="follow-item">
                                        <span className="follow-item-text">粉丝</span>
                                        <span className="follow-item-count">{fansCount}</span>
                                    </span>
                                    <span className="follow-item-split">|</span>
                                    <span className="follow-item">
                                        <span className="follow-item-text">关注</span>
                                        <span className="follow-item-count">{followingsCount}</span>
                                    </span>
                                </div>
                                <div className="info">
                                    <span className="info-item">
                                        <span className="label">ID：</span>
                                        <span className="id">{userInfo?.userId}</span>
                                    </span>
                                </div>
                                <div className="detail">
                                    <span className="detail-item"><img src={userInfo?.sex === 0 ? ManIcon : WomanIcon} alt="" />{userInfo?.sex === 0 ? '男' : '女'}</span>
                                    <span className="detail-item"><img src={SchoolIcon} alt="" />{userInfo?.school}</span>
                                    <span className="detail-item"><img src={LocaltionIcon} alt="" />{userInfo?.address}</span>
                                    <span className="detail-item">{userInfo?.age}岁</span>
                                </div>
                                <div className="desc">{userInfo?.introduce}</div>
                            </div>
                        </div>
                        <div className="header-options">
                            {params.id === JSON.parse(localStorage.getItem('userInfo')!).id.toString() ? <Button style={{ backgroundColor: 'rgba(255,255,255,0.35)' }} onClick={openEdit}>编辑信息</Button> : follow ? <Button style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>取消关注</Button> : <Button>关注</Button>}
                        </div>
                    </header>
                    )}
                <div className="body">
                    {isMobile && <div className="info-container">
                        <div className="follow">
                            <span className="follow-item">
                                <span className="follow-item-count">{interactionCount}</span>
                                <span className="follow-item-text">获赞</span>
                            </span>
                            <span className="follow-item">
                                <span className="follow-item-count">{fansCount}</span>
                                <span className="follow-item-text">粉丝</span>
                            </span>
                            <span className="follow-item">
                                <span className="follow-item-count">{followingsCount}</span>
                                <span className="follow-item-text">关注</span>
                            </span>
                        </div>
                        <div className="detail">
                            <span className="detail-item"><img src={userInfo?.sex === 0 ? ManIcon : WomanIcon} alt="" />{userInfo?.sex === 0 ? '男' : '女'}</span>
                            <span className="detail-item"><img src={SchoolIcon} alt="" />{userInfo?.school}</span>
                            <span className="detail-item"><img src={LocaltionIcon} alt="" />{userInfo?.address}</span>
                            <span className="detail-item">{userInfo?.age}岁</span>
                        </div>
                        <div className="desc">
                            <span>{userInfo?.introduce}</span>
                            {params.id === JSON.parse(localStorage.getItem('userInfo')!).id.toString() && <EditOutlined onClick={() => navigate('/user-info/edit')} />}
                        </div>
                        {params.id !== JSON.parse(localStorage.getItem('userInfo')!).id.toString() && (!follow ? <Button>关注</Button> : <Button style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>取消关注</Button>)}
                    </div>}
                    <div className="body-choose">
                        <span className={`choose-item ${chooseIndex === 0 && 'choose-item-active'}`} onClick={() => handleChooseChange(0)}>作品&nbsp;{videoCount}</span>
                        <span className={`choose-item ${chooseIndex === 1 && 'choose-item-active'}`} onClick={() => handleChooseChange(1)}>喜欢&nbsp;{interactionVideoCount}</span>
                        <span className={`choose-item ${chooseIndex === 2 && 'choose-item-active'}`} onClick={() => handleChooseChange(2)}>收藏&nbsp;{collectCount}</span>
                    </div>
                    <div className="body-content">
                        {videoList.map((item, index) => {
                            return (
                                <div className="content-item" key={item.id} onClick={() => handleClickVideo(index)}>
                                    <img src={item.poster} alt="" className="poster" />
                                    <span className="like-count"><img src={LikeIcon} alt="" />{item.interactionCount}</span>
                                    {!isMobile && <div className="info">
                                        {item.introduce}{item.label.split('/').map(v => ' #' + v).join('')}
                                    </div>}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {isEdit &&
                    createPortal(
                        <Mark onClose={closeEdit}>
                            <EditModal onClose={closeEdit} />
                        </Mark>
                        , document.body)
                }
            </div>
            {videoListArray.find(item => JSON.stringify(item) === JSON.stringify(videoList)) && createPortal(
                <Mark>
                    {isMobile ? <MobileVideo videoList={videoList} videoId={videoList[videoListIndex].id} /> : <PCVideo videoList={videoList} videoListIndex={videoListIndex} />}
                </Mark>
                , document.body)}
        </>
    );
};

export default Myself;