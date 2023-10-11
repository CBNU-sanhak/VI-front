import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
      <div className='flex flex-col justify-center w-4/5 rounded-sm bg-blue-50'>
        <div className='flex justify-center'>
          <span className='m-4'>제목</span>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <br />
        <div>
          <span>작성자:</span>
          <span>{ident}</span>
        </div>
        <div>
          <label>Image:</label>
          {/* <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
            {board.img!==null?<button onClick={clearImage}>X</button>:""} */}
        </div>
        <div>
          <div>내용</div>
          <textarea
            name="content"
            cols="30"
            rows="10"
            value={content}
            onChange={onChange}
          ></textarea>
        </div>
        <div>
        <label>카테고리:</label>
        <select name="category" value={category} onChange={onChange}>
          <option value="a">free</option>
          <option value="b">interview</option>
          <option value="c">job</option>
        </select>
      </div>
        <div>
          <button onClick={saveBoard}>저장</button>
          <button onClick={backToList}>취소</button>
        </div>
      </div>
    );
}

