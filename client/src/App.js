import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import Swal from "sweetalert2"
import HtmlToReact from "html-to-react"
import {getUser,getToken } from "./components/services/authorize";

function App() {

  const parser = new HtmlToReact.Parser()

  const [blogs,setBlogs] = useState([])
  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(res=>{
      setBlogs(res.data)
    })
    .catch(err=>alert(err));
  }
  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบบทความหรือไม่ ?",
      icon:"warning",
      showCancelButton:true
    })
    .then((result) =>{
      //กดปุ่มโอเค
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog=(slug)=>{
    //ส่ง request ไปที่ api
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
    .then(res =>{
      Swal.fire('Deleted!',res.data.message,'success')
      fetchData()
    })
    .catch(err=>{
      console.log(err)
    })
    
  }

  return (
    <div className="container p-5">
      <NavbarComponent/>
      {/* {JSON.stringify(blogs)} */}
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
            <div className="col pt-3 pb-2">
                <Link to={`/blog/${blog.slug}`}>
                  <h2>{blog.title}</h2>
                </Link>
                {/* <p>{blog.content.substring(0,120)}</p> */}
                <div className="pt-3">{parser.parse(blog.content.substring(0,120))}</div>
                <p className="text-muted">ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
                {/* <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
                <button className="btn btn-outline-danger" onClick={()=> confirmDelete(blog.slug)}>ลบบทความ</button> */}
                {getUser() && (
                  <div>
                    <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
                    <button className="btn btn-outline-danger" onClick={()=> confirmDelete(blog.slug)}>ลบบทความ</button>
                  </div>
                )}
            </div>
        </div>
      ))}
    </div>
  );
}

export default App;
