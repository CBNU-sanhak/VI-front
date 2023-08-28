import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Mypage.module.css'

export default function Mypage() {

    const info = {
        id:"cys9813",
        nickName : "초이스타",
        name : "최유성",
        email:"cys9813@naver.com",
        myInterviewResult : [1234,2345,3456],
        myStudygroup: ["네이버스터디그룹","카카오스터디그룹","라인스터디그룹","쿠팡스터디그룹"]

    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Page</h1>
            <div className={styles.content}>
                <div className={styles.myProfile}>
                    <img src={"/img/newjeans_minji.jpg"} alt="" />
                    <h3>{info.id}</h3>
                    <p><span>{info.name}</span> / <span>{info.nickName}</span></p>
                    <p>{info.email}</p>
                    <div>
                        <button>로그아웃</button>
                        <button>정보수정</button>
                    </div>
                </div>
                <div className={styles.myActives}>
                    <div className={styles.myActive}>
                        <h3>나의 면접결과</h3>
                            나의 면접결과 {info.myInterviewResult.map((item)=> <Link to={`/interview/result/${item}`}><span>면접번호:{item}</span></Link>)}
                    </div>
                    <div  className={styles.myActive}>
                        <h3>나의 스터디그룹</h3>
                           {info.myStudygroup.map((item)=> <span>{item}</span>)} 
                    </div> 
                    <div  className={styles.myActive}>
                        <h3>내가쓴 게시글</h3>
                        {info.myStudygroup.map((item)=> <span>{item}</span>)} 
                    </div> 
                    <div  className={styles.myActive}>
                        <h3>내가 쓴 댓글 </h3>
                        {info.myStudygroup.map((item)=> <span>{item}</span>)} 
                    </div>  
                </div>
                        
            </div>
        </div>
    );
}

