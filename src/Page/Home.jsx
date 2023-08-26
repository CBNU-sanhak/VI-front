import React, { useContext } from 'react';
import Header from '../component/header/Header';
import { LoginModeContext } from '../context/LoginModeContext';

export default function Home() {
    const {login} = useContext(LoginModeContext);
    const handleSession = () => {
        localStorage.setItem('id',"cys9813");
        localStorage.setItem('token',12345);
        login();
    }
    return (
        <div className='main_content'>
            <button onClick={handleSession}>로그인(local실험)</button>
        </div>
    );
}

