import { Router } from 'express'
import {
    createReview,
    deleteReview,
    getReview,
    updateReviewStatus
} from '../controllers/reviewsController'

const router = Router()

router.get('/:cubeId', getReview)
router.post('/', createReview)
router.patch('/:id/status', updateReviewStatus)
router.delete('/:id', deleteReview)

export default router