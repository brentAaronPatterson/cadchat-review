import { supabase } from '../database/supabase.client'
import { Review, ReviewStatus } from '../models/review'

type ReviewRow = {
    id: string
    cube_id: string
    text: string
    status: ReviewStatus
    created_at: string
    updated_at: string
}

function mapRowToReview(row: ReviewRow): Review {
    return {
        id: row.id,
        cubeId: row.cube_id,
        text: row.text,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    }
}

export class ReviewsService {
    async getByCubeId(cubeId: string): Promise<Review | null> {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('cube_id', cubeId)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (error) {
            throw error
        }

        return data ? mapRowToReview(data as ReviewRow) : null
    }

    async create(cubeId: string, text: string): Promise<Review> {
        const { data, error } = await supabase
            .from('reviews')
            .insert({
                cube_id: cubeId,
                text: text.trim(),
                status: 'pending'
            })
            .select()
            .single()

        if (error) {
            throw error
        }

        return mapRowToReview(data as ReviewRow)
    }

    async updateStatus(
        id: string,
        status: ReviewStatus
    ): Promise<Review> {
        const { data, error } = await supabase
            .from('reviews')
            .update({
                status,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()

        if (error) {
            throw error
        }

        return mapRowToReview(data as ReviewRow)
    }

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id)

        if (error) {
            throw error
        }
    }
}

export const reviewsService = new ReviewsService()