import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import HtmlToReact from "html-to-react"


const SingleComponent =(props)=> {

  const parser = new HtmlToReact.Parser()
  
  const [blog,setBlog] = useState('')
  useEffect(() =>{
    axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
    .then(res =>{
      setBlog(res.data)
    })
    .catch(err =>alert(err))
    // eslint-disable-next-line
  },[])

  return (
    <div className="container p-5">
      <NavbarComponent/>
      {/* <h1>{blog.title}</h1> */}
      {/* <p>{blog.content}</p> */}
      {/* <div className="pt-3">{parser.parse(blog.content)}</div> */}
      {/* <p className="text-muted">ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p> */}
      {blog && 
        <div>
          <h1>{blog.title}</h1>
          {/* <p>{blog.content}</p> */}
          <div className="pt-3">{parser.parse(blog.content)}</div>
          <p className="text-muted">ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
        </div>
      }
    </div>
  )
}

export default SingleComponent;