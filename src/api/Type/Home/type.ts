export interface BloglistResponse {
    status_code: number;
    status_msg: string;
    Blogs: Blog[];
}

export interface Blog {
    blog_id: number;
    uid: number;
    user_name: string;
    title: string;
    content: string;
    likes: number;
    comments: number;
    comment: Comment[];
}

export interface Comment {
    blog_id: number;
    cid: number;
    comment: string;
}

export interface BlogListCountResponse {
    status_code: number;
    status_msg: number;
}

//用户详情
export interface UserDetailResponse {
    status_code: number;
    status_msg: string;
    user: User;
}

export interface User {
    ID: number;
    name: string;
    ico_url: string;
    follower: number;
    following: number;
    is_follow: boolean;
}

//关注
export interface FollowResponse {
    status_code: number;
    status_msg: string;
}

export interface UnFollowResponse {
    status_code: number;
    status_msg: string;
}


//博客详情,包括评论的列表
export interface BlogDetailResponse {
    status_code: number;
    status_msg: string;
    blog_id: number;
    uid: number;
    user_name: string;
    user_icon: string;
    title: string;
    content: string;
    likes: number;
    comments: number;
    comment_info: Comment_info[];
}
export interface Comment_info {
    Comment: Comment;
    user: user;
}
export interface user {
    ID:number;
    name:string;
    ico_url:string; 
    accoutnt:string;
}

//点赞
export interface LikeResponse {
    status_code: number;
    status_msg: string; 
}
//取消点赞
export interface UnLikeResponse {
    status_code: number;
    status_msg: string;
}