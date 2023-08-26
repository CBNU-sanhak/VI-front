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
            <div className={styles.icon}>
                <Link to='/'>LOGO</Link>
            </div>
            <div className={styles.mainmenu}>
                <div className={styles.item}>
                    <Link to='board'>가상면접</Link>
                </div>
                <div className={styles.item}>
                    <Link to='board'>스터디그룹</Link>
                </div>
                <div className={styles.item}>
                    <Link to='board'>커뮤니티</Link>
                </div>
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
                        <div className={styles.item}>
                            <Link to='login'>로그인</Link>                    
                        </div>
                        <div className={styles.item}>
                            <Link to='signup'>회원가입</Link>                    
                        </div>
                    </div>
                    
                }
            </div>
        </div>
    )
}