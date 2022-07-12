import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    
    const router = useRouter()
    
    // logout onclick
    const logout = async () => {
        await fetch('url',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include', 
        })
        await router.push('/')


    }


    // get logged in user
    useEffect(() => {
        async () => {
            try{
            const response = await fetch('url',{
                method:'GET',
                credentials:'include'
            })

            const content = await response.json()
            setMessage('Welcome ${content.name}')
        }catch(e){
            setMessage('Youre not authenticated')
        }
        }
    })

    const login = async (e) =>{
        e.preventDefault();

        await fetch('url',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',  
            // get and store cookie
            body:JSON.stringify({
                email,
                password
            })
        });
        await router.push('/')
    }

    // const login = async (e) =>{
    //     e.preventDefault(),
    //     // http://127.0.0.1:8000/blogs/
    //     await axios.post('http://127.0.0.1:8000/api/v1/login',{
    //         headers:{
    //             'Content-Type':'application/json',
    //             'Accept':'application/json'
    //         },
    //         body: JSON.stringify({
    //             email,
    //             password,
    //         })
    //     })
    // }
  return (
    <div>Login
        {/* onchange=(e => setName(e.target.value)) */}
    </div>
  )
}

export default Login