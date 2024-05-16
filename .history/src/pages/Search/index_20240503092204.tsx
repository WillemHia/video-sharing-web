import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectIsMobile, selectVideoListArray, setVideoListArray } from "@/stores/slices/deviceAdjustSlice";
import './index.scoped.scss'
import { DeleteOutlined, DownOutlined, LeftOutlined, SearchOutlined, UpOutlined, CloseOutlined } from "@ant-design/icons";
import HOTICON from "@/assets/images/hot.png";
import LikeIcon from "@/assets/images/like.svg";
import CommnetIcon from "@/assets/images/comment.svg";
import CollecIcon from "@/assets/images/collect.svg";
import TransmitIcon from "@/assets/images/transmit.svg";
import { SearchHistory } from "@/api/searchHistory/type";
import { deleteById, getSearchHistoryByUserId, deleteAll, createSearchHistory } from "@/api/searchHistory";
import { message } from "antd";
import { searchVideo } from "@/api/video";
import { VideoInfo } from "@/api/video/type";
import { createPortal } from "react-dom";
import PCVideo from "@/components/PCVideo";
import MobileVideo from "@/components/MobileVideo";
import Mark from "@/components/Mark";

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const isMobile = useAppSelector(selectIsMobile)
    const videoListArray = useAppSelector(selectVideoListArray)
    const [searchValue, setSearchValue] = useState(location.state?.searchValue || '')
    const [videoListIndex, setVideoListIndex] = useState(0)
    // const [searchTipVisible, setSearchTipVisible] = useState(false)
    const [resultVisible, setResultVisible] = useState(false)
    const [searchResultList, setSearchResultList] = useState<VideoInfo[]>([])
    const [searchHistoryList, setSearchHistoryList] = useState<SearchHistory[]>([])
    const [showMoreVisible, setShowMoreVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)

    const getsearchHistoryList = async (userId: number) => {
        try {
            const res = await getSearchHistoryByUserId(userId)
            setSearchHistoryList(res)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteOne = async (id: number) => {
        try {
            const data = await deleteById(id)
            if (data.code === 200) {
                getsearchHistoryList(JSON.parse(localStorage.getItem('userInfo') as string).id)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const deleteAllByUserId = async () => {
        try {
            const data = await deleteAll(JSON.parse(localStorage.getItem('userInfo') as string).id)
            if (data.code === 200) {
                getsearchHistoryList(JSON.parse(localStorage.getItem('userInfo') as string).id)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSearch = async (value?: string) => {
        if (!searchValue && !value) {
            message.info('请输入搜索内容')
            return
        }
        try {
            if (localStorage.getItem('userInfo')) {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
                await createSearchHistory(userInfo.id, value || searchValue)
            }
            const data = await searchVideo(value || searchValue)
            setSearchResultList(data)
            setResultVisible(true)
            // setSearchTipVisible(false)
        } catch (e) {
            console.log(e)
        }
    }

    const handleClickVideo = (index: number) => {
        setVideoListIndex(index)
        dispatch(setVideoListArray(searchResultList))
    }

    useEffect(() => {
        if (localStorage.getItem('userInfo') && !location.state.searchResultList) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
            getsearchHistoryList(userInfo.id)
        }
        if (location.state.searchResultList) {
            setSearchResultList(location.state.searchResultList)
            setResultVisible(true)
        }
    }, [location.state.?searchResultList])

    useEffect(() => {
        const searchHistoryList = async () => {
            try {
                const data = await searchVideo(searchValue)
                setSearchResultList(data)
            } catch (e) {
                console.log(e)
            }
        }
        if (videoListArray.length === 0) {
            searchHistoryList()
        }
    }, [videoListArray])

    // useEffect(() => {
    //     if (searchValue) {
    //         setSearchTipVisible(true)
    //     } else {
    //         setSearchTipVisible(false)
    //     }
    // }, [searchValue])

    return (
        <div className="container">
            {isMobile && <header className="header">
                <LeftOutlined className="back-icon" onClick={() => navigate(-1)} />
                <input type="text" placeholder="搜索你想要的一切..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <SearchOutlined className="search-icon" />
                <span className="text" onClick={() => handleSearch()}>搜索</span>
            </header>}
            {!resultVisible && isMobile && <div className="search-body">
                {searchHistoryList.length > 0 && <div className="history">
                    <div className="history-header">
                        <span>搜索历史</span>
                        <div className="history-header-right">
                            {deleteVisible && <span onClick={deleteAllByUserId}>全部删除</span>}
                            {!deleteVisible && searchHistoryList.length > 6 && (!showMoreVisible ? <span onClick={() => setShowMoreVisible(true)}>展开<DownOutlined className="icon" /></span> : <span onClick={() => setShowMoreVisible(false)}>收起<UpOutlined className="icon" /></span>)}
                            {searchHistoryList.length > 6 && <span>|</span>}
                            {deleteVisible ? <span onClick={() => setDeleteVisible(false)}>取消</span> : <DeleteOutlined onClick={() => {
                                setDeleteVisible(true)
                                setShowMoreVisible(true)
                            }} />}
                        </div>
                    </div>
                    <div className="history-body">
                        {!showMoreVisible ?
                            searchHistoryList.slice(0, 6).map((item) => (
                                <div className="history-item" key={item.id}>
                                    <div className="history-item-title" onClick={
                                        () => {
                                            setSearchValue(item.content)
                                            handleSearch(item.content)
                                        }
                                    }>{item.content}</div>
                                    {deleteVisible && <CloseOutlined onClick={() => deleteOne(item.id)} />}
                                </div>)) :
                            searchHistoryList.map((item) => (
                                <div className="history-item" key={item.id}>
                                    <div className="history-item-title" onClick={
                                        () => {
                                            setSearchValue(item.content)
                                            handleSearch(item.content)
                                        }
                                    }>{item.content}</div>
                                    {deleteVisible && <CloseOutlined onClick={() => deleteOne(item.id)} />}
                                </div>))
                        }
                    </div>
                </div>}
                <div className="hot-top">
                    <div className="hot-top-header">
                        <span>热点榜</span>
                    </div>
                    <div className="hot-video-body">
                        <div className="hot-video-item hot-video-item-front">
                            <div className="hot-video-item-rank">
                                1
                            </div>
                            <div className="hot-video-item-info">
                                过年回家，妈妈给我做了一桌好吃的
                            </div>
                            <div className="hot-video-item-hot">
                                <img src={HOTICON} alt="" />
                                <span>123.5万</span>
                            </div>
                        </div>
                        <div className="hot-video-item hot-video-item-front">
                            <div className="hot-video-item-rank">
                                2
                            </div>
                            <div className="hot-video-item-info">
                                话剧肖申克的救赎走进上海大剧院
                            </div>
                            <div className="hot-video-item-hot">
                                <img src={HOTICON} alt="" />
                                <span>123.5万</span>
                            </div>
                        </div>
                        <div className="hot-video-item hot-video-item-front">
                            <div className="hot-video-item-rank">
                                3
                            </div>
                            <div className="hot-video-item-info">
                                隐藏款街头热狗
                            </div>
                            <div className="hot-video-item-hot">
                                <img src={HOTICON} alt="" />
                                <span>13.5万</span>
                            </div>
                        </div>
                        <div className="hot-video-item">
                            <div className="hot-video-item-rank">
                                4
                            </div>
                            <div className="hot-video-item-info">
                                街头十寸大汉堡158元比上次卖300元的实惠
                            </div>
                            <div className="hot-video-item-hot">
                                <img src={HOTICON} alt="" />
                                <span>11.5万</span>
                            </div>
                        </div>
                        <div className="hot-video-item">
                            <div className="hot-video-item-rank">
                                5
                            </div>
                            <div className="hot-video-item-info">
                                这不是国外，这是新疆伊犁。
                            </div>
                            <div className="hot-video-item-hot">
                                <img src={HOTICON} alt="" />
                                <span>10万</span>
                            </div>
                        </div>
                        <div className="hot-video-item">
                            <div className="hot-video-item-rank">
                                6
                            </div>
                            <div className="hot-video-item-info">
                                犯罪片「孤注一掷」建议看完，这诈骗集团荒唐事可真多
                            </div>
                            <div className="hot-video-item-hot">
                                <img src={HOTICON} alt="" />
                                <span>9.8万</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {searchResultList.length > 0 && resultVisible && <div className="search-result">
                {searchResultList.map((item, index) => (
                    <div className="search-resul-item" key={item.id}>
                        <div className="search-resul-item-header">
                            <img src={item.user.avatar} alt="" className="avatar" />
                            <span className="username">{item.user.username}</span>
                        </div>
                        <div className="video-detail">
                            <span className="video-introduce">{item.introduce}</span>
                            <span className="video-label"> {item.label.split('/').map(v => ` #${v}`)}</span>
                        </div>
                        <div className="video-container" onClick={() => handleClickVideo(index)}>
                            <img src={item.poster} alt="" />
                        </div>
                        <div className="search-resul-item-footer">
                            <span className="footer-item" onClick={() => handleClickVideo(index)}>
                                <img src={LikeIcon} alt="" />
                                {item.interactionCount}
                            </span>
                            <span className="footer-item" onClick={() => handleClickVideo(index)}>
                                <img src={CommnetIcon} alt="" />
                                {item.commentCount}
                            </span>
                            <span className="footer-item" onClick={() => handleClickVideo(index)}>
                                <img src={CollecIcon} alt="" />
                                {item.collectCount}
                            </span>
                            <span className="footer-item" onClick={() => handleClickVideo(index)}>
                                <img src={TransmitIcon} alt="" />
                                0
                            </span>
                        </div>
                    </div>
                ))}
            </div>}
            {searchResultList.length === 0 && resultVisible && <div className="search-no-result">
                <span>暂无搜索结果</span>
            </div>}
            {/* {searchTipVisible && isMobile && <div className="search-tip">
                <div className="search-tip-item">
                    <SearchOutlined className="icon" />
                    <span className="text">搜索结果1</span>
                    <ArrowRightOutlined className="icon" />
                </div>
                <div className="search-tip-item">
                    <SearchOutlined className="icon" />
                    <span className="text">搜索结果1</span>
                    <ArrowRightOutlined className="icon" />
                </div>
                <div className="search-tip-item">
                    <SearchOutlined className="icon" />
                    <span className="text">搜索结果1</span>
                    <ArrowRightOutlined className="icon" />
                </div>
                <div className="search-tip-item">
                    <SearchOutlined className="icon" />
                    <span className="text">搜索结果1</span>
                    <ArrowRightOutlined className="icon" />
                </div>
                <div className="search-tip-item">
                    <SearchOutlined className="icon" />
                    <span className="text">搜索结果1</span>
                    <ArrowRightOutlined className="icon" />
                </div>
            </div>} */}
            {videoListArray.find(item => item === searchResultList) && createPortal(
                <Mark>
                    {isMobile ? <MobileVideo videoList={searchResultList} videoId={searchResultList[videoListIndex].id} /> : <PCVideo videoList={searchResultList} videoListIndex={videoListIndex} />}
                </Mark>
                , document.body)}
        </div>
    )
}

export default Search