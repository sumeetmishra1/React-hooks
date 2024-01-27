import React, { useEffect, useState } from "react";

const AuthContext=React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:(email,password)=>{}
});
export const AuthContextProvider=(props)=>{
    const [isLoggedIn,setLoggedIn] = useState(false);
    useEffect(()=>{
        const userLoggedInStatus=localStorage.getItem('isLoggedIn');
        if(userLoggedInStatus==='1'){
            setLoggedIn(true)
        }
    })
    const logoutHandler = () =>{
        localStorage.setItem('isLoggedIn','0')
        setLoggedIn(false);
    }
    const loginHandler =()=>{
        localStorage.setItem('isLoggedIn','1')
        setLoggedIn(true);
    }
    return <AuthContext.Provider value={{isLoggedIn:isLoggedIn,onLogout:logoutHandler,onLogin:loginHandler}}>{props.children}</AuthContext.Provider>

}
export default AuthContext;