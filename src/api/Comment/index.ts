import request from "@/utils/request";
import type { PostCommentResponse } from "@/api/Type/Comment/type";
export function postcomment(blog_id:any,comment:any) {
    return request<PostCommentResponse>({
        url: `/blog/comment/${blog_id}`,
        method: 'post',
        data: { comment }
    });

}