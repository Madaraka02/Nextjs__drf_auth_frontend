import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../styles/Register.module.css'
import { useRouter } from 'next/router';
import AuthenticationContext from '../../context/AuthenticationContext';
import Link from 'next/link';



function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [password2, setPassword2] = useState('')

  
    const router = useRouter()
  
    const register = async(e) =>{
        e.preventDefault();
        await fetch('http://127.0.0.1:8000/api/v1/auth/signup/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username,
                email,
                password
            })
        })
        .then(res=>res.json()).then(response=>{
            setUsername('')
            setEmail('')
            setPassword('')
            router.push('/accounts/login')
  
  
        }).catch(error=>console.log(error))
    }
  
    const {login} = useContext(AuthenticationContext)
    const apiUrl = 'http://127.0.0.1:8000/api/v1'
  
    const submitHand = async (e) =>{
      e.preventDefault();
      console.log(username)
      console.log(email)
  
      const options = {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers:{
              'Content-Type':'application/json',
  
          }
  
      }
      fetch(`${apiUrl}/auth/signup/`, options).
      then(res=>res.json()).then(response=> {
          setUsername('')
          setEmail('')
          setPassword('')
        //   setSubmitted(true)
        //   router.push('/accounts/login')
        login({ username, password })

  
      }).catch(error=>console.log(error))
    }

    const {signup} = useContext(AuthenticationContext)

    const submitHandler = (e) => {
        e.preventDefault();
        if(password != password2){
            signup({username, email, password})
        }
    }


  return (
    <div className="container mt-4 mb-4">
        <div className="row mt-4 mb-4 align-items-center">
            <div className="col-md-3 mt-4 mb-4" ></div>
            <div className="col-md-6 mt-4 mb-4 shadow-lg">



        <form className="text-center border border-light p-5" 
        onSubmit={submitHand}>

          <p className="h4 mb-4">Sign up</p>

          <div className="form-row mb-4">
            <div className="col">

              <input type="text" className="form-control" placeholder="Enter username"
              onChange={e => setUsername(e.target.value)}
              value={username}/>
            </div>
          </div>


          <input type="email" className="form-control mb-4" placeholder="Enter email"
          onChange={e => setEmail(e.target.value)}
          value={email}/>

          <input type="password"  className="form-control" placeholder=" Create Password" 
          onChange={e => setPassword(e.target.value)}
          value={password}/>
        
        {/* <input type="password"  className="form-control mt-4" placeholder=" Confirm Password" 
          onChange={e => setPassword2(e.target.value)}
          value={password2}/> */}


          <button className="btn btn-info my-4 btn-block waves-effect waves-light" type="submit">Sign up</button>
          <Link href="/accounts/login">
        
        <p>Already have an account? <a href="/accounts/login">Sign in</a></p>
      </Link>



        </form>
     </div>
<div className="col-md-3 mt-4 mb-4" ></div>
 </div>
</div>

  )
}

export default Register