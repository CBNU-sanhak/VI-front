import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './QAPage.module.css';

export default function QAPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/inquire/' + id)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data[0]);
        console.log(question);
      })
      .catch((error) => {
        console.error('FAQ 데이터를 불러오는 중 오류 발생:', error);
      });
  }, [id]);

  const handlePreviousButtonClick = () => {
    // 이전 버튼 클릭 시 이전 페이지로 이동
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <h1>질문답변</h1>
      <div className={styles.header}>
        <div>작성자:{question.id}</div>
        <div>날짜:{question.i_date}</div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.subject}> 질문:{question.i_contents} </h2>
        <div className={styles.answer}>답변:{question.answer}</div>
      </div>
      <div>
        <button className={styles.goback}onClick={handlePreviousButtonClick}>이전</button>
      </div>
    </div>
  );
}