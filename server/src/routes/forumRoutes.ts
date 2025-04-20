import express from 'express';
import {getRootPosts, getPostById, createPost} from "../controllers/forumController";

const forumRouter = express.Router();

forumRouter.get('/posts', getRootPosts);

forumRouter.get('/posts/:id', getPostById);

forumRouter.post('/posts', createPost);

export default forumRouter;