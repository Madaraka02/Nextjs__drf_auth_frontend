import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/router';
import AuthenticationContext from '../../context/AuthenticationContext';
import Link from 'next/link';


function login() {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const apiUrl = 'http://127.0.0.1:8000/api/v1'
  
    const submitHand = async (e) =>{
      e.preventDefault();
      console.log(username)
    //   console.log(email)
  
      const options = {
          method: "POST",
          body: JSON.stringify({
            username,
            password
          }),
          headers:{
              'Content-Type':'application/json',
  
          }
  
      }
      fetch(`${apiUrl}/auth/token/`, options).
      then(res=>res.json()).then(response=> {
            console.log(response)
          setUsername('')
        //   setEmail('')
          setPassword('')
        //   setSubmitted(true)
          router.push('/')
  
      }).catch(error=>console.log(error))
    }
    const {login, error} = useContext(AuthenticationContext)

    const submitHandler = (e) =>{
        e.preventDefault();
        login({ username, password })
    }

  return (
    <div className="container mt-4 mb-4">
    <div className="row mt-4 mb-4 align-items-center">
        <div className="col-md-3 mt-4 mb-4" ></div>
        <div className="col-md-6 mt-4 mb-4 shadow-lg">



    <form className="text-center border border-light p-5" onSubmit={submitHandler}>

      <p className="h4 mb-4">Sign in</p>


      <input type="text" className="form-control mb-4" placeholder="Enter username"
      onChange={e => setUsername(e.target.value)}
      value={username}/>

      <input type="password"  className="form-control" placeholder=" Create Password" 
      onChange={e => setPassword(e.target.value)}
      value={password}/>


      <button className="btn btn-info my-4 btn-block waves-effect waves-light" type="submit">Sign in</button>

      <Link href="/accounts/register">
        <p>Doesn't have an account? <a href="/accounts/register"> Sign up</a></p>
        
      </Link>



    </form>
 </div>
<div className="col-md-3 mt-4 mb-4" ></div>
</div>
</div>
  )
}

export default login