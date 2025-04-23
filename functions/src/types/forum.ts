export enum ForumPostTopic {
    Anxiety = "Anxiety",
    Depression = "Depression",
    Relationships = "Relationships",
    Stress = "Stress",
    Trauma = "Trauma"
    // There will be more and better
}

export interface NewForumPostFormProps {
    onPostCreated: () => void;
}

export interface ForumPost {
    authorUserId: string,
    id?: string
    parentPostId: string,
    rootPostId: string,
    title: string,
    content: string,
    postDate: number
    replies?: ForumPost[]
}
