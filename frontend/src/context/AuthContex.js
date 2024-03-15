import { createContext, useState ,useContext, useEffect} from "react";

const AuthContext=createContext();


const AuthProvider=({children})=>{
       const [auth,setAuth]=useState({
        user:"",
        token:null
       });

      useEffect(()=>{
       const loginUser=JSON.parse(localStorage.getItem("loginUser"));
       if(loginUser)
       {
          setAuth({
            ...auth,
            user:loginUser.user,
            token:loginUser.token
          })
       }

      },[]);


      return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
      )
      

}
//hooke
const useAuth=(()=>useContext(AuthContext));
export  {useAuth,AuthProvider};