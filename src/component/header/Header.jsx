import React, { useContext } from "react"
import styles from './Header.module.css'
import { Link } from "react-router-dom";
import { LoginModeContext } from "../../context/LoginModeContext";



export default function Header() {
    const {isLogin, logout} = useContext(LoginModeContext);
    console.log(isLogin);
    const handleLogout = () => {
        console.log("hi");
        logout();
    }

    return (
        <div className={styles.header}>
            <div className={styles.icon} >
                <Link to='/'>LOGO</Link>
            </div>
            <div className={styles.mainmenu}>
                <Link to='interview'>
                    <div className={styles.item}>
                        가상면접
                    </div>
                </Link>
                <Link to='studygroup'>
                    <div className={styles.item}>
                        스터디그룹
                    </div>
                </Link>
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