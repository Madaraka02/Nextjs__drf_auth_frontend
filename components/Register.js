import { Router, useRouter } from 'next/router'
import React, { useState } from 'react'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const register = async (e) =>{
        e.preventDefault();

        await fetch('url',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        });
        await router.push('/')
    }
    
    // const register = async (e) => {
    //     e.preventDefault();

    //     await axios.post('',{
    //         headers:{
    //             'Accept':'application/json',
    //             'COntent-Type':'application/json'
    //         },
    //         body:JSON.stringify({
    //             name,
    //             email,
    //             password,
    //         })
    //     })
    // }


  return (
    <div>Register</div>
  )
}

export default Register