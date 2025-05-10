import request from "@/utils/request";
import type { BlogDetailResponse } from "../Type/Home/type";

export function blogdetail(blog_id:any) {
    return request<BlogDetailResponse>({
        url: `/blog/${blog_id}`,
        method: 'get',
    })
}