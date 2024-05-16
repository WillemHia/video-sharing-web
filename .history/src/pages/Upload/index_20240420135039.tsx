import React, { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { selectIsMobile } from "@/stores/slices/deviceAdjustSlice";
import { selectUserInfo } from "@/stores/slices/userInfoSlice";
import './index.scoped.scss'
import { LeftOutlined } from "@ant-design/icons";
import Button from "@/components/Button";
import { CreateViodeParams } from "@/api/video/type";
import { createVideo, updateVideoPoster } from "@/api/video";
import { message } from "antd";
import { Label } from "@/api/label/type";
import { getLabels, getLabelsByName } from "@/api/label";

let fristLabel: Label[] = [];
let inputListener: boolean = false;
let inputStartListenIndex: number = 0;
const Upload: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = useAppSelector(selectUserInfo);
    const isMobile = useAppSelector(selectIsMobile);
    const [labelListVisible, setLabelListVisible] = useState(false);
    const labelListRef = useRef<HTMLUListElement>(null);
    const [videoInfo, setVideoInfo] = useState<CreateViodeParams>({ ...location.state?.videoInfo, userId: userInfo?.id });
    const UploadPoster = useRef<HTMLInputElement>(null);
    const [description, setDescription] = useState('')
    const [labels, setLabels] = useState<Label[]>()

    const handleChangePoster = () => {
        if (UploadPoster.current) {
            UploadPoster.current.click()
        }
    }

    const changePoster = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return
        if (file.size > 1024 * 1024 * 3) {
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        formData.append('poster', videoInfo.poster.split('/').pop()!)
        try {
            const data = await updateVideoPoster(formData)
            setVideoInfo({ ...videoInfo, poster: data.poster })
        } catch (e) {
            console.log(e)
        }
    }

    const handleConfirm = async () => {
        //空格加#开头的话题
        const reg = /\x20#(\S*)/g;
        const labels = description.match(reg);
        let labelNames: string[] = []
        if (labels) {
            labelNames = labels.map((item) => item.replace(/\x20#/, ''));
        }
        let introduce = description.replace(reg, '');
        if (introduce === '') {
            message.error('视频简介不能为空', 2)
            return
        }

        if (labelNames.length === 0) {
            message.error('话题不能为空', 2)
            return
        }

        videoInfo.poster = videoInfo.poster.split('/').pop()!
        videoInfo.url = videoInfo.url.split('/').pop()!
        videoInfo.labelNames = Array.from(new Set(labelNames))
        videoInfo.introduce = introduce
        console.log(videoInfo)
        try {
            const data = await createVideo(videoInfo)
            if (data.code === 200) {
                message.success('上传成功', 2)
            }
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    const handleLabelClick = (name: string) => {
        setDescription(description.slice(0, inputStartListenIndex) + name + ' ')
        setLabelListVisible(false)
    }

    useEffect(() => {
        const getLabelsData = async (name: string) => {
            try {
                const data = await getLabelsByName(name)
                setLabels(data)
                setLabelListVisible(true)
            } catch (e) {
                console.log(e)
            }
        }
        if (inputListener) {
            if (description.endsWith(' ')) {
                inputListener = false
                inputStartListenIndex = 0
                setLabelListVisible(false)
                return
            }
            let inputStr = description.slice(inputStartListenIndex, description.length)
            getLabelsData(inputStr)
        } else {
            let endStr = description.slice(description.length - 2, description.length)
            if (endStr === ' #') {
                inputStartListenIndex = description.length
                inputListener = true
            }
        }
    }, [description])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (labelListRef.current && !labelListRef.current.contains(e.target as Node)) {
                setLabelListVisible(false);
            }
        }
        const getLabelsData = async () => {
            try {
                const data = await getLabels()
                fristLabel = data
            } catch (e) {
                console.log(e)
            }
        }
        getLabelsData()
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])

    return (
        <div className="container">
            <div className="nav-back">
                <LeftOutlined onClick={() => navigate(-1)} />
            </div>
            <div className="upload-info">
                <div className="upload-detail">
                    <textarea
                        className="upload-introduction"
                        placeholder="请输入视频简介.."
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                    <div className="upload-label">
                        <div className="label-botton"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLabelListVisible(!labelListVisible);
                            }}>#话题</div>
                        {!isMobile && <Button onClick={handleConfirm}>发布</Button>}
                        {labelListVisible &&
                            <ul ref={labelListRef}>
                                {labels ? labels.map(item => {
                                    return <li key={item.id} onClick={() => handleLabelClick(item.name)}>{`#${item.name} `}</li>
                                }) : fristLabel.map(item => {
                                    return <li key={item.id} onClick={() => handleLabelClick(item.name)}>{`#${item.name} `}</li>
                                })}
                            </ul>}
                    </div>
                </div>
                <div className="upload-image">
                    <img src={videoInfo.poster} alt="" />
                    <div className="change" onClick={handleChangePoster}>
                        更换封面
                        <input type="file" accept="image/*" hidden ref={UploadPoster} onChange={changePoster} />
                    </div>
                </div>
            </div>
            {
                isMobile &&
                <div className="upload-botton">
                    <Button isMobile={isMobile} style={{ width: '100%', height: '1rem' }} onClick={handleConfirm}>发布</Button>
                </div>
            }
        </div >
    )
}

export default Upload;