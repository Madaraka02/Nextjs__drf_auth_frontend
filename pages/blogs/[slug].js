import axios, { Axios } from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationContext from '../../context/AuthenticationContext';

// import styles from '../../styles/Blog.module.css'


function BlogDetails({blog}) {
  const router = useRouter();
  const[text, setText] = useState('')
  const[commentt, setCommentt] = useState('')

  const {user} = useContext(AuthenticationContext)



  const submitHand = async (e) =>{
    e.preventDefault();
    console.log(user)
    // console.log(blog)
    // console.log(text)


  //   console.log(email)

    const options = {
        method: "POST",
        body: JSON.stringify({
          text,
          author:user.id,
          post:blog.id
        }),
        headers:{
            'Content-Type':'application/json',

        }

    }
    fetch('http://127.0.0.1:8000/api/v1/comments/create/', options).
    then(res=>res.json()).then(response=> {
          console.log(response)
          setText('')

    }).catch(error=>console.log(error))
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    console.log(user)
    // console.log(blog)
    // console.log(text)


  //   console.log(email)

    const options = {
        method: "POST",
        body: JSON.stringify({
          text:commentt,
          author:user.id,
          comment:comment.id
        }),
        headers:{
            'Content-Type':'application/json',

        }

    }
    fetch('http://127.0.0.1:8000/api/v1/replies/create/', options).
    then(res=>res.json()).then(response=> {
          console.log(response)
          setCommentt('')

    }).catch(error=>console.log(error))
  }
  

  return (
    <div>
      <div className="container mt-2 mb-4">
        <div className="row mt-2 mb-2">
          <div className="col-md-2"></div>
          <div className="col-md-8 align-items-center">
            <div className="card mt-2 mb-2 shadow-lg">
              <div className="card-body">
                <h5>{blog.title}</h5>
                <p className="card-text">{blog.description}</p>
                <p><i><small>By {blog.author.username}</small></i></p>
                <p>{blog.likes}</p>
                {/* {blog.likes.map((like) => (
                  

                ))} */}


              </div>
            </div>
            {/* comments */}
            <div className="container mt-2 mb-2">
              <div className="row mt-2 mb-2">
              <div className="col mt-2 mb-2 ">
              { user ? (
              <form onSubmit={submitHand} className="mt-2 mb-2">
              <div className="form-group">
                <label for="exampleInputEmail1">Add comment</label>
                <input type="text" className="form-control" 
                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="comment"
                onChange={(e) => setText(e.target.value)}/>
              </div>
              <button type="submit" className="btn btn-outline-primary mt-2 mb-2">Submit</button>
            </form>
                ) : (
                  <p>Login to comment</p>
      )}


              {blog.comments.map((comment) => (
                <>
                <div className="card shadow-lg mt-2 mb-2">
                  <div className="card-body">
                  <p className="card-text">{comment.text}</p>
                <p><i><small>By {comment.author}</small></i></p>

                  </div>

                 
                </div>
              {/* <div className="container mt-2 mb-2">
              <div className="row mt-2 mb-2">
              <div className="col-md-2 mt-2 mb-2"></div>
              <div className="col-md-2 mt-2 mb-2"></div>
              <div className="col-md-6 mt-2 mb-2">
              { user ? (
              <form onSubmit={submitHandler} className="mt-2 mb-2">
              <div className="form-group">
                <label for="exampleInputEmail1">Reply</label>
                <input type="text" className="form-control" 
                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="comment"
                onChange={(e) => setCommentt(e.target.value)}/>
              </div>
              <button type="submit" className="btn btn-outline-primary mt-2 mb-2">Submit</button>
            </form>
                ) : (
                  <p>Login to reply</p>
                  )}
                {comment.replies.map((reply) => (
                <div className="card shadow-lg mt-2 mb-2">
                  <div className="card-body">
                  <p className="card-text">{reply.text}</p>
                  </div>
                </div>
                ))}
              </div>
              </div>
            </div> */}
            </>
                    ))}
                    </div>

              </div>
            </div>
          </div>
          <div className="col-md-2"></div>

        </div>
      </div>
      {/* BlogDetails */}
    </div>
  )
}
// http://127.0.0.1:8000/api/v1/blogs/blogs/test/
export default BlogDetails

// export const getServerSideProps = async ({ params }) => {
//   const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/blogs/blogs/${params.slug}`);

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   const blog = data;
//   console.log(blog)
//   return {
//     props: {
//       blog,
//     },
//   };
// };
export const getStaticProps = async ({ params }) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/blogs/${params.slug}`);
  const blog = data;

  console.log(blog.author.id)
  return {
    props: {
      blog,
    },
  };
};

export const getStaticPaths = async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/v1/blogs/");
  const blogs = data;
  const paths = blogs.map((blog) => ({ params: { slug: blog.slug.toString() } }));
  return {
    paths,
    fallback: true,
  };
};