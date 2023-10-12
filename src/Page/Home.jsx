import React, { useContext } from 'react';

import styles from './Home.module.css'
import { Link } from 'react-router-dom';
export default function Home() {

    const id = localStorage.getItem('id');
    
    
    return (
        <div className={styles.maincontent}>
            {/* <button onClick={handleSession}>로그인(local실험)</button> */}

            <div className={styles.imageContainer}>
                <img src={"/img/interview.jpg"}></img>
                <a href={`http://localhost:3001/interview${id}`} className={styles.shortcutButton}>가상면접</a>
            </div>
            <div className={styles.imageContainer}>
                <img src={"/img/studyGroup.jpg"}></img>
                <a href={`http://localhost:3001/home/${id}`}>스터디그룹</a>
            </div>
            <div className={styles.imageContainer}>
                <img src={"/img/community.jpg"}></img>
                <Link to="/board"className={styles.shortcutButton}>커뮤니티</Link>
            </div>
            
        </div>
    );
}

