import React, { useEffect, useState } from 'react';
import styles from './AdminCustomerService.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faQ } from '@fortawesome/free-solid-svg-icons';

export default function AdminCustomerService() {
    const [faqList, setFaqList] = useState([]);
    const [showAnswerInput, setShowAnswerInput] = useState(false);
    const [answerText, setAnswerText] = useState('');

    const handleSaveAnswer = () => {
        // 여기에서 서버로 답변 내용을 전송하고 상태를 업데이트합니다.
        // 서버로의 요청 등은 필요에 따라 구현하세요.
        setShowAnswerInput(false); // 입력란을 숨김
      };

    const handleAnswerClick = () => {
        setShowAnswerInput(true);
      };
  
    const fetchFAQList = () => {
      // FAQ 데이터를 가져오는 API 호출
      fetch('http://localhost:3001/inquire') // 적절한 엔드포인트 및 메서드로 변경하세요
        .then((response) => response.json())
        .then((data) => {
          setFaqList(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('FAQ 데이터를 불러오는 중 오류 발생:', error);
        });

    };
  
    useEffect(() => {
      // 컴포넌트가 마운트될 때 FAQ 목록을 불러옴
      fetchFAQList();
    }, []);
  
    return (
      <div className={styles.faqsection}>
        <h1 className={styles.sectionTitle}>FAQ 목록</h1>
        <div className={styles.forScroll}>
          {faqList.map((faq, index) => (
            <div key={index}>
            {faq.answer_check ===1 ? (
              <Link to={`qa/answer/${faq.id}`}>
                <div className={styles.box}>
                    <div className={styles.box1}>
                       <div className={styles.iconbox}><FontAwesomeIcon icon={faQ} /></div> :{faq.i_contents}
                    </div>
                   <div className={`${styles.isaAnswer} ${styles.completed}`}>답변완료</div>
                </div>
              </Link>
            ) : (
                
                <div className={styles.box}>
                    <div className={styles.box1}>
                        <div className={styles.iconbox}><FontAwesomeIcon icon={faQ} />
                        </div> :{faq.i_contents}
                    </div>
                    <div className={styles.isAnswerBox}>
                        <div className={`${styles.isaAnswer}`} onClick={handleAnswerClick}>
                            <Link to={`qa/answer/${faq.id}`}>
                                답변하기
                            </Link>
                        </div>
                    </div> 
                </div>
              
            )}
          </div>
          ))}
          
        </div>
      </div>
    );
}

