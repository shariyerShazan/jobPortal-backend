import express from 'express'
import {login , register , updateProfile , logout} from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthentication.js'

const router = express.Router()

router.route('/register',).post(register)
router.route('/login',).get(login)
router.route('logout').get(isAuthenticated , logout)
router.route('/updateProfile',).put(isAuthenticated ,updateProfile)

export default router;