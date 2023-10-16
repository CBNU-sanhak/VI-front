import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css'
import { LoginModeContext } from '../context/LoginModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye, faPenNib } from '@fortawesome/free-solid-svg-icons';


export default function Mypage() {
    const id = localStorage.getItem('id');
    const [myInfo,setMyInfo]  = useState({});
    const {myInterviewResult,setMyInterviewResult} = useState({});
    const {myStudygroup, setMyStudygroup} = useState({});
    const [myComment, setMyComment] = useState([]);
    const [myPost, setMyPost] = useState([]);
    const {logout} = useContext(LoginModeContext);
    const navigation = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewURL(url);
            setMyInfo((prevInfo) => ({
                ...prevInfo,
                image_url: url,
            }));
        }
    };

    const openFileInput = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const options = {
                method: 'POST',
                body: formData,
              };

             const imageUrl = await fetch('http://localhost:3001/image', options)
             .then(response => response.json())
             .then((json) =>json.data);

            const updateProfileRequest = await fetch(`http://localhost:3001/customer/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    image_url: imageUrl
                })
            });

            const updateData = await updateProfileRequest.json();

            if (updateData.data === 'ok') {
                alert('프로필이 수정되었습니다.');
            }
            //  .then(json => {
            //     if (json.data==='ok') {
            //         alert("프로필이 수정되었습니다..");
            //  }})
        }
    };

    useEffect(() => {
        const getData =  async() =>{
            const id = localStorage.getItem('id');

            //내정보 불러오기 (아이디, 이메일 등)
            await fetch(`http://localhost:3001/customer/${id}`)
            .then((response) => response.json())
                    .then((data) => {
                        setMyInfo(data[0]);
                    })
                    .catch((error) => console.log(error))
            

            //나의 면접 결과
            // await fetch(`http://localhost:3001/result/get_result/${id}`)
            // .then((response) => response.json())
            //         .then((data) => {
            //             console.log(data);
            //         })
            //         .catch((error) => console.log(error))
            
            //나늬  스터디 그룹 불러오기(api 없음)
            // await fetch(`http://localhost:3001/customer/${id}`)
            // .then((response) => response.json())
            //         .then((data) => {
            //             console.log(data);
            //         })
            //         .catch((error) => console.log(error))

        

            //내가 쓴 댓글
            await fetch(`http://localhost:3001/comments/writer/${id}`)
            .then((response) => response.json())
                    .then((data) => {
                        if(data !=="err"){
                            setMyComment(data);
                        }
                    })
                    .catch((error) => console.log(error))
            
            //내가 쓴 포스트
            await fetch(`http://localhost:3001/post/get_post/${id}`)
            .then((response) => response.json())
                    .then((data) => {
                        if(data !=="err"){
                            setMyPost(data);
                        }
                    })
                    .catch((error) => console.log(error))
        }
        getData();
    }, [])


    //특정 고객의 모든 면접 결과 불러오기api, studygroup 불러오기

    const onLogoutButtonClick = () => {
        logout();
        navigation('/');
    }

    //게시글 삭제
    const onClickDeletePost = async(id) => {
        try {
            const response = await fetch(`http://localhost:3001/post/delete/${id}`, {
                method: 'delete',
            });
            const json = await response.json();
            if (json.data === 'err') {
                alert('에러 발생 잠시후 이용해 주세요');
            } else if (json.data === 'ok') {
                setMyPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
                alert('삭제 되었습니다.');
            }
        } catch (error) {
            console.error('댓글 삭제 중 오류가 발생했습니다:', error);
        }
    }


    //댓글 삭제
    const onClickDeleteComment = async(commentId) => {
        try {
            const response = await fetch(`http://localhost:3001/comments/delete/${commentId}`, {
                method: 'delete',
            });
            const json = await response.json();
            if (json.data === 'err') {
                alert('에러 발생 잠시후 이용해 주세요');
            } else if (json.data === 'ok') {
                setMyComment((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
                alert('삭제 되었습니다.');
            }
        } catch (error) {
            console.error('댓글 삭제 중 오류가 발생했습니다:', error);
        }
    }



    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <h1 className={styles.title}>My Page</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.myProfile}>
                    {myInfo.image_url === null ? (
                        <img src={"/img/profile.png"} alt="profile" />
                        ) : (
                            <img src={myInfo.image_url} alt="profile" />
                    )}
                     <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        name='file'
                        onChange={handleFileSelect}
                    />
                    <button className={styles.button} onClick={openFileInput}>
                        이미지 선택
                    </button>
                    <button className={styles.button} onClick={handleImageUpload}>
                        수정
                    </button>
                    <h3>{myInfo.ident}</h3>
                    <p><span>{myInfo.nickName}</span></p>
                    <p>{myInfo.email}</p>
                    <div>
                        <button onClick={onLogoutButtonClick}>로그아웃</button>
                    </div>
                </div>
                <div className={styles.myActives}>
                    <a href={`http://localhost:3001/mypage/${id}`}className={styles.goToMyInterview}>
                        <h3>나의 면접결과 보러가기</h3><FontAwesomeIcon icon={faEye} />
                    </a>
                    <div className={styles.forScroll}>
                        <div  className={styles.myActive}>
                            <div>
                                <h3>내가쓴 게시글 <FontAwesomeIcon icon={faPenNib} /></h3>
                            </div>
                            {myPost.map((item)=> {
                                return (
                                <div className={styles.itembox} key={item.id}>
                                    <Link to={'/board/'+item.id}>{item.title}</Link>
                                    <div className={styles.updateAndDelete}>
                                        <Link to={'/board/update/'+item.id}><button className={styles.updateButton}> 수정</button></Link>
                                        <button className={styles.deleteButton} onClick={()=>onClickDeletePost(item.id)}> 삭제 </button>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div> 
                    <div  className={styles.myActive}>
                        <h3>내가 쓴 댓글 <FontAwesomeIcon icon={faComment} /></h3>
                        <div className={styles.forScroll}>
                            {myComment.map((item)=> {
                                return (
                                <div className={styles.itembox} key={item.id}>
                                    <Link to={'/board/'+item.p_no}>{item.content}</Link>
                                    <button className={styles.deleteButton} onClick={()=>onClickDeleteComment(item.id)}> 삭제 </button>
                                </div>)
                            })} 
                        </div>
                    </div> 
                </div>
                        
            </div>
        </div>
    );
}

