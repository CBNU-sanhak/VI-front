import React, { useContext } from 'react';
import { LoginModeContext } from '../context/LoginModeContext';
import styles from './Home.module.css'
import { Link } from 'react-router-dom';
export default function Home() {
    const {login} = useContext(LoginModeContext);
    const handleSession = () => {
        localStorage.setItem('id',"cys9813");
        localStorage.setItem('token',12345);
        login();
    }
    return (
        <div className={styles.maincontent}>
            {/* <button onClick={handleSession}>로그인(local실험)</button> */}

            <div className={styles.imageContainer}>
                <img src={"/img/interview.jpg"}></img>
                <Link to="/interview"className={styles.shortcutButton}>가상면접</Link>
            </div>
            <div className={styles.imageContainer}>
                <img src={"/img/studyGroup.jpg"}></img>
                <Link to="/studygroup"className={styles.shortcutButton}>스터디그룹</Link>
            </div>
            <div className={styles.imageContainer}>
                <img src={"/img/community.jpg"}></img>
                <Link to="/board"className={styles.shortcutButton}>커뮤니티</Link>
            </div>
            
        </div>
    );
}

