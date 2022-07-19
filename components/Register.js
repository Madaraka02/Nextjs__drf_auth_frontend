import { Router, useRouter } from 'next/router'
import React, { useState } from 'react'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')


    const router = useRouter()

    const register = async (e) =>{
        e.preventDefault();

        await fetch('url',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username,
                email,
                password
            })
        });
        await router.push('/')
    }
    
    const register = async (e) => {
        e.preventDefault();

        await axios.post('',{
            headers:{
                'Accept':'application/json',
                'COntent-Type':'application/json'
            },
            body:JSON.stringify({
                username,
                email,
                password,
            })
        })
    }


  return (
    <div>Register</div>
  )
}

export default Register