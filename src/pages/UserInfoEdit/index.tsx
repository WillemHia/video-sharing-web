import React, { FC, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined, InstagramOutlined, LeftOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectUserInfo, setUserInfo } from "@/stores/slices/userInfoSlice";
import { getUserInfo, updateUserAvatar, updateUserBackground, updateUser } from "@/api/user";
import './index.scoped.scss'
import Button from "@/components/Button";
import { message } from "antd";
import { UserInfo } from "@/api/user/type";

const UserInfoEdit: FC = () => {
    const navigate = useNavigate();
    const userInfo = useAppSelector(selectUserInfo)
    const dispatch = useAppDispatch()
    const [sexSelectVisible, setSexSelectVisible] = useState(false);
    const [cloneUserInfo, setCloneUserInfo] = useState<UserInfo>()
    const UploadAvatarRef = useRef<HTMLInputElement>(null);
    const UploadBackgroudRef = useRef<HTMLInputElement>(null);

    const handleConfirm = async () => {
        try {
            const data = await updateUser(cloneUserInfo!)
            if (data.code === 200) {
                message.success('修改成功', 2)
            }
        } catch (e) {
            console.log(e)
        }
    };

    const changeUserInfo = (value: string | number, type: string) => {
        setCloneUserInfo({ ...cloneUserInfo, [type]: value } as UserInfo)
    }

    const handleChangeAvatar = () => {
        if (UploadAvatarRef.current) {
            UploadAvatarRef.current.click()
        }
    };

    const handleChangeBackgroud = () => {
        if (UploadBackgroudRef.current) {
            UploadBackgroudRef.current.click()
        }
    };

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files?.[0];
        if (!file) return
        console.log(file)
        if (file.size > 1024 * 1024 * 3) {
            message.error('图片大小不能超过3M', 2)
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        formData.append('id', userInfo?.id.toString()!)
        if (type === 'avatar') {
            formData.append('avatar', cloneUserInfo?.avatar.split('/').pop()!)
        } else {
            formData.append('backgroundImg', cloneUserInfo?.backgroundImg.split('/').pop()!)
        }
        try {
            if (type === 'avatar') {
                const data = await updateUserAvatar(formData)
                setCloneUserInfo({ ...cloneUserInfo, avatar: data.avatar } as UserInfo)
            } else {
                const data = await updateUserBackground(formData)
                setCloneUserInfo({ ...cloneUserInfo, backgroundImg: data.backgroundImg } as UserInfo)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const getUserInfoData = async () => {
            try {
                const data = await getUserInfo('0')
                dispatch(setUserInfo(data))
                setCloneUserInfo(data)
            } catch (e) {
                console.log(e)
            }
        }
        if (!userInfo) {
            getUserInfoData()
        } else {
            setCloneUserInfo(userInfo)
        }
    }, [dispatch, userInfo])

    useEffect(() => {
        if (cloneUserInfo) {
            dispatch(setUserInfo(cloneUserInfo))
        }
    }, [cloneUserInfo, dispatch])

    return (
        <div className="container">
            <div className="nav-back">
                <LeftOutlined className="icon" onClick={() => navigate(-1)} />
            </div>
            <div className="header">
                <div className="backgroud-change" onClick={handleChangeBackgroud}>
                    <span>更换背景</span>
                    <input type="file" accept="image/*" style={{ display: 'none' }} ref={UploadBackgroudRef} onChange={(e) => { uploadImage(e, 'background') }} />
                </div>
                <img className="background" src={cloneUserInfo?.backgroundImg} alt="" />
                <div className="header-body">
                    <img className="avater" src={cloneUserInfo?.avatar} alt="" />
                    <div className="avater-mark" onClick={handleChangeAvatar}>
                        <InstagramOutlined className="icon" />
                        <span>更换头像</span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} ref={UploadAvatarRef} onChange={(e) => { uploadImage(e, 'avatar') }} />
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="body-item">
                    <span className="label">名称</span>
                    <input value={cloneUserInfo?.username} onChange={(e) => changeUserInfo(e.target.value, 'username')} />
                </div>
                <div className="body-item">
                    <span className="label">性别</span>
                    <input readOnly onClick={() => setSexSelectVisible(true)} value={cloneUserInfo?.sex === 0 ? '男' : '女'} />
                    <DownOutlined className="icon" />
                </div>
                <div className="body-item">
                    <span className="label">年龄</span>
                    <input value={cloneUserInfo?.age} onChange={(e) => changeUserInfo(e.target.value, 'age')} />
                </div>
                <div className="body-item">
                    <span className="label">学校</span>
                    <input value={cloneUserInfo?.school} onChange={(e) => changeUserInfo(e.target.value, 'school')} />
                </div>
                <div className="body-item">
                    <span className="label">所在地区</span>
                    <input value={cloneUserInfo?.address} onChange={(e) => changeUserInfo(e.target.value, 'address')} />
                </div>
                <div className="body-item">
                    <span className="label">邮箱</span>
                    <input value={cloneUserInfo?.email} onChange={(e) => changeUserInfo(e.target.value, 'email')} />
                </div>
                <div className="body-item">
                    <span className="label">简介</span>
                    <textarea value={cloneUserInfo?.introduce} onChange={(e) => changeUserInfo(e.target.value, 'introduce')} />
                </div>
                <div className="body-item">
                    <span className="label"></span>
                    <Button onClick={handleConfirm}>确认</Button>
                </div>
            </div>
            {sexSelectVisible && <div className="mark" onClick={() => setSexSelectVisible(false)}>
                <div className="sex-select" onClick={(e) => e.stopPropagation()}>
                    <div className="title">请选择性别</div>
                    <div className="sex-option sex-option-selected" onClick={() => {
                        changeUserInfo(0, 'sex')
                        setSexSelectVisible(false)
                    }}>男</div>
                    <div className="sex-option" onClick={() => {
                        changeUserInfo(1, 'sex')
                        setSexSelectVisible(false)
                    }}>女</div>
                </div>
            </div>}
        </div>
    );
}

export default UserInfoEdit;
