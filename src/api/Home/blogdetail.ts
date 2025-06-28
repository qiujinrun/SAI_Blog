import request from "@/utils/request";
import type { BlogDetailResponse,LikeResponse,UnLikeResponse } from "../Type/Home/type";

export function blogdetail(blog_id:any) {
    return request<BlogDetailResponse>({
        url: `/blog/${blog_id}`,
        method: 'get',
    });
}

export function givelike(blog_id:any) {
    return request<LikeResponse>({
        url: `/like/${blog_id}`,
        method: 'post',
    });
}

export function cancellike(blog_id:any) {
    return request<UnLikeResponse>({
        url: `/like/${blog_id}`,
        method: 'delete',
    });
}