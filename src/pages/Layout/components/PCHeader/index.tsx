import React, { FC, useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { message } from "antd";
import { SearchOutlined, DownOutlined, VideoCameraAddOutlined, DeleteOutlined, UpOutlined, CloseOutlined } from "@ant-design/icons";
import { selectUserInfo, setUserInfo } from "@/stores/slices/userInfoSlice";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import "./index.scoped.scss";
import { NAV_LONG_LENGTH, NAV_SHORT_LENGTH, SEARCH_HISTORY_LIST } from "@/constants";
import Button from "../../../../components/Button";
import NavFewerIcon from "@/assets/images/navFewer.png";
import NavSpreadIcon from "@/assets/images/navSpread.png";
import HOTICON from "@/assets/images/hot.png";
import Mark from "@/components/Mark";
import { loginApi } from "@/api/login";
import { createUser, getUserInfo } from "@/api/user/index";
import { uploadVideo } from "@/api/video";


interface Props {
    shortNavVisible: boolean;
    changeNavLen: (visible: boolean) => void;
}

const PCHeader: FC<Props> = ({ changeNavLen, shortNavVisible }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(selectUserInfo);
    const [params] = useSearchParams();
    const [historyList, setHistoryList] = useState(SEARCH_HISTORY_LIST.slice(0, 5));
    const [showMore, setShowMore] = useState(false);
    const [showSearchBoard, setShowSearchBoard] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const UploadVideoRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setLoginModalVisible(params.get('login') === 'true');
    }, [params]);

    const handleClickOutside = (e: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
            setShowSearchBoard(false);
        }
    };

    const showMoreHistory = () => {
        showMore ? setHistoryList(SEARCH_HISTORY_LIST.slice(0, 5)) : setHistoryList(SEARCH_HISTORY_LIST);
        setShowMore(!showMore);
    }

    const handleLogin = async () => {
        if (!phoneNumber || !password) return message.error('账号或密码不能为空', 2);
        try {
            const data = await loginApi({ phoneNumber, password });
            if (data.code === 200) {
                localStorage.setItem('token', data.token!);
                setLoginModalVisible(false);
                if (!userInfo) {
                    const userInfo = await getUserInfo('0');
                    dispatch(setUserInfo(userInfo));
                }
            } else {
                message.error(data.message, 2);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleRegister = async () => {
        if (!isRegister) {
            setPhoneNumber('');
            setPassword('');
            setIsRegister(true);
            return;
        }
        if (!phoneNumber || !password) return message.error('账号或密码不能为空', 2);
        if (password !== confirmPassword) return message.error('两次密码不一致', 2);
        try {
            await createUser({ phoneNumber, password });
            message.success('注册成功', 2);
            setIsRegister(false);
        } catch (e) {
            console.log(e);
        }
    }

    const handleExit = () => {
        localStorage.removeItem('token');
        dispatch(setUserInfo(null));
        message.success('退出成功', 2);
    }

    const handleUploadVideo = () => {
        if (UploadVideoRef.current) {
            UploadVideoRef.current.click();
        }
    }

    const videoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 1024 * 1024 * 100) {
            message.error('视频大小不能超过100M', 2);
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            const data = await uploadVideo(formData);
            navigate('/upload', { state: { videoInfo: data } });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="container">
            <div
                className="nav-change"
                style={{ left: `${shortNavVisible ? NAV_SHORT_LENGTH : NAV_LONG_LENGTH}` }}
            >
                <Button onClick={() => changeNavLen(!shortNavVisible)}>
                    <img src={shortNavVisible ? NavSpreadIcon : NavFewerIcon} alt="" />
                </Button>
            </div>
            <div className="search" ref={searchRef}>
                <input type="text" placeholder="搜索" onFocus={() => setShowSearchBoard(true)} />
                <SearchOutlined className="search-icon" />
                <div className={`search-board ${showSearchBoard && 'search-board-active'}`} onClick={(e) => e.stopPropagation()}>
                    <div className="search-history-header">
                        <span className="title">搜索历史</span>
                        <DeleteOutlined className="delete-icon" />
                    </div>
                    <div className="search-history-body">
                        {historyList.map(item => (
                            <div className="search-history-item" key={item.id}>{item.name}</div>
                        ))}
                        <div className="search-history-item-more" onClick={showMoreHistory}>{showMore ? <UpOutlined /> : <DownOutlined />}</div>
                        {/* <span className="no-history">暂无历史</span> */}
                    </div>
                    <div className="hot-video-header">
                        <span>热门视频</span>
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
                        <div className="hot-video-item">
                            <div className="hot-video-item-rank">
                                2
                            </div>
                            <div className="hot-video-item-info">
                                话剧肖申克的救赎走进上海大剧院
                            </div>
                            <div className="hot-video-item-hot">
                                <img src={HOTICON} alt="" />
                                <span>101.5万</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {userInfo
                ? (
                    <div className="container-right">
                        <Button onClick={handleUploadVideo}>
                            <VideoCameraAddOutlined className="add-video-icon" />上传视频
                            <input type="file" accept="video/*" hidden ref={UploadVideoRef} onChange={videoUpload}/>
                        </Button>
                        <div className="user-info">
                            <div className="avater">
                                <img src={userInfo.avatar} alt="" />
                            </div>
                            <span className="user-name">{userInfo.username}</span>
                            <DownOutlined className="down-icon" />

                            <div className="user-menu">
                                <ul>
                                    <li onClick={() => navigate('user-info/0')}>个人中心</li>
                                    <li onClick={handleExit}>退出登录</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className="login">
                        <Button onClick={() => setLoginModalVisible(true)}>登录</Button>
                    </div>
                )
            }
            {loginModalVisible &&
                <Mark onClose={() => setLoginModalVisible(false)}>
                    <div className="login-container" onClick={(e) => e.stopPropagation()}>
                        <header className="header">
                            <span className="title">{isRegister ? '注册' : '登录'}</span>
                            <CloseOutlined className="close" onClick={() => setLoginModalVisible(false)} />
                        </header>
                        <div className="form-item">
                            <span className="label">账号</span>
                            <input type="text" className="input" placeholder="请输入手机号或邮箱" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <span className="label">密码</span>
                            <input type="password" className="input" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {isRegister &&
                            <div className="form-item">
                                <span className="label">确认密码</span>
                                <input type="password" className="input" placeholder="请再次输入密码" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>}
                        <div className="form-item">
                            <span className="label"></span>
                            <div className="button-group">
                                {!isRegister && <Button onClick={handleLogin}>登录</Button>}
                                {isRegister && <Button onClick={() => setIsRegister(false)}>返回登录</Button>}
                                <Button onClick={handleRegister}>注册</Button>
                            </div>
                        </div>
                    </div>
                </Mark>
            }
        </div>
    )
}

export default PCHeader;