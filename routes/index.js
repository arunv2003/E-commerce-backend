const express=require('express')
const register = require('../controller/user/userSignup')
const login = require('../controller/user/UserSignin')
const userDetail = require('../controller/user/userDetail')
const checkToken = require('../middleware/checkToken')
const userLogout = require('../controller/user/userLogOut')
const allUser = require('../controller/user/allUser')
const updateUser = require('../controller/user/updateUser')

const uploadProducts = require('../controller/product/uploadProducts')
const getProducts = require('../controller/product/getProducts')
const updateProducts = require('../controller/product/updateProducts')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetail = require('../controller/product/getProductDetail')
const addToCart = require('../controller/user/addToCart')
const countAddToCartProduct = require('../controller/user/countAddtoCart')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProduct = require('../controller/product/filterProduct')
const forgotPassword = require('../controller/user/forgotPassword')
const resetPassword = require('../controller/user/resetPassword')
const resetSubmitPassword = require('../controller/user/resetSubmitPassword')

const router=express.Router()


router.post('/register',register)
router.post('/login',login)
router.get('/userDetails',checkToken,userDetail)
router.get('/logout',userLogout)


//adminPanel 
router.get('/allUser',checkToken,allUser)
router.post('/userUpdate',checkToken,updateUser)


//upload product

router.post('/productsUpload',checkToken,uploadProducts)
router.get('/getProducts',getProducts)
router.post('/updateProducts',checkToken,updateProducts)
router.get('/get-categoryProduct',getCategoryProduct)
router.post('/category-product',getCategoryWiseProduct)
router.post('/productDetail',getProductDetail)
router.post('/filterProduct',filterProduct)


//cart 
router.post('/addToCart',checkToken,addToCart)
router.get('/countGet',checkToken,countAddToCartProduct)
router.get('/viewCartProduct',checkToken,addToCartViewProduct)
router.post('/updateCartProduct',checkToken,updateAddToCartProduct)
router.post('/delete-item',checkToken,deleteCartProduct)

// search

router.get('/search',searchProduct)




//forgotPassword
router.post('/forgotPassword',forgotPassword)
router.get('/randomToken/:token',resetPassword)
router.post('/randomToken/:token',resetSubmitPassword)

module.exports =router