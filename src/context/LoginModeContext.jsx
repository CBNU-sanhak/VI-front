import React, { createContext, useState } from 'react';

const userId = localStorage.getItem('id');

export const LoginModeContext = createContext(userId !==null ? true: false);

export function LoginModeProvider({children}) {

    const [isLogin, setIsLogin] = useState(userId !== null? true : false);


    const login = () => setIsLogin(true); 
    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('ident');
        localStorage.removeItem('token');
        setIsLogin(false);
    } 
    
    return <LoginModeContext.Provider value={{isLogin, login, logout}}>{children}</LoginModeContext.Provider>;
}


