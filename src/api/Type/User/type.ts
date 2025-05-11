export interface UserBlog {
    blog_id: number;
    uid: number;
    user_name: string;
    title: string;
    content: string;
    likes: number;
    comments: number;
    comment: Comment[];
}

export interface UserBloglistResponse {
    status_code: number;
    status_msg: string;
    Blogs: UserBlog[];
}