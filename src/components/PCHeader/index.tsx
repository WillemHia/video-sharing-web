import React, { FC } from "react";
import { SearchOutlined, DownOutlined, VideoCameraAddOutlined, DeleteOutlined } from "@ant-design/icons";
import "./index.scoped.scss";
import { NAV_LONG_LENGTH, NAV_SHORT_LENGTH } from "@/constants";
import Button from "../Button";
import NavFewerIcon from "@/assets/images/navFewer.png";
import NavSpreadIcon from "@/assets/images/navSpread.png";


interface Props {
    shortNavVisible: boolean;
    changeNavLen: (visible: boolean) => void;
}

const userInfo = true;
const PCHeader: FC<Props> = ({ changeNavLen, shortNavVisible }) => {
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
            <div className="search">
                <input type="text" placeholder="搜索" />
                <SearchOutlined className="search-icon" />
                <div className="search-board">
                    <div className="search-history-header">
                        <span className="title">搜索历史</span>
                        <DeleteOutlined className="delete-icon"/>
                    </div>
                </div>
            </div>
            {userInfo
                ? (
                    <div className="container-right">
                        <Button><VideoCameraAddOutlined className="add-video-icon" />上传视频</Button>
                        <div className="user-info">
                            <div className="avater">
                                <img src="data:image/jpeg;base64,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" alt="" />
                            </div>
                            <span className="user-name">用户名</span>
                            <DownOutlined className="down-icon" />

                            <div className="user-menu">
                                <ul>
                                    <li>个人中心</li>
                                    <li>退出登录</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className="login">
                        <Button>登录</Button>
                    </div>
                )
            }
        </div>
    )
}

export default PCHeader;