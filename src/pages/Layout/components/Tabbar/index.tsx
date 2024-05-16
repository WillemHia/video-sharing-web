import React, { FC, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import Button from "../../../../components/Button";
import "./index.scoped.scss";
import { message } from "antd";
import { uploadVideo } from "@/api/video";

const Tabbar: FC = () => {
    const VideoUploadRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(0)

    const handleVideoUpload = () => {
        if (VideoUploadRef.current) {
            VideoUploadRef.current.click()
        }
    }
    const videoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return

        if (file.size > 1024 * 1024 * 100) {
            message.error('视频大小不能超过100M', 2)
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        try {
            const data = await uploadVideo(formData)
            navigate('/upload', { state: { videoInfo: data } })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="container">
            <span className={`item ${activeItem === 0 && 'active-item'}`} onClick={() => {
                setActiveItem(0)
                navigate('')
            }}>首页</span>
            <Button isMobile={true} onClick={handleVideoUpload}>
                <VideoCameraAddOutlined />
                <input ref={VideoUploadRef} onChange={videoUpload} type="file" accept="video/*" hidden />
            </Button>
            <span className={`item ${activeItem === 1 && 'active-item'}`} onClick={() => {
                setActiveItem(1)
                navigate(`user-info/${JSON.parse(localStorage.getItem('userInfo') || '{"id":0}').id}`,)
            }}>我</span>
        </div>
    );
}

export default Tabbar;