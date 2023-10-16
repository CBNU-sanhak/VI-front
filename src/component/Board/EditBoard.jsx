import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './WriteBoard.module.css';

export default function EditBoard() {
    const navigate = useNavigate();
    const { boardId } = useParams(); // URL 매개변수로부터 글 ID를 가져옴

    const [board, setBoard] = useState({
        writer: localStorage.getItem('id'),
        title: '',
        content: '',
        category: 'a',
    });

    useEffect(() => {
        // 글 ID를 사용하여 API를 호출하여 기존 글 정보를 가져옴
        fetch(`http://localhost:3001/post/${boardId}`)
            .then((response) => response.json())
            .then((data) => {
                setBoard(data[0]);
            })
            .catch((error) => {
                console.error('게시글 로드 중 오류 발생:', error);
            });
    }, [boardId]);

    

    const { title, nickname, content, category } = board;

    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard((prevBoard) => ({
            ...prevBoard,
            [name]: value,
        }));
    };

    const saveBoard = () => {
        console.log(board);
    
        // nickname 속성 제거
        const { nickname, ...boardWithoutNickname } = board;
    
        // 글 수정을 위한 API 호출
        fetch(`http://localhost:3001/post/update/${boardId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boardWithoutNickname),
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.data === 'ok') {
                alert('게시물이 수정되었습니다.');
                navigate('/board');
            } else {
                alert('실패!');
            }
        });
    };

    const backToList = () => {
        navigate('/board');
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>
                <span className={styles.jmok}>제목: </span>
                <input type="text" name="title" value={title} onChange={onChange} />
                <label>카테고리:</label>
                <select name="category" value={category} onChange={onChange}>
                    <option value="a">free</option>
                    <option value="b">interview</option>
                    <option value="c">job</option>
                </select>
            </div>
            <div className={styles.writerInfo}>
                <span>작성자:</span>
                <span>{nickname}</span>
            </div>
            <div className={styles.content}>
                <span>내용</span>
                <textarea
                    name="content"
                    cols="30"
                    rows="10"
                    value={content}
                    onChange={onChange}
                ></textarea>
            </div>
            <div className={styles.last}>
                <button className={styles.saveButton} onClick={saveBoard}>
                    수정
                </button>
                <button className={styles.cancelButton} onClick={backToList}>
                    취소
                </button>
            </div>
        </div>
    );
}