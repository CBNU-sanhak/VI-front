import React, { useContext } from 'react';
import styles from './Header.module.css'
import { Link, useNavigate } from "react-router-dom";
import { LoginModeContext } from "../../context/LoginModeContext";


export default function AdminHeader() {
    const id = localStorage.getItem('id');
    const {isLogin, logout} = useContext(LoginModeContext);
    const navigator = useNavigate();

    const handleLogout = () => {
        //remove local storage
        localStorage.removeItem("id");
        logout();
        navigator('/');
    }
    return (
        <div className={styles.header}>
            <div className={styles.icon} >
                <Link to='/' className={styles.logo}>VI</Link>
            </div>
            <div className={styles.item}>
                <button >관리자페이지</button>
            </div>
            <div className={styles.usermenu}>
                {
                    isLogin?
                    <div className={styles.item}>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>:
                    <div className={styles.usermenu}>
                        <Link to='login'>
                            <div className={styles.item}>
                                로그인
                            </div>
                        </Link>
                        <Link to='signup'>
                            <div className={styles.item}>
                                회원가입
                            </div>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

