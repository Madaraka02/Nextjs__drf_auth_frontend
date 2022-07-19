import axios from "axios"
import cookie from "cookie"


export default async (req, res) =>{
    if (req.method === 'POST'){
        // destructure username and password from request body 
        if(!req.headers.cookie){
            return res.status(403).json({message:'Not authorized'})
        }
        try{
            const { refresh } = cookie.parse(req.headers.cookie)

            const config = {
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                }
            }

            const body ={
                refresh
            }
            const {data} = await axios.post('http://127.0.0.1:8000/api/v1/auth/token/refresh/',body, config)

            if(data && data.access){
                const userConfig={
                    headers:{
                        'Authorization': 'Bearer ' + data.access
                    }
                }
                const { data:userData } = await axios.post('http://127.0.0.1:8000/api/v1/auth/user/',userConfig)
                res.status(200).json({user:userData, access:data.access})
            }else{
                res.status(500).json({message:'something went wrong'})

            }
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

    }else{
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message:`Method ${req.method}not allowed`})
    }
}