import express from "express";
import {getRootPosts, getPostById,
  createPost} from "../controllers/forumController";
import {authenticateJWT} from "../middleware/authMiddleware";

// eslint-disable-next-line
const forumRouter = express.Router();

forumRouter.get("/posts", getRootPosts);

forumRouter.get("/posts/:id", getPostById);

forumRouter.post("/posts", authenticateJWT, createPost);

export default forumRouter;
