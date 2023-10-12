import React, { useContext } from "react"
import styles from './Header.module.css'
import { Link, useNavigate } from "react-router-dom";
import { LoginModeContext } from "../../context/LoginModeContext";



export default function Header() {
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
                <Link to='/'>LOGO</Link>
            </div>
            <div className={styles.mainmenu}>
                <a href={`http://localhost:3001/interview/${id}`}>
                    <div className={styles.item}>
                        가상면접
                    </div>
                </a>
                <a href={`http://localhost:3001/home/${id}`}>
                    <div className={styles.item}>
                        스터디그룹
                    </div>
                </a>
                <Link to='board'>
                    <div className={styles.item}>
                        커뮤니티
                    </div>
                </Link>
                <Link to='help'>
                    <div className={styles.item}>
                        고객센터
                    </div>
                </Link>
                {
                    isLogin?
                    <div className={styles.item}>
                        <Link to='mypage'>마이페이지</Link>                    
                    </div>:null
                }
                

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