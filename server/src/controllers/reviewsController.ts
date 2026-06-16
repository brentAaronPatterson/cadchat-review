import { Request, Response } from 'express'
import { reviewsService } from '../services/reviewsService'

export async function getReview(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const cubeId = String(req.params.cubeId)

        if (!cubeId) {
            res.status(400).json({ message: 'cubeId is required' })
            return
        }

        const review = await reviewsService.getByCubeId(cubeId)

        res.status(200).json(review)
    } catch {
        res.status(500).json({
            message: 'Failed to retrieve review'
        })
    }
}

export async function createReview(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { cubeId, text } = req.body

        if (!cubeId || !text?.trim()) {
            res.status(400).json({
                message: 'cubeId and text are required'
            })
            return
        }

        const review = await reviewsService.create(cubeId, text)

        res.status(201).json(review)
    } catch {
        res.status(500).json({
            message: 'Failed to create review'
        })
    }
}

export async function updateReviewStatus(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const id = String(req.params.id)
        const { status } = req.body

        if (!id) {
            res.status(400).json({ message: 'id is required' })
            return
        }

        const review = await reviewsService.updateStatus(id, status)

        res.status(200).json(review)
    } catch {
        res.status(500).json({
            message: 'Failed to update review'
        })
    }
}

export async function deleteReview(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const id = String(req.params.id)

        if (!id) {
            res.status(400).json({ message: 'id is required' })
            return
        }

        await reviewsService.delete(id)

        res.sendStatus(204)
    } catch {
        res.status(500).json({
            message: 'Failed to delete review'
        })
    }
}