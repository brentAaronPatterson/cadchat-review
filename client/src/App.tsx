import { Html, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import type { Comment } from './models/Comment'
import { useReviewApi } from './context/ReviewApiContext'

type CubeProps = {
    isPanelOpen: boolean
    setIsPanelOpen: (isOpen: boolean) => void
}

function Cube({ isPanelOpen, setIsPanelOpen }: CubeProps) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [review, setReview] = useState<Comment | null>(null)
    const [text, setText] = useState('')

    const { getReview, createReview, updateReviewStatus, deleteReview } = useReviewApi()

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
        }
    })

    async function handleCubeClick(
        event: { stopPropagation: () => void }
    ) {
        event.stopPropagation()

        const existingReview = await getReview('cube-1')

        setReview(existingReview)
        setIsPanelOpen(true)
    }

    async function handleAddComment() {
        if (!text.trim()) return

        const savedReview = await createReview('cube-1', text)

        setReview(savedReview)
        setText('')
    }

    async function handleStatusUpdate(status: 'approved' | 'rejected') {
        if (!review) return

        const updatedReview = await updateReviewStatus(review.id, status)

        setReview(updatedReview)
    }

    async function handleErasePersistedDecisionAndReset() {
        if (!review) return

        await deleteReview(review.id)

        setReview(null)
        setText('')
    }

    return (
        <>
            <mesh ref={meshRef} onClick={handleCubeClick}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="steelblue" />
            </mesh>

            {isPanelOpen && (
                <Html position={[0, 1.8, 0]} center>
                    <div
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => event.stopPropagation()}
                        style={{
                            width: 300,
                            padding: 16,
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: 8,
                            boxShadow: '0 4px 12px rgba(0,0,0,.2)',
                            fontFamily: 'Arial, sans-serif'
                        }}
                    >
                        <h3 style={{ marginTop: 0 }}>Design Review</h3>

                        {!review && (
                            <>
                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Enter comment..."
                                    style={{
                                        width: '100%',
                                        padding: 8,
                                        marginBottom: 8,
                                        boxSizing: 'border-box'
                                    }}
                                />

                                <button
                                    style={{ width: '100%', padding: 8 }}
                                    onClick={handleAddComment}
                                >
                                    Add Comment
                                </button>
                            </>
                        )}

                        {review && (
                            <>
                                <p>
                                    <strong>Comment:</strong> {review.text}
                                </p>

                                <p>
                                    <strong>Status:</strong> {review.status}
                                </p>

                                {review.status === 'pending' && (
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button onClick={() => handleStatusUpdate('approved')}>
                                            Approve
                                        </button>

                                        <button onClick={() => handleStatusUpdate('rejected')}>
                                            Reject
                                        </button>
                                    </div>
                                )}

                                {review.status !== 'pending' && (
                                    <button
                                        style={{
                                            marginTop: 12,
                                            width: '100%',
                                            padding: 8
                                        }}
                                        onClick={handleErasePersistedDecisionAndReset}
                                    >
                                        Erase Persisted Decision and Reset
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </Html>
            )}
        </>
    )
}

function App() {
    const [isPanelOpen, setIsPanelOpen] = useState(false)

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas
                camera={{ position: [4, 4, 4] }}
                onPointerMissed={() => setIsPanelOpen(false)}
            >
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 10]} />
                <Cube
                    isPanelOpen={isPanelOpen}
                    setIsPanelOpen={setIsPanelOpen}
                />
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default App