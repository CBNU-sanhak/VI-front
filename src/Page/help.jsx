import React,{useEffect, useState} from 'react';
import styles from './help.module.css'
import { Link, useNavigate } from 'react-router-dom';


//답변 완료여부 콜럼이 있었으면 좋겠어
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

  function FAQList() {
    const [faqList, setFaqList] = useState([]);
  
    const fetchFAQList = () => {
      // FAQ 데이터를 가져오는 API 호출
      fetch('http://localhost:3001/inquire') // 적절한 엔드포인트 및 메서드로 변경하세요
        .then((response) => response.json())
        .then((data) => {
          setFaqList(data);
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
        <h2 className={styles.sectionTitle}>FAQ 목록</h2>
        <ul>
          {faqList.map((faq, index) => (
            <li key={index}>
            {faq.answer_check ===1 ? (
              <Link to={`/qa/${faq.id}`}>
                <h3>
                  Q: {faq.i_contents} (답변완료)
                </h3>
              </Link>
            ) : (
              <h3>Q: {faq.i_contents} (답변대기)</h3>
            )}
          </li>
          ))}
        </ul>
      </div>
    );
  }
  
  function InquiryForm() {
    const ident = localStorage.getItem('ident');
    const id = localStorage.getItem('id');
    const navigator = useNavigate();
     

   const [inquire, setInquire] = useState({
      c_no: id,
      i_contents: '',
    });

    const saveInquire = async () => {

      console.log(inquire);

      await fetch("http://localhost:3001/inquire/insert", {
        method: "post",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(inquire)
        }).then((res) => res.json()).then((json) => {
            if(json.data === "ok"){
                alert("질문이 등록되었습니다.!");
                navigator(0);
                
            } else{
                alert("실패!");
            }
    });

    
  };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // 서버로 양식 데이터 전송 등의 로직
      saveInquire();
    };
  
    return (
        <div className={styles.formContainer}>
        <h2 className={styles.sectionTitle}>고객 문의하기</h2>
        <div className={styles.content}>
          <div className={styles.formLabel}>아이디:{ident}</div>
          <label className={styles.formLabel}>
            내용:<input className={styles.formInput} type="text" value={inquire.i_content} onChange={(e) => {
              setInquire({...inquire , i_contents:e.target.value})
              console.log(inquire);
            }}/>
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
            <FAQList />
            <InquiryForm />
        </div>
    );
}

