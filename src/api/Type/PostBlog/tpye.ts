export interface UploadResponse {
    status_code: number;
    status_msg: string;
    blog_id?: number;
    uid: number;
    title: string;
    content: string;
    likes: number;
    comments: number;
}