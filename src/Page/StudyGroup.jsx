import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudyGroup.module.css'

export default function StudyGroup() {
    const [studygroup, setStudygroup] = useState([]);
    const [newStudyGroupName, setNewStudyGroupName] = useState('');
    const [newStudyGroupLimit, setNewStudyGroupLimit] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');

    const createStudyGroup = () => {
        // 사용자가 입력한 정보를 서버로 보내 스터디 그룹을 생성
        fetch('http://localhost:3001/study_group/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                s_name: newStudyGroupName,
                limited_number: newStudyGroupLimit,
                creater: userId,
                // 다른 필요한 데이터도 추가할 수 있음
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // 서버에서 생성한 스터디 그룹 데이터를 받아옴
                // 받아온 데이터를 기존 스터디 그룹 목록에 추가
                setStudygroup([...studygroup, data]);
            })
            .catch((error) => console.error('스터디 그룹 생성 중 오류:', error));

        // 입력 필드 초기화
        setNewStudyGroupName('');
        setNewStudyGroupLimit('');
    };

    useEffect(() => {
        // 페이지 로딩 시 로그인 여부를 확인
        if (!userId) {
            // 로그인이 필요한 경우, 로그인 페이지로 이동
            navigate('/login');
        }
        
        // 스터디 그룹 목록을 불러옴
        fetch('http://localhost:3001/study_group/')
            .then((response) => response.json())
            .then((data) => setStudygroup(data));
    }, [navigate, userId,studygroup]);

    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <h1 className={styles.title}>Study Group</h1>
            </div>
            <div className={styles.content}>
                <h2>스터디 그룹 모집</h2>
                {studygroup.map((groupInfo,index) => (
                    <article key={index}>
                        <span>{groupInfo.s_name}</span>
                        <span>스터디장: {groupInfo.creater}</span>
                        <span>제한인원: {groupInfo.limited_number}</span>
                        <span>현재인원: {groupInfo.current_number}</span>
                    </article>
                ))}
            </div>
            <div className={styles.content}>
                <h2>스터디 그룹 생성</h2>
                <input
                    placeholder="스터디 그룹 이름 생성"
                    value={newStudyGroupName}
                    onChange={(e) => setNewStudyGroupName(e.target.value)}
                ></input>
                <select
                    value={newStudyGroupLimit}
                    onChange={(e) => setNewStudyGroupLimit(e.target.value)}
                >
                    {Array.from({ length: 10 }, (_, index) => (
                        <option key={index} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
                <button onClick={createStudyGroup} disabled={!userId}>
                    생성하기
                </button>
            </div>
            <button>
                화상채팅시작하기
            </button>
        </div>
    );
}