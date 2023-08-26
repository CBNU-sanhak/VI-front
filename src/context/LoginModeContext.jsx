import React, { createContext, useState } from 'react';

const userId = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');

export const LoginModeContext = createContext(userId !==null && token !==null? true: false);

export function LoginModeProvider({children}) {

    const [isLogin, setIsLogin] = useState(userId !== null && token !==null ? true : false);


    const login = () => setIsLogin(true); 
    const logout = () => setIsLogin(false); 
    
    return <LoginModeContext.Provider value={{isLogin, login, logout}}>{children}</LoginModeContext.Provider>;
}


