import { Router } from 'express'
import { searchByUsername, signIn, signUp, updateContent } from '../controllers/user.controller.js'
import JWTVerify from '../middlewares/auth.middleware.js'
const router = Router()

router.route('/n/signup').post(signUp)
router.route('/n/signin').post(signIn)
router.route('/u/details').patch(JWTVerify,updateContent)
router.route('/s/search').get(JWTVerify,searchByUsername)

export default router
