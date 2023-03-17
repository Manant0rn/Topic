import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getUser,getToken } from "./services/authorize";

const FormComponent =(props)=> {
    const [state,setState] = useState({
        title:"",
        // content:"",
        author:getUser()
    })

    const [content,setContent] = useState('')
    // const {title,content,author} = state;
    const {title,author} = state;
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value})
    }
    
    const submitContent=(e)=>{
        setContent(e)
    }

    useEffect(()=>{
        !getUser() && props.history.push("/")
    },[])

    const submitForm=(e)=>{
        //เมื่อกดแล้วจะยังไม่ให้เคลียร์ค่า
        e.preventDefault();
        // console.table({title,content,author})
        console.log("API = ",process.env.REACT_APP_API)
        axios.post(`${process.env.REACT_APP_API}/create`,{title,content,author},
        {
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        })
        .then(res=>{
            Swal.fire(
                //หัวข้อ
                'แจ้งเตือน',
                //เนื้อหา
                'บันทึกข้อมูลบทความสำเร็จ',
                //ประเภท
                'success'
            )
            // setState({...state,title:"",content:"",author:""})
            setState({...state,title:"",author:""})
            setContent("")
        })
        .catch(err=>{
            Swal.fire(
                //หัวข้อ
                'แจ้งเตือน',
                //เนื้อหา
                err.response.data.error,
                //ประเภท
                'error'
            )
        })
    }
    return (
      <div className="container p-5">
        <NavbarComponent/>
        <h1>เขียนบทความ</h1>
        {/* ไว้เช็คค่า */}
        {/* {JSON.stringify(state)} */}
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
                    placeholder="เขียนรายละเอียดบทความของคุณ"
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
            <input type="submit" className="btn btn-primary" value="บันทึก" />
        </form>
      </div>
    )
}

export default FormComponent;