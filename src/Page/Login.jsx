import React from 'react';
import styles from './Login.module.css'
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className={styles.container}>    
            <div className={styles.center}>
                <h1><Link to='/'>LOGO</Link></h1>
                <form method="post">
                    <div className={styles.txt_field}>
                        <input name="userid" type="text" required />
                        <span></span>
                        <label htmlFor="uname">Username</label>
                    </div>
                    <div className={styles.txt_field}>
                        <input name="userpw" type="password" required />
                        <span></span>
                        <label htmlFor="psw">Password</label>
                    </div>
                    <div className={styles.pass}>Forgot Password?</div>
                    <input type="submit" value="로그인" />
                    <div className={styles.signup_link}>Not a member? <Link to="/signup">Signup</Link></div>
                </form>
            </div>
        </div>
    );
}

