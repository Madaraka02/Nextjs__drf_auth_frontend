import axios from "axios"
import cookie from "cookie"

export default async (req, res) => {
    let accessToken = null;
    
    if (req.method === 'POST'){
        // destructure username and password from request body 
        const {username, email, password} = req.body

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
            await axios.post('http://127.0.0.1:8000/api/v1/auth/signup/',body, config)
        }catch(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
              }
              console.log(error.config);
        }




            res.status(200).json({message:'Account created successfully'})

    }else{
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message:`Method ${req.method}not allowed`})
    }
    
}