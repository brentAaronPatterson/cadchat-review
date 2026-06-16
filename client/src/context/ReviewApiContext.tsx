/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from 'react'
import type { Comment } from '../models/Comment'

type ReviewStatus = 'pending' | 'approved' | 'rejected'

type ReviewApiContextValue = {
    getReview: (cubeId: string) => Promise<Comment | null>
    createReview: (cubeId: string, text: string) => Promise<Comment>
    updateReviewStatus: (
        id: string,
        status: ReviewStatus
    ) => Promise<Comment>
    deleteReview: (id: string) => Promise<void>
}

const ReviewApiContext =
    createContext<ReviewApiContextValue | null>(null)

const API_BASE_URL = 'http://localhost:3001/api'

export function ReviewApiProvider({
    children
}: {
    children: React.ReactNode
}) {
    async function getReview(cubeId: string) {
        const response = await fetch(
            `${API_BASE_URL}/reviews/${cubeId}`
        )

        if (!response.ok) {
            throw new Error('Failed to fetch review')
        }

        return response.json()
    }

    async function createReview(cubeId: string, text: string) {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cubeId, text })
        })

        if (!response.ok) {
            throw new Error('Failed to create review')
        }

        return response.json()
    }

    async function updateReviewStatus(
        id: string,
        status: ReviewStatus
    ) {
        const response = await fetch(
            `${API_BASE_URL}/reviews/${id}/status`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            }
        )

        if (!response.ok) {
            throw new Error('Failed to update review status')
        }

        return response.json()
    }

    async function deleteReview(id: string) {
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Failed to delete review')
        }
    }

    return (
        <ReviewApiContext.Provider
            value={{
                getReview,
                createReview,
                updateReviewStatus,
                deleteReview
            }}
        >
            {children}
        </ReviewApiContext.Provider>
    )
}

export function useReviewApi() {
    const context = useContext(ReviewApiContext)

    if (!context) {
        throw new Error(
            'useReviewApi must be used inside ReviewApiProvider'
        )
    }

    return context
}