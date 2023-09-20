import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardList.module.css'
//커뮤니티페이지의 게시판들의 미리보기를 위한 컴포넌트
// 추천 api, 미리보기를 위한 api가 필요 8개 최신순 
//

export default function BoardList() {

    const content  = [     

        {
            id:'5',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            recommend:'3',
            p_date:'20231212'
        },
        {
            id:'13',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            recommend:'3',
            p_date:'20231212'
        },
        {
            id:'13',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            recommend:'3',
            p_date:'20231212'
        },
        {
            id:'11',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            recommend:'3',
            p_date:'20231212'
        },
        {
            id:'6',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            recommend:'3',
            p_date:'20231212'
        },
        {
            id:'7',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            recommend:'3',
            p_date:'20231212'
        },
        {
            id:'8',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            recommend:'3',
            p_date:'20231212'
        }, 
        {
            id:'9',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            recommend:'3',
            p_date:'20231212'
        },     
    ]
        
    return (
        <div className={styles.boardListContainer}>
                <div className={styles.boardCard}>
                    <span className={styles.title}><Link to="/board/free">자유게시판</Link> </span>
                   
                    <div>
                        {content.map((item) => 
                            (<div className={styles.content}>
                                <a id={item.id}href={`/board/free/${item.id}`}>
                                    {item.title} 
                                </a>
                                <div>날짜:{item.p_date} 추천:{item.recommend}</div>
                            </div>)
                        )}
                    </div>
                </div>
                <div className={styles.boardCard}>
                    <span className={styles.title}><Link to="/board/interview">면접게시판</Link></span>
                    
                    <div>
                        {content.map((item) => 
                            (<div className={styles.content}>
                                <a id={item.id}href={`/board/interview/${item.id}`}>
                                    {item.title} 
                                </a>
                                <div>날짜:{item.p_date} 추천:{item.recommend}</div>
                            </div>)
                        )}
                    </div>
                </div>
                <div className={styles.boardCard}>
                    <span className={styles.title}><Link to="/boards/job">취업게시판</Link></span>
                    <div>
                        {content.map((item) => 
                            (<div className={styles.content}>
                                <a id={item.id}href={`/board/free/${item.id}`}>
                                    {item.title} 
                                </a>
                                <div>날짜:{item.p_date} 추천:{item.recommend}</div>
                            </div>)
                        )}
                    </div>
                </div>
        </div>
    );
}

