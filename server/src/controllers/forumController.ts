import { Request, Response } from 'express';
import { db } from '../config/firebaseConfig';
import { ForumPost } from "../../../shared/src/forum";

const forumPostsCollection = db.collection('forum');

export const createPost = async (req: Request, res: Response) => {
    try {
        const postParams = req.body as ForumPost;

        if (postParams.parentPostId != null && postParams.parentPostId != '') {
            const parentPost = await forumPostsCollection.doc(postParams.parentPostId).get();
            if (!parentPost) {
                res.status(404).json({message: 'Nepodarilo sa identifikovať pôvodný príspevok.'});
                return;
            }
        }
        if (postParams.rootPostId != null && postParams.rootPostId != '') {
            const rootPost = await forumPostsCollection.doc(postParams.rootPostId).get();
            if (!rootPost) {
                res.status(404).json({message: 'Nepodarilo sa identifikovať koreňový príspevok.'});
                return;
            }
        }
        if (postParams.authorUserId != null && postParams.authorUserId != '') {
            const authorRef = forumPostsCollection.doc(postParams.authorUserId).get();
            if (!authorRef) {
                res.status(404).json({message: 'Nepodarilo sa identifikovať autora nového príspevku.'});
                return;
            }
        }

        console.log(postParams);
        postParams.postDate = Date.now();
        console.log(postParams);
        const postRef = await forumPostsCollection.add(postParams);
        res.status(201).send({message: 'Nový príspevok bol úspešne vytvorený na fóre.', id: postRef.id, post: postParams});
    } catch (error: any) {
        console.error('Chyba pri vytváraní nového príspevku do fóra:', error);
        res.status(500).json({message: 'Nepodarilo sa vytvoriť nový práspevok do fóra.'});
    }
}

export const getRootPosts = async (req: Request, res: Response) => {
    try {
        const snapshot = await forumPostsCollection
            .where('parentPostId', '==', '')
            .orderBy('postDate', 'desc')
            .limit(10)
            .get();
        const posts: ForumPost[] = [];
        snapshot.forEach(doc => {
            const data = doc.data() as Omit<ForumPost, 'id'>;
            posts.push({
                id: doc.id,
                ...data,
            });
        });
        res.status(200).json(posts);
    } catch (error: any) {
        console.error('Chyba pri získavaní hlavných príspevkov fóra:', error);
        res.status(500).json({message: 'Nepodarilo sa načítať príspevky fóra.'});
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;

        const post = await forumPostsCollection.doc(postId).get();
        if (!post.exists) {
            res.status(404).json({ message: 'Príspevok fóra nebol nájdený.'});
            return;
        }

        const postData = post.data() as ForumPost;
        // let rootPost = {};
        // if (postData.rootPostId != null && postData.rootPostId != '') {
        //     rootPost = await forumPostsCollection.doc(postData.rootPostId).get();
        //     if (!await forumPostsCollection.doc(postData.rootPostId).get()) {
        //         res.status(404).json({ message: 'Hlavný príspevok fóra nebol nájdený.'});
        //         return;
        //     }
        // }

        const repliesSnapshot = await forumPostsCollection
            .where('parentPostId', '==', postId)
            .limit(5)
            .get();
        const replies: ForumPost[] = [];
        repliesSnapshot.forEach(childSnapshot => {
            const data = childSnapshot.data() as Omit<ForumPost, 'id'>;
            replies.push({
                id: childSnapshot.id,
                ...data,
            });
        });

        // Spojíme hlavný príspevok s odpoveďami
        const fullPostDetail = {
            // rootPost: rootPost.data(),
            replies: replies,
            ...postData
        };

        res.status(200).json(fullPostDetail);
    } catch (error: any) {
        console.error(`Chyba pri získavaní detailu príspevku fóra s ID ${req.params.postId}:`, error);
        res.status(500).json({ message: 'Nepodarilo sa načítať detail príspevku fóra.' });
    }
}