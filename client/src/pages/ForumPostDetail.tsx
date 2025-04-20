import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getForumPostDetail } from '../services/forumService';
import { ForumPost } from '@myproject/shared'; // Import interface

const ForumPostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<ForumPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            if (!id) {
                setError('Chýba ID príspevku fóra.');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const data = await getForumPostDetail(id);
                setPost(data);
            } catch (err: any) {
                setError('Nepodarilo sa načítať detail príspevku fóra.');
                console.error('Chyba pri načítavaní detailu príspevku fóra:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetail();
    }, [id]);

    if (loading) {
        return <div>Načítavam detail príspevku fóra...</div>;
    }

    if (error) {
        return <div>Chyba: {error}</div>;
    }

    if (!post) {
        return <div>Príspevok fóra nebol nájdený.</div>;
    }

    return (
        <div>
            <h2>{post.title || 'Bez názvu'}</h2> {/* Zobraz názov hlavného príspevku */}
            <p>od: {post.authorUserId} - {new Date(post.postDate).toLocaleString()}</p>
            <div>{post.content}</div> {/* Obsah hlavného príspevku */}

            {/* Zobrazenie odpovedí */}
            {post.replies && post.replies.length > 0 && (
                <div>
                    <h3>Odpovede:</h3>
                    <ul>
                        {post.replies.map((reply) => (
                            <li key={reply.id}>
                                <p>od: {reply.authorUserId} - {new Date(reply.postDate).toLocaleString()}</p>
                                <div>{reply.content}</div>
                                {/* Tu by mohla byť možnosť odpovedať na túto odpoveď (pre vlákna) */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tu by mohol byť formulár na pridanie novej odpovede (len pre prihlásených) */}
        </div>
    );
};

export default ForumPostDetail;