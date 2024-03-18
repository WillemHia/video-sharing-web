import React, { FC, useState } from "react";
import { message } from "antd";
import { loginApi } from "@/api/login";
import { createUser } from "@/api/user";
import { useNavigate } from "react-router-dom";
import './index.scoped.scss'
import Button from "@/components/Button";

const MobileLogin: FC = () => {
    const navgiate = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)

    const handleClick = async () => {
        if (!phoneNumber || !password) return message.error('账号或密码不能为空', 2)
        if (isRegister) {
            if (password !== confirmPassword) return message.error('两次密码不一致', 2)
            try {
                await createUser({ phoneNumber, password })
                message.success('注册成功', 2)
                setIsRegister(false)
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                const data = await loginApi({ phoneNumber, password })
                if (data.code === 200) {
                    localStorage.setItem('token', data.token!)
                    navgiate(-1)
                } else {
                    message.error(data.message, 2)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const reset = () => {
        setPhoneNumber('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="container">
            <h1 className='login-title'>Welcome</h1>
            <div className='login-info'>全新的旅程在等待着你！</div>
            <div className='login-form'>
                <div className='login-form-item'>
                    <input className='login-form-input' onChange={(e) => { setPhoneNumber(e.target.value) }} value={phoneNumber} required />
                    <label className='login-form-label'>账号</label>
                    <span className='login-form-border'></span>
                </div>
                <div className='login-form-item'>
                    <input className='login-form-input' type='password' onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                    <label className='login-form-label'>密码</label>
                    <span className='login-form-border'></span>
                </div>
                {isRegister &&
                    <div className='login-form-item'>
                        <input className='login-form-input' type='password' onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} required />
                        <label className='login-form-label'>确认密码</label>
                        <span className='login-form-border'></span>
                    </div>
                }
                {!isRegister && <div className="register" onClick={() => {
                    setIsRegister(true)
                    reset()
                }}>没账号？戳这里</div>}
                {isRegister && <div className="register" onClick={() => {
                    setIsRegister(false)
                    reset()
                }}>去登录</div>}
                <div className="login-form-item">
                    <Button isMobile={true} style={{ width: '100%', height: '1rem' }} onClick={handleClick}>{isRegister ? '注册' : '登录'}</Button>
                </div>
            </div>
        </div>
    )
}

export default MobileLogin;