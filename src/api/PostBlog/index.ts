import  request  from "@/utils/request";
import type { UploadResponse } from "../Type/PostBlog/tpye";
export function postblog(content:object){
    return request<UploadResponse>({
        url:'/blog/upload',
        method:'post',
        data:content
    })
}