import express from 'express'
import {postJob , getAlljobs , getJobById , getAdminJobs} from '../controllers/job.controller.js'
import isAuthenticated from '../middlewares/isAuthentication.js'

const router = express.Router()

router.route('/post').post(isAuthenticated , postJob)
router.route('/get').get(isAuthenticated ,getAlljobs)
router.route('/get/:id').get(isAuthenticated ,getJobById)
router.route('/admin/jobs').get(isAuthenticated , getAdminJobs)

export default router;