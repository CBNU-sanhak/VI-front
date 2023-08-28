import React, {useState} from 'react';
import "./Basic.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const [ident, setIdent] = useState("");
    const [pwd, setPwd] = useState("");

    const navigate = useNavigate();


    return (    
        <>
        <h2>로그인</h2>
        <div className="form">
          <p><input className="login" type="text" name="username" placeholder="아이디" onChange={event => {
            setIdent(event.target.value);
            }}/></p>
          <p><input className="login" type="password" name="pwd" placeholder="비밀번호" onChange={event => {
            setPwd(event.target.value);}}/></p>      
            <p> <input className="btn" type="submit" value="로그인" onClick={() => {
              const userData = {
                  ident: ident,
                  pwd: pwd,
                };
                fetch("http://localhost:3001/login", {
                  method: "post",
                  headers: {
                    "content-type" : "application/json",
                  },
                  body: JSON.stringify(userData),
                }).then((res) => res.json())
                .then((json) => {
                  if(json.data ==="err"){
                    alert("에러 발생 잠시후 이용해 주세요");
                  }
                 else if(json.data === "true"){
                        alert("로그인 성공");
                        navigate("/");
                  }
                  else {
                    alert("로그인 정보가 일치하지 않습니다.");
                  }
                });
            }}/></p>
        </div>
      
        <p>계정이 없으신가요? <button onClick={() => {
          navigate("/signup");
        }}>회원가입</button></p>
        
        </>
    );
}

