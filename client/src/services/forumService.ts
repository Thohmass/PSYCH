// client/src/services/forumService.ts
import { ForumPost } from '@myproject/shared'; // Vytvoríme tento interface neskôr

// const API_URL = ''; // Používame relatívne cesty vďaka proxy

export const getForumPosts = async (): Promise<ForumPost[]> => {
    try {
        const response = await fetch('/api/forum/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as ForumPost[];
    } catch (error) {
        console.error('Chyba pri načítavaní príspevkov fóra:', error);
        throw error;
    }
};

export const getForumPostDetail = async (postId: string): Promise<ForumPost | null> => {
    try {
        const response = await fetch(`/api/forum/posts/${postId}`);
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as ForumPost;
    } catch (error) {
        console.error(`Chyba pri načítavaní detailu príspevku fóra s ID ${postId}:`, error);
        throw error;
    }
};

// Neskoršie pridáme funkcie pre create, update, delete