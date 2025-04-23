// client/src/services/forumService.ts
import { ForumPost } from '@myproject/shared';
import { useAuth } from "../context/AuthContext"; // Vytvoríme tento interface neskôr

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

export const createForumPost = async (rootPostId: string, parentPostId: string,
                                      userId: string | undefined, title: string, content: string): Promise<ForumPost> => {
    try {

        // if (userId === null) {
        //     userId = '';
        // }
        // TODO: Pri odosielaní príspevku bude potrebné pridať autorizačnú hlavičku
        const response = await fetch('/api/forum/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': userId
            },
            body: JSON.stringify({ rootPostId, parentPostId, authorUserId: userId == null ? '' : userId, title, content }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Nepodarilo sa vytvoriť príspevok fóra.');
        }

        const data = await response.json();
        return data as ForumPost; // Backend by mal vrátiť vytvorený príspevok s ID a dátumom
    } catch (error) {
        console.error('Chyba pri vytváraní príspevku fóra:', error);
        throw error;
    }
};