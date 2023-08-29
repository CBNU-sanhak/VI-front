import React,{useState} from 'react';
import styles from './help.module.css'

function FAQSection() {
    const faqData = [
      { question: '로그인은 어떻게 하는 건가용?', answer: '이렇게 이렇게 하시면 됩니다.' },
      { question: '질문 2', answer: '답변 2' },
      // 다른 FAQ 항목들도 추가
    ];
  
    return (
      <div className={styles.faqsection}>
         <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
        {faqData.map((item, index) => (
          <div key={index}>
            <h3>Q:{item.question}</h3>
            <p>A:{item.answer}</p>
          </div>
        ))}
      </div>
    );
  }
  
  function InquiryForm() {
    const id = localStorage.getItem('id');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // 서버로 양식 데이터 전송 등의 로직
      console.log('Submit:', id, email, subject, content);
    };
  
    return (
        <div className={styles.formContainer}>
        <h2 className={styles.sectionTitle}>고객 문의하기</h2>
        <div className={styles.content}>
          <div className={styles.formLabel}>아이디:{id}</div>
          <label className={styles.formLabel}>
            제목:<input className={styles.formInput} type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </label>
          <label className={styles.formLabel}>
            내용:<input className={styles.formInput} type="text" value={content} onChange={(e) => setContent(e.target.value)} />
          </label>
          <button onClick={handleSubmit}>제출하기</button>
          
          {/* 이하 입력 양식 스타일을 적용 */}
        </div>
      </div>
    );
  }

export default function Help() {
    return (
        <div className={styles.container}>
            <h1>고객센터</h1>
            <FAQSection />
            <InquiryForm />
        </div>
    );
}

