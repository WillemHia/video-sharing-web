import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectIsMobile, setIsLayoutRouteTop } from "@/stores/slices/deviceAdjustSlice";
import './index.scoped.scss'
import Button from "@/components/Button";
import EditModal from "./components/EditModal";
import Mark from "@/components/Mark";

const Myself: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const isMobile = useAppSelector(selectIsMobile)
    const [isEdit, setIsEdit] = useState(false)
    const openEdit = () => {
        dispatch(setIsLayoutRouteTop(true))
        setIsEdit(true)
    }

    const closeEdit = () => {
        dispatch(setIsLayoutRouteTop(false))
        setIsEdit(false)
    }

    return (
        <>
            <div className="container">
                {isMobile ?
                    <div className="mobile-header">
                        <img className="background" src='/bg.jpg' alt="" />
                        <div className="header-body">
                            <img className="avater" src='/bg.jpg' alt="" />
                            <div className="name-container">
                                <span className="name">小明爱敲代码</span>
                                <span className="id">ID：124876335544</span>
                            </div>
                        </div>
                    </div> :
                    (<header className="header">
                        <div className="header-body">
                            <img className="avater" src='/logo512.png' alt="" />
                            <div className="info-container">
                                <span className="name">小明爱敲代码</span>
                                <div className="follow">
                                    <span className="follow-item">
                                        <span className="follow-item-text">关注</span>
                                        <span className="follow-item-count">0</span>
                                    </span>
                                    <span className="follow-item-split">|</span>
                                    <span className="follow-item">
                                        <span className="follow-item-text">粉丝</span>
                                        <span className="follow-item-count">0</span>
                                    </span>
                                    <span className="follow-item-split">|</span>
                                    <span className="follow-item">
                                        <span className="follow-item-text">获赞</span>
                                        <span className="follow-item-count">0</span>
                                    </span>
                                </div>
                                <div className="info">
                                    <span className="info-item">
                                        <span className="label">ID：</span>
                                        <span className="id">124876335544</span>
                                    </span>
                                </div>
                                <div className="desc">这个人很懒，什么都没有留下</div>
                            </div>
                        </div>
                        <div className="header-options">
                            {/* <Button>关注</Button> */}
                            <Button style={{ backgroundColor: 'rgba(255,255,255,0.35)' }} onClick={openEdit}>编辑信息</Button>
                        </div>
                    </header>
                    )}
                <div className="body">
                    {isMobile && <div className="info-container">
                        <div className="follow">
                            <span className="follow-item">
                                <span className="follow-item-count">0</span>
                                <span className="follow-item-text">获赞</span>
                            </span>
                            <span className="follow-item">
                                <span className="follow-item-count">0</span>
                                <span className="follow-item-text">粉丝</span>
                            </span>
                            <span className="follow-item">
                                <span className="follow-item-count">0</span>
                                <span className="follow-item-text">关注</span>
                            </span>
                        </div>
                        <div className="desc">
                            <span>这个人很懒，什么都没有留下</span>
                            <EditOutlined onClick={()=>navigate('/user-info/edit')}/>
                        </div>
                    </div>}
                    <div className="body-choose">
                        <span className="choose-item choose-item-active">作品&nbsp;123</span>
                        <span className="choose-item">喜欢</span>
                    </div>
                    <div className="body-content">
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                        <div className="content-item">
                        </div>
                    </div>
                </div>
                {isEdit &&
                    <Mark onClose={closeEdit}>
                        <EditModal onClose={closeEdit} />
                    </Mark>
                }
            </div>
        </>
    );
};

export default Myself;