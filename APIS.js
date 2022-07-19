const signup = async (e) =>{
    e.preventDefault();

    await fetch('http://127.0.0.1:8000/api/v1/auth/signup/',{
        method:'POST',
        headers:{
            'Accept':'application/json',
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
const signupp = async (e) =>{
    e.preventDefault();
    const options = {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        }),
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',

        }

    }
    await fetch('http://127.0.0.1:8000/api/v1/auth/signup/', options).
    then(res=>res.json()).then(response=> {
        setUsername('')
        setEmail('')
        setPassword('')
        // setSubmitted(true)
        router.push('/')
    }).catch(error=>console.log(error))
}
const apiUrl = 'http://127.0.0.1:8000/api/v1/auth'

const submitHand = async (e) =>{
  e.preventDefault();
  const options = {
      method: "POST",
      body: JSON.stringify({
          username,
          email,
          password
      }),
      headers:{
        'Accept':'application/json',
          'Content-Type':'application/json',

      }

  }
  await fetch(`${apiUrl}/signup/`, options).
  then(res=>res.json()).then(response=> {
      setUsername('')
      setEmail('')
      setPassword('')
    //   setSubmitted(true)
  }).catch(error=>console.log(error))

  // const res = await fetch('http://127.0.0.1:8000/victor/portfolio/api/v1/messages/create/',{
  //     method: 'POST',
  //     headers:{
  //         'Content-Type':'application/json',

  //     },
  //     body: JSON.stringify({
  //         name,
  //         email,
  //         message
  //     })


  // })
}

// REGISTER API

const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

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
        router.push('/')


    }).catch(error=>console.log(error))
}

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
      router.push('/')

  }).catch(error=>console.log(error))
}