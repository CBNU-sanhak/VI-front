import React, { useEffect, useState } from 'react';
import styles from './Home.module.css'
import { Link } from 'react-router-dom';

const url = "http://localhost:3001/post/" 


export function BoardListHome() {

    const [freeData ,setFreeData] = useState([]);
    const [jobData ,setJobData] = useState([]);
    const [interviewData ,setInterviewData] = useState([]);

    useEffect(() => {
            fetchData('a');
            fetchData('b');
            fetchData('c');
    }, [])

    const fetchData = async (category) => {
        await fetch(url+category)
            .then((response) => response.json())
            .then((data) => {
                if(category === 'a'){
                    setFreeData(data);
                }else if (category === 'b'){
                    setInterviewData(data);
                }else {
                    setJobData(data);
                }
            })
            .catch((error) => console.log(error))
            };


    return (
        <div className={styles.boardListContainer}>
                {/* <div className={styles.comunity}>
                    <h2 className={styles.pageName}>커뮤니티</h2>
                </div> */}
                <div className={styles.boardCard}>
                    <Link to="/board/free"><div className={styles.title}>자유게시판 </div></Link>
                   
                    <div className={styles.forScroll}>
                        {freeData.map((item) => 
                            (<Link key={item.id}  to={`/board/${item.id}`}>
                                <div  key={item.id} className={styles.content}>
                                    <span>
                                        {item.title} 
                                    </span>
                                    <div> 추천:{item.recommend}</div>
                                </div>
                            </Link>)
                        )}
                    </div>
                </div>
                <div className={styles.boardCard}>
                    <Link to="/board/interview"><div className={styles.title}>면접게시판</div></Link>
                    
                    <div className={styles.forScroll}>
                        {interviewData.map((item) => 
                            (<Link key={item.id}  to={`/board/${item.id}`}>
                                <div  key={item.id} className={styles.content}>
                                    <span>
                                        {item.title} 
                                    </span>
                                    <div>추천:{item.recommend}</div>
                                </div>
                            </Link>)
                        )}
                    </div>
                </div>
                <div className={styles.boardCard}>
                    <Link to="/board/job"><div className={styles.title}>취업게시판</div></Link>
                    <div className={styles.forScroll}>
                        {jobData.map((item) => 
                            (<Link key={item.id}  to={`/board/${item.id}`}>
                                <div  key={item.id} className={styles.content}>
                                    <span>
                                        {item.title} 
                                    </span>
                                    <div>추천:{item.recommend}</div>
                                </div>
                            </Link>)
                        )}
                    </div>
                </div>
        </div>
    );
}



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

    // 이미지 슬라이딩을 자동화하는 함수
    const autoSlide = () => {
        if (selectedButton === 1) {
            onButtonClick2();
        } else if (selectedButton === 2) {
            onButtonClick3();
        } else {
            onButtonClick();
        }
    }

    useEffect(() => {
        // 5초마다 이미지를 자동으로 슬라이딩하도록 설정
        const slideInterval = setInterval(autoSlide, 3000);

        // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 인터벌을 정리합니다.
        return () => {
            clearInterval(slideInterval);
        }
    }, [selectedButton]);

    return (
        <div className={styles.maincontent}>
            <div className={styles.homeComu}>
                <BoardListHome />
            </div>
            <div className={styles.overflow}>
                <div className={styles.imageContainer}>
                    <img alt='interview' src={"/img/interview.jpg"}></img>
                    <a href={`http://localhost:3001/interview${id}`} className={styles.shortcutButton}>가상면접</a>
                </div>
                <div className={styles.imageContainer}>
                    <img alt='studygroup' src={"/img/studyGroup.jpg"}></img>
                    <a href={`http://localhost:3001/home/${id}`} className={styles.shortcutButton}>스터디그룹</a>
                </div>
                <div className={styles.imageContainer}>
                    <img alt='community' src={"/img/community.jpg"}></img>
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