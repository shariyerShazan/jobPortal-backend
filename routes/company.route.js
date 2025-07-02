import express from 'express'
import { getCompany, getCompanyById, registerCompnay, updateCompany } from '../controllers/company.controller.js'
import isAuthenticated from '../middlewares/isAuthentication.js'

const router = express.Router()

router.route('/register',).post(isAuthenticated ,registerCompnay)
router.route('/get',).get(isAuthenticated , getCompany)
router.route('/get/:id',).get(isAuthenticated , getCompanyById)
router.route('/update/:id',).put(isAuthenticated , updateCompany)

export default router;