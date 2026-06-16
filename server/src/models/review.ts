export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export type Review = {
    id: string
    cubeId: string
    text: string
    status: ReviewStatus
    createdAt: string
    updatedAt: string
}