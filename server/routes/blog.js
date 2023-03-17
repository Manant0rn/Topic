const express = require("express")
const router = express.Router()
const {create,getallblog,singleblog,singleid,remove,update} = require("../controllers/blogController")
const {requireLogin} = require("../controllers/authController")

//ฟังก์ชัน เพิ่ม ลบ แก้ไข ต้อง Login
router.post('/create',requireLogin,create)
router.delete('/blog/:slug',requireLogin,remove)
router.put('/blog/:slug',requireLogin,update)

//อ่านบทความ ดูได้ทุกคน
// router.get('/blogs',getallblog)
router.get('/blogs',getallblog)
//ถ้าสร้าง route ตรงกันแต่รับ parameter ต่างกันจะนับแค่ด้านบน ถ้าใช้เป็น const
router.get('/blog/:slug',singleblog)
router.get('/blogid/:id',singleid)



module.exports = router