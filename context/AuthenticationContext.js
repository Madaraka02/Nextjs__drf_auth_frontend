import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthenticationContext = createContext()

export const AuthenticationProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [error, setError] = useState(null)


    const router = useRouter()
    // PERSIST USER
    // check if user is logged in and has valid token if true keep them logged in
    // useEffect(() => {checkLoggedIn() },[])

    // login useer
    
    const login = async ({username, password}) => {
        const config = {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        }
        const body ={
            username,
            password
        }
        try{
            const {data:accessResponse} = await axios.post('http://localhost:3000/api/login',body, config)
            // console.log(data)
            if(accessResponse && accessResponse.user){
                setUser(accessResponse.user)
    
            }
            if(accessResponse && accessResponse.access){
                setAccessToken(accessResponse.access)
    
            }
            router.push('/')

        }catch(error){
            if (error.response && error.response.data) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message)
                return

              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                setError('Something went wrong')
                return

              } else {
                // Something happened in setting up the request that triggered an Error
                setError('Something went wrong')
                return
              }
              console.log('Error',error.message);
              setError('Something went wrong')
              return




        }




    }

    const signup = async ({ username, email, password }) =>{
        const config = {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        }
        const body ={
            username,
            email,
            password
        }
        try{
            await axios.post('http://localhost:3000/api/register',body, config)
            // console.log(data)
            login({username, password})

        }catch(error){
            if (error.response && error.response.data) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message)
                return

              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                setError('Something went wrong')
                return

              } else {
                // Something happened in setting up the request that triggered an Error
                setError('Something went wrong')
                return
              }
              console.log('Error',error.message);
              setError('Something went wrong')
              return
            }

    }

    const logout = async () =>{
        try{
            // remove httponly cookie
            await axios.post('http://localhost:3000/api/logout')
            // remove access token and user to null
            setUser(null),
            setAccessToken(null)

        }catch(error){
            if (error.response && error.response.data) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message)
                return

              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                setError('Something went wrong')
                return

              } else {
                // Something happened in setting up the request that triggered an Error
                setError('Something went wrong')
                return
              }
              console.log('Error',error.message);
              setError('Something went wrong')
              return




        }

    }
    
    const checkLoggedIn = async () =>{
        // api request to api/user
        // check for access token
        // request user data from backend
        // if valid data setUser and access  token in state
        try{
            // remove httponly cookie
            const { data } = await axios.post('http://localhost:3000/api/user')
            // remove access token and user to null
            setUser(data.user),
            setAccessToken(data.access)

        }catch(error){
            if (error.response && error.response.data) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message)
                return

              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                setError('Something went wrong')
                return

              } else {
                // Something happened in setting up the request that triggered an Error
                setError('Something went wrong')
                return
              }
              console.log('Error',error.message);
              setError('Something went wrong')
              return




        }


    }
    return (
        <AuthenticationContext.Provider value={{ user, accessToken, error, login, signup, logout, checkLoggedIn}}>
            {children}
        </AuthenticationContext.Provider>
    )

}

export default AuthenticationContext