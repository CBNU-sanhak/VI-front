import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function WriteBoard() {
    const navigate = useNavigate();
    const id = localStorage.getItem('id');
  
    const [board, setBoard] = useState({
      title: '',
      createdBy: id,
      createdAt: '',
      contents: '',
      img:null
    });

    const [imagePreview, setImagePreview] = useState(null);


  
    const { title, createdBy, contents } = board; //비구조화 할당
  
    const onChange = (event) => {
      const { value, name } = event.target; //event.target에서 name과 value만 가져오기
      
      console.log(name, value)
      setBoard({
        ...board,
        [name]: value,
      });
    };
  
    const saveBoard = async () => {
        let today = new Date();
        const createdAt = today.toLocaleString();
        
        setBoard({
            ...board,
            createdAt: createdAt,
          });
    //   await axios.post(`//localhost:8080/board`, board).then((res) => {
    //     alert('등록되었습니다.');
    //     
    //   });
        navigate('/board');
    };

   
    const backToList = () => {
      navigate('/board');
    };
  

    const handleImageChange = (e) => {
        const selectedImage =e.target.files[0];
        setBoard({
            ...board,
            img: selectedImage,
          });
          if(selectedImage!==null){
              const imageURL = URL.createObjectURL(selectedImage);
              setImagePreview(imageURL);
          }
      };

      const clearImage = () => {
        setBoard({
          ...board,
          img: null,
        });
        setImagePreview(null);
      };
  


    return (
      <div>
        <div>
          <span>제목</span>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <br />
        <div>
          <span>작성자:</span>
          <span>{board.createdBy}</span>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
            {board.img!==null?<button onClick={clearImage}>X</button>:""}
        </div>
        <div>
          <div>내용</div>
          <textarea
            name="contents"
            cols="30"
            rows="10"
            value={contents}
            onChange={onChange}
          ></textarea>
        </div>
        <div>
          <button onClick={saveBoard}>저장</button>
          <button onClick={backToList}>취소</button>
        </div>
      </div>
    );
}

