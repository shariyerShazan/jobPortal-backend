import express from 'express'
import { applyJob , getAppliedJobs , getApplicants , updateStatus} from '../controllers/application.controller.js'
import isAuthenticated from '../middlewares/isAuthentication.js'

const router = express.Router()

router.route('/apply/:id',).post(isAuthenticated ,applyJob)
router.route('/get',).get(isAuthenticated , getAppliedJobs)
router.route('/:id/applicants',).get(isAuthenticated , getApplicants)
router.route('/status/:id/update',).put(isAuthenticated , updateStatus)

export default router;