import React, { useState } from 'react';
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';

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
            if(vnum === vnum2) {
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
    return(
        <div className={styles.container}>
            <div className={styles.center}>
            <h1><Link to='/'>LOGO</Link></h1>
            <div>
                    <div className={styles.txt_field}>
                        <input name='name' type ="text" required onChange={handleIdent}></input>
                        <span></span>
                        <label htmlFor='name'>이름</label>
                        <p><button onClick={id_check}>아이디 중복 확인</button></p>
                    </div>
                    <div className={styles.txt_field}>
                        <input name='useid' type ="text" required onChange={handleNick}></input>
                        <span></span>
                        <label htmlFor='useid'>닉네임</label>
                        <p><button onClick={nick_check}>닉네임 중복 확인</button></p>
                    </div>
                    <div className={styles.txt_field}>
                        <input name='password' type ="password" required onChange={handlePassword}></input>
                        <span></span>
                        <label htmlFor='password'>비밀번호</label>
                    </div>
                    <div className={styles.txt_field}>
                        <input name='password' type ="password" required  onChange={handlePassword2}></input>
                        <span></span>
                        <label htmlFor='password'>비밀번호 재입력</label>
                        <p><button onClick={password_check}>비밀번호 확인</button></p>
                    </div>
                    <div className={`${styles.txt_field} ${(!isValue&&email!=="")?styles.invalue:''}`} >
                        <input type="email" onChange={(e) => {
                            setemail(e.target.value);
                            setValue(emailCheck(e.target.value));
                        }}/>
                        <span></span>
                        <label htmlFor='password'>이메일</label>
                        <p><button onClick={handleEmailCheck}>인증메일 전송</button></p>
                    </div>
                    <div className={styles.txt_field} >
                        <input className="login" type="text" onChange={handleVerifyNumber}/>
                        <span></span>
                        <label htmlFor='password'>인증번호 입력</label>
                        <p><button onClick={email_check}>이메일 인증하기</button></p>
                    </div>
                    
                   
                    <input type='submit' value="회원가입" onClick={handleSignin}></input>
                </div>
            </div>
        </div>
    );
    
}

