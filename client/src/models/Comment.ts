export type ReviewStatus =
    | 'pending'
    | 'approved'
    | 'rejected';

export interface Comment {
    id: string;
    text: string;
    status: ReviewStatus;
    createdAt: string;
}