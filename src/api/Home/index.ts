import  request  from "@/utils/request";
import type { BloglistResponse,BlogListCountResponse } from "../Type/Home/type";
export function getbloglist(key:string,page:string){
    return request<BloglistResponse>({
        url:'/blog/list',
        method:'get',
        params:{key,page},
    })
}
//获取博客总数
export function getblogcount(){
    return request<BlogListCountResponse>({
        url:'/blog/count',
        method:'get',

    })
}