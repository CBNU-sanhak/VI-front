import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WriteBoard.module.css'

export default function WriteBoard() {
    const navigate = useNavigate();
    const ident = localStorage.getItem('ident');


    //title, writer, content, category, p_date
  
    const [board, setBoard] = useState({
      writer: localStorage.getItem('id'),
      title: '',
      content: '',
      category: 'a',
      //img:null
    });

    const [imagePreview, setImagePreview] = useState(null)
    const { title, writer, content, category } = board; //비구조화 할당
  
    const onChange = (event) => {
      const { value, name } = event.target; //event.target에서 name과 value만 가져오기
      
      setBoard((prevBoard) => ({
        ...prevBoard,
        [name]: value,
      }));
    };
  

    //게시글 저장 기능
    const saveBoard = async () => {

          await fetch("http://localhost:3001/post/insert", {
            method: "post",
            headers: {
                "content-type" : "application/json",
            },
            body: JSON.stringify(board)
            }).then((res) => res.json()).then((json) => {
                if(json.data === "ok"){
                    alert("게시물이 등록되었습니다.!");
                    navigate('/board');
                } else{
                    alert("실패!");
                }
        });

        
    };

   
    const backToList = () => {
      navigate('/board');
    };
  

    // const handleImageChange = (e) => {
    //     const selectedImage =e.target.files[0];
    //     setBoard({
    //         ...board,
    //         img: selectedImage,
    //       });
    //       if(selectedImage!==null){
    //           const imageURL = URL.createObjectURL(selectedImage);
    //           setImagePreview(imageURL);
    //       }
    //   };

    //   const clearImage = () => {
    //     setBoard({
    //       ...board,
    //       img: null,
    //     });
    //     setImagePreview(null);
    //   };

  


    return (
      <div className={styles.content}>
        <div className={styles.title}>
          <span >제목: </span>
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
          <span>{ident}</span>
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
          <button className={styles.saveButton}onClick={saveBoard}>저장</button>
          <button className={styles.cancelButton}onClick={backToList}>취소</button>
        </div>
      </div>
    );
}

