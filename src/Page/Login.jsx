
import React, { useState, useContext } from 'react';
import styles from './Login.module.css'
import { LoginModeContext } from '../context/LoginModeContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const {login} = useContext(LoginModeContext);

    const [ident, setIdent] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();


    return (
        <div className={styles.container}>    
            <div className={styles.center}>
                <h1><Link to='/'>VI</Link></h1>
                <div className={styles.form}>
                    <div className={styles.txt_field}>
                        <input className="login" type="text" name="username"  
                            onChange={event => {setIdent(event.target.value)
                        }}/>
                        <label htmlFor="uname">Username</label>
                        <span></span>
                    </div>
                    <div className={styles.txt_field}>
                        <input className="login" type="password" name="pwd"  onChange={event => {
                         setPwd(event.target.value);}}/>
                        <span></span>
                        <label htmlFor="psw">Password</label>
                    </div>
                    <div className={styles.pass}>Forgot Password?</div>
                    <input className="btn" type="submit" value="로그인" onClick={() => {
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
                                    fetch(`http://localhost:3001/get_id/${userData.ident}`)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        localStorage.setItem('id',data[0].id);
                                    })
                                    .catch((error) => console.log(error));
                                    localStorage.setItem('ident',userData.ident);
                                    login();
                                    navigate("/");
                            }
                            else {
                                alert("로그인 정보가 일치하지 않습니다.");
                            }
                            });
                     }}/>
                    <div className={styles.signup_link}>Not a member? <Link to="/signup">Signup</Link></div>
                </div>
            </div>
        </div>
    );
        };