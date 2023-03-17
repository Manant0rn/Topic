import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import {getToken } from "../components/services/authorize";

const EditComponent =(props)=> {
    const [state,setState] = useState({
        title:"",
        // content:"",
        author:"",
        slug:""
    })
    // const {title,content,author,slug} = state;
    const {title,author,slug} = state;

    const [content,setContent] = useState('')

    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(res =>{
            const{title,content,author,slug} = res.data
            // setState({...state,title,content,author,slug})
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err =>alert(err))
        // eslint-disable-next-line
    },[])

    const showUpdateForm=() => (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control"  
                value={title} 
                onChange={inputValue("title")}
                />
            </div>
            <div className="form-group">
                <label>รายละเอียด</label>
                {/* <textarea className="form-control" 
                value={content}
                onChange={inputValue("content")}></textarea> */}
                <ReactQuill
                    value={content}
                    onChange={submitContent}
                    theme="snow"
                    className="pb-5 mb-3"
                    style={{border:'1px solid #666'}}
                />
            </div>
            <div className="form-group">
                <label>ผู้แต่ง</label>
                <input type="text" className="form-control" 
                value={author}
                onChange={inputValue("author")}
                />
            </div>
            <br/>
            <input type="submit" className="btn btn-primary" value="อัพเดต" />
        </form>
    )

    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value})
    }

    const submitContent=(e)=>{
        setContent(e)
    }

    const submitForm=(e)=>{
        //เมื่อกดแล้วจะยังไม่ให้เคลียร์ค่า
        e.preventDefault();
        // console.table({title,content,author})
        console.log("API = ",process.env.REACT_APP_API)
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
        {
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        })
        .then(res=>{
            Swal.fire('แจ้งเตือน','อัพเดตข้อมูลบทความสำเร็จ','success')
            const {title,content,author,slug} = res.data
            // setState({...state,title,content,author,slug})
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>{
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

    return (
      <div className="container p-5">
        <NavbarComponent/>
        <h1>แก้ไขบทความ</h1>
        {showUpdateForm()}
        {/* ไว้เช็คค่า */}
        {/* {JSON.stringify(state)} */}
        <form onSubmit={submitForm}>
        </form>
      </div>
    )
}

export default EditComponent;