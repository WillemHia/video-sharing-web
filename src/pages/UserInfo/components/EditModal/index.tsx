import React, { FC, useEffect, useRef, useState } from "react";
import { CloseOutlined, InstagramOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectUserInfo, setUserInfo } from "@/stores/slices/userInfoSlice";
import './index.scoped.scss'
import Button from "@/components/Button";
import { UserInfo } from "@/api/user/type";
import { updateUser, updateUserAvatar } from "@/api/user";
import { message } from "antd";

interface Props {
    onClose: () => void;
}

const EditModal: FC<Props> = ({ onClose }) => {
    const userInfo = useAppSelector(selectUserInfo)
    const dispatch = useAppDispatch()
    const [cloneUserInfo, setCloneUserInfo] = useState<UserInfo>(userInfo!)
    const UploadAvatarRef = useRef<HTMLInputElement>(null);

    const handleChangeAvatar = () => {
        if (UploadAvatarRef.current) {
            UploadAvatarRef.current.click()
        }
    };

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return
        if (file.size > 1024 * 1024 * 3) {
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        formData.append('id', userInfo?.id.toString()!)
        formData.append('avatar', cloneUserInfo?.avatar.split('/').pop()!)
        try {
            const data = await updateUserAvatar(formData)
            setCloneUserInfo({ ...cloneUserInfo, avatar: data.avatar } as UserInfo)
        } catch (e) {
            console.log(e)
        }
    }

    const changeUserInfo = (value: string, type: string) => {
        setCloneUserInfo({ ...cloneUserInfo, [type]: value } as UserInfo)
    }

    const handleConfirm = async () => {
        try {
            const data = await updateUser(cloneUserInfo!)
            if (data.code === 200) {
                message.success('修改成功', 2)
                onClose()
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (cloneUserInfo) {
            dispatch(setUserInfo(cloneUserInfo))
        }
    }, [cloneUserInfo, dispatch])
    return (
        <div className="container" onClick={(e) => e.stopPropagation()}>
            <header className="header">
                <span className="title">编辑信息</span>
                <CloseOutlined className="close" onClick={onClose} />
            </header>
            <div className="avater-container">
                <img src={cloneUserInfo.avatar} alt="" className="avater" />
                <div className="avater-mark" onClick={handleChangeAvatar}>
                    <InstagramOutlined className="icon" />
                    <span>更换头像</span>
                    <input type="file" accept="image/*" style={{ display: 'none' }} ref={UploadAvatarRef} onChange={(e) => { uploadImage(e) }} />
                </div>
            </div>
            <div className="name-container">
                <span className="label">名字</span>
                <input type="text" className="input" placeholder="输入名字" value={cloneUserInfo.username} onChange={(e) => changeUserInfo(e.target.value, 'username')} />
            </div>
            <div className="introduction-container">
                <span className="label">简介</span>
                <textarea className="text-area" placeholder="介绍一下自己" value={cloneUserInfo.introduce} onChange={(e) => changeUserInfo(e.target.value, 'introduce')} />
            </div>
            <div className="button-container">
                <Button onClick={handleConfirm}>保存</Button>
            </div>
        </div>
    )
}

export default EditModal;