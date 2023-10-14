import React, { useContext, useState } from 'react';

import styles from './Home.module.css'
import { Link } from 'react-router-dom';

export default function Home() {
    const id = localStorage.getItem('id');
    const [selectedButton, setSelectedButton] = useState(1);

    const onButtonClick = () => {
        const overflow = document.querySelector(`.${styles.overflow}`);
        overflow.style.transform = 'translateX(0vw)';
        setSelectedButton(1);
    }

    const onButtonClick2 = () => {
        const overflow = document.querySelector(`.${styles.overflow}`);
        overflow.style.transform = 'translateX(-100vw)';
        setSelectedButton(2);
    }

    const onButtonClick3 = () => {
        const overflow = document.querySelector(`.${styles.overflow}`);
        overflow.style.transform = 'translateX(-200vw)';
        setSelectedButton(3);
    }

    return (
        <div className={styles.maincontent}>
            <div className={styles.overflow}>
                <div className={styles.imageContainer}>
                    <img src={"/img/interview.jpg"}></img>
                    <a href={`http://localhost:3001/interview${id}`} className={styles.shortcutButton}>가상면접</a>
                </div>
                <div className={styles.imageContainer}>
                    <img src={"/img/studyGroup.jpg"}></img>
                    <a href={`http://localhost:3001/home/${id}`} className={styles.shortcutButton}>스터디그룹</a>
                </div>
                <div className={styles.imageContainer}>
                    <img src={"/img/community.jpg"}></img>
                    <Link to="/board" className={styles.shortcutButton}>커뮤니티</Link>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${selectedButton === 1 ? styles.selectedButton : ''}`}
                    onClick={onButtonClick}
                >
                </button>
                <button
                    className={`${styles.button} ${selectedButton === 2 ? styles.selectedButton : ''}`}
                    onClick={onButtonClick2}
                >
                </button>
                <button
                    className={`${styles.button} ${selectedButton === 3 ? styles.selectedButton : ''}`}
                    onClick={onButtonClick3}
                >
                </button>
            </div>
        </div>
    );
}