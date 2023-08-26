import React, { useState } from 'react';
import styles from './Login.module.css'
import { Link } from 'react-router-dom';

export default function Signup() {


    const [email, setemail] = useState("");
    const [isValue, setValue] = useState(false);
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    
    const emailCheck = (username) => {
        return emailRegEx.test(username); //형식에 맞을 경우, true 리턴
      }
    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <h1><Link to='/'>LOGO</Link></h1>
                <form>
                    <div className={styles.txt_field}>
                        <input name='name' type ="text" required></input>
                        <span></span>
                        <label htmlFor='name'>이름</label>
                    </div>
                    <div className={styles.txt_field}>
                        <input name='useid' type ="text" required></input>
                        <span></span>
                        <label htmlFor='useid'>닉네임</label>
                    </div>
                    <div className={styles.txt_field}>
                        <input name='password' type ="password" required></input>
                        <span></span>
                        <label htmlFor='password'>비밀번호</label>
                    </div>
                    <div className={`${styles.txt_field} ${(!isValue&&email!=="")?styles.invalue:''}`} >
                        <input 
                             onChange={(e)=>{
                            setemail(e.target.value); 
                            setValue(emailCheck(e.target.value));
                            }} 
                            name='useremail' 
                            type ="email" 
                            required    
                         >
                            </input>
                        <span></span>
                        <label className={styles.email}htmlFor='email'>email</label>
                    </div>
                    <input type='submit' value="회원가입"></input>
                </form>
            </div>

        </div>
    );
}

