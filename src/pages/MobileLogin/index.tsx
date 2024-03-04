import React, { FC, useState } from "react";
import './index.scoped.scss'
import Button from "@/components/Button";

const MobileLogin: FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)

    return (
        <div className="container">
            <h1 className='login-title'>Welcome</h1>
            <div className='login-info'>全新的旅程在等待着你！</div>
            <div className='login-form'>
                <div className='login-form-item'>
                    <input className='login-form-input' onChange={(e) => { setUsername(e.target.value) }} value={username} required />
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
                        <input className='login-form-input' type='password' onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                        <label className='login-form-label'>确认密码</label>
                        <span className='login-form-border'></span>
                    </div>
                }
                {!isRegister && <div className="register" onClick={() => setIsRegister(true)}>没账号？戳这里</div>}
                {isRegister && <div className="register" onClick={() => setIsRegister(false)}>去登录</div>}
                <div className="login-form-item">
                    <Button isMobile={true} style={{ width: '100%', height: '1rem' }}>{isRegister ? '注册' : '登录'}</Button>
                </div>
            </div>
        </div>
    )
}

export default MobileLogin;