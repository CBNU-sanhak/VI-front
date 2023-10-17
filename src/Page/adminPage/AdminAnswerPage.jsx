
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../QAPage.module.css';
import styles1 from './AdminAnswerPage.module.css'

export default function AdminAnswerPage() {
    const { id } = useParams();
    const [question, setQuestion] = useState({});
    const navigate = useNavigate();
    const [answerText, setAnswerText] = useState('');

    const handlePreviousButtonClick = () => {
        // 이전 버튼 클릭 시 이전 페이지로 이동
        navigate(-1);
      };

    useEffect(() => {
        fetch('http://localhost:3001/inquire/' + id)
          .then((response) => response.json())
          .then((data) => {
            setQuestion(data[0]);
            setAnswerText(data[0].answer);
          })
          .catch((error) => {
            console.error('FAQ 데이터를 불러오는 중 오류 발생:', error);
          });
      }, [id]);

      const handleSaveAnswer = () => {
        // 여기에서 서버로 답변 내용을 전송하고 상태를 업데이트합니다.
        fetch(`http://localhost:3001/inquire/update/${id}`, {
            method: 'PATCH', // 이것은 업데이트를 수행하기 위한 HTTP 메서드입니다. 서버 측에서 PATCH 요청을 처리할 수 있어야 합니다.
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer: answerText,
                answer_check:1,
             }), // 이 부분에서 필요한 데이터를 서버로 보냅니다.
        })
        .then((response) => response.json())
        .then((json) => {
        // 서버로부터 응답을 받은 후 상태를 업데이트하거나 다른 작업을 수행할 수 있습니다.
        // 예: 상태를 업데이트하여 사용자에게 성공 메시지를 표시하거나 이전 페이지로 돌아가는 등의 작업
            if(json.data ==="ok"){
                alert("답변완료");
                navigate(-1);
            }
        })
        .catch((error) => {
        console.error('답변 저장 중 오류 발생:', error);
        });
    };
    

    return (
        <div className={styles1.container}>
          <h1>질문답변</h1>
          <div className={styles.header}>
            <div>작성자:{question.id}</div>
            <div>날짜:{question.i_date}</div>
          </div>
          <div className={styles.content}>
            <h2 className={styles.subject}> 질문:{question.i_contents} </h2>
            <div className={styles.answer}>답변:
            <textarea
                style={{
                    width: '100%', // 너비 조절
                    height: '100%', // 높이 조절
                    // 다른 스타일 속성을 추가할 수 있습니다.
                }}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="답변을 입력하세요..."
                            ></textarea>
            </div>
          </div>
          <div className={styles.answerBox}>
            <button className={`${styles1.goback}`}onClick={handlePreviousButtonClick}>이전</button>
            <button  className={`${styles1.goback}  ${styles1.answertheQ}`}onClick={handleSaveAnswer}>답변하기</button>
          </div>
        </div>
      );
}
