import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { ForumPostTopic } from "@myproject/shared";
// import { Psychologist } from "@myproject/shared";
import { Link } from 'react-router-dom';
import { getForumPosts } from '../services/forumService';
import { ForumPost } from '@myproject/shared'; // Import interface

const ForumPostList: React.FC = () => {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getForumPosts();
                setPosts(data);
            } catch (err: any) {
                setError('Nepodarilo sa načítať príspevky fóra.');
                console.error('Chyba pri načítavaní príspevkov fóra:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Načítavam príspevky fóra...</div>;
    }

    if (error) {
        return <div>Chyba: {error}</div>;
    }

    return (
        <div>
            <h2>Diskusné fórum</h2>
            {/* Tu by mohlo byť tlačidlo na vytvorenie nového príspevku (len pre prihlásených) */}
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/forum/${post.id}`}>
                                <h3>{post.title}</h3>
                            </Link>
                            <p>od: {post.authorUserId} - {new Date(post.postDate).toLocaleString()}</p> {/* Zobrazenie autora a dátumu */}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Žiadne príspevky vo fóre zatiaľ nie sú.</div>
            )}
        </div>
    );
};

export default ForumPostList;