export interface BloglistResponse {
    status_code: number;
    status_msg: string;
    Blogs:Blog[];
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

export interface BlogListCountResponse  {
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

export interface FollowResponse {
    status_code: number;
    status_msg: string;
}