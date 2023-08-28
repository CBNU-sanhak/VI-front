import React, { useState, useEffect } from 'react';
import './Basic.css';
import { Link, useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

export default function Signup() {


    const [email, setemail] = useState("");
    const [isValue, setValue] = useState(false);
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const [ident, setIdent] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    // 자동생성된 6자리의 인증번호
    const [vnum, setVnum] = useState("");  
    // 고객이 입력한 인증번호
    const [vnum2, setNvum2] = useState("");  
    // 각 단계별 진행상황
    const [progress, setProgress] = useState({
        id: false,
        nickname: false,
        password: false,
        email: false,
    })

    const navigate = useNavigate();

    function handleIdent (e) {
        setIdent(e.target.value);
    }

    function id_check () {
        setProgress((prevState) => {
            return { ...prevState, id: false}
        });
        fetch("http://localhost:3001/id_check", {
            method: "post",
            headers: {
                "content-type" : "application/json",
            },
            body: JSON.stringify({
                ident : ident,
            })
        }).then((res) => res.json()).then((json) => {
            if(json.data === "true"){
                alert("사용가능한 아이디입니다.");
                setProgress((prevState) => {
                    return { ...prevState, id: true}
                });
            } else{
                alert("중복되는 아이디입니다. 다른아이디를 입력해 주세요");
            }
        });
    }
    
    function handleNick(e) {
        setNickname(e.target.value);
    }

    function nick_check () {
        setProgress((prevState) => {
            return { ...prevState, nickname: false}
        });
        if(nickname === ""){
            alert("닉네임을 입력해 주세요");
        } else{
            fetch("http://localhost:3001/nick_check", {
                method: "post",
                headers: {
                    "content-type" : "application/json",
                },
                body: JSON.stringify({
                    nick : nickname,
                })
                }).then((res) => res.json()).then((json) => {
                    if(json.data === "true"){
                        alert("사용가능한 닉네임 입니다.");
                        setProgress((prevState) => {
                            return { ...prevState, nickname: true}
                        });
                    } else{
                        alert("중복되는 닉네임 입니다. 다른 닉네임을 입력해 주세요");
                        setNickname("");
                    }
            });
        }
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    
    function handlePassword2(e) {
        setPassword2(e.target.value);
    }

    function password_check(){
        setProgress((prevState) => {
            return { ...prevState, password: false}
        });
        if(password === ""){
            alert("비밀번호를 입력해 주세요");
        }else{
            if(password !== password2){
                alert("비밀번호가 서로 다릅니다. 다시입력해 주세요");
            } else{
                alert("비밀번호가 일치합니다.");
                setProgress((prevState) => {
                    return { ...prevState, password: true}
                });
            }
        }
    }

    function generate(min, max) {
        let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return randNum;
    }

    function handleEmailCheck() {
        if(!isValue) {
            alert("올바른 이메일을 입력해 주세요");
        } else{
            fetch("http://localhost:3001/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    email: email,
                })
        }).then((result) => result.json()).then((json) => {
            if(json.data === "true"){
                alert("인증메일이 발송되었습니다. 이메일을 확인해 주세요");
                setVnum(json.vnum);
            } else{
                alert("오류가 발생했습니다. 메일 수신이 가능한 이메일을 입력해 주세요");
            }
        })
    }
}

    function handleVerifyNumber(e) {
        setNvum2(e.target.value);
    }

    function email_check() {
        setProgress((prevState) => {
            return { ...prevState, email: false}
        });
        if(vnum === ""){
            console.log(vnum);
            alert("인증메일을 전송해주세요")
        } else{
            if(vnum == vnum2) {
                alert ("인증이 완료되었습니다.");
                setProgress((prevState) => {
                    return { ...prevState, email: true}
                });
            } else{
                alert ("인증번호가 다릅니다.");
            }
        }
    }

    function handleSignin() {
        let result = Object.values(progress);
        console.log(result);
        if(result.includes(false)){
            alert("완료되지 않은 인증이 있습니다.");
        } else{
            fetch("http://localhost:3001/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    ident: ident,
                    password: password,
                    nickname: nickname,
                    email: email
                })
        }).then((res) => res.json()).then((json) => {
            if(json.data === "true"){
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            } else{
                alert("오류가 발생하였습니다. 잠시후 다시 이용해 주세요")
            }
        })
      }
    }

    const emailCheck = (username) => {
        return emailRegEx.test(username); //형식에 맞을 경우, true 리턴
      }
    return (
        <>
    <h2>회원가입</h2>
    <div className="form">
      <p><input className="login" type="text" placeholder="아이디" onChange={handleIdent}/></p>
      <p><button onClick={id_check}>아이디 중복 확인</button></p>
      <p><input className="login" type="text" placeholder="닉네임" onChange={handleNick}/></p>
      <p><button onClick={nick_check}>닉네임 중복 확인</button></p>
      <p><input className="login" type="password" placeholder="비밀번호" onChange={handlePassword}/></p>
      <p><input className="login" type="password" placeholder="비밀번호 재입력" onChange={handlePassword2}/></p>
      <p><button onClick={password_check}>비밀번호 확인</button></p>
      <p><input className="login" type="email" placeholder="이메일" onChange={(e) => {
        setemail(e.target.value);
        setValue(emailCheck(e.target.value));
      }}/></p>
      <p><button onClick={handleEmailCheck}>인증메일 전송</button></p>
      <p><input className="login" type="text" placeholder="인증번호 입력" onChange={handleVerifyNumber}/></p>
      <p><button onClick={email_check}>이메일 인증하기</button></p>
      <p><button onClick={handleSignin}>회원가입</button></p>
    </div>

    <p>메인화면으로 <button onClick={() => { navigate("/");
    }}>메인화면</button></p>
</>
    );
 }
